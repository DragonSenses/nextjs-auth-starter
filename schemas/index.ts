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
