import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import { getErrorMessage } from "../../errors/axiosError";

export const proposeSwap = createAsyncThunk(
  "swap/proposeSwap",
  async (
    payload: { offeredBookId: string; requestedBookId: string },
    thunkAPI,
  ) => {
    try {
      const response = await api.post("/swaps/propose", payload);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(
          error.response?.data?.message,
          "Failed to send swap proposal",
        ),
      );
    }
  },
);
