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