import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ConversationItem, Message } from "../../../../shared/types/chat";
import api from "../../services/api";
import { getErrorMessage } from "../../errors/axiosError";

export const fetchConversations = createAsyncThunk<ConversationItem[], void>(
  "chat/fetchConversations",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/chat/conversations");
      return response.data as ConversationItem[];
    } catch (error: any) {
      return rejectWithValue(
        getErrorMessage(
          error.response?.data?.message,
          "Failed to load conversations",
        ),
      );
    }
  },
);

export const fetchMessages = createAsyncThunk<Message[], string>(
  "chat/fetchMessages",
  async (swapId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/chat/${swapId}`);
      return response.data as Message[];
    } catch (error: any) {
      return rejectWithValue(
        getErrorMessage(
          error.response?.data?.message,
          "Failed to load messages",
        ),
      );
    }
  },
);
