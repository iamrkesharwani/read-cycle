import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import bookReducer from "./book/bookSlice";
import swapReducer from "./swap/swapSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    book: bookReducer,
    swap: swapReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
