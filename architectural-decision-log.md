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

