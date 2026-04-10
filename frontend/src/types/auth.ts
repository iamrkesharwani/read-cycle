export interface User {
  id: string;
  name: string;
  email: string;
  city: string;
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
  token: string | null;
  isLoading: boolean;
  error: string | null | undefined;
}
