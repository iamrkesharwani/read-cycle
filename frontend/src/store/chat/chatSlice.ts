import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { fetchConversations, fetchMessages } from "./chatThunk";

export interface Message {
  _id: string;
  senderId: string;
  text: string;
  createdAt: string;
  isPending?: boolean;
  isError?: boolean;
}

export interface ConversationItem {
  _id: string;
  proposerId: string;
  receiverId: string;
  status: "accepted";
  offeredBook: { _id: string; title: string; author: string; images: string[] };
  requestedBook: {
    _id: string;
    title: string;
    author: string;
    images: string[];
  };
  proposer: { _id: string; username: string; name: string };
  receiver: { _id: string; username: string; name: string };
  lastMessage?: {
    _id: string;
    text: string;
    createdAt: string;
    senderId: string;
  };
}

interface ChatState {
  conversations: ConversationItem[];
  conversationsLoading: boolean;
  conversationsError: string | null;
  messagesBySwap: Record<string, Message[]>;
  messagesLoadingMap: Record<string, boolean>;
  partnerOnline: Record<string, boolean>;
}

const initialState: ChatState = {
  conversations: [],
  conversationsLoading: false,
  conversationsError: null,
  messagesBySwap: {},
  messagesLoadingMap: {},
  partnerOnline: {},
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setMessages: (
      state,
      action: PayloadAction<{ swapId: string; messages: Message[] }>,
    ) => {
      state.messagesBySwap[action.payload.swapId] = action.payload.messages;
    },

    addMessage: (
      state,
      action: PayloadAction<{ swapId: string; message: Message }>,
    ) => {
      const { swapId, message } = action.payload;
      if (!state.messagesBySwap[swapId]) {
        state.messagesBySwap[swapId] = [];
      }
      state.messagesBySwap[swapId].push(message);
      const conv = state.conversations.find((c) => c._id === swapId);
      if (conv) {
        conv.lastMessage = {
          _id: message._id,
          text: message.text,
          createdAt: message.createdAt,
          senderId: message.senderId,
        };
      }
    },

    confirmMessage: (
      state,
      action: PayloadAction<{
        swapId: string;
        tempId: string;
        message: Message;
      }>,
    ) => {
      const { swapId, tempId, message } = action.payload;
      const messages = state.messagesBySwap[swapId];
      if (!messages) return;
      const idx = messages.findIndex((m) => m._id === tempId);
      if (idx !== -1) {
        messages[idx] = message;
      }
    },

    markMessageError: (
      state,
      action: PayloadAction<{ swapId: string; tempId: string }>,
    ) => {
      const { swapId, tempId } = action.payload;
      const messages = state.messagesBySwap[swapId];
      if (!messages) return;
      const msg = messages.find((m) => m._id === tempId);
      if (msg) {
        msg.isPending = false;
        msg.isError = true;
      }
    },

    setPartnerOnline: (
      state,
      action: PayloadAction<{
        swapId: string;
        isOnline: boolean;
      }>,
    ) => {
      state.partnerOnline[action.payload.swapId] = action.payload.isOnline;
    },

    updateConversationLastMessage: (
      state,
      action: PayloadAction<{
        swapId: string;
        lastMessage: ConversationItem["lastMessage"];
      }>,
    ) => {
      const conv = state.conversations.find(
        (c) => c._id === action.payload.swapId,
      );
      if (conv) conv.lastMessage = action.payload.lastMessage;
    },

    clearChat: (state, action: PayloadAction<string>) => {
      delete state.messagesBySwap[action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConversations.pending, (state) => {
        state.conversationsLoading = true;
        state.conversationsError = null;
      })
      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.conversationsLoading = false;
        state.conversations = action.payload;
      })
      .addCase(fetchConversations.rejected, (state, action) => {
        state.conversationsLoading = false;
        state.conversationsError = action.payload as string;
      })
      .addCase(fetchMessages.pending, (state, action) => {
        state.messagesLoadingMap[action.meta.arg] = true;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.messagesLoadingMap[action.meta.arg] = false;
        state.messagesBySwap[action.meta.arg] = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.messagesLoadingMap[action.meta.arg] = false;
      });
  },
});

export const {
  setMessages,
  addMessage,
  confirmMessage,
  markMessageError,
  setPartnerOnline,
  updateConversationLastMessage,
  clearChat,
} = chatSlice.actions;
export default chatSlice.reducer;
