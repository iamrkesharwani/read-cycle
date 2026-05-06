import type { ObjectId } from 'mongodb';

export type SwapStatus = 'pending' | 'accepted' | 'rejected' | 'canceled';

export interface SwapRequest {
  _id: ObjectId | string;
  proposerId: ObjectId | string;
  receiverId: ObjectId | string;
  offeredBookId: ObjectId | string;
  requestedBookId: ObjectId | string;
  status: SwapStatus;
  createdAt: string;
  updatedAt: string;
}

export interface PopulatedSwapRequest extends Omit<
  SwapRequest,
  'proposerId' | 'receiverId' | 'offeredBookId' | 'requestedBookId'
> {
  proposer: { _id: string; username: string; name: string };
  receiver: { _id: string; username: string; name: string };
  offeredBook: { _id: string; title: string; images: string[] };
  requestedBook: { _id: string; title: string; images: string[] };
}
