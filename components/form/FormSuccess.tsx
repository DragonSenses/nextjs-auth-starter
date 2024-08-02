import { ShieldCheck } from 'lucide-react';
import React from 'react';

interface FormSuccessProps {
  message?: string;
}

export default function FormSuccess({
  message,
}: FormSuccessProps) {
  return message ? (
    <div className="flex items-center p-3 gap-x-2 bg-emerald-500/15 text-emerald-500 text-sm rounded-md">
      <ShieldCheck className='h-4 w-4' />
      <p>{message}</p>
    </div>
  ) : null;
}
