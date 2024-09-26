import type { NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import { CustomJWT, CustomSession } from '@/auth-types';
import { SignInSchema } from "@/schemas";
import getUserByEmail from "@/utils/getUserByEmail";
import getUserById from "@/utils/getUserById";

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    GitHub,
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Enter your email address" },
        password: { label: "Password", type: "password", placeholder: "**************" },
      },
      authorize: async (credentials) => {
        // Validate the credentials using the SignInSchema
        const parsedValues = SignInSchema.safeParse(credentials);
        
        if (parsedValues.success) {
          const { email, password } = parsedValues.data;

          // Retrieve the user by email from the database
          const user = await getUserByEmail(email);

          // Check if the user exists and has a password (not an OAuth user)
          if (!user || !user.password) { 
            // If no user or user password (user may have signed-in with OAuth Google or GitHub)
            // Credentials provider will not work without the user's hashed password
            return null; 
          }

          const passwordsMatch = await bcrypt.compare(
            password,      // The password credential input
            user.password, // The password hash from our database
          );

          if (passwordsMatch) {
            // Return user object with their profile data
            return user;
          }
        }

        // Return null if validation or authentication fails
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      const customToken = token as CustomJWT;
      // Initial sign in
      if (user) {
        if (user.id && user.email) {
          customToken.id = user.id;
          customToken.email = user.email;
        }
      }

      if (!token.sub) { return token; }

      const existingUser = await getUserById(token.sub);

      if (!existingUser) { return token; }

      token.role = existingUser.role;

      return customToken;
    },
    async session({ session, token }) {
      const customSession = session as CustomSession;
      const customToken = token as CustomJWT;

      // Add token properties to the session
      if (customToken) {
        customSession.user.id = customToken.id;
        customSession.user.email = customToken.email;
        customSession.user.role = customToken.role;
      }

      // Assign the session.sub field (which is the ID) to the session.id
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      // Add token role property to the session
      if (token.role && session.user) {
        session.user.role = token.role;
      }

      return customSession;
    },
  },
} satisfies NextAuthConfig;
