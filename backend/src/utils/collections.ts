import { connectDb } from '../config/db.js';
import type { Book } from '../types/book.js';
import type { User } from '../types/user.js';

export const getUsersCollection = async () => {
  const db = await connectDb();
  return db.collection<User>('users');
};

export const getBooksCollection = async () => {
  const db = await connectDb();
  return db.collection<Book>('books');
};
