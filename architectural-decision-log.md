# Architectural decision log

This is the documentation for the process of building the project, which gives some insight behind certain choices and design decisions. 

This also facilitates the [onboarding process](https://en.wikipedia.org/wiki/Onboarding), which helps others be informed and caught up to speed.

# NextJS Authentication Starter

Authentication is a core feature for nearly all applications, so this project provides a robust foundation for secure web applications.

## Benefits

1. **Time Savings**: It provides a ready-to-use foundation, significantly reducing the time needed to set up authentication from scratch for new projects.

2. **Consistency**: Ensures a consistent authentication setup across multiple projects, which can help maintain best practices and reduce errors.

3. **Security**: By using a well-tested starter template, you can ensure that common security vulnerabilities are addressed, providing a more secure authentication system.

4. **Scalability**: A starter template can be designed to handle various authentication methods (e.g., OAuth, email/password, passwordless), making it easier to scale and adapt to different project requirements.

5. **Learning Tool**: It serves as an excellent resource for developers to learn how to implement authentication in Next.js, especially for those new to the framework or authentication concepts.

6. **Community Contribution**: Sharing a starter template can help the developer community by providing a reliable starting point, fostering collaboration, and improving overall code quality.

7. **Customization**: It allows for easy customization and extension, enabling developers to tailor the authentication system to specific project needs without starting from scratch.

8. **Best Practices**: Embeds best practices for authentication, session management, and security, ensuring that new projects adhere to high standards from the beginning.

## Project Configuration

### Install Next.js

Let's get started with [Next.js 14 - App Router](https://nextjs.org/docs).

- [Nextjs Installation](https://nextjs.org/docs/getting-started/installation)

```sh
npx create-next-app@latest
```

Now we answer the prompts that defines the set up of our project

```sh
What is your project named? my-app
√ Would you like to use TypeScript? ... No / [Yes]
√ Would you like to use ESLint? ... No / [Yes]
√ Would you like to use Tailwind CSS? ... No / [Yes]
√ Would you like to use `src/` directory? ... [No] / Yes
√ Would you like to use App Router? (recommended) ... No / [Yes]
√ Would you like to customize the default import alias (@/*)? ... [No] / Yes
```

chore: Initialize Next.js 14 app router project

#### Install shadcn-ui

The next step is to initialize [shadcn/ui](https://ui.shadcn.com/docs/installation/next).

```sh
npx shadcn-ui@latest init
```

You will be asked a few questions to configure `components.json`:

```sh
Need to install the following packages:
  shadcn-ui@0.6.0
Ok to proceed? (y) y
Which style would you like to use? › Default
Which color would you like to use as base color? › Slate
Do you want to use CSS variables for colors? › no / [yes]
```

chore: Configure shadcn/ui for project

### globals.css

#### Use full viewport height

To ensure that the entire viewport height is utilized, inside `globals.css` add the following code:

style: Use full viewport height for better layout

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html,
body,
:root {
  height: 100%;
}
```

#### TailwindCSS and @layer

- [Using CSS and @layer | TailwindCSS](https://tailwindcss.com/docs/adding-custom-styles#using-css-and-layer)

Tailwind groups styles into *layers* because in CSS, the order of the rules in your stylesheet decides which declaration wins when two selectors have the same specificity: 

```css
.btn {
  background: blue;
  /* ... */
}

.bg-black {
  background: black;
}
```

Here, both buttons will be black since `.bg-black` comes after `.btn` in the CSS:

```tsx
<button class="btn bg-black">...</button>
<button class="bg-black btn">...</button>
```

To manage this, Tailwind organizes the styles it generates into three different "layers" — a concept popularized by [ITCSS](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/#what-is-itcss).

  - The `base` layer is for things like reset rules or default styles applied to plain HTML elements.
  - The `components` layer is for class-based styles that you want to be able to override with utilities.
  - The `utilities` layer is for small, single-purpose classes that should always take precedence over any other styles.

Being explicit about this makes it easier to understand how your styles will interact with each other, and using the `@layer` directive lets you control the final declaration order while still organizing your actual code in whatever way you like.

##### Adding custom utilities in TailwindCSS

- [Adding custom utilities | TailwindCSS](https://tailwindcss.com/docs/adding-custom-styles#adding-custom-utilities)

Add any of your own custom utility classes to Tailwind's utilities layer. This can be useful when there's a CSS feature you'd like to use in your project that Tailwind doesn't include utilities for out of the box.

Let's add a page background gradient utility class named `page-bg-gradient`.

style: Add page-bg-gradient utility class

`app\globals.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  .page-bg-gradient {
    @apply bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800;
  }
}
```

This leverages Tailwind's utility-first principles while allowing us to create reusable and maintainable custom classes.

Now use the custom utility class in the JSX:

refactor: Remove boilerplate code from Home page

- Simplified the Home component by removing unnecessary boilerplate code
- Added the page background gradient utility class

`app\page.tsx`
```tsx
export default function Home() {
  return (
    <main className="page-bg-gradient">
      Home
    </main>
  );
}
```

## AuthIntro component

Let's make the first component `AuthIntro.tsx` file inside `/components`. It will return a heading and a paragraph.

```tsx
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
```

Here are a few improvements to consider:

1. **Semantic HTML**: Use semantic HTML elements like `<header>` and `<section>` to improve accessibility and SEO.
2. **Container Styling**: Add some styling to the container `<div>` to ensure proper spacing and alignment.
3. **Props for Flexibility**: Make the component more flexible by accepting `heading` and `description` as props.

feat: Improve AuthIntro structure & flexibility

- Use semantic HTML elements `<header>` for improved accessibility and SEO
- Introduce props (heading and description) to make the component more flexible
- Update default values for heading and description

```tsx
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
```

Now use `AuthIntro` inside the `Home` page.

feat: Add AuthIntro component to Home page

```tsx
import AuthIntro from "@/components/AuthIntro";

export default function Home() {

  return (
    <section className="flex flex-col items-center justify-center min-h-screen page-bg-gradient">
      <div className="space-y-6">
        <AuthIntro />
      </div>
    </section>
  );
}
```

refactor: Move AuthIntro to /components/auth

- Relocated AuthIntro component for better organization
- Updated import paths accordingly

Principles behind this move:
- Separation of Concerns: Grouping components by functionality
- Scalability: Easier to manage as the project grows
- Reusability: Components can be reused across the application
- Maintainability: Simplifies locating and updating components
- Collaboration: Helps new developers onboard quickly
- Consistency: Ensures a cohesive codebase

## Sign In button

Let's install the [shadcn/ui button component](https://ui.shadcn.com/docs/components/button).

```sh
npx shadcn-ui@latest add button
```

Now create the `SignInButton` component and use it in the home page.

```tsx
import React from 'react';

import { Button } from '@/components/ui/button';

export default function SignInButton() {
  return (
    <Button variant="secondary" size="lg">
      Sign In
    </Button>
  )
}
```

feat: Add SignInButton component to Home page

```tsx
import AuthIntro from "@/components/AuthIntro";
import SignInButton from "@/components/SignInButton";

export default function Home() {

  return (
    <section className="flex flex-col items-center justify-center min-h-screen page-bg-gradient">
      <div className="flex flex-col items-center space-y-6">
        <AuthIntro />
        <SignInButton />
      </div>
    </section>
  );
}
```

refactor: Move SignInButton to /components/auth

- Relocated SignInButton component for better organization
- Updated import paths accordingly

Principles behind this move:
- Separation of Concerns: Grouping components by functionality
- Scalability: Easier to manage as the project grows
- Reusability: Components can be reused across the application
- Maintainability: Simplifies locating and updating components
- Collaboration: Helps new developers onboard quickly
- Consistency: Ensures a cohesive codebase

Made this change so that one can just move the `/components/auth` folder and adapt it into a project with ease.

Now let's create the `SignInButtonProps` interface that contains the `mode` which could either be `"modal"` or `"redirect"`. And a boolean `asChild` prop. When assigning the interface, set the `mode` to `redirect` by default. While here we also add the styles `font-semibold cursor-pointer`.

feat: Define prop types for SignInButton

```tsx
import React from 'react';

import { Button } from '@/components/ui/button';

interface SignInButtonProps {
  asChild?: boolean;
  mode?: "modal" | "redirect";
};

export default function SignInButton({
  asChild,
  mode = "redirect",
}: SignInButtonProps) {
  return (
    <Button
      size="lg"
      variant="secondary"
      className='font-semibold cursor-pointer'
    >
      Sign In
    </Button>
  )
}
```

Then we need to mark the component as `"use client"`, because **Event handlers cannot be passed to Client Component props**. 

Next add a click handler function `handleSignInClick` and assign it the `Button`'s `onClick` prop. The handler will use `useRouter` from `next/navigation` to push the `router` to the `/auth/login` path.

feat: Implement handleSignInClick in SignInButton

- Mark component as "use client"
- Use `useRouter` for navigation
- Implement `handleSignInClick` function to navigate to /auth/login
- Assign `handleSignInClick` to `onClick`

```tsx
"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface SignInButtonProps {
  asChild?: boolean;
  mode?: "modal" | "redirect";
};

export default function SignInButton({
  asChild,
  mode = "redirect",
}: SignInButtonProps) {
  const router = useRouter();

  const handleSignInClick = () => {
    router.push("/auth/login");
  }

  return (
    <Button
      onClick={handleSignInClick}
      size="lg"
      variant="secondary"
      className='font-semibold cursor-pointer'
    >
      Sign In
    </Button>
  )
}
```

#### Arrow functions vs Function declarations

**Note:** Using arrow functions over function declarations for event handlers and callbacks in React. 

  Here are some reasons why an arrow function is used instead of a function declaration:

  1. **Lexical `this` Binding**: Arrow functions do not have their own `this` context. They inherit `this` from the surrounding scope, which can be useful in React components to avoid issues with `this` binding.

  2. **Conciseness**: Arrow functions provide a more concise syntax, making the code shorter and often easier to read.

  3. **Consistency**: Using arrow functions for event handlers and callbacks is a common practice in React, promoting consistency across your codebase.

  4. **Avoiding Rebinding**: With arrow functions, you don't need to worry about rebinding `this` in methods or using `.bind(this)` in the constructor, which can simplify your code.

  Here's a comparison:

  **Arrow Function:**
  ```tsx
  const handleSignInClick = () => {
    console.log("Sign In Button was clicked!");
  };
  ```

  **Function Declaration:**
  ```tsx
  function handleSignInClick() {
    console.log("Sign In Button was clicked!");
  }
  ```

  In this specific case, using an arrow function helps keep the code concise and avoids potential issues with `this` binding, even though `this` isn't directly used in the function.

### Conditional Rendering of Sign In button

In the return statement, let's return a different JSX element when the `mode` is `"modal"`.

feat: Add conditional rendering in SignInButton

- Implement conditional rendering based on `mode` prop
- Add TODO comment for modal functionality
- Render login redirect button by default

```tsx
"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

interface SignInButtonProps {
  asChild?: boolean;
  mode?: "modal" | "redirect";
};

export default function SignInButton({
  asChild,
  mode = "redirect",
}: SignInButtonProps) {
  const router = useRouter();

  const handleSignInClick = () => {
    router.push("/auth/login");
  }

  return (
    <>
      {mode === "modal" ? (
        /* TODO: Implement modal functionality */
        <div>Modal</div>
      ) : (
        /* Render a login redirect button */
        <Button
          onClick={handleSignInClick}
          size="lg"
          variant="secondary"
          className='font-semibold cursor-pointer'
        >
          Sign In
        </Button>
      )}
    </>
  );
}
```

feat: Implement initial design of SignInButton
