import React from 'react';
import Link from 'next/link';

import { buttonVariants } from "@/components/ui/button"
import { cn } from '@/lib/utils';

interface BackButtonProps {
  href: string;
  label: string;
};

export default function BackButton({
  href,
  label,
}: BackButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        'font-normal w-full text-primary underline-offset-4 hover:underline',
        buttonVariants({ size: "sm" }),
        buttonVariants({ variant: "destructive" }),
      )}
    >
      {label}
    </Link>
  );
}