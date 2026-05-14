import type { Document, ObjectId } from 'mongodb';

export interface InterestDoc extends Document {
  _id?: ObjectId;
  bookId: ObjectId;
  userId: ObjectId;
  createdAt: Date;
}
