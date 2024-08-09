import { Prisma } from "@prisma/client";
import prisma from "@/db/prismaSingleton";

/**
 * Retrieves a user by their ID.
 *
 * @param id - The user ID to search for.
 * @returns The user object if found, or null if not found or an error occurs
 * @see {@link https://www.prisma.io/docs/orm/reference/error-reference} Prisma error reference
 */
export default async function getUserById(id: string) {
  try {
    // Check if an existing user with the given ID exists
    const user = await prisma.user.findUnique({
      where: {
        id,
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
