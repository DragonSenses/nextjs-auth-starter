"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Define the Redirect component, which takes a 'to' prop for the URL to redirect to
const Redirect = ({ to }: { to: string }) => {
  const router = useRouter();

  useEffect(() => {
    // This effect runs once when the component mounts
    router.push(to); // Navigate to the specified URL
  }, [router, to]); // Dependencies array ensures the effect runs only when 'router' or 'to' changes

  return null; // Render nothing as this component is only for redirection
};

export default Redirect;
