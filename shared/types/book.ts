import { ObjectId } from 'mongodb';

export const GENRES = [
  'Fiction',
  'Non-Fiction',
  'Mystery',
  'Sci-Fi',
  'Fantasy',
  'Biography',
  'History',
  'Horror',
  'Self-Help',
  'Academic',
  'Other',
] as const;

export const CONDITIONS = ['New', 'Like New', 'Used', 'Worn'] as const;

export type BookGenre = (typeof GENRES)[number];
export type BookCondition = (typeof CONDITIONS)[number];

export interface Book {
  _id?: ObjectId;
  ownerId: ObjectId;
  title: string;
  author: string;
  genre: BookGenre;
  condition: BookCondition;
  description: string;
  isSwapped: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface BookState {
  books: Book[];
  isLoading: boolean;
  error: string | null | undefined;
  success: boolean;
}
