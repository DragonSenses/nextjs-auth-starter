import React from 'react';

import GoogleColoredIcon from '@/public/img/auth/GoogleColoredIcon';
import { Button } from '@/components/ui/button';

export default function SocialSignIn() {
  return (
    <div className='w-full flex items-center gap-x-2'>
      <Button
        size='lg'
        className='w-full'
        variant='outline'
      >
       <GoogleColoredIcon className='h-5 w-5' />
      </Button>
    </div>
  );
}
