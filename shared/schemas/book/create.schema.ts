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

export const fullFormSchema = serverBookSchema.extend(stepOneSchema.shape);

export const draftBookSchema = serverBookSchema.partial();
export type CreateBookInput = z.infer<typeof fullFormSchema>;
export type ServerBookInput = z.infer<typeof serverBookSchema>;
