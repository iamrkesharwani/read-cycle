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

export const updateBookListing = createAsyncThunk(
  'book/updateBookListing',
  async ({ id, data }: { id: string; data: FormData }, thunkAPI) => {
    try {
      await api.patch(`/books/${id}/edit`, data);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, 'Failed to update listing')
      );
    }
  }
);

export const fetchUserBooks = createAsyncThunk(
  'book/fetchUserBooks',
  async (_, thunkAPI) => {
    try {
      const response = await api.get('/books/me');
      return response.data;
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
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, 'Failed to load listing details')
      );
    }
  }
);

export const deleteBookListing = createAsyncThunk(
  'book/deleteBookListing',
  async (id: string, thunkAPI) => {
    try {
      await api.delete(`/books/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, 'Failed to delete listing')
      );
    }
  }
);

export const updateListingStatus = createAsyncThunk(
  'book/updateListingStatus',
  async (
    { id, status }: { id: string; status: 'published' | 'inactive' },
    thunkAPI
  ) => {
    try {
      await api.patch(`/books/${id}/status`, { status });
      return { id, status };
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error, 'Update failed'));
    }
  }
);
