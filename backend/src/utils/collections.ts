import { connectDb } from '../config/db.js';
import type { UserDocument } from '../../../shared/types/user.js';
import type { Collection, Document } from 'mongodb';
import type { SwapRequest } from '../../../shared/types/swap.js';
import type { Message } from '../../../shared/types/chat.js';

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

export const getSwapsCollection = async () => {
  const db = await connectDb();
  return db.collection<SwapRequest>('swaps');
};

export const getMessagesCollection = async () => {
  const db = await connectDb();
  return db.collection<Message>('messages');
};
