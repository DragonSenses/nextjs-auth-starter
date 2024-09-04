import React from 'react';
import { auth } from "@/auth"

import { DEFAULT_SIGNIN_REDIRECT } from '@/routes';
import Redirect from '@/components/auth/Redirect';
import SignInForm from '@/components/auth/SignInForm';

export default async function SignInPage() {
  const session = await auth()

  if (session) {
    return <Redirect to={DEFAULT_SIGNIN_REDIRECT} />;
  }

  return (
    <SignInForm />
  );
}
