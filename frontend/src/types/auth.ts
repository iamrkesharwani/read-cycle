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
