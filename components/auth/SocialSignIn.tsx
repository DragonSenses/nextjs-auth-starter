import React from 'react';

import GoogleIcon from '@/public/img/auth/GoogleIcon';
import { Button } from '@/components/ui/button';

export default function SocialSignIn() {
  return (
    <div className='w-full flex items-center gap-x-2'>
      <Button
        size='lg'
        className='w-full'
        variant='outline'
      >
        <GoogleIcon className='h-5 w-5'/>
      </Button>
    </div>
  );
}
