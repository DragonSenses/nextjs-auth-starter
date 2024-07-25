import React from 'react';

import { Button } from '@/components/ui/button';

interface SignInButtonProps {
  asChild?: boolean;
  mode?: "modal" | "redirect";
};

export default function SignInButton({
  asChild,
  mode = "redirect",
}: SignInButtonProps) {
  return (
    <Button
      size="lg"
      variant="secondary"
      className='font-semibold cursor-pointer'
    >
      Sign In
    </Button>
  )
}
