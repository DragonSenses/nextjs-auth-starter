import React from 'react';
import { auth } from '@/auth';
import dynamic from 'next/dynamic';

// Dynamically import the client component
const Redirect = dynamic(() => import('@/components/auth/Redirect'), { ssr: false });

import { DEFAULT_SIGNIN_REDIRECT } from '@/routes';
import SignUpForm from '@/components/auth/SignUpForm';

export default async function SignUpPage() {
  const session = await auth();

  if (session) {
    return <Redirect to={DEFAULT_SIGNIN_REDIRECT} />;
  }

  return (
    <SignUpForm />
  )
}
