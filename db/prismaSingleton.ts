import { PrismaClient } from "@prisma/client";

/**
 * Instantiate the Prisma Client by defining a global prisma instance.
 *
 * This code ensures that only one instance of the Prisma Client is created
 * throughout your application's lifecycle. Creating multiple instances can
 * lead to performance issues or errors.
 *
 * @returns {PrismaClient} - The singleton Prisma Client instance.
 * @link https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices
 */
const prismaClientSingleton = () => {
  return new PrismaClient();
};

// Declare a global variable to store the Prisma Client instance.
declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

// Initialize the Prisma Client using the global instance or create a new one.
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

// Export the Prisma Client instance as the default export.
export default prisma;

// If not in production mode, assign the Prisma Client instance to the global variable.
if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
