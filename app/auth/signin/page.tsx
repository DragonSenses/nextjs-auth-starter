import React from 'react';
import { auth } from "@/auth"

import dynamic from 'next/dynamic';

// Dynamically import the client component
const Redirect = dynamic(() => import('@/components/auth/Redirect'), { ssr: false });

import { DEFAULT_SIGNIN_REDIRECT } from '@/routes';
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
