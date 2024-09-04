import React from 'react';
import { auth } from '@/auth';
import SignUpForm from '@/components/auth/SignUpForm';

export default async function SignUpPage() {
  const session = await auth();

  if (!session) {
    return <div>Not authenticated</div>
  }

  return (
    <SignUpForm />
  )
}
