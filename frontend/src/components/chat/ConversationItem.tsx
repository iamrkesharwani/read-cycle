import type { ConversationItem as ConvType } from "../../../../shared/types/chat";
import { convItemCls } from "./chatStyles";

function formatRelativeTime(iso?: string): string {
  if (!iso) return "";
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return "now";
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d`;
  return new Date(iso).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

interface Props {
  conv: ConvType;
  isActive: boolean;
  isOnline: boolean;
  currentUserId?: string;
  onClick: () => void;
}

const ConversationItem = ({
  conv,
  isActive,
  isOnline,
  currentUserId,
  onClick,
}: Props) => {
  const partner =
    conv.proposerId === currentUserId ? conv.receiver : conv.proposer;

  const initials = partner.name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <button
      onClick={onClick}
      className={`${convItemCls.btn} ${isActive ? convItemCls.btnActive : ""}`}
    >
      <div className={convItemCls.avatar}>
        {initials}
        <span
          className={`${convItemCls.onlineDot} ${
            isOnline ? "bg-teal-500" : "bg-slate-300"
          }`}
        />
      </div>

      <div className={convItemCls.info}>
        <p className={convItemCls.name}>{partner.name}</p>
        <p className={convItemCls.books}>
          {conv.offeredBook.title} ↔ {conv.requestedBook.title}
        </p>
        {conv.lastMessage && (
          <p className={convItemCls.lastMsg}>
            {conv.lastMessage.senderId === currentUserId ? "You: " : ""}
            {conv.lastMessage.text}
          </p>
        )}
      </div>

      {conv.lastMessage && (
        <span className={convItemCls.time}>
          {formatRelativeTime(conv.lastMessage.createdAt)}
        </span>
      )}
    </button>
  );
};

export default ConversationItem;
