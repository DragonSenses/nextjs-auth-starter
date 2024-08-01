import { ShieldAlert } from 'lucide-react';
import React from 'react';

interface FormErrorProps {
  message?: string;
}

export default function FormError({
  message,
}: FormErrorProps) {
  return message ? (
    <div className="flex items-center p-3 gap-x-2 bg-destructive/15 text-destructive text-sm">
      <ShieldAlert className='h-4 w-4' />
      <p>{message}</p>
    </div>
  ) : null;
}
