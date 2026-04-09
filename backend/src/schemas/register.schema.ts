import { z } from 'zod';

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: 'Full name is required' })
    .min(3, {
      message: 'Full name must be at least 3 characters',
    })
    .max(100, { message: 'Full name cannot exceed 100 characters' }),

  email: z
    .string()
    .trim()
    .min(1, { message: 'Email address is required' })
    .max(100, {
      message: 'Email cannot exceed 100 characters',
    })
    .pipe(z.email({ message: 'Please enter a valid email address' })),

  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .max(20, { message: 'Password must be less than 20 characters' })
    .refine((val) => /[A-Z]/.test(val), {
      message: 'Password must contain at least one uppercase letter',
    })
    .refine((val) => /[a-z]/.test(val), {
      message: 'Password must contain at least one lowercase letter',
    })
    .refine((val) => /[0-9]/.test(val), {
      message: 'Password must contain at least one number',
    })
    .refine((val) => /[!@#$%^&*]/.test(val), {
      message: 'Password must contain at least one special character',
    }),

  city: z
    .string()
    .trim()
    .min(1, { message: 'City name is required' })
    .min(3, {
      message: 'City name must be at least 3 characters',
    })
    .max(50, {
      message: 'City name cannot exceed 50 characters',
    }),
});

export type RegisterInput = z.infer<typeof registerSchema>;
