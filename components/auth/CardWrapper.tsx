"use client";

import React from 'react';

import AuthHeader from '@/components/auth/AuthHeader';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import BackButton from '@/components/auth/BackButton';
import SocialSignIn from '@/components/auth/SocialSignIn';

interface CardWrapperProps {
  children: React.ReactNode;
  backButtonHref: string;
  backButtonLabel: string;
  headerLabel: string;
  showSocialSignIn?: boolean;
};

export default function CardWrapper({
  children,
  backButtonHref,
  backButtonLabel,
  headerLabel,
  showSocialSignIn = true,
}: CardWrapperProps) {

  return (
    <Card className='w-96 shadow-md'>
      <CardHeader>
        <AuthHeader label={headerLabel} />
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      {showSocialSignIn && (
        <CardFooter>
          <SocialSignIn />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton 
          href={backButtonHref}
          label={backButtonLabel}
        />
      </CardFooter>
    </Card>
  );
}
