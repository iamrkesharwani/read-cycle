import { createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../services/authService';
import { getErrorMessage } from '../../errors/axiosError';
import type { LoginInput, RegisterInput } from '../../types/auth';

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: LoginInput, thunkAPI) => {
    try {
      const data = await authService.login(credentials);
      localStorage.setItem('token', data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error, 'Login Failed'));
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: RegisterInput, thunkAPI) => {
    try {
      const data = await authService.register(userData);
      localStorage.setItem('token', data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, 'Registration Failed')
      );
    }
  }
);

export const getMe = createAsyncThunk('auth/getMe', async (_, thunkAPI) => {
  try {
    return await authService.getMe();
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error, 'Session Expired'));
  }
});
