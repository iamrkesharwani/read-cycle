import z from 'zod';
import {
  authorSchema,
  conditionSchema,
  bookImagesSchema,
  descriptionSchema,
  genreSchema,
  titleSchema,
} from './book.schema.js';

export const createBookSchema = z.object({
  title: titleSchema,
  author: authorSchema,
  genre: genreSchema,
  condition: conditionSchema,
  description: descriptionSchema,
  images: bookImagesSchema,
});

export type CreateBookInput = z.infer<typeof createBookSchema>;
