import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import authService from "../../services/authService";
import { getErrorMessage } from "../../errors/axiosError";
import type { LoginInput, RegisterInput } from "../../../../shared/types/user";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials: LoginInput, thunkAPI) => {
    try {
      const data = await authService.login(credentials);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error, "Login Failed"));
    }
  },
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData: RegisterInput, thunkAPI) => {
    try {
      const data = await authService.register(userData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, "Registration Failed"),
      );
    }
  },
);

export const getMe = createAsyncThunk("auth/getMe", async (_, thunkAPI) => {
  try {
    return await authService.getMe();
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return thunkAPI.rejectWithValue(null);
    }
    return thunkAPI.rejectWithValue(getErrorMessage(error, "Session Expired"));
  }
});

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      return await authService.logout();
    } catch (error) {
      return thunkAPI.rejectWithValue("Logout failed");
    }
  },
);

export const updateName = createAsyncThunk(
  "auth/updateName",
  async (name: string, thunkAPI) => {
    try {
      return await authService.updateName(name);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, "Failed to update name"),
      );
    }
  },
);

export const updateEmail = createAsyncThunk(
  "auth/updateEmail",
  async (email: string, thunkAPI) => {
    try {
      return await authService.updateEmail(email);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, "Failed to update email"),
      );
    }
  },
);

export const updateUsername = createAsyncThunk(
  "auth/updateUsername",
  async (username: string, thunkAPI) => {
    try {
      return await authService.updateUsername(username);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, "Failed to update username"),
      );
    }
  },
);

export const updatePhone = createAsyncThunk(
  "auth/updatePhone",
  async (phone: string, thunkAPI) => {
    try {
      return await authService.updatePhone(phone);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, "Failed to update phone"),
      );
    }
  },
);

export const updateCity = createAsyncThunk(
  "auth/updateCity",
  async (city: string, thunkAPI) => {
    try {
      return await authService.updateCity(city);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, "Failed to update city"),
      );
    }
  },
);

export const updateBio = createAsyncThunk(
  "auth/updateBio",
  async (bio: string, thunkAPI) => {
    try {
      return await authService.updateBio(bio);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, "Failed to update bio"),
      );
    }
  },
);

export const deleteAccount = createAsyncThunk(
  "auth/deleteAccount",
  async (_, thunkAPI) => {
    try {
      return await authService.deleteAccount();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, "Failed to delete account"),
      );
    }
  },
);

export const fetchPublicProfile = createAsyncThunk(
  "auth/fetchPublicProfile",
  async (username: string, thunkAPI) => {
    try {
      return await authService.getPublicProfile(username);
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error, "User not found"));
    }
  },
);
