import React from 'react';

export default function AuthIntro() {
  const heading: string = "Auth 🛡️";

  return (
    <div>
      <h1 className="text-6xl text-white font-semibold drop-shadow-md">
        {heading}
      </h1>
      <p className="text-lg text-white">
        An authentication service that shields your identity with the power of Auth.js
      </p>
    </div>
  )
}
