/**
 * An array of public routes accessible to all users.
 * These routes do not require authentication.
 * @type {string[]}
 */
export const publicRoutes: string[] = [
  "/",
];

/**
 * An array of protected routes that require authentication.
 * @type {string[]}
 */
export const protectedRoutes: string[] = [
  "/auth/login",
  "/auth/register",
];

/**
 * The base endpoint for API authentication routes.
 * Routes that start with this prefix are dedicated to API authentication.
 * @type {string}
 */
export const apiAuthRoute: string = "/api/auth";

/**
 * The default redirect path after user sign-in and authentication.
 * This path is used when no specific redirect is provided.
 * @type {string}
 */
export const DEFAULT_SIGNIN_REDIRECT: string = "/settings";
