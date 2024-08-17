import { NextRequest } from "next/server";
import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import {
  apiAuthRoute, 
  DEFAULT_SIGNIN_REDIRECT,
  protectedRoutes, 
  publicRoutes 
} from "@/routes";
import { getSession } from "next-auth/react";
 
const { auth } = NextAuth(authConfig);

export default auth(async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl; // Destructure the pathname from req.nextUrl

  console.log("ROUTE: ", pathname); // Debug statement that logs current route

  const isApiAuthRoute = pathname.startsWith(apiAuthRoute);
  const isPublicRoute = publicRoutes.includes(pathname);
  const isProtectedRoute = protectedRoutes.includes(pathname);

  // Check if the user is signed in
  const session = await getSession({ req });

  if(isApiAuthRoute) {
    // Allow access to /api/auth routes
    return;
  }
  
  if(isProtectedRoute) {
    if(!session) {
      return Response.redirect(new URL(DEFAULT_SIGNIN_REDIRECT, req.nextUrl));
    }
    return;
  }

  // If not signed-in and not on a public route, then redirect
  if (!session && !isPublicRoute) {
    return Response.redirect(new URL(DEFAULT_SIGNIN_REDIRECT, req.nextUrl));
  }

  // Allow every other route
  return;
});

const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
