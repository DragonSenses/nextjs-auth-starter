"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

interface SignInButtonProps {
  asChild?: boolean;
  mode?: "modal" | "redirect";
};

export default function SignInButton({
  asChild,
  mode = "redirect",
}: SignInButtonProps) {
  const router = useRouter();

  const handleSignInClick = () => {
    router.push("/auth/login");
  }

  return (
    <Button
      onClick={handleSignInClick}
      size="lg"
      variant="secondary"
      className='font-semibold cursor-pointer'
    >
      Sign In
    </Button>
  )
}
