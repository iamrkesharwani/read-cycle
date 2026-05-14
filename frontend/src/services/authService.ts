import api from "./api";
import type {
  AuthResponse,
  LoginInput,
  RegisterInput,
  User,
} from "../../../shared/types/user";

const authService = {
  register: async (userData: RegisterInput): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/register", userData);
    return response.data;
  },

  login: async (credentials: LoginInput): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/login", credentials);
    return response.data;
  },

  logout: async () => {
    await api.post("/auth/logout");
    return null;
  },

  getMe: async (): Promise<User> => {
    const response = await api.get<User>("/auth/me");
    return response.data;
  },

  updateName: async (name: string): Promise<{ name: string }> => {
    const { data } = await api.patch("/auth/name", { name });
    return data;
  },

  updateEmail: async (email: string): Promise<{ email: string }> => {
    const { data } = await api.patch("/auth/email", { email });
    return data;
  },

  updateUsername: async (username: string) => {
    const { data } = await api.patch("/auth/username", { username });
    return data as { username: string; usernameUpdatedAt: string };
  },

  updatePhone: async (phone: string) => {
    const { data } = await api.patch("/auth/phone", { phone });
    return data as { phone: string };
  },

  updateCity: async (city: string): Promise<{ city: string }> => {
    const { data } = await api.patch("/auth/city", { city });
    return data;
  },

  updateBio: async (bio: string): Promise<{ bio: string }> => {
    const { data } = await api.patch("/auth/bio", { bio });
    return data;
  },

  deleteAccount: async (): Promise<{ message: string }> => {
    const { data } = await api.delete("/auth/account");
    return data;
  },

  getPublicProfile: async (username: string): Promise<User> => {
    const response = await api.get<User>(`auth/profile/${username}`);
    return response.data;
  },
};

export default authService;
