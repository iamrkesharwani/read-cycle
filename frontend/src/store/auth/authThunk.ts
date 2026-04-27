import { createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../services/authService';
import { getErrorMessage } from '../../errors/axiosError';
import type { LoginInput, RegisterInput } from '../../../../shared/types/user';

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
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
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

export const updateName = createAsyncThunk(
  'auth/updateName',
  async (name: string, thunkAPI) => {
    try {
      return await authService.updateName(name);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, 'Failed to update name')
      );
    }
  }
);

export const updateEmail = createAsyncThunk(
  'auth/updateEmail',
  async (email: string, thunkAPI) => {
    try {
      return await authService.updateEmail(email);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, 'Failed to update email')
      );
    }
  }
);

export const updateUsername = createAsyncThunk(
  'auth/updateUsername',
  async (username: string, thunkAPI) => {
    try {
      return await authService.updateUsername(username);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, 'Failed to update username')
      );
    }
  }
);

export const updatePhone = createAsyncThunk(
  'auth/updatePhone',
  async (phone: string, thunkAPI) => {
    try {
      return await authService.updatePhone(phone);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, 'Failed to update phone')
      );
    }
  }
);

export const updateCity = createAsyncThunk(
  'auth/updateCity',
  async (city: string, thunkAPI) => {
    try {
      return await authService.updateCity(city);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, 'Failed to update city')
      );
    }
  }
);

export const updateBio = createAsyncThunk(
  'auth/updateBio',
  async (bio: string, thunkAPI) => {
    try {
      return await authService.updateBio(bio);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, 'Failed to update bio')
      );
    }
  }
);
