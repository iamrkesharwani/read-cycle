import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import { getErrorMessage } from '../../errors/axiosError';

export const createBookListing = createAsyncThunk(
  'book/createBookListing',
  async (data: FormData, thunkAPI) => {
    try {
      const response = await api.post<{
        message: string;
        book: { _id: string };
      }>('/books/create', data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, 'Failed to create listing')
      );
    }
  }
);

export const fetchUserBooks = createAsyncThunk(
  'book/fetchUserBooks',
  async (_, thunkAPI) => {
    try {
      const response = await api.get('/books/me');
      return response.data.map((b: any) => ({
        ...b,
        images: b.imageUrls ?? [],
      }));
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, 'Failed to load your books')
      );
    }
  }
);

export const fetchBookById = createAsyncThunk(
  'book/fetchBookById',
  async (id: string, thunkAPI) => {
    try {
      const response = await api.get(`/books/${id}`);
      const data = response.data;
      console.log('raw book data:', data);
      return { ...data, images: data.imageUrls ?? [] };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, 'Failed to load listing details')
      );
    }
  }
);
