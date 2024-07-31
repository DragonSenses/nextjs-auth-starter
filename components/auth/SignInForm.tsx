"use client";

import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { SignInSchema } from '@/schemas';
import CardWrapper from '@/components/auth/CardWrapper';
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

export default function SignInForm() {

  // 1. Define the sign-in form.
  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof SignInSchema>) {
    // Do something with the form values.
    // This will be type-safe and validated.
    console.log(values)
  }

  return (
    <CardWrapper
      backButtonHref="/auth/register"
      backButtonLabel="Don't have an account?"
      headerLabel="Welcome back"
      showSocial={true}
    >
      <Form {...form}>
        <form>
          <Input />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
