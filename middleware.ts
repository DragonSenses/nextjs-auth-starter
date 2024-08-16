import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { apiAuthRoute } from "@/routes";
import { NextRequest } from "next/server";
 
const { auth } = NextAuth(authConfig);

export default auth(async function middleware(req: NextRequest) {
  console.log("ROUTE: ", req.nextUrl.pathname);

  const isApiAuthRoute = req.nextUrl.pathname.startsWith(apiAuthRoute);
});

const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
