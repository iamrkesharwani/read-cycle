import z from 'zod';
import {
  authorSchema,
  conditionSchema,
  coverImageUrlSchema,
  descriptionSchema,
  genreSchema,
  titleSchema,
} from './book.schema.js';

export const updateBookSchema = z
  .object({
    title: titleSchema.optional(),
    author: authorSchema.optional(),
    genre: genreSchema.optional(),
    condition: conditionSchema.optional(),
    description: descriptionSchema.optional(),
    coverImageUrl: coverImageUrlSchema,
    isSwapped: z.boolean().optional(),
  })
  .refine((data) => Object.values(data).some((v) => v !== undefined), {
    message: 'At least one field must be provided for an update',
  });

export type UpdateBookInput = z.infer<typeof updateBookSchema>;
