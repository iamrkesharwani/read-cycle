import api from './api';
import type {
  AuthResponse,
  LoginInput,
  RegisterInput,
  User,
} from '../../../shared/types/user';

const authService = {
  register: async (userData: RegisterInput): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', userData);
    return response.data;
  },

  login: async (credentials: LoginInput): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  },

  getMe: async (): Promise<User> => {
    const response = await api.get<User>('/auth/me');
    return response.data;
  },
};

export default authService;
