"use client";

import React, { useState, useTransition } from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { SignInSchema } from '@/schemas';
import CardWrapper from '@/components/auth/CardWrapper';
import FormError from '@/components/form/FormError';
import FormSuccess from '@/components/form/FormSuccess';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import signIn from '@/actions/signIn';

export default function SignInForm() {
  const [successMessage, setSuccessMessage] = useState<string | undefined>("");
  const [errorMessage, setErrorMessage] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

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
    console.log(values);
    // Handle form submission:
    //    - Validate the form values (type-safe and validated).
    //    - Execute the user sign-in server action.
    startTransition(() => {
      // Execute the user sign-in server action
      signIn(values)
        .then((data) => {
          // Update success or error messages based on the server response
          setSuccessMessage(data.success);
          setErrorMessage(data.error);
        });
    });
  }

  return (
    <CardWrapper
      backButtonHref="/auth/register"
      backButtonLabel="Don't have an account?"
      headerLabel="Welcome back"
      showSocial={true}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type='email'
                      placeholder="Enter your email address"
                      aria-label="Email address"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      placeholder="**************"
                      aria-label="Password"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError />
          <FormSuccess />
          <Button
            type="submit"
            disabled={isPending}
            className='w-full bg-sky-500'
          >
            Sign In
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
