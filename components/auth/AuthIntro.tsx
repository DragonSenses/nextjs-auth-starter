import React from 'react';

interface AuthIntroProps {
  heading?: string;
  description?: string;
}

export default function AuthIntro({
  heading = "Auth 🛡️",
  description = "An authentication service that shields your identity with the power of Auth.js",
}: AuthIntroProps) {
  return (
    <header className="text-center text-white">
      <h1 className="text-6xl font-semibold drop-shadow-md">
        {heading}
      </h1>
      <p className="text-lg">
        {description}
      </p>
    </header>
  );
};
