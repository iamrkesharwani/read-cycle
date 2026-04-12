import { createSlice, isRejected, isAnyOf, isPending } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createBookListing } from './bookThunk';
import type { Book, BookState } from '../../../../shared/types/book';

const initialState: BookState = {
  books: [],
  isLoading: false,
  error: null,
  success: false,
};

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
      .addMatcher(
        isAnyOf(createBookListing.fulfilled),
        (state, action: PayloadAction<{ book: Book }>) => {
          state.isLoading = false;
          state.success = true;
          state.error = null;
          state.books.unshift(action.payload.book);
        }
      )
      .addMatcher(isPending(createBookListing), (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addMatcher(isRejected(createBookListing), (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export const { resetBookStatus } = bookSlice.actions;
export default bookSlice.reducer;
