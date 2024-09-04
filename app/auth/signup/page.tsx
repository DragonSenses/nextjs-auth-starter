import React from 'react';
import { auth } from '@/auth';
import { DEFAULT_SIGNIN_REDIRECT } from '@/routes';
import SignUpForm from '@/components/auth/SignUpForm';
import Redirect from '@/components/auth/Redirect';

export default async function SignUpPage() {
  const session = await auth();

  if (session) {
    return <Redirect to={DEFAULT_SIGNIN_REDIRECT} />;
  }

  return (
    <SignUpForm />
  )
}
