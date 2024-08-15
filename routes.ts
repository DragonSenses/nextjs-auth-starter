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
