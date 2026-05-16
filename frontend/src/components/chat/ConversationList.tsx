import { useState } from "react";
import type { ConversationItem as ConvType } from "../../../../shared/types/chat";
import { sidebarCls } from "./chatStyles";
import { Loader2, MessageCircle, Search } from "lucide-react";
import ConversationItem from "./ConversationItem";

interface Props {
  conversations: ConvType[];
  loading: boolean;
  activeSwapId?: string;
  currentUserId?: string;
  partnerOnline: Record<string, boolean>;
  onSelect: (conv: ConvType) => void;
  className?: string;
}

const ConversationList = ({
  conversations,
  loading,
  activeSwapId,
  currentUserId,
  partnerOnline,
  onSelect,
  className = "",
}: Props) => {
  const [search, setSearch] = useState("");

  const filtered = conversations.filter((c) => {
    if (!search.trim()) return true;
    const partner = c.proposerId === currentUserId ? c.receiver : c.proposer;
    const q = search.toLowerCase();
    return (
      partner.name.toLowerCase().includes(q) ||
      c.offeredBook.title.toLowerCase().includes(q) ||
      c.requestedBook.title.toLowerCase().includes(q)
    );
  });

  return (
    <aside className={`${sidebarCls.root} ${className}`}>
      <div className={sidebarCls.header}>
        <h2 className={sidebarCls.title}>Messages</h2>
        <p className={sidebarCls.sub}>
          {conversations.length} active conversation
          {conversations.length !== 1 ? "s" : ""}
        </p>
        <div className={sidebarCls.searchWrap}>
          <Search size={14} className="shrink-0 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search conversations…"
            className={sidebarCls.searchInput}
          />
        </div>

        <div className={sidebarCls.list}>
          {loading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="animate-spin text-teal-500" size={22} />
            </div>
          ) : !filtered.length ? (
            <div className={sidebarCls.emptyWrap}>
              <MessageCircle size={28} />
              <p className="text-sm font-medium">
                {search ? "No results" : "No conversations yet"}
              </p>
              {!search && (
                <p className="px-6 text-center text-xs">
                  Accept a swap request to start chatting
                </p>
              )}
            </div>
          ) : (
            filtered.map((conv) => (
              <ConversationItem
                key={conv._id}
                conv={conv}
                isActive={conv._id === activeSwapId}
                isOnline={partnerOnline[conv._id] ?? false}
                currentUserId={currentUserId}
                onClick={() => onSelect(conv)}
              />
            ))
          )}
        </div>
      </div>
    </aside>
  );
};

export default ConversationList;
