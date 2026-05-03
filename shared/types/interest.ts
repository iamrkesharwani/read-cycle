import { ObjectId } from 'mongodb';

export interface Interest {
  _id?: string | ObjectId;
  bookId: string | ObjectId;
  userId: string | ObjectId;
  createdAt: Date;
}

export interface ToggleInterestResponse {
  interested: boolean;
}

export interface InterestedUser {
  _id: string;
  name: string;
  username: string;
  city: string;
}
