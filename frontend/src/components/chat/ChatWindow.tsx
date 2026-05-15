import React, { useEffect, useRef, useState } from "react";
import { socket } from "../../services/socket";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import api from "../../services/api";
import { addMessage, setMessages } from "../../store/chat/chatSlice";
import { Send } from "lucide-react";

const ChatWindow = ({ swapId }: { swapId: string }) => {
  const dispatch = useAppDispatch();
  const { messages } = useAppSelector((state) => state.chat);
  const { user } = useAppSelector((state) => state.auth);

  const [inputText, setInputText] = useState("");
  const [isPeerTyping, setIsPeerTyping] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const { data } = await api.get(`/chat/${swapId}`);
        dispatch(setMessages(data));
      } catch (error) {
        console.error("Failed to load chat history", error);
      }
    };
    loadHistory();
  }, [swapId, dispatch]);

  useEffect(() => {
    socket.connect();
    socket.emit("join_chat", swapId);

    socket.on("receive_message", (newMessage) => {
      dispatch(addMessage(newMessage));
    });

    socket.on("display_typing", (data: { isTyping: boolean }) => {
      setIsPeerTyping(data.isTyping);
    });

    return () => {
      socket.off("receive_message");
      socket.off("display_typing");
      socket.disconnect();
    };
  }, [swapId, dispatch]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isPeerTyping]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    socket.emit("typing_start", { swapId });
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("typing_stop", { swapId });
    }, 1500);
  };

  const handleSend = () => {
    if (!inputText.trim() || !user?.id) return;
    const messageData = {
      swapId,
      senderId: user.id,
      text: inputText,
    };

    socket.emit("send_message", messageData);

    dispatch(
      addMessage({
        ...messageData,
        _id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      }),
    );

    setInputText("");
    socket.emit("typing_stop", { swapId });
  };

  return (
    <div className="flex h-[600px] flex-col rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.map((msg) => {
          const isMe = msg.senderId === user?.id;
          return (
            <div
              key={msg._id}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex max-w-[75%] flex-col ${isMe ? "items-end" : "items-start"}`}
              >
                <div
                  className={`rounded-2xl px-4 py-2 text-sm font-medium ${
                    isMe
                      ? "rounded-tr-none bg-blue-600 text-white"
                      : "rounded-tl-none bg-slate-100 text-slate-800"
                  }`}
                >
                  {msg.text}
                </div>
                <span className="mt-1 text-[10px] text-slate-400">
                  {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          );
        })}

        {isPeerTyping && (
          <div className="flex justify-start">
            <div className="flex items-center gap-2 rounded-2xl bg-slate-50 px-4 py-2">
              <div className="flex gap-1">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-300"></span>
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-300 [animation-delay:0.2s]"></span>
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-300 [animation-delay:0.4s]"></span>
              </div>
              <span className="text-xs italic text-slate-400">
                User is typing...
              </span>
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      <div className="border-t border-slate-100 p-4">
        <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-1 pr-2 focus-within:ring-2 focus-within:ring-blue-100">
          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Write a message..."
            className="flex-1 bg-transparent px-4 py-2 text-sm outline-none"
          />
          <button
            onClick={handleSend}
            disabled={!inputText.trim()}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white transition-all hover:bg-blue-700 disabled:opacity-50"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
