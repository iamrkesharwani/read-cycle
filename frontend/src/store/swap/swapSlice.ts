import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import type {
  PopulatedSwapRequest,
  SwapState,
} from "../../../../shared/types/swap";
import { fetchMySwaps, proposeSwap, respondToSwap } from "./swapThunk";

interface FullSwapState extends SwapState {
  received: PopulatedSwapRequest[];
  sent: PopulatedSwapRequest[];
  listLoading: boolean;
  listError: string | null;
}

const initialState: FullSwapState = {
  isLoading: false,
  error: null,
  success: false,
  received: [],
  sent: [],
  listLoading: false,
  listError: null,
};

const swapThunks = [proposeSwap, respondToSwap] as const;

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
      .addCase(fetchMySwaps.pending, (state) => {
        state.listLoading = true;
        state.listError = null;
      })
      .addCase(fetchMySwaps.fulfilled, (state, action) => {
        state.listLoading = false;
        state.received = action.payload.received;
        state.sent = action.payload.sent;
      })
      .addCase(fetchMySwaps.rejected, (state, action) => {
        state.listLoading = false;
        state.listError = action.payload as string;
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
