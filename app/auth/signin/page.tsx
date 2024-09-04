import React from 'react';
import { auth } from "@/auth"

import SignInForm from '@/components/auth/SignInForm';

export default async function SignInPage() {
  const session = await auth()

  if (!session) {
    return <div>Not authenticated</div>
  }

  return (
    <SignInForm />
  );
}
