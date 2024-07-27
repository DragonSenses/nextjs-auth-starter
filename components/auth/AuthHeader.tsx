import React from 'react';

interface AuthHeaderProps {
  heading?: string;
  label: string;
};

export default function AuthHeader({
  heading = "Auth 🛡️",
  label,
}: AuthHeaderProps) {
  return (
    <div className='w-full flex flex-col items-center justify-center gap-y-4'>
      <h1 className='text-3xl font-semibold'>
        {heading}
      </h1>
      <p className='text-sm text-muted-foreground'>
        {label}
      </p>
    </div>
  )
}
