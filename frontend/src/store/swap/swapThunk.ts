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

export const fetchMySwaps = createAsyncThunk(
  "swap/fetchMySwaps",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/swaps/me");
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error.response?.data?.message, "Failed to load swaps"),
      );
    }
  },
);

export const respondToSwap = createAsyncThunk(
  "swap/respondToSwap",
  async (
    payload: { id: string; status: "accepted" | "rejected" | "canceled" },
    thunkAPI,
  ) => {
    try {
      const response = await api.patch(`/swaps/${payload.id}/status`, {
        status: payload.status,
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error.response?.data?.message, "Failed to update swap"),
      );
    }
  },
);
