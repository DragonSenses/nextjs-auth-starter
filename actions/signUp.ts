"use server";

import { z } from "zod";
import { SignUpSchema } from "@/schemas";

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

  return {
    success: "Sign up successful!",
  };
}