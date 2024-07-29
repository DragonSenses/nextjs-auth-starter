import React from 'react';

import { Button } from '@/components/ui/button';

interface BackButtonProps {
  href: string;
  label: string;
};

export default function BackButton({
  href,
  label,
}: BackButtonProps) {
  return (
    <Button>BackButton</Button>
  )
}