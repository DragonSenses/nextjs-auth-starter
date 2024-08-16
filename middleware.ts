import { NextRequest } from "next/server";
import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { 
  apiAuthRoute, 
  protectedRoutes, 
  publicRoutes 
} from "@/routes";
 
const { auth } = NextAuth(authConfig);

export default auth(async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl; // Destructure the pathname from req.nextUrl

  console.log("ROUTE: ", pathname); // Debug statement that logs current route

  const isApiAuthRoute = pathname.startsWith(apiAuthRoute);
  const isPublicRoute = publicRoutes.includes(pathname);
  const isProtectedRoute = protectedRoutes.includes(pathname);

  if(isApiAuthRoute) {
    // Allow access to /api/auth routes
    return;
  }

});

const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
