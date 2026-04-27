import { z } from 'zod';

export const usernameSchema = z
  .string()
  .trim()
  .min(3, { message: 'Username must be at least 3 characters' })
  .max(20, { message: 'Username cannot exceed 20 characters' })
  .regex(/^[a-z0-9][a-z0-9-]*[a-z0-9]$/i, {
    message:
      'Username can only contain letters, numbers, and hyphens, and cannot start or end with a hyphen',
  });

export const phoneSchema = z
  .string()
  .trim()
  .regex(/^[6-9]\d{9}$/, {
    message: 'Enter a valid 10-digit Indian mobile number',
  });

export const nameSchema = z
  .string()
  .trim()
  .min(3, { message: 'Full name must be at least 3 characters' })
  .max(100, { message: 'Full name cannot exceed 100 characters' });

export const emailSchema = z
  .string()
  .trim()
  .max(100, { message: 'Email cannot exceed 100 characters' })
  .pipe(z.email({ message: 'Please enter a valid email address' }));

export const citySchema = z
  .string()
  .trim()
  .min(3, { message: 'City must be at least 3 characters' })
  .max(50, { message: 'City cannot exceed 50 characters' });

export const bioSchema = z
  .string()
  .trim()
  .max(300, { message: 'Bio cannot exceed 300 characters' });
