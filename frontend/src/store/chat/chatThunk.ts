import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ConversationItem, Message } from "./chatSlice";
import api from "../../services/api";
import { getErrorMessage } from "../../errors/axiosError";

export const fetchConversations = createAsyncThunk<
  ConversationItem[],
  void,
  { rejectValue: string }
>("chat/fetchConversations", async (_, thunkAPI) => {
  try {
    const response = await api.get("/chat/conversations");
    return response.data as ConversationItem[];
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      getErrorMessage(
        error.response?.data?.message,
        "Failed to load conversations",
      ),
    );
  }
});

export const fetchMessages = createAsyncThunk<
  Message[],
  string,
  { rejectValue: string }
>("chat/fetchMessages", async (swapId, thunkAPI) => {
  try {
    const response = await api.get(`/chat/${swapId}`);
    return response.data as Message[];
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      getErrorMessage(error.response?.data?.message, "Failed to load messages"),
    );
  }
});
