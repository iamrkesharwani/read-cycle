import { connectDb } from '../config/db.js';
import type { UserDocument } from '../../../shared/types/user.js';
import type { Collection, Document } from 'mongodb';

export const getUsersCollection = async () => {
  const db = await connectDb();
  return db.collection<UserDocument>('users');
};

export const getBooksCollection = async <T extends Document = any>(): Promise<
  Collection<T>
> => {
  const db = await connectDb();
  return db.collection<T>('books');
};

export const getInterestsCollection = async <
  T extends Document = any,
>(): Promise<Collection<T>> => {
  const db = await connectDb();
  return db.collection<T>('interests');
};
