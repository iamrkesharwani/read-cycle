import React, { useEffect, useRef, useState, useCallback } from "react";
import { socket } from "../../services/socket";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  addMessage,
  confirmMessage,
  markMessageError,
  setPartnerOnline,
  clearChat,
} from "../../store/chat/chatSlice";
import { fetchMessages } from "../../store/chat/chatThunk";
import { Send, ArrowLeft, BookOpen, Loader2, AlertCircle } from "lucide-react";

const cls = {
  root: "flex h-full flex-col bg-white",
  header:
    "flex items-center gap-3 border-b border-slate-100 px-4 py-3.5 shrink-0",
  backBtn:
    "flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors lg:hidden",
  avatar:
    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-100 text-sm font-bold text-teal-700",
  onlineDot: "h-2.5 w-2.5 rounded-full border-2 border-white",
  headerInfo: "min-w-0 flex-1",
  partnerName: "truncate text-sm font-bold text-slate-800",
  statusText: "text-[11px] text-slate-400",
  messageArea:
    "flex-1 overflow-y-auto px-4 py-4 space-y-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-200",
  dateSep:
    "my-3 flex items-center gap-3 text-[11px] font-semibold text-slate-400",
  dateLine: "h-px flex-1 bg-slate-100",
  msgRow: "flex",
  msgRowMe: "justify-end",
  msgRowThem: "justify-start",
  msgGroup: "flex max-w-[72%] flex-col gap-0.5",
  msgGroupMe: "items-end",
  msgGroupThem: "items-start",
  bubble:
    "relative px-3.5 py-2 text-sm leading-relaxed break-words transition-opacity",
  bubbleMe: "bg-teal-600 text-white rounded-2xl rounded-tr-sm",
  bubbleThem: "bg-slate-100 text-slate-800 rounded-2xl rounded-tl-sm",
  bubblePending: "opacity-60",
  bubbleError: "bg-red-100 text-red-700",
  timestamp: "text-[10px] mt-0.5 select-none",
  timestampMe: "text-slate-400 text-right",
  timestampThem: "text-slate-400",
  typingRow: "flex justify-start px-0",
  typingBubble:
    "flex items-center gap-1.5 rounded-2xl rounded-tl-sm bg-slate-100 px-3.5 py-2.5",
  dot: "h-1.5 w-1.5 rounded-full bg-slate-400",
  footer: "shrink-0 border-t border-slate-100 p-3",
  inputWrap:
    "flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-1 ring-1 ring-transparent focus-within:ring-teal-200 transition-all",
  input:
    "flex-1 bg-transparent py-2 text-sm text-slate-800 outline-none placeholder:text-slate-400",
  sendBtn:
    "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all",
  sendBtnActive: "bg-teal-600 text-white hover:bg-teal-700",
  sendBtnDisabled: "bg-slate-200 text-slate-400 cursor-not-allowed",
  emptyState:
    "flex flex-1 flex-col items-center justify-center gap-2 text-slate-400",
  loadingState: "flex flex-1 items-center justify-center",
};

function formatDate(date: Date): string {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today.getTime() - 86_400_000);
  const msgDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  if (msgDay.getTime() === today.getTime()) return "Today";
  if (msgDay.getTime() === yesterday.getTime()) return "Yesterday";
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() ?? "")
    .join("");
}

interface Props {
  swapId: string;
  partnerName: string;
  partnerInitials?: string;
  bookContext?: string; // "Book A ↔ Book B"
  onBack?: () => void;
}

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
  const isLoadingMessages = useAppSelector(
    (s) => s.chat.messagesLoadingMap[swapId] ?? false,
  );
  const isPartnerOnline = useAppSelector(
    (s) => s.chat.partnerOnline[swapId] ?? false,
  );

  const [inputText, setInputText] = useState("");
  const [isPeerTyping, setIsPeerTyping] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(true);

  const scrollRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load history
  useEffect(() => {
    dispatch(fetchMessages(swapId));
  }, [swapId, dispatch]);

  // Socket setup
  useEffect(() => {
    if (!user?.id) return;

    socket.connect();
    socket.emit("join_chat", { swapId, userId: user.id });

    socket.on("receive_message", (msg) => {
      dispatch(addMessage({ swapId, message: msg }));
    });

    socket.on(
      "message_confirmed",
      ({ tempId, message }: { tempId: string; message: any }) => {
        dispatch(confirmMessage({ swapId, tempId, message }));
      },
    );

    socket.on("message_error", ({ tempId }: { tempId: string }) => {
      dispatch(markMessageError({ swapId, tempId }));
    });

    socket.on("display_typing", ({ isTyping }: { isTyping: boolean }) => {
      setIsPeerTyping(isTyping);
    });

    socket.on(
      "partner_online",
      ({ isOnline }: { userId: string; isOnline: boolean }) => {
        dispatch(setPartnerOnline({ swapId, isOnline }));
      },
    );

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

  // Auto-scroll
  useEffect(() => {
    if (isAtBottom) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isPeerTyping, isAtBottom]);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const threshold = 80;
    setIsAtBottom(el.scrollHeight - el.scrollTop - el.clientHeight < threshold);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    socket.emit("typing_start", { swapId });
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("typing_stop", { swapId });
    }, 1500);
  };

  const handleSend = useCallback(() => {
    const text = inputText.trim();
    if (!text || !user?.id) return;

    const tempId = `temp-${Date.now()}`;
    const optimistic = {
      _id: tempId,
      senderId: user.id,
      text,
      createdAt: new Date().toISOString(),
      isPending: true,
    };

    dispatch(addMessage({ swapId, message: optimistic }));
    socket.emit("send_message", { swapId, senderId: user.id, text, tempId });

    setInputText("");
    setIsAtBottom(true);
    socket.emit("typing_stop", { swapId });
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
  }, [inputText, user?.id, swapId, dispatch]);

  // Build grouped messages with date separators
  const renderMessages = () => {
    if (isLoadingMessages) {
      return (
        <div className={cls.loadingState}>
          <Loader2 className="animate-spin text-teal-500" size={22} />
        </div>
      );
    }

    if (!messages.length) {
      return (
        <div className={cls.emptyState}>
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
            <BookOpen size={22} />
          </div>
          <p className="text-sm font-medium">No messages yet</p>
          <p className="text-xs">Say hi to start the conversation!</p>
        </div>
      );
    }

    const nodes: React.ReactNode[] = [];
    let lastDateLabel = "";
    let i = 0;

    while (i < messages.length) {
      const msg = messages[i];
      const dateLabel = formatDate(new Date(msg.createdAt));

      // Date separator
      if (dateLabel !== lastDateLabel) {
        lastDateLabel = dateLabel;
        nodes.push(
          <div key={`sep-${msg._id}`} className={cls.dateSep}>
            <span className={cls.dateLine} />
            <span>{dateLabel}</span>
            <span className={cls.dateLine} />
          </div>,
        );
      }

      // Group consecutive same-sender messages
      const isMe = msg.senderId === user?.id;
      const groupMessages = [msg];
      let j = i + 1;
      while (
        j < messages.length &&
        messages[j].senderId === msg.senderId &&
        formatDate(new Date(messages[j].createdAt)) === dateLabel
      ) {
        groupMessages.push(messages[j]);
        j++;
      }

      nodes.push(
        <div
          key={`group-${msg._id}`}
          className={`${cls.msgRow} ${isMe ? cls.msgRowMe : cls.msgRowThem}`}
        >
          <div
            className={`${cls.msgGroup} ${isMe ? cls.msgGroupMe : cls.msgGroupThem}`}
          >
            {groupMessages.map((gMsg, gIdx) => {
              const isLast = gIdx === groupMessages.length - 1;
              return (
                <div key={gMsg._id}>
                  <div
                    className={`${cls.bubble} ${
                      gMsg.isError
                        ? cls.bubbleError
                        : isMe
                          ? cls.bubbleMe
                          : cls.bubbleThem
                    } ${gMsg.isPending ? cls.bubblePending : ""}`}
                  >
                    {gMsg.text}
                    {gMsg.isError && (
                      <AlertCircle
                        size={12}
                        className="ml-1 inline text-red-500"
                      />
                    )}
                  </div>
                  {isLast && (
                    <p
                      className={`${cls.timestamp} ${
                        isMe ? cls.timestampMe : cls.timestampThem
                      }`}
                    >
                      {gMsg.isError
                        ? "Failed to send"
                        : gMsg.isPending
                          ? "Sending…"
                          : formatTime(gMsg.createdAt)}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>,
      );

      i = j;
    }

    return nodes;
  };

  const initials = partnerInitials ?? getInitials(partnerName);

  return (
    <div className={cls.root}>
      {/* Header */}
      <div className={cls.header}>
        {onBack && (
          <button className={cls.backBtn} onClick={onBack} aria-label="Back">
            <ArrowLeft size={16} />
          </button>
        )}
        <div className="relative">
          <div className={cls.avatar}>{initials}</div>
          <span
            className={`absolute -bottom-0.5 -right-0.5 ${cls.onlineDot} ${
              isPartnerOnline ? "bg-teal-500" : "bg-slate-300"
            }`}
          />
        </div>
        <div className={cls.headerInfo}>
          <p className={cls.partnerName}>{partnerName}</p>
          {bookContext && <p className={cls.statusText}>{bookContext}</p>}
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className={cls.messageArea} onScroll={handleScroll}>
        {renderMessages()}

        {isPeerTyping && (
          <div className={cls.typingRow}>
            <div className={cls.typingBubble}>
              <span
                className={cls.dot}
                style={{ animation: "bounce 1.2s infinite" }}
              />
              <span
                className={cls.dot}
                style={{ animation: "bounce 1.2s infinite 0.2s" }}
              />
              <span
                className={cls.dot}
                style={{ animation: "bounce 1.2s infinite 0.4s" }}
              />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className={cls.footer}>
        <div className={cls.inputWrap}>
          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Type a message…"
            className={cls.input}
            maxLength={2000}
          />
          <button
            onClick={handleSend}
            disabled={!inputText.trim()}
            aria-label="Send message"
            className={`${cls.sendBtn} ${
              inputText.trim() ? cls.sendBtnActive : cls.sendBtnDisabled
            }`}
          >
            <Send size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
