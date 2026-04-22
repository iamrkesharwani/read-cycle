import z from 'zod';
import {
  authorSchema,
  conditionSchema,
  bookImagesSchema,
  descriptionSchema,
  genreSchema,
  titleSchema,
} from './book.schema.js';

export const stepOneSchema = z.object({
  images: bookImagesSchema,
});

export const stepTwoSchema = z.object({
  title: titleSchema,
  author: authorSchema,
});

export const stepThreeSchema = z.object({
  genre: genreSchema,
  condition: conditionSchema,
});

export const stepFourSchema = z.object({
  description: descriptionSchema,
});

export const serverBookSchema = stepTwoSchema
  .extend(stepThreeSchema.shape)
  .extend(stepFourSchema.shape);

export const createBookSchema = z.object({
  title: titleSchema,
  author: authorSchema,
  genre: genreSchema,
  condition: conditionSchema,
  description: descriptionSchema,
  images: bookImagesSchema,
});

export const draftBookSchema = serverBookSchema.partial();
export type CreateBookInput = z.infer<typeof createBookSchema>;
export type ServerBookInput = z.infer<typeof serverBookSchema>;
