import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import { getErrorMessage } from '../../errors/axiosError';
import type { CreateBookInput } from '../../../../shared/schemas/book/create.schema';

export const createBookListing = createAsyncThunk(
  'book/createBookListing',
  async (data: CreateBookInput, thunkAPI) => {
    try {
      const response = await api.post('/books/create', data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, 'Failed to create listing')
      );
    }
  }
);
