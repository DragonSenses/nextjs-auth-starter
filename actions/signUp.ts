"use server";

import bcrypt from "bcrypt";
import { z } from "zod";

import prisma from "@/db/prismaSingleton";
import { SignUpSchema } from "@/schemas";
import getUserByEmail from "@/utils/getUserByEmail";

/**
 * Validates user sign-up data using the provided schema.
 *
 * @param values - User input data to validate.
 * @returns An object with either a success message or an error message.
 */
export default async function signUp(values: z.infer<typeof SignUpSchema>) {
  console.log(values);

  const parsedValues = SignUpSchema.safeParse(values);

  if (!parsedValues.success) {
    return {
      error: "Invalid fields!",
    };
  }

  // Extract the data from the parsed values
  const { email, password, username } = parsedValues.data;

  // Hash the password
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);

  // Check if an existing user with the given email exists
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email address is already in use." };
  }

  // Create a new user in the database with the provided sign-up data:
  // username, email, and hashed password
  await prisma.user.create({
    data: {
      username,
      email,
      password: hash,
    }
  });

  return {
    success: "Sign up successful!",
  };
}
