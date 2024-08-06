"use client";

import React, { useState, useTransition } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { SignUpSchema } from '@/schemas';
import signUp from '@/actions/signUp';

export default function SignUpPage() {
  const [successMessage, setSuccessMessage] = useState<string | undefined>("");
  const [errorMessage, setErrorMessage] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  // 1. Define the sign-up form.
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof SignUpSchema>) {
    console.log(values);
    // Reset success and error messages before sign-up server action
    setSuccessMessage("");
    setErrorMessage("");
    // Handle form submission:
    //    - Validate the form values (type-safe and validated).
    //    - Execute the user sign-up server action.
    startTransition(() => {
      // Execute the user sign-up server action
      signUp(values)
        .then((data) => {
          // Update success or error messages based on the server response
          setSuccessMessage(data.success);
          setErrorMessage(data.error);
        });
    });
  }

  return (
    <div>SignUpPage</div>
  )
}
