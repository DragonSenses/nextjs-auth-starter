import { NextRequest, NextResponse } from "next/server";
import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import {
  apiAuthRoute, 
  DEFAULT_SIGNIN_REDIRECT,
  protectedRoutes, 
  publicRoutes 
} from "@/routes";

// Use only one of the two middleware options below
// 1. Use middleware directly
// export const { auth: middleware } = NextAuth(authConfig)
 
// 2. Wrapped middleware option
const { auth } = NextAuth(authConfig);

export default auth(async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  console.log("ROUTE: ", pathname);

  const isApiAuthRoute = pathname.startsWith(apiAuthRoute);
  const isPublicRoute = publicRoutes.includes(pathname);
  const isProtectedRoute = protectedRoutes.includes(pathname);

  if (isApiAuthRoute || isPublicRoute) {
    // Allow access to /api/auth routes and public routes
    return NextResponse.next();
  }

  if (isProtectedRoute) {
    // Redirect to sign-in page if not authenticated
    return NextResponse.redirect(DEFAULT_SIGNIN_REDIRECT);
  }

  // Allow every other route
  return NextResponse.next();
});

const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
