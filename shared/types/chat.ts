export interface Message {
  _id: string;
  senderId: string;
  text: string;
  createdAt: string;
  isPending?: boolean;
  isError?: boolean;
}

export interface LastMessage {
  _id: string;
  text: string;
  createdAt: string;
  senderId: string;
}

export interface ConversationItem {
  _id: string;
  proposerId: string;
  receiverId: string;
  status: 'accepted';
  offeredBook: { _id: string; title: string; author: string; images: string[] };
  requestedBook: {
    _id: string;
    title: string;
    author: string;
    images: string[];
  };
  proposer: { _id: string; username: string; name: string };
  receiver: { _id: string; username: string; name: string };
  lastMessage?: LastMessage;
}
