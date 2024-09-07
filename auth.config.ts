import type { NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import { SignInSchema } from "@/schemas";
import getUserByEmail from "@/utils/getUserByEmail";

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    GitHub,
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
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
} satisfies NextAuthConfig;
