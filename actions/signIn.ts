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
  console.log("Received values:", values);

  const parsedValues = SignInSchema.safeParse(values);

  if (!parsedValues.success) {
    console.error("Validation errors:", parsedValues.error.errors);
    return {
      error: "Invalid fields! Please check your input.",
    };
  }

  return {
    success: "Sign in successful!",
  };
}
