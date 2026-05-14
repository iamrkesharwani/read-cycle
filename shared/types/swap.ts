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
  'offeredBookId' | 'requestedBookId'
> {
  offeredBook: { _id: string; title: string; author: string; images: string[] };
  requestedBook: {
    _id: string;
    title: string;
    author: string;
    images: string[];
  };
  proposer: { _id: string; username: string; name: string };
  receiver: { _id: string; username: string; name: string };
}

export interface SwapState {
  isLoading: boolean;
  error: string | null;
  success: boolean;
}
