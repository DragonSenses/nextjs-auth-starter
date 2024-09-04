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

Next add a click handler function `handleSignInClick` and assign it the `Button`'s `onClick` prop. The handler will use `useRouter` from `next/navigation` to push the `router` to the `/auth/signin` path.

feat: Implement handleSignInClick in SignInButton

- Mark component as "use client"
- Use `useRouter` for navigation
- Implement `handleSignInClick` function to navigate to /auth/signin
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
    router.push("/auth/signin");
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
- Render signin redirect button by default

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
    router.push("/auth/signin");
  }

  return (
    <>
      {mode === "modal" ? (
        /* TODO: Implement modal functionality */
        <div>Modal</div>
      ) : (
        /* Render a sign-in redirect button */
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

## Sign In Page

feat: Create SignInPage component

- Add SignInPage component in `app/auth/signin/page.tsx`
- Initial implementation with basic structure

`app\auth\signin\page.tsx`
```tsx
import React from 'react';

export default function SignInPage() {
  return (
    <div>SignInPage</div>
  )
}
```

refactor: Rename login to signin in pages & routes

- Update route from `/auth/login` to `/auth/signin`
- Rename LoginPage component to SignInPage
- Adjust all references to the new route

This refactor enhances consistency across the application, aligns with common user expectations for authentication flows, and ensures a cohesive user experience.

### AuthLayout

feat: Create AuthLayout component

`app\auth\layout.tsx`
```tsx
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
```

Here we use the `main` tag wrapped by a `div` element. This is so we can later extend this layout to include `header` and `footer` section when needed.

### SignInForm component

Create a react functional component `SignInForm` in `/components/auth`.

`components\auth\SignInForm.tsx`
```tsx
import React from 'react';

export default function SignInForm() {
  return (
    <div>SignInForm</div>
  )
}
```

Then use the `SignInForm` inside `SignInPage`.

feat: Use SignInForm component in SignInPage

`app\auth\signin\page.tsx`
```tsx
import React from 'react';
import SignInForm from '@/components/auth/SignInForm';

export default function SignInPage() {
  return (
    <SignInForm />
  );
}
```

#### CardWrapper component

Install [shadcn/ui card](https://ui.shadcn.com/docs/components/card).

```sh
npx shadcn-ui@latest add card
```

Then create create component `/components/auth/CardWrapper.tsx`. Then create the prop interface and assign it to the component.

feat: Define prop types for CardWrapper

```tsx
"use client";

import React from 'react';

interface CardWrapperProps {
  children: React.ReactNode;
  backButtonHref: string;
  backButtonLabel: string;
  headerLabel: string;
  showSocialSignIn?: boolean;
};

export default function CardWrapper({
  children,
  backButtonHref,
  backButtonLabel,
  headerLabel,
  showSocialSignIn,
}: CardWrapperProps) {
  return (
    <div>CardWrapper</div>
  )
}
```

Return a `Card` as the output of `CardWrapper`

feat: Implement Card component in CardWrapper

```tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function CardWrapper({
 // ...props
}: CardWrapperProps) {
  return (
    <Card className='w-96 shadow-md'>
      {children}
    </Card>
  )
}
```

Then return the `CardWrapper` component as the output of the `SignInForm`.

feat: Use CardWrapper component in SignInForm

```tsx
import React from 'react';
import CardWrapper from '@/components/auth/CardWrapper';

export default function SignInForm() {
  return (
    <CardWrapper>
      SignInForm
    </CardWrapper>
  )
}
```

Now let's pass the prop values to `CardWrapper` to implement the `SignInForm`.

feat: Implement SignInForm using CardWrapper

```tsx
export default function SignInForm() {
  return (
    <CardWrapper
      backButtonHref="/auth/signup"
      backButtonLabel="Don't have an account?"
      headerLabel="Welcome back"
      showSocialSignIn={true}
    >
      SignInForm
    </CardWrapper>
  );
}
```

#### AuthHeader component

Now before we improve the `CardWrapper` component, we need to create a reusable component to display the header. Create the `AuthHeader` component, which will have a prop `label` and optional prop `heading`.

feat: Define prop types for AuthHeader component

```tsx
import React from 'react';

interface AuthHeaderProps {
  heading?: string;
  label: string;
};

export default function AuthHeader({
  heading = "Auth 🛡️",
  label,
}: AuthHeaderProps) {
  return (
    <div>
      AuthHeader
    </div>
  )
}
```

Then update the output with the `heading` and `label`.

feat: Implement AuthHeader with dynamic props

This commit adds the AuthHeader component, which accepts two props:
- `heading` (optional): The main heading for the authentication section.
- `label`: The label or description for the authentication content.

```tsx
import React from 'react';

interface AuthHeaderProps {
  heading?: string;
  label: string;
};

export default function AuthHeader({
  heading = "Auth 🛡️",
  label,
}: AuthHeaderProps) {
  return (
    <div className='w-full flex flex-col items-center justify-center gap-y-4'>
      <h1 className='text-3xl font-semibold'>
        {heading}
      </h1>
      <p className='text-sm text-muted-foreground'>
        {label}
      </p>
    </div>
  )
}
```

Now we can use the `AuthHeader` inside the `CardWrapper`'s `CardHeader`. While here we can also wrap the `children` by the `CardContent`.

feat: Use AuthHeader component in CardWrapper

```tsx
import AuthHeader from '@/components/auth/AuthHeader';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface CardWrapperProps {
  children: React.ReactNode;
  backButtonHref: string;
  backButtonLabel: string;
  headerLabel: string;
  showSocialSignIn?: boolean;
};

export default function CardWrapper({
  children,
  backButtonHref,
  backButtonLabel,
  headerLabel,
  showSocialSignIn,
}: CardWrapperProps) {
  return (
    <Card className='w-96 shadow-md'>
      <CardHeader>
        <AuthHeader label={headerLabel} />
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  )
}
```

#### SocialSignIn component

feat: Create SocialSignIn component

```tsx
import React from 'react';

export default function SocialSignIn() {
  return (
    <div className='w-full flex items-center gap-x-2'>
      SocialSignIn
    </div>
  );
}
```

Next we need the SVG assets to display social sign in, OAuth2 for Github and Google.

##### SVG assets

feat: Add SVG assets for auth in /public/img/auth

This commit adds the necessary SVG files for authentication-related components. The SVGs are located in the /public/img/auth folder.

Let's get a few icons we need for the social login. You can install [`react-icons`](https://react-icons.github.io/react-icons/) package directly or manually add the specific icions from a smaller icon library using inline SVG icons. This way we can keep the bundle size smaller and avoid unecessary dependencies.

The icons to get are `FaGithub` and `FcGoogle` from react-icons. To add the icon files locally, inside the `public` folder, create the `/img/auth` folder. Then within create the name of the icon, e.g., `github.svg` and inside input the svg code. We can find this on the [website](https://react-icons.github.io/react-icons/search/#q=github) and inspect element on the icon you want and edit the SVG.

You can also use other icon libraries such as [Flaticon](https://www.flaticon.com/free-icons/library), [Iconoir](https://iconoir.com/) or [Icons8](https://icons8.com/icons/).

Now to use the SVG assets we can either use `Image` from `next/image` or Import SVGs as React components.

1. **Embed SVGs using JSX syntax in a React component**:
   - You can directly import an SVG file and use it as a React component. For example:
     ```tsx
     import { ReactComponent as MyIcon } from '../path/to/MyIcon.svg';

     // Usage:
     <MyIcon />
     ```
   - Make sure your SVG files are located in a folder (e.g., `public/img`) accessible to Next.js.

2. **Load SVGs using the `next/image` component**:
   - The `next/image` component optimizes image loading, including SVGs.
   - Place your SVGs in the `public` folder.
   - Use the `next/image` component like this:
     ```tsx
     import Image from 'next/image';

     // Usage:
     <Image src="/img/MyIcon.svg" alt="My Icon" width={100} height={100} />
     ```

##### Handling SVGs in a Next.js application

docs: Explore SVG asset handling in Next.js

Let's explore the benefits of using both methods for handling SVGs in a Next.js application:

1. **Using `next/image`**:
   - **Optimization**: The `next/image` component is primarily designed for raster images, but it can also handle SVGs. It provides benefits like **lazy loading**, automatic image optimization, and responsive image loading.
   - **Lazy Loading**: With `next/image`, SVGs are loaded lazily, improving page load performance by only fetching the image when it's needed.
   - **Automatic Optimization**: `next/image` optimizes images based on the device and screen size, reducing the overall bundle size.
   - **Accessibility**: It ensures proper accessibility attributes for images.
   - **Consistency**: If your project already uses `next/image` for other images, using it for SVGs maintains consistency.

2. **Importing SVGs as React Components**:
   - **Resolution Independence**: SVGs are resolution-independent, meaning they can be scaled up or down without losing quality. This is useful for responsive designs.
   - **Direct Usage**: You can import an SVG file as a React component using the `ReactComponent` syntax and render it directly in JSX. No need for additional conversion or data URLs.
   - **Customization**: As React components, SVGs can be easily customized with props or CSS.
   - **SEO-Friendly**: Search engines can index and crawl SVGs, making them SEO-friendly.
   - **Animation and Interaction**: SVGs can be animated and manipulated using CSS and JavaScript.

In summary, if you need lazy loading and automatic optimization, consider using `next/image`. If you prefer direct customization and resolution independence, importing SVGs as React components is a great choice. Choose the method that best fits your project's requirements.

##### Create SocialSignIn component

We can create the SVG icon by converting it into a react component. Then we can use the SVG component like this:

```tsx
import React from 'react';

import GithubIcon from '@/public/img/auth/GitHubIcon';
import GoogleIcon from '@/public/img/auth/GoogleIcon';

export default function SocialSignIn() {
  return (
    <div className='w-full flex items-center gap-x-2'>
      <GithubIcon />
      <GoogleIcon />
    </div>
  );
}
```

Or we can use `next/image` and use the `svg` file directly.

Now for the output of `SocialSignIn` return a `Button` that wraps around an SVG asset.

feat: Add Google social sign-in button

```tsx
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
```

Here is an alternative way using `Image` component:

```tsx
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function SocialSignIn() {
  return (
    <div className='w-full flex items-center gap-x-2'>
      <Button
        size='lg'
        className='w-full'
        variant='outline'
      >
        <Image 
          src='/img/auth/google2.svg'
          width={20}
          height={20}
          alt='Google Icon to sign in with Google'
        />
      </Button>
    </div>
  );
}
```

Now here is an example SVG converted to JSX component to be used as an icon.

feat: Create GoogleColoredIcon SVG component

Create a new React component named GoogleColoredIcon that renders an SVG with the specified path data. Pass any additional props to the SVG element. SVG file comes from [react-icons](https://react-icons.github.io/react-icons/).

Source: https://github.com/react-icons/react-icons

`public\img\auth\GoogleColoredIcon.tsx`
```tsx
import React from "react";

const GoogleColoredIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="200"
    height="200"
    x="0"
    y="0"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="0"
    viewBox="0 0 48 48"
    {...props} // Pass any additional props to the SVG

  >
    {/* path data */}
    <path
      fill="#FFC107"
      d="..."
      stroke="none"
    ></path>
    <path
      fill="#FF3D00"
      d="..."
      stroke="none"
    ></path>
    <path
      fill="#4CAF50"
      d="..."
      stroke="none"
    ></path>
    <path
      fill="#1976D2"
      d="..."
      stroke="none"
    ></path>
  </svg>
);

export default GoogleColoredIcon;
```

###### Add Google social sign-in button

Now use `GoogleColoredIcon` in the `SocialSignIn`.

feat: Update Google icon in SocialSignIn component

```tsx
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
```

###### Add Github social sign-in button

feat: Add GitHub social sign-in button

```tsx
import React from 'react';

import GitHubIcon from '@/public/img/auth/GitHubIcon';
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
      <Button
        size='lg'
        className='w-full'
        variant='outline'
      >
       <GitHubIcon className='h-5 w-5' />
      </Button>
    </div>
  );
}
```

#### Add SocialSignIn in CardWrapper component

feat: Add SocialSignIn in CardWrapper component

Conditionally render the SocialSignIn component within the CardWrapper. This component handles social sign-in functionality.

```tsx
import SocialSignIn from '@/components/auth/SocialSignIn';

export default function CardWrapper({
  children,
  backButtonHref,
  backButtonLabel,
  headerLabel,
  showSocialSignIn = true,
}: CardWrapperProps) {

  return (
    <Card className='w-96 shadow-md'>
      <CardHeader>
        <AuthHeader label={headerLabel} />
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      {showSocialSignInSignIn && (
        <CardFooter>
          <SocialSignIn />
        </CardFooter>
      )}
    </Card>
  )
}
```

#### BackButton component

Create the `BackButton` component.

feat: Define prop types for BackButton component

```tsx
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
```

We want to put a `Link` inside, but a `Button` and a `Link` serves different purposes! This will come across a difference of expectations for users and accessibility issues. Instead we have two ways to display a `Link` with `Button`-like styles, as we want here. According to the [Button | shadcn/ui docs](https://ui.shadcn.com/docs/components/button): 

  1. We can use the `buttonVariants` helper to create a link that looks like a button.
    ```tsx
    import { buttonVariants } from "@/components/ui/button"
    <Link className={buttonVariants({ variant: "outline" })}>Click here</Link>
    ```
  2. Alternatively, you can set the `asChild` parameter and nest the link component.
    ```tsx
    <Button asChild>
     <Link href="/login">Login</Link>
    </Button>
    ```

For clarity, I will use the the `buttonVariants` to make it clear that we are simply using the styles of the `Button`.

refactor: Update BackButton component to use Link

This commit refactors the BackButton component to utilize the Next.js Link component for navigation. The 'href' prop specifies the link destination, and the 'label' prop sets the button text. The styling remains consistent with shadcn/ui.

```tsx
import React from 'react';
import Link from 'next/link';

import { buttonVariants } from "@/components/ui/button"
import { cn } from '@/lib/utils';

interface BackButtonProps {
  href: string;
  label: string;
};

export default function BackButton({
  href,
  label,
}: BackButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        'font-normal w-full text-primary underline-offset-4 hover:underline',
        buttonVariants({ size: "sm" }),
        buttonVariants({ variant: "destructive" }),
      )}
    >
      {label}
    </Link>
  );
}
```

Now use `BackButton` in `CardWrapper`.

feat: Add BackButton component in CardWrapper

```tsx
import BackButton from '@/components/auth/BackButton';

export default function CardWrapper({
  children,
  backButtonHref,
  backButtonLabel,
  headerLabel,
  showSocialSignIn,
}: CardWrapperProps) {

  return (
    <Card className='w-96 shadow-md'>
      <CardHeader>
        <AuthHeader label={headerLabel} />
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      {showSocialSignInSignIn && (
        <CardFooter>
          <SocialSignIn />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton 
          href={backButtonHref}
          label={backButtonLabel}
        />
      </CardFooter>
    </Card>
  )
}
```

## SignIn Form

- [Input | shadcn/ui](https://ui.shadcn.com/docs/components/input)

```sh
npx shadcn-ui@latest add input
```

- [Form | shadcn/ui](https://ui.shadcn.com/docs/components/form)

Time to build the form with React Hook Form and Zod.

```sh
npx shadcn-ui@latest add form
```

Let's check out what the command installed:

feat: Add form dependencies (react-hook-form, zod)

Dependencies:
- @hookform/resolvers@3.9.0
- @radix-ui/react-label@2.1.0
- react-hook-form@7.52.1
- zod@3.23.8

```json
  "dependencies": {
    "@hookform/resolvers": "^3.9.0",
    "@radix-ui/react-label": "^2.1.0",
    // ...
    "react-hook-form": "^7.52.1",
    "zod": "^3.23.8"
  },
```

### Create a Form (with react-hook-form and zod)

1. **Create a Form Schema**:
   - Define the shape of your form using a **Zod schema**. This schema will specify the expected structure of your form data.
   - Example:
     ```ts
     import { z } from "zod";

     const formSchema = z.object({
       username: z.string().min(2).max(50),
       email: z.string().email(),
       // Add other form fields here
     });
     ```

2. **Define a Form**:
   - Use the `useForm` hook from **react-hook-form** to create a form instance.
   - Set up form validation, default values, and other configuration options.
   - Example:
     ```tsx
     "use client"
     import { zodResolver } from "@hookform/resolvers/zod"
     import { useForm } from "react-hook-form";
     import { z } from "zod"

     const formSchema = z.object({
       username: z.string().min(2).max(50),
       email: z.string().email(),
       // Add other form fields here
     });

     function MyForm() {
       const form = useForm<z.infer<typeof formSchema>>({
         resolver: zodResolver(formSchema),
         defaultValues: {
           username: "",
           email: "",
           // Set other default values
         },
       });

       // Handle form submission, field validation, etc.
       // ...
     }
     ```

3. **Build the Form**:
   - Use the `<Form>` components (provided by your UI library) to build your form.
   - Include form fields, labels, error messages, and any other necessary components.
   - Example:
     ```tsx
     import { Form, FormField, FormSubmitButton } from "@radix-ui/react-form";

     function MyForm() {
       // ...

       return (
         <Form onSubmit={form.handleSubmit(onSubmit)}>
           <FormField label="Username" name="username" ref={form.register} />
           <FormField label="Email" name="email" ref={form.register} />
           {/* Add other form fields */}
           <FormSubmitButton>Submit</FormSubmitButton>
         </Form>
       );
     }
     ```

#### Create a form example

Here's the example from the [docs](https://ui.shadcn.com/docs/components/form).

1. Create a form schema

Define the shape of your form using a Zod schema. You can read more about using Zod in the [Zod documentation](https://zod.dev/).

```tsx
"use client"

import { z } from "zod"

const formSchema = z.object({
  username: z.string().min(2).max(50),
})
```

2. Define a form

Use the `useForm` hook from `react-hook-form` to create a form.

```tsx
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

export function ProfileForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
}
```

Since `FormField` is using a controlled component, you need to provide a default value for the field. See the [React Hook Form](https://react-hook-form.com/docs/usecontroller) docs to learn more about controlled components.

3. Build your form

We can now use the `<Form />` components to build our form.

```tsx
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

export function ProfileForm() {
  // ...

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
```

4. Done

That's it. You now have a fully accessible form that is type-safe with client-side validation.

### Build the SignIn form

Create a global `schemas` folder, with a `index.ts` which will contain our schemas. This will serve as a centralized location for form validation and other schemas.

1. Create a form schema

The `LoginSchema` will have an `email` and a `password`.

feat: Define SignIn schema using zod

`schemas\index.ts`
```ts
import { z } from "zod"

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});
```

2. Define a form

Use the `useForm` hook from `react-hook-form` to create a form.

Inside the `SignInForm` component, let's import what we need and define the form.

feat: Define the sign-in form with useForm hook

- Mark as client component
- Import zodResolver, useForm, z, and SignInSchema
- Implement the sign-in form logic

`components\auth\SignInForm.tsx`
```tsx
"use client";

import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { SignInSchema } from '@/schemas';
import CardWrapper from '@/components/auth/CardWrapper';

export default function SignInForm() {

  // 1. Define the sign-in form.
  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <CardWrapper
      backButtonHref="/auth/signup"
      backButtonLabel="Don't have an account?"
      headerLabel="Welcome back"
      showSocialSignIn={true}
    >
      SignInForm
    </CardWrapper>
  );
}
```

After defining the sign-in form, define the submit handler which will log the values.

feat: Define the sign-in submit handler

```tsx
import { SignInSchema } from '@/schemas';

export default function SignInForm() {

  // 1. Define the sign-in form.
  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof SignInSchema>) {
    // Do something with the form values.
    // This will be type-safe and validated.
    console.log(values)
  }

  // ...
```

Then we can now build the form in the output by using `<Form />` components. Inside the `CardWrapper` add the `Form` and a native `form` element within. The `Form` component will spread out the values contained within the form made from the `useForm` hook from `react-hook-form`. The `form` element will have the `onSubmit` set to the `form.handleSubmit(onSubmit)`. Finally, render an `Input` and `Button` component within the `form` element.

feat: Add form components for SignInForm

feat(auth): Create initial layout for SignInForm

feat(auth): Handle form submission in SignInForm

```tsx
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function SignInForm() {

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof SignInSchema>) {
    console.log(values)
  }

  return (
    <CardWrapper
      backButtonHref="/auth/signup"
      backButtonLabel="Don't have an account?"
      headerLabel="Welcome back"
      showSocialSignIn={true}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Input />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
```

Before adding the input fields let's create a `div` container for them with the styles `space-y-4`. Then right below the input field container `div` we can add the submit button.

feat: Implement submit button in SignInForm

feat(auth): Add sign-in submit button

```tsx
// ...
export default function SignInForm() {
  // ...
  return (
    <CardWrapper>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className='space-y-4'>
            { /* Input fields */ }
          </div>
          <Button type="submit" className='w-full bg-sky-500'>
            Sign In
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
```

#### SignInForm input fields

Now we need to add our inputs: email and password.

##### SignInForm email form field

feat(auth): Create email input field in SignInForm

```tsx
// ...
export default function SignInForm() {
  // ...
  return (
    <CardWrapper
      backButtonHref="/auth/signup"
      backButtonLabel="Don't have an account?"
      headerLabel="Welcome back"
      showSocialSignIn={true}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type='email' placeholder="Enter your email address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
}
```

##### SignInForm input field validation

feat: Add validation error handling in SignInForm

We can now test the email input field. Notice that when it validates it renders a `<FormMessage />` which displays the text "invalid email" below the `FormField`. We can change the validation error message through the zod schema by adding an object containing the `message` inside the `email()`.

feat: Add email validation error message in schema

`schemas\index.ts`
```ts
import { z } from "zod"

export const SignInSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address."
  }),
  password: z.string().min(1),
});
```

Let's also add the validation error message for the password as well, we can add it to the `min()`.

feat: Add password validation error message

`schemas\index.ts`
```ts
import { z } from "zod"

export const SignInSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address."
  }),
  password: z.string().min(1, {
    message: "Password must be at least 14 characters long."
  }),
});
```

###### Strengthen password requirements

docs: Add robust password requirements

Note: I've chosen a minimum password length of 14 characters, prioritizing user security and safety. It may seem user-unfriendly but is done with an abundance of caution.

- [How long should my password be? | Bitwarden](https://bitwarden.com/blog/how-long-should-my-password-be/)

While here let's also strengthen the password requirements. According to the [NIST: National Institute of Standards and Technology](https://bitwarden.com/blog/3-tips-from-nist-to-keep-passwords-secure/), password length has been found to be a primary factor in characterizing password strength.

To strengthen the security of your online information, ensure your passwords are a random mix of at least 14 to 16 characters.

Password Length | Time to Crack
----------------|--------------
14-16 characters | centuries
11-13 | months to years
8-10 | hours to days
5-7 | seconds to minutes

**Password requirements:**

- 14-16 characters long
- Contain at least one character from the four character sets:
  1. Numerical characters such as 12345
  2. Lowercase characters such as abcde
  3. Uppercase characters such as ABCDE
  4. Special characters such as !$%&?

To add uppercase and lowercase letter requirements, as well as a special character requirement to the `SignInSchema`, refine the validation for the `password` field. Here's the updated schema:

feat(SignInSchema): Strengthen password validation

- Increase minimum length to 14 characters
- Set maximum length to 32 characters
- Enforce requirements for at least one of each: an uppercase letter, a lowercase letter, a number, and a special character.
- Ensure password is not empty

```ts
import { z } from 'zod';

export const SignInSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  password: z
    .string()
    .min(14, 'Password must be at least 14 characters long')
    .max(32, 'Password must be a maximum of 32 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={[}]|:;\"'<,>.])[A-Za-z\d!@#$%^&*()_+={[}]|:;\"'<,>.]{14,}$/)
    .refine((value) => value.length > 0, {
      message: 'Password is required',
    }),
});
```

In the updated schema:
- The `.regex(...)` method enforces the requirements for at least one uppercase letter, one lowercase letter, one number, and one special character.
- The `.refine(...)` method ensures that the password is not empty.

1. **Minimum Length**: Set a minimum length of 14 characters for the password, which is a good practice to enhance security.

2. **Maximum Length**: Capped the maximum length at 32 characters, preventing excessively long passwords.

3. **Regex Pattern**:
   - Regex pattern ensures that the password contains at least one lowercase letter (`(?=.*[a-z]`)), one uppercase letter (`(?=.*[A-Z]`)), one digit (`(?=.*\d)`), and one special character (`(?=.*[!@#$%^&*()_+={[}]|:;\"'<,>.])`).
   - It allows any combination of these characters, as long as the total length is within the specified range.

4. **Refinement**:
   - Added a refinement to ensure that the password length is greater than zero (`value.length > 0`), which is essential for a required field.

Need to add an error message to clearly communicate to the users the password requirements.

feat: Improve password requirement communication

Added clear instructions to the error message in the `SignInSchema` regex pattern, ensuring users understand the required criteria for their password.

```ts
import { z } from 'zod';

export const SignInSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  password: z
    .string()
    .min(14, 'Password must be at least 14 characters long')
    .max(32, 'Password must be a maximum of 32 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={[}]|:;\"'<,>.])[A-Za-z\d!@#$%^&*()_+={[}]|:;\"'<,>.]{14,}$/, {
      message: 'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character.',
    })
    .refine((value) => value.length > 0, {
      message: 'Password is required',
    }),
});
```

##### SignInForm password form field

Now add the input form field for the password.

feat(auth): Add password input field in SignInForm

```tsx
// ...
export default function SignInForm() {
  // ...
  return (
    <CardWrapper
      backButtonHref="/auth/signup"
      backButtonLabel="Don't have an account?"
      headerLabel="Welcome back"
      showSocialSignIn={true}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className='space-y-4'>
            <FormField 
              { /* email input field... */ }
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type='password' placeholder="**************" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
}
```

## Form components

Now I want to display feedback messages to the user in the sign-in form. The `FormError` and `FormSuccess` components will receieve a message prop (feedback message) and render it appropriately with the relevant styles.

Create these components in a new folder `/components/form`.

### FormError component

The `FormError` will contain the `message` prop, which will be used to conditionally render the output.

feat: Define prop types for FormError component

`components\form\FormError.tsx`
```tsx
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
```

Now render the `FormError` above the submit button in the `SignInForm`.

feat: Render FormError component in SignInForm

```tsx
import FormError from '@/components/form/FormError';
// ...
export default function SignInForm() {
  // ...
  return (
    <CardWrapper
      backButtonHref="/auth/signup"
      backButtonLabel="Don't have an account?"
      headerLabel="Welcome back"
      showSocialSignIn={true}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className='space-y-4'>
            <FormField
              // email form field
            />
            <FormField
              // password form field
            />
          </div>

          <FormError />

          <Button type="submit" className='w-full bg-sky-500'>
            Sign In
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
```

Now back in the `FormError` component, render the output if the `message` is truthy otherwise render null.

feat: Conditionally render FormError component

- Added conditional rendering logic to display error messages in the FormError component.
- Incorporated the ShieldAlert icon from the 'lucide-react' library
- Styled the error message container for better visibility and better convey its purpose

```tsx
import { ShieldAlert } from 'lucide-react';
import React from 'react';

interface FormErrorProps {
  message?: string;
}

export default function FormError({
  message,
}: FormErrorProps) {
  return message ? (
    <div className="flex items-center p-3 gap-x-2 bg-destructive/15 text-destructive text-sm rounded-md">
      <ShieldAlert className='h-4 w-4' />
      <p>{message}</p>
    </div>
  ) : null;
}
```

### FormSuccess component

Using the same logic as the `FormError` component, the only changes are the icons and colors (from destructive to emerald-500).

feat: Conditionally render FormSuccess component

- Added conditional rendering logic to display success messages in the FormSuccess component.
- Incorporated the ShieldCheck icon from the 'lucide-react' library
- Styled the message container for better visibility and clearly convey its purpose

```tsx
import { ShieldCheck } from 'lucide-react';
import React from 'react';

interface FormSuccessProps {
  message?: string;
}

export default function FormSuccess({
  message,
}: FormSuccessProps) {
  return message ? (
    <div className="flex items-center p-3 gap-x-2 bg-emerald-500/15 text-emerald-500 text-sm rounded-md">
      <ShieldCheck className='h-4 w-4' />
      <p>{message}</p>
    </div>
  ) : null;
}
```

feat: Render FormSuccess component in SignInForm

```tsx
import FormSuccess from '@/components/form/FormSuccess';
// ...
export default function SignInForm() {
  // ...
  return (
    <CardWrapper
      backButtonHref="/auth/signup"
      backButtonLabel="Don't have an account?"
      headerLabel="Welcome back"
      showSocialSignIn={true}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className='space-y-4'>
            <FormField
              // email form field
            />
            <FormField
              // password form field
            />
          </div>

          <FormError />
          <FormSuccess />
          <Button type="submit" className='w-full bg-sky-500'>
            Sign In
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
```

Now we can view the `FormError` and `FormSuccess` components by passing in a `message` prop.

```tsx
          <FormError message='Email already taken!'/>
          <FormSuccess message='Email sent!'/>
```

## Server Actions

- [Server Actions and Mutations | Nextjs docs](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)

Server Actions are asynchronous functions that are executed on the server. They can be used in Server and Client Components to handle form submissions and data mutations in Next.js applications.

Create an `/actions` folder at the root of the project with a file named `signIn.ts`.

Inside has a function `signIn` that takes in `values` parameter and `console.log(values)`. Let's import what `z` and `SignInSchema` to be ensure type safety and validation `values`.

feat(signIn): Add type safety and validation

- Validate input using zod schema
- Ensure proper type inference for 'values'

`actions\signIn.ts`
```ts
"use server";

import { z } from "zod";
import { SignInSchema } from "@/schemas";

export default function signIn(values: z.infer<typeof SignInSchema>) {
  console.log(values);
}
```

Now inside our `SignInForm` we can import the server action and call it within the submit handler.

feat: Execute signIn server action in SignInForm

`components\auth\SignInForm.tsx`
```tsx
import signIn from '@/actions/signIn';

export default function SignInForm() {

  // 1. Define the sign-in form.
  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof SignInSchema>) {
    // Do something with the form values.
    // This will be type-safe and validated.
    console.log(values);
    // Execute the user sign-in server action
    signIn(values);
  }
```

On submit button press we should be able to see the values logged on the server (inside the terminal).

Note: An alternative to server action is through API routes. Here is how it would look like in the submit handler:

```tsx
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof SignInSchema>) {
    console.log(values);
    axios.post("/some/api/route", values)
      .then()
      .catch(); 
  }
```

### useTransition hook

[`useTransition`](https://react.dev/reference/react/useTransition) is a React Hook that lets you update the state without blocking the UI.

```jsx
const [isPending, startTransition] = useTransition()
```

The `useTransition` hook in React aims to address the issue of UI responsiveness during asynchronous operations, such as data fetching or form submissions. It allows you to create smooth transitions between different UI states, like showing a loading spinner while waiting for data or displaying a success message after form submission.

Here's how it works:

1. **Smooth Transitions**: When you use `useTransition`, React will delay the rendering of the new UI state until the transition is complete. This prevents abrupt changes and provides a smoother experience for users.

2. **Graceful Loading States**: You can use `useTransition` to handle loading states elegantly. For example, when fetching data from an API, you can show a loading spinner while transitioning from the current UI to the loading state.

3. **Optimized Rendering**: By delaying the rendering of new UI elements, `useTransition` helps avoid unnecessary re-renders. This optimization can improve performance, especially when dealing with complex components.

Note that `useTransition` is part of React's Concurrent Mode, which is still experimental. But it's exciting to see how it evolves and becomes more widely adopted.

#### Add useTransition to sign-in server action

Now let's wrap the server action call inside the submit handler with a `useTransition`.

feat: Add useTransition hook for form submission

- Use useTransition to handle asynchronous form submission
- Execute the user sign-in server action within the transition

```tsx
import React, { useTransition } from 'react';

export default function SignInForm() {
  const [isPending, startTransition] = useTransition();

  function onSubmit(values: z.infer<typeof SignInSchema>) {
    console.log(values);
    startTransition(() => {
      signIn(values);
    });
  }
```

Use the `isPending` to disable the components (inputs). While here, also add `aria-label` to the inputs to improve accessibility.

feat: Add aria-labels on inputs for accessibility

feat: Disable inputs and button while form pending

```tsx
export default function SignInForm() {
  const [isPending, startTransition] = useTransition();

  // 1. Define the sign-in form.
  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof SignInSchema>) {
    console.log(values);
    startTransition(() => {
      signIn(values);
    });
  }

  return (
    <CardWrapper
      backButtonHref="/auth/signup"
      backButtonLabel="Don't have an account?"
      headerLabel="Welcome back"
      showSocialSignIn={true}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type='email'
                      placeholder="Enter your email address"
                      aria-label="Email address"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      placeholder="**************"
                      aria-label="Password"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError />
          <FormSuccess />
          <Button
            type="submit"
            disabled={isPending}
            className='w-full bg-sky-500'
          >
            Sign In
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
```

### Validating fields in the server

Field validation refers to the process of ensuring that user input meets specific criteria or constraints. When building forms or collecting data from users, validating fields helps maintain data integrity and prevents incorrect or malicious input. Here are some common aspects of field validation:

1. **Data Type Validation**:
   - Ensuring that the input matches the expected data type (e.g., numbers, dates, strings).
   - For example, validating that an age field contains a numeric value.

2. **Required Fields**:
   - Marking certain fields as mandatory, so users must provide valid input.
   - For instance, a sign-up form might require an email address.

3. **Length Constraints**:
   - Checking if input length falls within acceptable limits (e.g., minimum and maximum characters).
   - Verifying that a password meets complexity requirements.

4. **Format Validation**:
   - Validating input based on specific patterns (e.g., email addresses, phone numbers, URLs).
   - Ensuring that an email field contains a valid email format.

5. **Range Validation**:
   - Verifying that numeric input falls within a specified range (e.g., age between 18 and 99).
   - Checking if a date input is within a valid date range.

6. **Custom Rules**:
   - Implementing custom validation logic based on business rules or specific use cases.
   - For example, ensuring that a username is unique in a database.

Now let's implement the signIn server action.

We will use zod's [safeParse](https://zod.dev/?id=safeparse) method to validate the fields within the `SignInSchema`. The method returns an object containing either the successfully parsed data or a ZodError instance containing detailed information about the validation problems.

After using `safeParse(values)`, return an object with either a success or an error message.

feat: Validate user sign-in data using schema

`actions\signIn.ts`
```ts
"use server";

import { z } from "zod";
import { SignInSchema } from "@/schemas";

/**
 * Validates user sign-in data using the provided schema.
 *
 * @param values - User input data to validate.
 * @returns An object with either a success message or an error message.
 */
export default async function signIn(values: z.infer<typeof SignInSchema>) {
  console.log(values);

  const parsedValues = SignInSchema.safeParse(values);

  if (!parsedValues.success) {
    return {
      error: "Invalid fields!",
    };
  }

  return {
    success: "Sign in successful!",
  };
}
```

### Display success or error message in SignInForm.

Now in the `SignInForm`, add two states: `successMessage` and `errorMessage`.

feat: Handle sign-in response in SignInForm

- Display success message when sign-in is successful.
- Show error message when sign-in fails due to invalid fields.

feat: Show sign-in validation messages in the form

- Reset success and error messages before executing the sign-in server action.
- Pass success and error messages to relevant components for display.
- Helps the user understand the outcome of their sign-in attempt

```tsx
import React, { useState, useTransition } from 'react';

export default function SignInForm() {
  const [successMessage, setSuccessMessage] = useState<string | undefined>("");
  const [errorMessage, setErrorMessage] = useState<string | undefined>("");

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof SignInSchema>) {
    console.log(values);
    // Reset success and error messages before sign-in server action
    setSuccessMessage("");
    setErrorMessage("");
    // Handle form submission:
    //    - Validate the form values (type-safe and validated).
    //    - Execute the user sign-in server action.
    startTransition(() => {
      // Execute the user sign-in server action
      signIn(values)
        .then((data) => {
          // Update success or error messages based on the server response
          setSuccessMessage(data.success);
          setErrorMessage(data.error);
        });
    });
  }

  return ( 
    <CardWrapper>
      <Form {...form}>
        { /* FormFields, Inputs... */}
          <FormError message={errorMessage} />
          <FormSuccess message={successMessage} />
        { /* Submit Button... */}
      </Form>
    </CardWrapper>
  );
}
```

## Sign-Up page

Create the sign-up page: `/app/auth/signup/page.tsx`.

feat: Create SignUpPage component

```tsx
import React from 'react';

export default function SignUpPage() {
  return (
    <div>SignUpPage</div>
  )
}
```

## SignUpSchema

Similar to `SignInSchema`, with just another added field of username

feat: Define sign-up schema using zod

```ts
import { z } from 'zod';

export const SignUpSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  password: z
    .string()
    .min(14, 'Password must be at least 14 characters long')
    .max(32, 'Password must be a maximum of 32 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={[}]|:;\"'<,>.])[A-Za-z\d!@#$%^&*()_+={[}]|:;\"'<,>.]{14,}$/, {
      message: 'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character.',
    })
    .refine((value) => value.length > 0, {
      message: 'Password is required',
    }),
  username: z.string().min(1, {
    message: 'Please enter a valid username',
  }),
});
```
 
Notice that both `SignInSchema` and `SignUpSchema` both share password validation. We can create a shared schema named `PasswordSchema` to avoid reuse of validation rules (DRY - Don't Repeat Yourself). This also makes it easier to discern from a glance what is validation rules are different in a schema.

refactor: Improve password validation schema

```ts
import { z } from 'zod';

const PasswordSchema = z
  .string()
  .min(14, 'Password must be at least 14 characters long')
  .max(32, 'Password must be a maximum of 32 characters')
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={[}]|:;\"'<,>.])[A-Za-z\d!@#$%^&*()_+={[}]|:;\"'<,>.]{14,}$/, {
    message: 'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character.',
  })
  .refine((value) => value.length > 0, {
    message: 'Password is required',
  });

export const SignInSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  password: PasswordSchema,
});

export const SignUpSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  password: PasswordSchema,
  username: z.string().min(1, {
    message: 'Please enter a valid username',
  }),
});
```

## Sign-Up Form

Now build the register or `SignUpForm` component.

```tsx
import React from 'react';

export default function SignUpForm() {
  return (
    <div>SignUpForm</div>
  )
}
```

Let's follow the steps on building a form with `react-hook-form` and `zod`.

1. **Create a Form Schema**:
   - Define the shape of your form using a **Zod schema**. This schema will specify the expected structure of your form data.

2. **Define a Form**:
   - Use the `useForm` hook from **react-hook-form** to create a form instance.
   - Set up form validation, default values, and other configuration options.

3. **Build the Form**
   - Use the `<Form>` components (provided by your UI library) to build your form.
   - Include form fields, labels, error messages, and any other necessary components.

### 1. Create a SignUp form schema

1. **Create a Form Schema**:
   - Define the shape of your form using a **Zod schema**. This schema will specify the expected structure of your form data.

feat: Define sign-up schema using zod

```tsx
import { z } from 'zod';

const PasswordSchema = z
  .string()
  .min(14, 'Password must be at least 14 characters long')
  .max(32, 'Password must be a maximum of 32 characters')
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={[}]|:;\"'<,>.])[A-Za-z\d!@#$%^&*()_+={[}]|:;\"'<,>.]{14,}$/, {
    message: 'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character.',
  })
  .refine((value) => value.length > 0, {
    message: 'Password is required',
  });

export const SignUpSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  password: PasswordSchema,
  username: z.string().min(1, {
    message: 'Please enter a valid username',
  }),
});
```

### 2. Define a SignUp form instance

2. **Define a Form**:
   - Use the `useForm` hook from **react-hook-form** to create a form instance.
   - Set up form validation, default values, and other configuration options.

feat: Define the sign-up form with useForm hook

- Mark as client component
- Import zodResolver, useForm, z, and SignInSchema
- Use the `useForm` hook from "react-hook-form" to create a form instance.
- Set up form validation, default values, and other configuration options.

```tsx
"use client";

import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { SignUpSchema } from '@/schemas';

export default function SignUpForm() {

  // 1. Define the sign-up form.
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  return (
    <div>SignUpForm</div>
  )
}
```

### 2.5 Define a submit handler for sign-up page

While here we can also define the submit handler, which has the same logic as the `SignInPage`. But with a different server action: `signUp`.

feat: Create signUp server action to validate data

`actions\signUp.ts`
```ts
"use server";

import { z } from "zod";
import { SignUpSchema } from "@/schemas";

/**
 * Validates user sign-up data using the provided schema.
 *
 * @param values - User input data to validate.
 * @returns An object with either a success message or an error message.
 */
export default async function signUp(values: z.infer<typeof SignUpSchema>) {
  console.log(values);

  const parsedValues = SignUpSchema.safeParse(values);

  if (!parsedValues.success) {
    return {
      error: "Invalid fields!",
    };
  }

  return {
    success: "Sign up successful!",
  };
}
```

feat: Implement sign-up form submission handler

- Integrate useState and useTransition hooks from React
- Manage successMessage and errorMessage states
- Initialize isPending flag for smoother transitions
- Implement form submission handler for sign-up page

```tsx
import React, { useState, useTransition } from 'react';

import signUp from '@/actions/signUp';

export default function SignUpForm() {
  const [successMessage, setSuccessMessage] = useState<string | undefined>("");
  const [errorMessage, setErrorMessage] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  // 1. Define the sign-up form...

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof SignUpSchema>) {
    console.log(values);
    // Reset success and error messages before sign-up server action
    setSuccessMessage("");
    setErrorMessage("");
    // Handle form submission:
    //    - Validate the form values (type-safe and validated).
    //    - Execute the user sign-up server action.
    startTransition(() => {
      // Execute the user sign-up server action
      signUp(values)
        .then((data) => {
          // Update success or error messages based on the server response
          setSuccessMessage(data.success);
          setErrorMessage(data.error);
        });
    });
  }

  return (
    <div>SignUpForm</div>
  )
}
```

### 3. Build the sign-up form

3. **Build the Form**
   - Use the `<Form>` components (provided by your UI library) to build your form.
   - Include form fields, labels, error messages, and any other necessary components.

Similar to the sign-in form but with a few changes:
 - `CardWrapper` props changed to reflect the sign-up page
 - `FormField` for the `username`

feat: Implement the sign-up form

- Import necessary form and UI components
- Add form fields, labels, and error messages
- Include a submit button

```tsx
import CardWrapper from '@/components/auth/CardWrapper';
import FormError from '@/components/form/FormError';
import FormSuccess from '@/components/form/FormSuccess';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function SignUpForm() {
  // 1. Define the sign-up form...
  // 2. Define a submit handler...

  // 3. Build the form
  return (
    <CardWrapper
      backButtonHref="/auth/signin"
      backButtonLabel="Already have an account?"
      headerLabel="Create an account"
      showSocialSignIn={true}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your username"
                      aria-label="username"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type='email'
                      placeholder="Enter your email address"
                      aria-label="Email address"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      placeholder="**************"
                      aria-label="Password"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={errorMessage} />
          <FormSuccess message={successMessage} />
          <Button
            type="submit"
            disabled={isPending}
            className='w-full bg-sky-500'
          >
            Sign Up
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
```

refactor: Extract SignUpForm component from SignUpPage

- Move the sign-up form logic and UI into a dedicated component
- Improve code organization and maintainability

### Render the sign-up form

```tsx
import React from 'react';
import SignUpForm from '@/components/auth/SignUpForm';

export default function SignUpPage() {
  return (
    <SignUpForm />
  )
}
```

## Prisma ORM

Let's install [prisma](https://www.prisma.io/docs) and [prisma/client](https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration) to run with our Next.js project.

- [Set up Prisma ORM wih Relation Database](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-postgresql)

Steps: 

1. Install the Prisma CLI
2. Create a Prisma Schema file
3. Install Prisma Client
4. Instantiate a single instance of PrismaClient

### 1. Install the Prisma CLI

```sh
npm install prisma --save-dev
```

You can now invoke the Prisma CLI by prefixing it with `npx`:

```sh
npx prisma
```

### 2. Create a Prisma Schema file

Set up your Prisma ORM project by creating your Prisma Schema file with the following command:

```sh
npx prisma init
```

This command does two things:

   - creates a new directory called `prisma` that contains a file called `schema.prisma`, which contains the Prisma schema with your database connection variable and schema models
     
   - creates the [`.env` file](https://www.prisma.io/docs/orm/more/development-environment/environment-variables/env-files) in the root directory of the project, which is used for defining environment variables (such as your database connection)

### 2.5 (Important) Add .env file to .gitignore

Don't forget to add `.env` in the `gitignore` file to not commit any private information.

The boilerplate `.env` file will contain some comments and a variable `DATABASE_URL`. The URL is

```sh
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
```

### 3. Install Prisma Client

```sh
npm install @prisma/client
```

### 4. Instantiate a single instance of PrismaClient

[Best practice for instantiating Prisma Client with Next.js](https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices)

Summary:

- During development, the `next dev` command clears Node.js cache on run.
- This behavior initializes a new `PrismaClient` instance each time due to hot reloading, which creates a connection to the database.
- However, this can quickly exhaust the database connections because each `PrismaClient` instance holds its own connection pool.

**Solution:**
To address this issue, follow these steps:
1. Instantiate a single instance of `PrismaClient`.
2. Save it on the `globalThis` object.
3. Check if `PrismaClient` is already on the `globalThis` object before instantiating a new one. If it's present, reuse the existing instance to prevent unnecessary instantiation.

This approach ensures efficient database connections and prevents excessive resource usage.

`/db.ts`
```ts
import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
```

Let's rename the file `prismaSingleton.ts` and put it in a folder `/db` at the root of the project.

After creating this file, you can now import the extended PrismaClient instance anywhere in your Next.js project as follows:

```tsx
// e.g. in `app/page.tsx`
import prisma from '@/db/prismaSingleton';

export default function page() {
  const posts = await prisma.post.findMany()

  return (
    <div>page</div>
  )
}

```

Note: You can extend Prisma Client using a Prisma Client extension by appending the `$extends` client method when instantiating Prisma Client as follows:

```ts
import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient().$extends({
    result: {
      user: {
        fullName: {
          needs: { firstName: true, lastName: true },
          compute(user) {
            return `${user.firstName} ${user.lastName}`
          },
        },
      },
    },
  })
}
```

## Database

This project uses [PostgreSQL](https://www.postgresql.org/), here are the setup instructions.

### Acquire a `DATABASE_URL`

When working with a PostgreSQL database, the `DATABASE_URL` you receive depends on whether you have a local database on your machine or an online one. 

#### Online PostgreSQL database

If you're using an online database, consider using a provider like [Neon](https://neon.tech). Their platform offers serverless Postgres, allowing you to build reliable and scalable applications faster. To get started, sign up for Neon, explore database branching, and connect it to your tech stack. You'll find detailed instructions in the [Neon documentation](https://neon.tech/docs/introduction). 

#### Local PostgreSQL database

This project will use a local PostgreSQL database.

##### Install local PostgreSQL database

- [Set up a local postgresql database | Prisma](https://www.prisma.io/dataguide/postgresql/setting-up-a-local-postgresql-database)

To install on Windows

1. Get [Windows postgresql installer](https://www.postgresql.org/download/windows/), get the Windows x86-64
2. Go through the installer steps
3. Confirm a password for the PostgreSQL superuser called `postgres`
   - Write this password down physically somewhere to be used later
4. Setup port (default at 5432)
5. Default locale
6. Review the pre installation summary log (can be found in the directory "C:\Program Files\PostgreSQL\16\installation_summary.log" )
7. Finish installation
8. Skip or cancel Stack Builder

### Set up prisma schema with local database

- [Connection Urls | Prisma docs](https://pris.ly/d/connection-strings)
- [PostgreSQL in prisma connection string](https://www.prisma.io/docs/orm/overview/databases/postgresql)

Create an `.env` file. Add an environment variable for the postgresql connection URI.

Inside the `.env` file create a `DATABASE_URL` variable. This will store the connection URI string to our local database. 

An example connection URI string should be something like this: 

`.env`
```shell
DATABASE_URL="postgresql://myname:mypassword@localhost:5432/mydb?schema=public"
```

1. **Provider**: The `provider` specifies the type of database you're connecting to. In this case, it's PostgreSQL.

2. **URL Components**:
   - **User**: `"myname"` is the username for the database.
   - **Password**: `"mypassword"` is the password for the user.
   - **Host**: `"localhost"` refers to the machine where the PostgreSQL server is running.
   - **Port**: `5432` is the default port for PostgreSQL.
   - **Database Name**: `"mydb"` is the name of the database.
   - **Schema**: `"public"` specifies the schema within the database.
     - If you omit the schema, Prisma will use the `"public"` schema by default

So, the complete URL connects to a PostgreSQL database with the given credentials and schema. If you're using Prisma, this URL allows Prisma ORM to connect to your database when executing queries with Prisma Client or making schema changes with Prisma Migrate. If you need to make the URL dynamic, you can pass it programmatically when creating the Prisma Client. 

To connect to a PostgreSQL database server, you need to configure a [datasource](https://www.prisma.io/docs/orm/prisma-schema/overview/data-sources) block in your [Prisma schema file](https://www.prisma.io/docs/orm/prisma-schema):

`schema.prisma`
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

The fields passed to the datasource block are:

- `provider`: Specifies the `postgresql` data source connector.
- `url`: Specifies the [connection URL](https://www.prisma.io/docs/orm/overview/databases/postgresql#connection-url) for the PostgreSQL database server. In this case, an [environment variable is used](https://www.prisma.io/docs/orm/prisma-schema/overview#accessing-environment-variables-from-the-schema) to provide the connection URL.

Or without environment variables (not recommended):

```prisma
datasource db {
  provider = "postgresql"
  url      = "postgresql://myname:mypassword@localhost:5432/mydb?schema=public"
}
```

#### Connection URI strings

- [Connection Urls | Prisma docs](https://pris.ly/d/connection-strings)

- [Intro to PostgreSQL connection URIs](https://www.prisma.io/dataguide/postgresql/short-guides/connection-uris)

Let's look at the spec for a PostgreSQL connection URI:
```sh
postgres[ql]://[username[:password]@][host[:port],]/database[?parameter_list]

\_____________/\____________________/\____________/\_______/\_______________/
     |                   |                  |          |            |
     |- schema           |- userspec        |          |            |- parameter list
                                            |          |
                                            |          |- database name
                                            |
                                            |- hostspec
```

We can test a PostgreSQL connection string in the terminal by running the command `pg_isready`

```sh
pg_isready -d DATABASE_NAME -h HOST_NAME -p PORT_NUMBER -U DATABASE_USER
```

##### **Important** Connection URL for PostgreSQL must percentage-encode special characters!

For MySQL, PostgreSQL and CockroachDB you must [percentage-encode special characters](https://developer.mozilla.org/en-US/docs/Glossary/percent-encoding) in any part of your connection URL - including passwords. For example, `p@$$w0rd` becomes `p%40%24%24w0rd`.

For Microsoft SQL Server, you must escape special characters in any part of your connection string.

## Prisma Schema

Ensure that the `DATABASE_URL` is properly configured in your `.env` file. With the database setup complete we can build our data models within the `schema.prisma`. 

Here is the boilerplate `schema.prisma` file provided by the `npx prisma init` command:

`prisma\schema.prisma`
```prisma
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?
// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

### What is Prisma schema?

The **Prisma schema** serves as the central configuration for your Prisma setup. Typically named `schema.prisma`, it fulfills several crucial roles:

1. **Data Model Definition**: In an intuitive data modeling language, developers define their application models within the Prisma schema. This includes specifying entities, relationships, and fields.

2. **Database Connection**: The Prisma schema establishes the connection to your database. It contains information about the database provider, connection URL, and other relevant settings.

3. **Generator Configuration**: You can define code generators in the Prisma schema. These generators create the necessary code for your application based on the data model. For example, Prisma generates TypeScript or JavaScript code for your database queries and mutations.

In summary, the Prisma schema acts as the bridge between your application's data model and the underlying database, providing a clear and structured way to manage your data access layer. For more specific details or examples related to the Prisma schema, see the [official documentation](https://www.prisma.io/docs/orm/prisma-schema/overview).

### Defining a model

In a **Prisma schema**, you define your application models (also known as Prisma models) using a concise syntax.

**Models**: These represent the entities in your application domain. They map to tables (in relational databases like PostgreSQL) or collections (in MongoDB). Models form the foundation for queries available in the generated Prisma Client API.

#### Example schema

1. **Example Schema**:
    ```prisma
    model User {
      id       Int     @id @default(autoincrement())
      email    String  @unique
      name     String?
      role     Role    @default(USER)
      posts    Post[]
      profile  Profile?
    }

    model Profile {
      id      Int    @id @default(autoincrement())
      bio     String
      user    User   @relation(fields: [userId], references: [id])
      userId  Int    @unique
    }

    model Post {
      id          Int       @id @default(autoincrement())
      createdAt   DateTime  @default(now())
      updatedAt   DateTime  @updatedAt
      title       String
      published   Boolean   @default(false)
      author      User      @relation(fields: [authorId], references: [id])
      authorId    Int
      categories  Category[]
    }

    model Category {
      id     Int     @id @default(autoincrement())
      name   String
      posts  Post[]
    }

    enum Role {
      USER
      ADMIN
    }
    ```
2. **Explanation**:
    - The schema defines models like `User`, `Profile`, `Post`, and `Category`.
    - Fields within models (e.g., `email`, `name`, etc.) correspond to columns in the database.
    - Relationships (e.g., `@relation`, `@unique`) define how models relate to each other.
    - Enums (like `Role`) allow you to define fixed sets of values.

3. **Generated Prisma Client**:
    - Prisma Client generates type-safe code for your models, making database access safe and efficient.
    - You can create records, query data, and perform mutations using Prisma Client.

Remember, your data model reflects your application's domain. Whether it's an ecommerce app (with models like `Customer`, `Order`, etc.) or a social media platform (with `User`, `Post`, etc.), the Prisma schema captures the essence of your data structure.

#### Convert sign-up zod schema into prisma schema model

Let's convert the Zod schema for sign-up into a Prisma schema model. Prisma models define the data structure for the database, and we'll map the relevant fields from the Zod schema to Prisma models.

First, identify the relevant fields in `SignUpSchema` Zod schema:

`schemas\index.ts`
```ts
export const SignUpSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  password: PasswordSchema,
  username: z.string().min(1, {
    message: 'Please enter a valid username',
  }),
});
```

1. `email`: Represents the user's email address.
2. `password`: Represents the user's password.
3. `username`: Represents the user's chosen username.

Now, let's create a Prisma model named `User` that corresponds to these fields:

`prisma\schema.prisma`
```prisma
model User {
  id       String  @id @default(cuid())
  email    String  @unique
  password String // You can choose the appropriate type for password storage (e.g., hashed)
  username String? // Optional username
}
```

Here's how we map the fields:

- `email`: A unique string field (`@unique`) to store the user's email.
- `password`: A string field to store the user's password (you can choose the appropriate type for password storage, such as hashed).
- `username`: An optional string field to store the user's chosen username.

### Prisma Toolkit: Database Modeling and Workflow

In the terminal we can run the command `npx prisma` to see the list of commands to query, migrate and model the database.

```sh
npx prisma
```

After defining a prisma model, run the following command to generate artifacts:

```sh
npx prisma generate
```

Now we can access the `User` model via the Prisma Client Singleton instance. Here is an example:

```tsx
import React from 'react';
import prisma from '@/db/prismaSingleton';

export default async function page() {
  const users = await prisma.user.findMany();

  return ( <div>page</div> );
}
```

To push the Prisma schema state to the database:
 
```sh
npx prisma db push
```

# Auth.js

- [Auth.js](https://authjs.dev/)
- [Prisma Adapter | Auth.js](https://authjs.dev/getting-started/adapters/prisma)
- [Credentials | Auth.js](https://authjs.dev/getting-started/authentication/credentials)

Let's follow the steps in the authjs prisma adapter docs.

- [Getting started Auth.js](https://authjs.dev/getting-started/installation?framework=next.js)

## Auth.js Prisma Adapter

### Installation

```sh
npm install @prisma/client @auth/prisma-adapter
npm install prisma --save-dev
```

Or just install `@auth/prisma-adapter`:

```sh
npm install @auth/prisma-adapter
```

### Environment Variables

```sh
DATABASE_URL=postgres://postgres:adminadmin@0.0.0.0:5432/db
```

### Configuration

Create the Auth.js config file and object. This is where you can control the behaviour of the library and specify custom authentication logic, adapters, etc. In this file we'll pass in all the options to the framework specific initalization function and then export the route handler(s), signin and signout methods, and more.

`./auth.ts`
```ts
import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
 
const prisma = new PrismaClient()
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [],
})
```

### Prisma Adapter Configuration

We can find a specific [schema thats required by Auth.js](https://authjs.dev/getting-started/adapters/prisma#schema).

`prisma/schema-postgres.prisma`
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
 
generator client {
  provider = "prisma-client-js"
}
 
model User {
  id            String          @id @default(cuid())
  name          String?
  email         String          @unique
  emailVerified DateTime?
  image         String?
  accounts      Account[]
  sessions      Session[]
  // Optional for WebAuthn support
  Authenticator Authenticator[]
 
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
 
model Account {
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?
 
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
 
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
 
  @@id([provider, providerAccountId])
}
 
model Session {
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
 
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
 
model VerificationToken {
  identifier String
  token      String
  expires    DateTime
 
  @@id([identifier, token])
}
 
// Optional for WebAuthn support
model Authenticator {
  credentialID         String  @unique
  userId               String
  providerAccountId    String
  credentialPublicKey  String
  counter              Int
  credentialDeviceType String
  credentialBackedUp   Boolean
  transports           String?
 
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
 
  @@id([userId, credentialID])
}
```

Let's break down the schema:

1. **Database Connection**: The schema defines the database connection. You specify the data source (e.g., PostgreSQL, MySQL) and any relevant connection details.

2. **Generator**: The schema specifies the code generator that Prisma should use to generate the Prisma Client.
   
  - The `generator` block in the Prisma schema specifies the code generator that Prisma should use to generate the Prisma Client. Let's break it down:
  
  - **Provider**: The `provider` field specifies the language or platform for which you want to generate the Prisma Client. The `"prisma-client-js"` generates a JavaScript client for the Prisma schema.
   - Prisma supports other providers as well. For example:
     - `"prisma-client-java"` generates a Java client.

  - When you run `prisma generate`, Prisma uses this information to create a client library that allows you to interact with your database using JavaScript.

3. **Data Model**: The schema also contains the data model. It defines the structure of the database tables, including their fields, relationships, and constraints.

    - `Account`: Represents user accounts with fields like `id`, `userId`, `type`, and `provider`.
    - `Session`: Represents user sessions with fields like `id`, `sessionToken`, and `expires`.
    - `User`: Represents users with fields like `id`, `name`, `email`, and relationships to `Account` and `Session`.
    - `VerificationToken`: Represents verification tokens with fields like `identifier`, `token`, and `expires`.

4. **Directives**:
   - `@id`: Indicates the primary key field.
   - `@default(cuid())`: Specifies a default value (e.g., a unique identifier).
   - `@map("...")`: Maps the field name to a specific column name in the database.
   - `@unique`: Ensures uniqueness for the specified fields.
   - `@db.Text`: Specifies that the field should be stored as text in the database.
   - `@relation`: Defines relationships between models (e.g., `user User @relation(fields: [userId], references: [id], onDelete: Cascade)`).

5. **Table Names**:
   - Use `@@map("...")` to customize the table names in the database (e.g., `"accounts"` for the `Account` model).

##### Lowercase table names and Prisma's @map feature

Note: Prisma's [`@map()` feature](https://www.prisma.io/docs/concepts/components/prisma-schema/names-in-underlying-database) allows you to change the field names and customize the column names to whichever naming convention you prefer.

Using lowercase table names like "users" or "accounts" has some advantages:

1. **Consistency and Convention**:
   - Lowercase table names follow common naming conventions in databases.
   - Consistency across your schema makes it easier for developers (including yourself) to understand and maintain the codebase.

2. **Compatibility with Database Systems**:
   - Some database systems (e.g., PostgreSQL) treat table names as case-insensitive by default.
   - Using lowercase ensures compatibility across different databases.

3. **Readability and Clarity**:
   - Lowercase names are more readable and concise.
   - They avoid confusion with other identifiers (e.g., column names, function names).

4. **URLs and Routes**:
   - If you use table names in URLs or routes (e.g., for REST APIs), lowercase names are cleaner and more SEO-friendly.

Remember that while lowercase names have these advantages, the most important factor is consistency within your project. Choose a naming convention that aligns with your team's preferences and project requirements. 

#### `schema.prisma` config

Let's build the schema step-by-step.

##### User model

Changes from the `User` model from the docs:
- Changed `name` field to `username`
- Removed `Authenticator` for WebAuthn support

feat: Update User model fields in schema

```prisma
model User {
  id            String    @id @default(cuid())
  username      String?
  email         String    @unique
  emailVerified DateTime?
  image         String?
  accounts      Account[]
  sessions      Session[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

###### password in User model

Notice that the provided `User` model does not have the `password` field. That's because Auth.js does not use credentials by default but does have support for [Credentials Provider | Authjs](https://authjs.dev/getting-started/providers/credentials#configuration).

Add an optional password field in the User model. This option is necessary because OAuth providers such as Google or GitHub should be able to create a User model without requiring a password.

feat: Add password field to User model

```prisma
model User {
  id            String    @id @default(cuid())
  username      String?
  email         String    @unique
  emailVerified DateTime?
  image         String?
  password      String?
  accounts      Account[]
  sessions      Session[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

##### Account model

feat: Add Account model in prisma schema

```prisma
model Account {
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?
 
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
 
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
 
  @@id([provider, providerAccountId])
}
```

##### Session model

feat: Add Session model in prisma schema

```prisma
model Session {
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
 
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Create user record on signUp action

We want to save the `values` from the user sign-up data after validation in the `signUp` server action.

#### bcrypt

We need to encrypt the password data in the user sign-up process to greatly improve the security of our users.

For that we delegate the password hashing to a library named [bcrypt](https://www.npmjs.com/package/bcrypt). Additionally, we need to install bcrypt type definitions with [@types/bcrypt](https://www.npmjs.com/package/@types/bcrypt).

Install bcrypt:

```sh
npm i bcrypt
```

Install @types/bcrypt as dev dependency

```sh
npm i -D @types/bcrypt
```

Here is an example of how to use `bcrypt`

```ts
import * as bcrypt from 'bcrypt';
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';

(async () => {
    // Technique 1 (generate a salt and hash on separate function calls):
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(myPlaintextPassword, salt);
    // Store hash in your password DB.

    // Technique 2 (auto-gen a salt and hash):
    const hash2 = await bcrypt.hash(myPlaintextPassword, saltRounds);
    // Store hash in your password DB.
})();
```

#### Create User in signUp action

Now go to the `signUp` action and import `bcrypt` to generate the hash from the password.

feat(auth): Add password hashing using bcrypt

feat: Implement password hashing in signUp action

This commit introduces password hashing using bcrypt in the sign-up function. The user's password is securely hashed with a randomly generated salt, ensuring better security.

```ts
"use server";

import bcrypt from 'bcrypt';
import { z } from "zod";
import { SignUpSchema } from "@/schemas";

export default async function signUp(values: z.infer<typeof SignUpSchema>) {
  console.log(values);

  const parsedValues = SignUpSchema.safeParse(values);

  if (!parsedValues.success) {
    return {
      error: "Invalid fields!",
    };
  }

  // Extract the data from the parsed values
  const { email, password, username } = parsedValues.data;

  // Hash the password
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);

  return {
    success: "Sign up successful!",
  };
}
```

Next find if we already have an existing user.

feat(auth): Verify unique email before signUp

When a user signs up, verify that the email address is unique and does not already exist in the database before allowing registration or updating the email.

feat: Check for existing user in signUp action

```ts
import bcrypt from "bcrypt";
import { z } from "zod";

import prisma from "@/db/prismaSingleton";
import { SignUpSchema } from "@/schemas";


export default async function signUp(values: z.infer<typeof SignUpSchema>) {
  console.log(values);

  const parsedValues = SignUpSchema.safeParse(values);

  if (!parsedValues.success) {
    return {
      error: "Invalid fields!",
    };
  }

  const { email, password, username } = parsedValues.data;

  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);

  // Check if an existing user with the given email exists
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return { error: "Email address is already in use." };
  }

  return {
    success: "Sign up successful!",
  };
}
```

Let's refactor out the existing user logic into separate utility function.

feat: Create user record retrieval utilities

refactor: Extract existing user logic into utility

`utils\getUserByEmail.ts`
```ts
import prisma from "@/db/prismaSingleton";

export default async function getUserByEmail(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  } catch {
    return null;
  }
}
```

Now use the function `getUserByEmail` inside the signUp action:

```ts
import getUserByEmail from "@/utils/getUserByEmail";

export default async function signUp(values: z.infer<typeof SignUpSchema>) {
  // ...

  // Check if an existing user with the given email exists
  const existingUser = await getUserByEmail(email);
```

Let's improve the error handling for the `getUserByEmail` function. We know that we can expect various errors from Prisma Client by checking the [prisma client error reference](https://www.prisma.io/docs/orm/reference/error-reference).

feat: Improve error handling in getUserByEmail

```ts
import { Prisma } from "@prisma/client";
import prisma from "@/db/prismaSingleton";

/**
 * Retrieves a user by their email address.
 *
 * @param email - The email address to search for.
 * @returns The user object if found, or null if not found or an error occurs
 * @see {@link https://www.prisma.io/docs/orm/reference/error-reference} Prisma error reference
 */
export default async function getUserByEmail(email: string) {
  try {
    // Check if an existing user with the given email exists
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Handle specific Prisma errors (e.g., database connection issue)
      console.error("Prisma error:", error.message);
    } else {
      // Handle other unexpected errors
      console.error("Unexpected error:", error);
    }
    return null;
  }
}
```

While here let's also create a similar utility function `getUserById`, that retrieves a `User` record by their ID. We will use these utility functions in our authentication callbacks later when we need more information from the database.

feat: Create getUserById utility function

`utils\getUserById.ts`
```ts
import { Prisma } from "@prisma/client";
import prisma from "@/db/prismaSingleton";

/**
 * Retrieves a user by their ID.
 *
 * @param id - The user ID to search for.
 * @returns The user object if found, or null if not found or an error occurs
 * @see {@link https://www.prisma.io/docs/orm/reference/error-reference} Prisma error reference
 */
export default async function getUserById(id: string) {
  try {
    // Check if an existing user with the given ID exists
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Handle specific Prisma errors (e.g., database connection issue)
      console.error("Prisma error:", error.message);
    } else {
      // Handle other unexpected errors
      console.error("Unexpected error:", error);
    }
    return null;
  }
}
```

feat(auth): Create user during signUp

feat: Create user record in signUp server action

```ts
"use server";

import bcrypt from "bcrypt";
import { z } from "zod";

import prisma from "@/db/prismaSingleton";
import { SignUpSchema } from "@/schemas";

/**
 * Validates user sign-up data using the provided schema.
 *
 * @param values - User input data to validate.
 * @returns An object with either a success message or an error message.
 */
export default async function signUp(values: z.infer<typeof SignUpSchema>) {
  console.log(values);

  const parsedValues = SignUpSchema.safeParse(values);

  if (!parsedValues.success) {
    return {
      error: "Invalid fields!",
    };
  }

  // Extract the data from the parsed values
  const { email, password, username } = parsedValues.data;

  // Hash the password
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);

  // Check if an existing user with the given email exists
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return { error: "Email address is already in use." };
  }

  // Create a new user in the database with the provided sign-up data:
  // username, email, and hashed password
  await prisma.user.create({
    data: {
      username,
      email,
      password: hash,
    }
  });

  return {
    success: "Sign up successful!",
  };
}
```

## Install Auth.js v5 or higher

- [Upgrade Guide NextAuth.js v5](https://authjs.dev/getting-started/migrating-to-v5) do this only if you are upgrading from a previous version of `next-auth`
- [Installation Guide Auth.js](https://authjs.dev/getting-started/installation) for a fresh install

### 1. **Install Auth.js**

```sh
npm install next-auth@beta
```

### 2. **Setup Environment**

The only environment variable that is mandatory is the `AUTH_SECRET`. 
  - This is a random value used by the library to encrypt tokens and email verification hashes. 
  - (See [Deployment](https://authjs.dev/getting-started/deployment) to learn more). You can generate one via the official [Auth.js CLI](https://cli.authjs.dev/) running:

```sh
npx auth secret
```

This will also add it to your `.env` file, respecting the framework conventions (eg.: Next.js' `.env.local`).

### 3. **Configure**

Next, create the Auth.js config file and object. This is where you can control the behaviour of the library and specify custom authentication logic, adapters, etc. We recommend all frameworks to create an `auth.ts` file in the project. In this file we'll pass in all the options to the framework specific initalization function and then export the route handler(s), signin and signout methods, and more.

1. Start by creating a new `auth.ts` file at the root of your app with the following content.

`./auth.ts`
```ts
import NextAuth from "next-auth"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [],
})
```

2. Add a Route Handler under `/app/api/auth/[...nextauth]/route.ts`.

`./app/api/auth/[...nextauth]/route.ts`
```ts
import { handlers } from "@/auth" // Referring to the auth.ts we just created
export const { GET, POST } = handlers
```

3. Add optional Middleware to keep the session alive, this will update the session expiry every time its called.

`./middleware.ts`
```ts
export { auth as middleware } from "@/auth"
```

feat: Configure NextAuth with empty providers
feat: Initialize NextAuth route handlers
feat: Extend session expiration on middleware call

#### 3.5 Middleware

feat: Configure selective middleware paths

For advanced use cases, you can use `auth` as a wrapper for your Middleware:

`middleware.ts`
```ts
import { auth } from "@/auth"
 
export default auth((req) => {
  // req.auth
})
 
// Optionally, don't invoke Middleware on some paths
export const config = {
  /*
   * Match all request paths except for the ones starting with:
   * - api (API routes)
   * - _next/static (static files)
   * - _next/image (image optimization files)
   * - favicon.ico (favicon file)
   */
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

```

- Check out additional [Middleware docs](https://authjs.dev/getting-started/session-management/protecting#nextjs-middleware) for more details.

- Also see [Middleware | Nextjs App Router](https://nextjs.org/docs/app/building-your-application/routing/middleware)

- [Matching Paths](https://nextjs.org/docs/app/building-your-application/routing/middleware#matching-paths)

Middleware will be invoked for **every route in your project**. Given this, it's crucial to use matchers to precisely target or exclude specific routes. 

The following is the execution order:

1. `headers` from `next.config.js`
2. `redirects` from `next.config.js`
3. Middleware (`rewrites`, `redirects`, etc.)
4. `beforeFiles` (`rewrites`) from `next.config.js`
5. Filesystem routes (`public/`, `_next/static/`, `pages/`, `app/`, etc.)
6. `afterFiles` (`rewrites`) from `next.config.js`
7. Dynamic Routes (`/blog/[slug]`)
8. `fallback` (`rewrites`) from `next.config.js`

There are two ways to define which paths Middleware will run on:

1. [Custom matcher config](https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher)
2. [Conditional statements](https://nextjs.org/docs/app/building-your-application/routing/middleware#conditional-statements)

Middleware example:

Suppose you want middleware to apply only to paths starting with `/auth/signin`, here is how you would configure it:

```ts
import { auth } from "@/auth"
 
export default auth((req) => {
  // req.auth
  console.log("ROUTE: ", req.nextUrl.pathname);
})

export const config = {
  matcher: ["/auth/signin"],
}
```

Now if you navigate to `localhost:3000/auth/signin` we can see in the terminal the route is logged so the middleware was invoked. On the other hand, if you navigate to the `/auth/signup` path the middleware is not invoked.

The `config` is simply and object with a `matcher` to be able to invoke the middleware (i.e., `auth` function).

##### **matcher regex statements:**

feat: Configure selective middleware paths

Specify regular expressions to match request paths, excluding API routes, static files, image optimization files, and favicon.ico.

From [Next.js](https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher)
```ts
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
```

feat: Configure middleware paths

Specify regular expressions to match request paths, excluding Next.js internals and all static files (unless found in search params). Always run for API routes.

From [Clerk middleware](https://clerk.com/docs/references/nextjs/clerk-middleware)
```ts
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
```

### 4. **Setup Authentication Methods**

With that, the basic setup is complete! Next we'll setup the first authentication methods and fill out that `providers` array. See [Authentication Auth.js Reference](https://authjs.dev/getting-started/authentication).

#### OAuth with GitHub

- [Configuring GitHub | Auth.js](https://authjs.dev/guides/configuring-github)

##### Creating the server config

Next, create the main Auth.js configuration file which contains the necessary configuration for Auth.js, as well as the dynamic route handler.

`./auth.ts`
```ts
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
 
export const { handlers, auth } = NextAuth({
  providers: [GitHub],
})
```

We can update our earlier `auth.ts` file with the **GitHub** provider:

feat: Add GitHub provider to NextAuth

`auth.ts`
```ts
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
});
```

##### Update the route

feat: Implement catch-all route for Auth.js API

`./app/api/auth/[...nextauth]/route.ts`
```ts
import { handlers } from "@/auth" // Referring to the auth.ts we just created
export const { GET, POST } = handlers
export const runtime = "edge" // optional
```

Since this is a [catch-all dynamic route](https://nextjs.org/docs/pages/building-your-application/routing/dynamic-routes#catch-all-segments), it will respond to all the relevant Auth.js API routes so that your application can interact with the chosen OAuth provider using the [OAuth 2](https://oauth.net/2) protocol.

refactor: Remove edge runtime compatibility

`./app/api/auth/[...nextauth]/route.ts`
```ts
import { handlers } from "@/auth"
export const { GET, POST } = handlers
```

Note: Since we are using prisma we can omit the `runtime = edge` as prisma adapter may not be fully edge compatible. See [Auth.js Edge Compatibility](https://authjs.dev/guides/edge-compatibility).

##### Adding environment variables

If you haven't, create an `.env.local` file as explained in the [installation](https://authjs.dev/getting-started/installation) section and add the following two GitHub variables:

`.env.local`
```sh
AUTH_SECRET="changeMe"
 
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=
```

We will be filling `AUTH_GITHUB_ID` and `AUTH_GITHUB_SECRET` with proper values from the GitHub Developer Portal once we have registered our application in GitHub.

##### Registering your App (GitHub)

**Creating an OAuth App in GitHub**

To get the required credentials from GitHub, we need to create an application in their developer settings.

1. Go to the [GitHub developer settings](https://github.com/settings/developers), also found under **Settings → Developers → OAuth Apps**, and click “New OAuth App”:
2. Next, you'll be presented with a screen to register your application. Fill in all the required fields.
3. The default callback URL should generally take the form of `[origin]/api/auth/callback/[provider]`, however, the default is slightly different depending on which framework you're using.

`Next.js`
```sh
// Local
http://localhost:3000/api/auth/callback/github
 
// Prod
https://app.company.com/api/auth/callback/github
```

4. Once you've entered all the required fields, press “Register application”.

**Secrets**

- After successfully registering your application, GitHub will present us with the required details.
- We need 2 things from this screen, the **Client ID** and **Client Secret**.

- The **Client ID** is always visible, it is a public identifier of your OAuth application within GitHub.

- To get a **Client Secret**, you have to click on **“Generate a new client secret**”, which will create your first client secret. You can easily create a new client secret here in case your first one gets leaked, lost, etc.
- **Important**: Keep your Client Secret secure and never expose it to the public or share it with people outside your organization.

##### Wiring all together (GitHub and Auth.js)

Now that we have the required **Client ID** and **Client Secret**, paste them into your `.env.local` file we created earlier.

`.env.local`
```sh
AUTH_SECRET="changeMe"
 
AUTH_GITHUB_ID={clientId}
AUTH_GITHUB_SECRET={clientSecret}
```

With all the pieces in place, you can now start your local dev server and test the login process.

```sh
npm run dev
```

Navigate to `http://localhost:3000`. You should see the following page:

Click on “**Sign in**”, you should be redirected to the default Auth.js signin page. You can [customize this page](https://authjs.dev/guides/pages/signin) to fit your needs. Next, click on “**Sign in with GitHub**”. Auth.js will redirect you to GitHub, where GitHub will recognize your application and ask the user to confirm they want to authenticate to your new application by entering their credentials.

Once authenticated, GitHub will redirect the user back to your app and Auth.js will take care of the rest:

If you've landed back here that means everything worked! We have completed the whole OAuth authentication flow so that users can log in to your application via GitHub!

Note: As you can see, most of the time required setting up OAuth in your application is spent registering your application in the OAuth provider's dashboard (some are easier to navigate, some are harder). Once registered, the setup via Auth.js should be straight forward.

###### **Deployment**

Before you can release your app to production, you'll need to change a few things.

Unfortunately, GitHub is among the providers which do not let you register multiple callback URLs for one application. Therefore, you'll need to register a separate application in GitHub's dashboard [as we did previously](https://authjs.dev/guides/configuring-github#registering-our-app) but set the callback URL to your application's production domain (.i.e `https://example.com/api/auth/callback/github`). You'll then also have a new **Client ID** and **Client Secret** that you need to add to your production environment via your hosting provider's dashboard (Vercel, Netlify, Cloudflare, etc.) or however you manage environment variables in production.

Refer to the [Deployment page](https://authjs.dev/getting-started/deployment) for more information.

## Edge compatibility

Since we are using Prisma Client, prisma adapter with authjs and a local postgreSQL database our app will **not be edge ready** (i.e., engineered the software to avoid any of the Node.js features/modules that are missing in some of the edge runtimes). See more on [edge compatibility from Authjs](https://authjs.dev/guides/edge-compatibility).

- [Prisma Client - Edge functions](https://www.prisma.io/docs/orm/prisma-client/deployment/edge/overview#which-database-drivers-are-edge-compatible)
- [Authjs edge compatibility](https://authjs.dev/guides/edge-compatibility)
- [Authjs migrating to v5 | edge compatibility](https://authjs.dev/getting-started/migrating-to-v5#edge-compatibility)

Auth.js supports two [session strategies](https://authjs.dev/concepts/session-strategies). When you are using an adapter, it will default to the database strategy. **Unless your database and its adapter is compatible with the Edge runtime/infrastructure, you will not be able to use the `"database"` session strategy.**

So for example, if you are using an adapter that relies on an ORM/library that is not yet compatible with Edge runtime(s) below is an example where we force the `jwt` strategy and split up the configuration so the library doesn't attempt to access the database in edge environments, like in the middleware.\

Here is our current `auth.ts` and `middleware.ts` files respectively:

`auth.ts`
```ts
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
});

```

`middleware.ts`
```ts
import { auth } from "@/auth";

export default auth((req) => {
  // req.auth
  console.log("ROUTE: ", req.nextUrl.pathname);
});

const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
```

### Edge runtime problem

- [Authjs edge compatibility problem](https://authjs.dev/guides/edge-compatibility#the-problem)

1. **Database Adapters and Auth.js**:
   - Auth.js, when paired with a database client, forms a holistic authentication system.
   - Database clients often use TCP sockets to communicate directly with the database server.
   - PostgreSQL is a common database that follows this approach.

2. **Edge Runtimes and Limitations**:
   - Edge runtimes are server-side JavaScript runtimes optimized for lower-power hardware closer to users.
   - These runtimes lack certain features/modules available in Node.js.
   - For example, raw TCP sockets are generally not available in edge runtimes.

3. **Solving the Problem**:
   - To work around this limitation, some solutions involve using an API server.
   - The API server translates HTTP requests into a protocol the database can understand.
   - This allows client-side code to make HTTP requests to the API server, which is universally supported by edge runtimes.

4. **Middleware in Next.js**:
   - Next.js Middleware can protect routes by checking session existence and determining the next route.
   - Middleware code runs in edge runtimes by default.
   - When using a non-"edge compatible" database adapter (like PostgreSQL), we need to find alternative ways to query the database.

In summary, to handle database communication in edge runtimes, consider using an API server and explore alternative approaches to querying databases. Middleware in Next.js can also help protect routes based on session information. 

Therefore, **to use a database adapter that isn't explicitly "edge compatible", we will need to find a way to query the database using the features that we do have available to us.**

### Edge runtime solution

- [Authjs edge compatibility solution](https://authjs.dev/guides/edge-compatibility#the-solution)

- **Auth.js and Database Sessions**:
  - Auth.js, when paired with a database session strategy and a database adapter, makes frequent database calls during normal operations.
  - It checks if a user's session token is valid by querying the database.
  - Every `auth()` call triggers a database query.
  - Auth.js uses caching and other optimizations to minimize unnecessary requests.

- **Edge Runtimes and Workaround**:
  - Edge runtimes lack certain features (like raw TCP sockets).
  - To use Auth.js in edge runtimes with various database adapters, we need a workaround.
  - Consider creating separate versions of next-auth:
    - One without database settings for edge environments.
    - Another with database settings for other environments.
    - Use "lazy initialization" to instantiate clients accordingly.

Instructions:

1. First, a common Auth.js configuration object to be used everywhere. This **will not** include the database adapter.
2. Next, a separate **instantiated** Auth.js instance which imports that configuration, but also adds the adapter and using `jwt` for the Session strategy:
3. Our Middleware, which would then import the configuration **without the database adapter** and instantiate its own Auth.js client.
4. Finally, everywhere else we can import from the primary `auth.ts` configuration and use `next-auth` as usual. See our [session management](https://authjs.dev/getting-started/session-management/protecting) docs for more examples.

Note:

It is important to note here that we've now removed database functionality and support from `next-auth` **in the middleware**. That means that we won't be able to fetch the session or other info like the user's account details, etc. while executing code in middleware. That means you'll want to rely on checks like the one demonstrated above in the `/app/protected/page.tsx` file to ensure you're [protecting your routes](https://authjs.dev/getting-started/session-management/protecting) effectively. Middleware is then still used for bumping the session cookie's expiry time, for example.

Let's implement the solution.

feat(auth): Separate edge and non-edge versions

To address the edge runtime limitations, we create two versions of next-auth:
1. An edge-specific version without database settings.
2. A standard version with database support for other environments.

We achieve this using Auth.js "lazy initialization" to instantiate clients accordingly. We implement the split config workaround solution. 

For more details refer to: [Auth.js Edge Compatibility Guide](https://authjs.dev/guides/edge-compatibility#the-solution)

#### 1. First, a common Auth.js configuration object to be used everywhere. This **will not** include the database adapter.

`auth.config.ts`
```ts
import GitHub from "next-auth/providers/github"
import type { NextAuthConfig } from "next-auth"
 
// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [GitHub],
} satisfies NextAuthConfig
```

#### 2. Next, a separate **instantiated** Auth.js instance which imports that configuration, but also adds the adapter and using `jwt` for the Session strategy:

`auth.ts`
```ts
import NextAuth from "next-auth"
import authConfig from "./auth.config"
 
import { PrismaClient } from "@prisma/client"
import { PrismaAdapter } from "@auth/prisma-adapter"
 
const prisma = new PrismaClient()
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
})
```

feat(auth): Configure NextAuth with PrismaAdapter

- Create a separate Auth.js instance using the configuration from auth.config.ts `auth.config.ts`
- Add the Prisma Adapter
- Add JWT session strategy

Let's also use our `PrismaSingleton` instead of instantiating a new `PrismaClient` here.

feat: Configure NextAuth with prisma singleton

`auth.ts`
```ts
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter"

import authConfig from "@/auth.config";
import prisma from "@/db/prismaSingleton";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
```

#### 3. Our Middleware, which would then import the configuration **without the database adapter** and instantiate its own Auth.js client.

`middleware.ts`
```ts
import NextAuth from "next-auth"
import authConfig from "./auth.config"
 
export const { auth: middleware } = NextAuth(authConfig)
```

Let's adapt it so that we export the `auth()` function as the `middleware` and also include our `config` matcher.

feat: Create custom middleware with config matcher

This commit modifies the `middleware.ts` file to export the `auth()` function as `middleware`. Additionally, it includes a custom `config` matcher for route handling.

Changes:
- Import Auth.js configuration object without the database adapter
- Instantiate its own Auth.js client
- Renamed `auth` to `middleware` for clarity.
- Added a custom `config` object with route matchers.

```ts
import NextAuth from "next-auth";
import authConfig from "@/auth.config";
 
const { auth: middleware } = NextAuth(authConfig);

export default middleware((req) => {
  console.log("ROUTE: ", req.nextUrl.pathname);
});

const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
```

refactor(auth): Rename custom middleware to auth

```ts
import NextAuth from "next-auth";
import authConfig from "@/auth.config";
 
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  console.log("ROUTE: ", req.nextUrl.pathname);
});

const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
```

Notice that in step 3 of [authjs - migrating to v5 edge compatibility](https://authjs.dev/getting-started/migrating-to-v5#edge-compatibility) we have this instruction:

3. In your middleware file, import the configuration object from your first `auth.config.ts` file and use it to lazily initialize Auth.js there. In effect, initialize Auth.js separately with all of your common options, **but without the edge incompatible adapter**.

Example:

`middleware.ts`
```ts
import authConfig from "./auth.config"
import NextAuth from "next-auth"
 
// Use only one of the two middleware options below
// 1. Use middleware directly
// export const { auth: middleware } = NextAuth(authConfig)
 
// 2. Wrapped middleware option
const { auth } = NextAuth(authConfig)
export default auth(async function middleware(req: NextRequest) {
  // Your custom middleware logic goes here
})
```

**The main idea**, is to separate the part of the configuration that is edge-compatible from the rest, and only import the edge-compatible part in Middleware/Edge pages/routes. You can read more about this workaround in the [Prisma docs](https://authjs.dev/getting-started/adapters/prisma), for example.

We will go with the wrapped middleware approach.

feat(auth): Implement wrapped middleware option

```ts
import { NextRequest } from "next/server";
import NextAuth from "next-auth";
import authConfig from "@/auth.config";
 
const { auth } = NextAuth(authConfig);

export default auth(async function middleware(req: NextRequest) {
  console.log("ROUTE: ", req.nextUrl.pathname);
});

const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
```

#### 4. Finally, everywhere else we can import from the primary `auth.ts` configuration and use `next-auth` as usual.

`app/protected/page.tsx`
```tsx
import { auth } from "@/auth"
 
export default async function Page() {
  const session = await auth()
 
  if (!session) {
    return <div>Not authenticated</div>
  }
 
  return (
    <div className="container">
      <pre>{session}</pre>
    </div>
  )
}
```

> It is important to note here that we've now removed database functionality and support from `next-auth` **in the middleware**. That means that we won't be able to fetch the session or other info like the user's account details, etc. while executing code in middleware. That means you'll want to rely on checks like the one demonstrated above in the `/app/protected/page.tsx` file to ensure you're [protecting your routes](https://authjs.dev/getting-started/session-management/protecting) effectively. Middleware is then still used for bumping the session cookie's expiry time, for example.

## Example - protected page

Let's see how our split config and Auth.js all comes together.

Create `app\(protected)\settings\page.tsx`, a `SettingsPage` which will be located in the route `localhost:3000/settings`.

```tsx
import React from 'react';

export default function SettingsPage() {
  return (
    <div>SettingsPage</div>
  )
}
```

To import and use `next-auth` in our protected settings page we need to do the following:
  - import primary `auth.ts` configuration
  - Convert function to `async`
  - `await` the `auth()` function to get the `session`
  - Render the session value

feat: Add authentication to settings page

```tsx
import React from 'react';
import { auth } from '@/auth';

export default async function SettingsPage() {

  const session = await auth();
 
  return (
    <div>
      {JSON.stringify(session)}
    </div>
  )
}
```

1. **Imports:**
   - It imports the `React` library and the `auth` function from the `@/auth` module.
   - The `auth` function seems to be related to authentication.

2. **Function Component:**
   - The `SettingsPage` function is an **asynchronous** function component.
   - It awaits the result of the `auth()` function.

3. **Rendering:**
   - Inside the component, it renders a `<div>` that displays the result of `JSON.stringify(session)`.

4. **Session Handling:**
   - The `session` variable is assigned the result of `await auth()`.
   - The `auth()` function is responsible for fetching or managing user authentication data.

5. **Output:**
   - The rendered output will show the stringified `session` object within a `<div>`.

When we load the page at `localhost:3000/settings` we should see that the `session` value is `null` because the user is not signed-in and authenticated.

### How do we protect the routes?

If the user is signed-out they should not be able to access the settings page.

### routes.ts

First let's create a `routes.ts` file at the root of the application. The file will contain various routes and endpoints. For now create two arrays which contain public routes and protected routes respectively.

feat(routes): Implement access control routes
feat(routes): Define global array for publicRoutes
feat(routes): Define array for protected routes

`routes.ts`
```ts
/**
 * An array of public routes accessible to all users.
 * These routes do not require authentication.
 * @type {string[]}
 */
export const publicRoutes: string[] = [
  "/",
];

/**
 * An array of protected routes that require authentication.
 * @type {string[]}
 */
export const protectedRoutes: string[] = [
  "/auth/signin",
  "/auth/signup",
];
```

In summary, `publicRoutes` are open to everyone, while `protectedRoutes` are accessible only to authenticated users. These definitions help organize our application's routing and ensure proper access control.

1. **`publicRoutes`:**
   - These are routes accessible to all users, regardless of whether they are authenticated or not.
   - Typically, public routes include pages like the home page, landing pages, or informational content that doesn't require authentication.
   - Examples:
     - `/`: The root/home page.
     - `/about`: An "About Us" page.
     - `/contact`: A contact form.
   - By defining these routes, we ensure that unauthenticated users can access them without any restrictions.

2. **`protectedRoutes`:**
   - These routes require user authentication. Only authenticated users can access them.
   - Protected routes often include user-specific content, dashboards, account settings, or any feature that requires authentication.
   - Examples:
     - `/profile`: User profile page.
     - `/dashboard`: User dashboard with personalized data.
     - `/settings`: Account settings page.
   - By defining these routes, we restrict access to authenticated users only, ensuring that sensitive or personalized information remains secure.

Let's also add a prefix for the route `/api/auth` which we can name `authApiRoute`. We add this special case to ensure that we always allow the API to be available to all users regardless of authentication.

feat(routes): Add API authentication base endpoint

`routes.ts`
```ts
/**
 * The base endpoint for API authentication routes.
 * Routes that start with this prefix are dedicated to API authentication.
 * @type {string}
 */
export const apiAuthRoute: string = "/api/auth";
```

feat(auth): Define default sign-in redirect path

```ts
/**
 * The default redirect path after user sign-in and authentication.
 * This path is used when no specific redirect is provided.
 * @type {string}
 */
export const DEFAULT_SIGNIN_REDIRECT: string = "/settings";
```

### Route authorization

feat(auth): Add route authorization in middleware
feat(auth): Implement custom middleware for routes

Back in `middleware.ts` let's first extract the `pathname` from the `req.nextUrl` to improve code clarity:

refactor(auth): Improve readability in middleware

This commit refactors the custom middleware by extracting the pathname from the request object. The use of a single `pathname` variable throughout the logic improves code clarity and readability.

`middleware.ts`
```ts
import { NextRequest } from "next/server";
import NextAuth from "next-auth";
import authConfig from "@/auth.config";
 
const { auth } = NextAuth(authConfig);

export default auth(async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl; // Destructure the pathname from req.nextUrl

  console.log("ROUTE: ", pathname); // Debug statement that logs current route

});

const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
```

Modify the `auth()` function in the middleware to handle different routes.

feat(auth): Allow api auth routes in middleware

```ts
import { NextRequest } from "next/server";
import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { apiAuthRoute } from "@/routes";
 
const { auth } = NextAuth(authConfig);

export default auth(async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl; // Destructure the pathname from req.nextUrl

  const isApiAuthRoute = pathname.startsWith(apiAuthRoute);
});
```

feat(auth): Add public routes to custom middleware

```ts
import { 
  apiAuthRoute, 
  publicRoutes 
} from "@/routes";
 
const { auth } = NextAuth(authConfig);

export default auth(async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isApiAuthRoute = pathname.startsWith(apiAuthRoute);
  const isPublicRoute = publicRoutes.includes(pathname);
});
```

feat(auth): Add protected routes to middleware

```ts
import { 
  apiAuthRoute, 
  protectedRoutes, 
  publicRoutes 
} from "@/routes";
 
const { auth } = NextAuth(authConfig);

export default auth(async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isApiAuthRoute = pathname.startsWith(apiAuthRoute);
  const isPublicRoute = publicRoutes.includes(pathname);
  const isProtectedRoute = protectedRoutes.includes(pathname);

});
```

Now let's start the authorization logic.

feat(auth): Allow access to API auth routes

```ts
export default auth(async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl; // Destructure the pathname from req.nextUrl

  console.log("ROUTE: ", pathname); // Debug statement that logs current route

  const isApiAuthRoute = pathname.startsWith(apiAuthRoute);
  const isPublicRoute = publicRoutes.includes(pathname);
  const isProtectedRoute = protectedRoutes.includes(pathname);

  if(isApiAuthRoute) {
    // Allow access to /api/auth routes
    return;
  }

});
```

feat: Handle protected routes in middleware

```ts
import {
  apiAuthRoute, 
  DEFAULT_SIGNIN_REDIRECT,
  protectedRoutes, 
  publicRoutes 
} from "@/routes";
import { getSession } from "next-auth/react";
 
const { auth } = NextAuth(authConfig);

export default auth(async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl; // Destructure the pathname from req.nextUrl

  console.log("ROUTE: ", pathname); // Debug statement that logs current route

  const isApiAuthRoute = pathname.startsWith(apiAuthRoute);
  const isPublicRoute = publicRoutes.includes(pathname);
  const isProtectedRoute = protectedRoutes.includes(pathname);

  if(isApiAuthRoute) {
    // Allow access to /api/auth routes
    return;
  }
  
  if(isProtectedRoute) {
    // Check if the user is signed in
    const session = await getSession({ req });
    if(!session) {
      return Response.redirect(new URL(DEFAULT_SIGNIN_REDIRECT, req.nextUrl));
    }
    return;
  }
});
```

Let's wrap it middleware by redirecting when not signed-in and on a public route

feat: Add route authorization logic to middleware
feat(auth): Handle public routes in middleware

```ts
import { NextRequest } from "next/server";
import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import {
  apiAuthRoute, 
  DEFAULT_SIGNIN_REDIRECT,
  protectedRoutes, 
  publicRoutes 
} from "@/routes";
import { getSession } from "next-auth/react";
 
const { auth } = NextAuth(authConfig);

export default auth(async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl; // Destructure the pathname from req.nextUrl

  console.log("ROUTE: ", pathname); // Debug statement that logs current route

  const isApiAuthRoute = pathname.startsWith(apiAuthRoute);
  const isPublicRoute = publicRoutes.includes(pathname);
  const isProtectedRoute = protectedRoutes.includes(pathname);

  // Check if the user is signed in
  const session = await getSession({ req });

  if(isApiAuthRoute) {
    // Allow access to /api/auth routes
    return;
  }
  
  if(isProtectedRoute) {
    if(!session) {
      return Response.redirect(new URL(DEFAULT_SIGNIN_REDIRECT, req.nextUrl));
    }
    return;
  }

  // If not signed-in and not on a public route, then redirect
  if (!session && !isPublicRoute) {
    return Response.redirect(new URL(DEFAULT_SIGNIN_REDIRECT, req.nextUrl));
  }

  // Allow every other route
  return;
});

const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
```

fix(middleware): Remove getSession reliance

```ts
import { NextRequest, NextResponse } from "next/server";
import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import {
  apiAuthRoute, 
  DEFAULT_SIGNIN_REDIRECT,
  protectedRoutes, 
  publicRoutes 
} from "@/routes";

// Use only one of the two middleware options below
// 1. Use middleware directly
// export const { auth: middleware } = NextAuth(authConfig)
 
// 2. Wrapped middleware option
const { auth } = NextAuth(authConfig);

export default auth(async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  console.log("ROUTE: ", pathname);

  const isApiAuthRoute = pathname.startsWith(apiAuthRoute);
  const isPublicRoute = publicRoutes.includes(pathname);
  const isProtectedRoute = protectedRoutes.includes(pathname);

  if (isApiAuthRoute || isPublicRoute) {
    // Allow access to /api/auth routes and public routes
    return NextResponse.next();
  }

  if (isProtectedRoute) {
    // Redirect to sign-in page if not authenticated
    return NextResponse.redirect(DEFAULT_SIGNIN_REDIRECT);
  }

  // Allow every other route
  return NextResponse.next();
});

const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
```

#### Remove database functionality and support from `next-auth` in the **middleware**

Following the steps found in the [authjs prisma edge compatibility split config solution](https://authjs.dev/guides/edge-compatibility#the-solution), the bottom note states:

It is important to note here that we've now removed database functionality and support from `next-auth` **in the middleware**. That means that we won't be able to fetch the session or other info like the user's account details, etc. while executing code in middleware. That means you'll want to rely on checks like the one demonstrated above in the `/app/protected/page.tsx` file to ensure you're [protecting your routes effectively](https://authjs.dev/getting-started/session-management/protecting). Middleware is then still used for bumping the session cookie's expiry time, for example.

feat(middleware): Remove database functionality

- Removed reliance on database functionality in middleware to support Edge Runtime.
- Middleware no longer fetches session or user details.
- Implemented route protection checks instead.

```ts
import NextAuth from "next-auth";
import authConfig from "@/auth.config";

// 1. Use middleware directly
export const { auth: middleware } = NextAuth(authConfig)

const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
```

refactor: Decouple middleware from database

- Removed database functionality and session fetching from middleware.
- Implemented route protection checks to ensure secure access.
- Enhanced compatibility with Edge Runtime by eliminating Node.js API dependencies.

The middleware change we're implementing can be considered a form of **decoupling**. By removing the reliance on database functionality and session fetching within the middleware, we're reducing the direct dependencies between the middleware and the database. This makes the middleware more modular and adaptable, especially for environments like the Edge Runtime where certain Node.js APIs aren't supported.

Decoupling in this context helps to isolate concerns, allowing the middleware to focus on route protection and session management without being tightly coupled to the database operations. This can lead to a more maintainable and scalable codebase.



`routes.ts`
```ts
/**
 * An array of protected routes that require authentication.
 * @type {string[]}
 */
export const protectedRoutes: string[] = [
  "/auth/signin",
  "/auth/signup",
];
```

