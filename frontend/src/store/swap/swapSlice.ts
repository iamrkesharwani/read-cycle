import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import type { SwapState } from "../../../../shared/types/swap";
import { proposeSwap } from "./swapThunk";

const initialState: SwapState = {
  isLoading: false,
  error: null,
  success: false,
};

const swapThunks = [proposeSwap] as const;

const swapSlice = createSlice({
  name: "swap",
  initialState,
  reducers: {
    resetSwapStatus: (state) => {
      state.isLoading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(proposeSwap.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        state.success = true;
      })
      .addMatcher(isPending(...swapThunks), (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addMatcher(isRejected(...swapThunks), (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export const { resetSwapStatus } = swapSlice.actions;
export default swapSlice.reducer;
