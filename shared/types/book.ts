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
  _id?: string;
  ownerId: string;
  title: string;
  author: string;
  genre: BookGenre;
  condition: BookCondition;
  description: string;
  isSwapped: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface BookState {
  books: Book[];
  isLoading: boolean;
  error: string | null | undefined;
  success: boolean;
}
