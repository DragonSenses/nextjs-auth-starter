import React from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className="auth-layout h-full flex flex-col items-center justify-center page-bg-gradient">
      <main className="auth-content h-full flex items-center justify-center">
        {children}
      </main>
    </div>
  );
}
