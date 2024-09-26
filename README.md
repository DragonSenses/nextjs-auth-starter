# nextjs-auth-starter

A Next.js starter template for authentication using Auth.js (NextAuth.js v5). Includes user registration, login, password reset, and OAuth support. This is still a **Work-in-Progress**.

# Description

**Work-in-Progress**

# Technologies:

- Next.js 14
- Auth.js
- TypeScript
- React
- TailwindCSS
- PostgreSQL and Prisma ORM for database
- shadcn/ui for component collection

# Specifications

- 

# Features

- [x] Auth.js (Next-auth v5)
- [x] Next.js 14
- [x] User registration
- [ ] Password reset
- [ ] Email verification
- [ ] OAuth Provider (Social login with Google & GitHub)
- [ ] Two factor verification (2FA)

# Prerequisites

- [Node.js 18.17](https://nodejs.org/en/download) or higher
- macOS, Windows (including WSL), and Linux are supported.

# Setup instructions

**1. Clone this repo (or download zip on GitHub)**

**2. Go to the directory the files are located**

    In the terminal:

    ```powershell
    cd /nextjs-auth-starter
    ```

**3. Install dependencies**

  In the terminal:

    ```powershell
    npm install
    ```

**4. Run the app locally**

  In the terminal:

    ```powershell
    npm run dev
    ```

  With the browser of your choice, navigate to the link: `http://localhost:3000`

# What is Auth.js?

- [Auth.js](https://authjs.dev/) and [Authjs | Getting Started](https://authjs.dev/getting-started)

Auth.js is a runtime agnostic library based on standard Web APIs that integrates deeply with multiple modern JavaScript frameworks to provide an authentication experience that’s simple to get started with, easy to extend, and always private and secure!

## Authentication methods

There are 4 ways to authenticate users with Auth.js:

- [OAuth authentication](https://authjs.dev/getting-started/authentication/oauth) (Sign in with Google, GitHub, LinkedIn, etc…)
- [Magic Links](https://authjs.dev/getting-started/authentication/email) (Email Provider like Resend, Sendgrid, Nodemailer etc…)
- [Credentials](https://authjs.dev/getting-started/authentication/credentials) (Username and Password, Integrating with external APIs, etc…)
- [WebAuthn](https://authjs.dev/getting-started/authentication/webauthn) (Passkeys, etc…)
