"use server";

import { z } from "zod";
import { SignInSchema } from "@/schemas";

/**
 * Validates user sign-in data using the provided schema.
 *
 * @param values - User input data to validate.
 * @returns An object with either a success message or an error message.
 */
export default async function signIn(values: z.infer<typeof SignInSchema>) {
  console.log(values);

  const parsedValues = SignInSchema.safeParse(values);

  if (!parsedValues.success) {
    return {
      error: "Invalid fields!",
    };
  }

  return {
    success: "Sign in successful!",
  };
}
