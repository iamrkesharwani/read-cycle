import { AlertCircle } from "lucide-react";
import type { Message } from "../../../../shared/types/chat";
import { msgCls } from "./chatStyles";

export function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

interface Props {
  messages: Message[];
  isMe: boolean;
  currentUserId: string;
}

const MessageGroup = ({ messages, isMe }: Props) => {
  return (
    <div className={`${msgCls.row} ${isMe ? msgCls.rowMe : msgCls.rowThem}`}>
      <div
        className={`${msgCls.group} ${isMe ? msgCls.groupMe : msgCls.groupThem}`}
      >
        {messages.map((msg, idx) => {
          const isLast = idx === messages.length - 1;
          const bubbleStyle = msg.isError
            ? msgCls.bubbleError
            : isMe
              ? msgCls.bubbleMe
              : msgCls.bubbleThem;

          return (
            <div key={msg._id}>
              <div
                className={`${msgCls.bubble} ${bubbleStyle} ${
                  msg.isPending ? msgCls.bubblePending : ""
                }`}
              >
                {msg.text}
                {msg.isError && (
                  <AlertCircle size={12} className="ml-1 inline text-red-500" />
                )}
              </div>
              {isLast && (
                <p
                  className={`${msgCls.timestamp} ${isMe ? msgCls.timestampMe : ""}`}
                >
                  {msg.isError
                    ? "Failed to send"
                    : msg.isPending
                      ? "Sending…"
                      : formatTime(msg.createdAt)}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MessageGroup;
