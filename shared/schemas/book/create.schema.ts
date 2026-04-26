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

const editImagesSchema = z
  .array(
    z.union([
      z.string().min(1),
      z
        .instanceof(File)
        .refine((f) => f.size <= 5 * 1024 * 1024, 'Image must be less than 5MB')
        .refine(
          (f) =>
            [
              'image/jpeg',
              'image/jpg',
              'image/png',
              'image/webp',
              'image/avif',
            ].includes(f.type),
          'Only .jpg, .jpeg, .png, .webp and .avif formats are supported'
        ),
    ])
  )
  .min(2, 'At least 2 images are required')
  .max(4, 'You can upload a maximum of 4 images');

export const editFormSchema = serverBookSchema.extend({
  images: editImagesSchema,
});

export const draftBookSchema = serverBookSchema.partial();
export type CreateBookInput = z.infer<typeof fullFormSchema>;
export type EditBookInput = z.infer<typeof editFormSchema>;
export type ServerBookInput = z.infer<typeof serverBookSchema>;
