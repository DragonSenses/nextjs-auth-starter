import React from 'react';
import CardWrapper from '@/components/auth/CardWrapper';

export default function SignInForm() {
  return (
    <CardWrapper
      backButtonHref="/auth/register"
      backButtonLabel="Don't have an account?"
      headerLabel="Welcome back"
      showSocial={true}
    >
      SignInForm
    </CardWrapper>
  );
}
