import { createSlice, isRejected, isPending } from '@reduxjs/toolkit';
import {
  createBookListing,
  deleteBookListing,
  fetchBookById,
  fetchUserBooks,
  updateBookListing,
  updateListingStatus,
} from './bookThunk';
import type { BookState } from '../../../../shared/types/book';

const initialState: BookState = {
  books: [],
  isLoading: false,
  currentBook: null,
  error: null,
  success: false,
};

const bookThunks = [
  createBookListing,
  updateBookListing,
  fetchUserBooks,
  fetchBookById,
  deleteBookListing,
  updateListingStatus,
] as const;

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    resetBookStatus: (state) => {
      state.isLoading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBookListing.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(updateBookListing.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(fetchUserBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.books = action.payload;
        state.error = null;
      })
      .addCase(fetchBookById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentBook = action.payload;
        state.error = null;
      })
      .addCase(deleteBookListing.fulfilled, (state, action) => {
        state.isLoading = false;
        state.books = state.books.filter((b) => b._id !== action.payload);
        state.success = true;
      })
      .addCase(updateListingStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        const book = state.books.find((b) => b._id === action.payload.id);
        if (book) {
          book.status = action.payload.status; // Update the status locally
        }
      })
      .addMatcher(isPending(...bookThunks), (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addMatcher(isRejected(...bookThunks), (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export const { resetBookStatus } = bookSlice.actions;
export default bookSlice.reducer;
