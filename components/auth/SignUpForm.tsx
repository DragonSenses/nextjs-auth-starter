"use client";

import React, { useState, useTransition } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { SignUpSchema } from '@/schemas';
import signUp from '@/actions/signUp';

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

export default function SignUpForm() {
  const [successMessage, setSuccessMessage] = useState<string | undefined>("");
  const [errorMessage, setErrorMessage] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  // 1. Define the sign-up form.
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      username: "",
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

  // 3. Build the form
  return (
    <CardWrapper
      backButtonHref="/auth/signin"
      backButtonLabel="Already have an account?"
      headerLabel="Create an account"
      showSocialSignIn={true}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your username"
                      aria-label="username"
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
          <FormError message={errorMessage} />
          <FormSuccess message={successMessage} />
          <Button
            type="submit"
            disabled={isPending}
            className='w-full bg-sky-500'
          >
            Sign Up
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
