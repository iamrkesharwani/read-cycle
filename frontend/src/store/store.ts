import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import bookReducer from "./book/bookSlice";
import swapReducer from "./swap/swapSlice";
import chatReducer from "./chat/chatSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    book: bookReducer,
    swap: swapReducer,
    chat: chatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
