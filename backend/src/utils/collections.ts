import { connectDb } from '../config/db.js';
import type { User } from '../types/user.js';

export const getUsersCollection = async () => {
  const db = await connectDb();
  return db.collection<User>('users');
};
