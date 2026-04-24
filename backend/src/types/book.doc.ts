import { ObjectId, type Document } from 'mongodb';
import type { Book } from '../../../shared/types/book.js';

export interface BookDoc
  extends Document, Omit<Book, '_id' | 'ownerId' | 'createdAt' | 'updatedAt'> {
  _id?: ObjectId;
  ownerId: ObjectId;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}
