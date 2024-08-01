import React from 'react';

interface FormErrorProps {
  message?: string;
}

export default function FormError({
  message,
}: FormErrorProps) {
  return (
    <div>FormError</div>
  )
}
