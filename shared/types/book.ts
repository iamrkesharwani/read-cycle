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
export type BookStatus = 'draft' | 'published' | 'inactive';

export interface Book {
  _id: string;
  ownerId: string;
  owner?: { name: string; username?: string };
  title: string;
  author: string;
  genre?: BookGenre;
  city?: string;
  condition?: BookCondition;
  description: string;
  images: string[];
  isSwapped: boolean;
  status: BookStatus;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface BookState {
  books: Book[];
  pagination: {
    total: number;
    page: number;
    totalPages: number;
  };
  isLoading: boolean;
  currentBook: null | Book;
  error: string | null | undefined;
  success: boolean;
  interestedUsers: any[];
  isInterested: boolean;
}
