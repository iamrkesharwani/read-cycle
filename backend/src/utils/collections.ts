import { connectDb } from '../config/db.js';
import type { Book } from '../../../shared/types/book.js';
import type { UserDocument } from '../../../shared/types/user.js';

export const getUsersCollection = async () => {
  const db = await connectDb();
  return db.collection<UserDocument>('users');
};

export const getBooksCollection = async () => {
  const db = await connectDb();
  return db.collection<Book>('books');
};
