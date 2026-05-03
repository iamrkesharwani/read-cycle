import { createSlice, isRejected, isPending } from "@reduxjs/toolkit";
import {
  createBookListing,
  deleteBookListing,
  fetchBookById,
  fetchInterestedUsers,
  fetchPublicUserListings,
  fetchUserBooks,
  searchBookListings,
  swapBookListing,
  toggleBookInterest,
  updateBookListing,
  updateListingStatus,
} from "./bookThunk";
import type { BookState } from "../../../../shared/types/book";

const initialState: BookState = {
  books: [],
  pagination: {
    page: 1,
    total: 0,
    totalPages: 1,
  },
  isLoading: false,
  currentBook: null,
  error: null,
  success: false,
  interestedUsers: [],
  isInterested: false,
};

const bookThunks = [
  createBookListing,
  updateBookListing,
  fetchUserBooks,
  fetchBookById,
  deleteBookListing,
  swapBookListing,
  updateListingStatus,
  searchBookListings,
  fetchPublicUserListings,
] as const;

const bookSlice = createSlice({
  name: "books",
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
        state.error = null;
      })
      .addCase(swapBookListing.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const book = state.books.find((b) => b._id === action.payload);
        if (book) {
          book.isSwapped = true;
          book.status = "inactive";
        }
      })
      .addCase(updateListingStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const book = state.books.find((b) => b._id === action.payload.id);
        if (book) {
          book.status = action.payload.status;
        }
      })
      .addCase(searchBookListings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.books = action.payload.data;
        state.pagination = action.payload.pagination;
        state.error = null;
      })
      .addCase(fetchPublicUserListings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.books = action.payload;
        state.error = null;
      })
      .addCase(toggleBookInterest.fulfilled, (state, action) => {
        state.isInterested = action.payload.interested;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchInterestedUsers.fulfilled, (state, action) => {
        state.interestedUsers = action.payload;
        state.isLoading = false;
        state.error = null;
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
