import type { ObjectId } from 'mongodb';

export interface UserDocument {
  _id?: ObjectId;
  name: string;
  email: string;
  username?: string;
  usernameUpdatedAt?: Date;
  passwordHash: string;
  city: string;
  phone?: string;
  createdAt: Date;
  rating?: number;
  bio?: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  username?: string;
  usernameUpdatedAt?: Date;
  city: string;
  phone?: string;
  bio?: string;
  createdAt: Date;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface LoginInput {
  email: string;
  password?: string;
}

export interface RegisterInput extends LoginInput {
  name: string;
  city: string;
}

export interface AuthState {
  user: User | null;
  publicProfile: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null | undefined;
}
