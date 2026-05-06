import { ObjectId } from 'mongodb';
import type { SwapStatus } from '../../../shared/types/swap.js';

export interface SwapDoc {
  _id?: ObjectId;
  proposerId: ObjectId;
  receiverId: ObjectId;
  offeredBookId: ObjectId;
  requestedBookId: ObjectId;
  status: SwapStatus;
  createdAt: Date | string;
  updatedAt: Date | string;
}
