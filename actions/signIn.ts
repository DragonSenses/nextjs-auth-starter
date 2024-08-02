"use server";

import { z } from "zod";
import { SignInSchema } from "@/schemas";

export default function signIn(values: z.infer<typeof SignInSchema>) {
  console.log(values);
}