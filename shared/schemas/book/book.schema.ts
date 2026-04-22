import { z } from 'zod';
import { GENRES, CONDITIONS } from '../../types/book.js';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/avif',
];

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

const imageFileSchema = z
  .instanceof(File)
  .refine((file) => file.size <= MAX_FILE_SIZE, 'Image must be less than 5MB')
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
    'Only .jpg, .jpeg, .png, .webp and .avif formats are supported'
  );

export const bookImagesSchema = z
  .array(imageFileSchema)
  .min(2, 'At least 2 images are required')
  .max(4, 'You can upload a maximum of 4 images');
