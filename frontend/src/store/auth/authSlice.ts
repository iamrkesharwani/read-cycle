import { createSlice, isRejected, isAnyOf, isPending } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  getMe,
  loginUser,
  registerUser,
  updateName,
  updateEmail,
  updateUsername,
  updatePhone,
  updateCity,
  updateBio,
  fetchPublicProfile,
  logoutUser,
} from "./authThunk";
import type {
  AuthState,
  User,
  AuthResponse,
} from "../../../../shared/types/user";

const initialState: AuthState = {
  user: null,
  publicProfile: null,
  isLoading: true,
  error: null,
};

const authThunks = [
  loginUser,
  registerUser,
  getMe,
  fetchPublicProfile,
  logoutUser,
] as const;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    sessionChecked: (state) => {
      state.isLoading = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isLoading = false;
      })
      .addCase(getMe.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(
        updateName.fulfilled,
        (state, action: PayloadAction<{ name: string }>) => {
          if (state.user) state.user.name = action.payload.name;
        },
      )
      .addCase(
        updateEmail.fulfilled,
        (state, action: PayloadAction<{ email: string }>) => {
          if (state.user) state.user.email = action.payload.email;
        },
      )
      .addCase(
        updateUsername.fulfilled,
        (
          state,
          action: PayloadAction<{
            username: string;
            usernameUpdatedAt: string;
          }>,
        ) => {
          if (state.user) {
            state.user.username = action.payload.username;
            state.user.usernameUpdatedAt = new Date(
              action.payload.usernameUpdatedAt,
            );
          }
        },
      )
      .addCase(
        updatePhone.fulfilled,
        (state, action: PayloadAction<{ phone: string }>) => {
          if (state.user) state.user.phone = action.payload.phone;
        },
      )
      .addCase(
        updateCity.fulfilled,
        (state, action: PayloadAction<{ city: string }>) => {
          if (state.user) state.user.city = action.payload.city;
        },
      )
      .addCase(
        updateBio.fulfilled,
        (state, action: PayloadAction<{ bio: string }>) => {
          if (state.user) state.user.bio = action.payload.bio;
        },
      )
      .addCase(fetchPublicProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.publicProfile = action.payload;
      })
      .addMatcher(
        isAnyOf(loginUser.fulfilled, registerUser.fulfilled),
        (state, action: PayloadAction<AuthResponse>) => {
          state.isLoading = false;
          state.user = action.payload.user;
        },
      )
      .addMatcher(isPending(...authThunks), (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(isRejected(...authThunks), (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        if (action.payload !== null) {
          state.error = action.payload as string;
        }
        if (action.type.includes("getMe")) {
          state.user = null;
        }
      });
  },
});

export const { sessionChecked } = authSlice.actions;
export default authSlice.reducer;
