import { z } from 'zod';
import { GENRES, CONDITIONS } from '../../types/book.js';

export const titleSchema = z
  .string()
  .min(1, 'Title is required')
  .max(150, 'Title is too long')
  .trim()
  .transform((val) => val.replace(/\s+/g, ' '));

export const authorSchema = z
  .string()
  .min(1, 'Author is required')
  .max(100, 'Author name is too long')
  .trim()
  .transform((val) => val.replace(/\s+/g, ' '));

export const genreSchema = z.enum(GENRES, {
  error: 'Please select a valid genre from the list',
});

export const conditionSchema = z.enum(CONDITIONS, {
  error: 'Please select a valid book condition',
});

export const descriptionSchema = z
  .string()
  .min(10, 'Description should be at least 10 characters')
  .max(1000, 'Description is too long')
  .trim();

export const coverImageUrlSchema = z
  .string()
  .max(2048, 'URL is too long')
  .check(z.url({ error: 'Cover image must be a valid URL' }))
  .refine(
    (url) => /\.(jpg|jpeg|png|webp|webp|avif)(\?.*)?$/i.test(url),
    'Cover image must link to a jpg, png, webp, or avif file'
  )
  .optional()
  .nullable();
