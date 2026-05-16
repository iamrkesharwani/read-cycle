import React, { useCallback, useEffect, useRef, useState } from "react";
import type { Message } from "../../../../shared/types/chat";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { fetchMessages } from "../../store/chat/chatThunk";
import { socket } from "../../services/socket";
import {
  addMessage,
  clearChat,
  confirmMessage,
  markMessageError,
  setPartnerOnline,
} from "../../store/chat/chatSlice";
import { BookOpen, Loader2 } from "lucide-react";
import { emptyCls, msgCls, windowCls } from "./chatStyles";
import MessageGroup from "./MessageGroup";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";

interface Props {
  swapId: string;
  partnerName: string;
  partnerInitials: string;
  bookContext?: string;
  onBack?: () => void;
}

export function formatDateLabel(date: Date): string {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today.getTime() - 86_400_000);
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  if (d.getTime() === today.getTime()) return "Today";
  if (d.getTime() === yesterday.getTime()) return "Yesterday";
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export const DateSeparator = ({ label }: { label: string }) => (
  <div className={msgCls.dateSep}>
    <span className={msgCls.dateLine} />
    <span>{label}</span>
    <span className={msgCls.dateLine} />
  </div>
);

export const TypingIndicator = () => (
  <div className={msgCls.typingRow}>
    <div className={msgCls.typingBubble}>
      {[0, 0.2, 0.4].map((delay, i) => (
        <span
          key={i}
          className={msgCls.dot}
          style={{ animation: `bounce 1.2s infinite ${delay}s` }}
        />
      ))}
    </div>
  </div>
);

function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() ?? "")
    .join("");
}

const groupMessages = (messages: Message[]): Message[][] => {
  const groups: Message[][] = [];
  for (const msg of messages) {
    const last = groups[groups.length - 1];
    if (last && last[0].senderId === msg.senderId) {
      last.push(msg);
    } else {
      groups.push([msg]);
    }
  }
  return groups;
};

const ChatWindow = ({
  swapId,
  partnerName,
  partnerInitials,
  bookContext,
  onBack,
}: Props) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((s) => s.auth);
  const messages = useAppSelector((s) => s.chat.messagesBySwap[swapId] ?? []);
  const isLoading = useAppSelector(
    (s) => s.chat.messagesLoadingMap[swapId] ?? false,
  );
  const isPartnerOnline = useAppSelector(
    (s) => s.chat.partnerOnline[swapId] ?? false,
  );

  const [inputText, setInputText] = useState("");
  const [isPeerTyping, setIsPeerTyping] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(true);

  const scrollRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const typingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    dispatch(fetchMessages(swapId));
  }, [dispatch, swapId]);

  useEffect(() => {
    if (!user?.id) return;

    socket.connect();

    socket.emit("join_chat", { swapId, userId: user.id });

    socket.on("receive_message", (msg: Message) => {
      dispatch(addMessage({ swapId, message: msg }));
    });

    socket.on(
      "message_confirmed",
      ({ tempId, message }: { tempId: string; message: Message }) => {
        dispatch(confirmMessage({ swapId, tempId, message }));
      },
    );

    socket.on("message_error", ({ tempId }: { tempId: string }) => {
      dispatch(markMessageError({ swapId, tempId }));
    });

    socket.on("display_typing", ({ isTyping }: { isTyping: boolean }) => {
      setIsPeerTyping(isTyping);
    });

    socket.on("partner_online", ({ isOnline }: { isOnline: boolean }) => {
      dispatch(setPartnerOnline(swapId, isOnline));
    });

    return () => {
      socket.off("receive_message");
      socket.off("message_confirmed");
      socket.off("message_error");
      socket.off("display_typing");
      socket.off("partner_online");
      socket.disconnect();
      dispatch(clearChat(swapId));
    };
  }, [swapId, user?.id, dispatch]);

  useEffect(() => {
    if (isAtBottom) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isPeerTyping, isAtBottom]);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setIsAtBottom(el.scrollHeight - el.scrollTop - el.clientHeight < 80);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
    if (typingTimer.current) clearTimeout(typingTimer.current);
    socket.emit("typing_start", { swapId });
    typingTimer.current = setTimeout(() => {
      socket.emit("typing_stop", { swapId });
    }, 1500);
  };

  const handleSend = useCallback(() => {
    const text = inputText.trim();
    if (!text || !user?.id) return;
    const tempId = `temp-${Date.now()}`;
    dispatch(
      addMessage({
        swapId,
        message: {
          _id: tempId,
          senderId: user.id,
          text,
          createdAt: new Date().toISOString(),
          isPending: true,
        },
      }),
    );
    socket.emit("send_message", { swapId, senderId: user.id, text, tempId });
    setInputText("");
    setIsAtBottom(true);
    socket.emit("typing_stop", { swapId });
    if (typingTimer.current) clearTimeout(typingTimer.current);
  }, [inputText, user?.id, swapId, dispatch]);

  const renderMessages = () => {
    if (isLoading) {
      return (
        <div className={emptyCls.spinning}>
          <Loader2 className="animate-spin text-teal-500" size={22} />
        </div>
      );
    }

    if (!messages.length) {
      return (
        <div className={emptyCls.center}>
          <div className={emptyCls.iconBox}>
            <BookOpen size={22} />
          </div>
          <p className="text-sm font-medium">No messages yet</p>
          <p className="text-xs">Say hi to kick things off!</p>
        </div>
      );
    }

    const groups = groupMessages(messages);
    const nodes: React.ReactNode[] = [];
    let lastDateLabel = "";

    for (const group of groups) {
      const label = formatDateLabel(new Date(group[0].createdAt));
      if (label !== lastDateLabel) {
        lastDateLabel = label;
        nodes.push(<DateSeparator key={`sep-${group[0]._id}`} label={label} />);
      }
      nodes.push(
        <MessageGroup
          key={group[0]._id}
          messages={group}
          isMe={group[0].senderId === user?.id}
          currentUserId={user?.id ?? ""}
        />,
      );
    }
    return nodes;
  };

  return (
    <div className={windowCls.root}>
      <ChatHeader
        partnerName={partnerName}
        initials={partnerInitials || getInitials(partnerName)}
        bookContext={bookContext}
        isOnline={isPartnerOnline}
        onBack={onBack}
      />

      <div
        ref={scrollRef}
        className={windowCls.messageArea}
        onScroll={handleScroll}
      >
        {renderMessages()}
        {isPeerTyping && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      <ChatInput
        value={inputText}
        onChange={handleInputChange}
        onSend={handleSend}
      />
    </div>
  );
};

export default ChatWindow;
