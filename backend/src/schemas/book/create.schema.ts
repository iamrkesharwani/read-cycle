import z from 'zod';
import {
  authorSchema,
  conditionSchema,
  coverImageUrlSchema,
  descriptionSchema,
  genreSchema,
  objectIdSchema,
  titleSchema,
} from './book.schema.js';

export const createBookSchema = z.object({
  ownerId: objectIdSchema,
  title: titleSchema,
  author: authorSchema,
  genre: genreSchema,
  condition: conditionSchema,
  description: descriptionSchema,
  coverImageUrl: coverImageUrlSchema,
});

export type CreateBookInput = z.infer<typeof createBookSchema>;
