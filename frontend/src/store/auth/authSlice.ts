import { createSlice, isRejected, isAnyOf, isPending } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { getMe, loginUser, registerUser } from './authThunk';
import type {
  AuthState,
  User,
  AuthResponse,
} from '../../../../shared/types/user';

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      state.user = null;
      state.token = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMe.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addMatcher(
        isAnyOf(loginUser.fulfilled, registerUser.fulfilled),
        (state, action: PayloadAction<AuthResponse>) => {
          state.isLoading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
        }
      )
      .addMatcher(isPending(loginUser, registerUser, getMe), (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(
        isRejected(loginUser, registerUser, getMe),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload as string;
          if (action.type.includes('getMe')) {
            state.user = null;
            state.token = null;
            localStorage.removeItem('token');
          }
        }
      );
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
