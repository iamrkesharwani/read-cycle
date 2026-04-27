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

export const updateUsernameSchema = z.object({
  username: usernameSchema,
});

export type UpdateUsernameType = z.infer<typeof updateUsernameSchema>;
