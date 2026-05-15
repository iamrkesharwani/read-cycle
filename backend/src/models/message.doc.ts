import type { ObjectId } from 'mongodb';

export interface MessageDoc {
  _id?: ObjectId;
  swapId: ObjectId;
  senderId: ObjectId;
  text: string;
  createdAt: Date;
}
