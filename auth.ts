import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter"

import authConfig from "@/auth.config";
import prisma from "@/db/prismaSingleton";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
