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

Similar to `SignInSchema`, with just another added field of name

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
  name: z.string().min(1, {
    message: 'Please enter a valid name',
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
  name: z.string().min(1, {
    message: 'Please enter a valid name',
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
  name: z.string().min(1, {
    message: 'Please enter a valid name',
  }),
});
```

### 2. Define a SignUp form instance

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

export default function SignUpPage() {

  // 1. Define the sign-up form.
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  return (
    <div>SignUpPage</div>
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

```tsx
  function onSubmit(values: z.infer<typeof SignUpSchema>) {
    console.log(values);
    setSuccessMessage("");
    setErrorMessage("");
    startTransition(() => {
      signUp(values)
        .then((data) => {
          setSuccessMessage(data.success);
          setErrorMessage(data.error);
        });
    });
  }
```