import { Prisma } from "@prisma/client";
import prisma from "@/db/prismaSingleton";

/**
 * Retrieves a user by their email address.
 *
 * @param email - The email address to search for.
 * @returns The user object if found, or null if not found or an error occurs
 * @see {@link https://www.prisma.io/docs/orm/reference/error-reference} Prisma error reference
 */
export default async function getUserByEmail(email: string) {
  try {
    // Check if an existing user with the given email exists
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Handle specific Prisma errors (e.g., database connection issue)
      console.error("Prisma error:", error.message);
    } else {
      // Handle other unexpected errors
      console.error("Unexpected error:", error);
    }
    return null;
  }
}
