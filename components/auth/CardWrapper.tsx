"use client";

import React from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface CardWrapperProps {
  children: React.ReactNode;
  backButtonHref: string;
  backButtonLabel: string;
  headerLabel: string;
  showSocial?: boolean;
};

export default function CardWrapper({
  children,
  backButtonHref,
  backButtonLabel,
  headerLabel,
  showSocial,
}: CardWrapperProps) {
  return (
    <Card className='w-96 shadow-md'>
      {children}
    </Card>
  )
}