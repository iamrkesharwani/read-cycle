import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { fetchConversations } from "../../store/chat/chatThunk";
import type { ConversationItem } from "../../store/chat/chatSlice";
import ChatWindow from "./ChatWindow";
import {
  MessageCircle,
  Loader2,
  Search,
} from "lucide-react";

export const BASE_URL =
  import.meta.env.VITE_BASE_URL ?? "http://127.0.0.1:5000";

const cls = {
  page: "flex h-full w-full overflow-hidden bg-slate-50",

  // Sidebar
  sidebar:
    "flex w-full flex-col border-r border-slate-100 bg-white lg:w-80 xl:w-96",
  sidebarHidden: "hidden lg:flex",
  sidebarVisible: "flex",

  sidebarHeader: "border-b border-slate-100 px-4 py-4",
  sidebarTitle: "text-base font-bold text-slate-900",
  sidebarSub: "mt-0.5 text-xs text-slate-400",
  searchWrap:
    "mt-3 flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 ring-1 ring-transparent focus-within:ring-teal-200 transition-all",
  searchInput:
    "flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400",

  convList: "flex-1 overflow-y-auto py-2 [&::-webkit-scrollbar]:w-0",
  convItem:
    "flex items-center gap-3 px-4 py-3.5 cursor-pointer transition-colors hover:bg-slate-50",
  convItemActive: "bg-teal-50 hover:bg-teal-50",
  convAvatar:
    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold",
  convAvatarDefault: "bg-teal-100 text-teal-700",
  convInfo: "min-w-0 flex-1",
  convName: "truncate text-sm font-semibold text-slate-800",
  convBook: "truncate text-[11px] text-slate-400",
  convLastMsg: "truncate text-xs text-slate-500 mt-0.5",
  convTime: "shrink-0 text-[10px] text-slate-400",
  onlineDot: "h-2 w-2 shrink-0 rounded-full",

  // Main panel
  main: "hidden flex-1 lg:flex",
  mainVisible: "flex flex-1",
  mainHidden: "hidden",

  emptyPanel:
    "flex flex-1 flex-col items-center justify-center gap-3 text-slate-400",
  emptyIcon:
    "flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-100",

  // Mobile back button
  mobileHeader:
    "flex items-center gap-3 border-b border-slate-100 bg-white px-4 py-3 lg:hidden",
  mobileBackBtn:
    "flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100",
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() ?? "")
    .join("");
}

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

const ChatPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { swapId } = useParams<{ swapId?: string }>();
  const { user } = useAppSelector((s) => s.auth);
  const { conversations, conversationsLoading } = useAppSelector((s) => s.chat);
  const partnerOnline = useAppSelector((s) => s.chat.partnerOnline);

  const [search, setSearch] = useState("");
  const [mobileView, setMobileView] = useState<"list" | "chat">(
    swapId ? "chat" : "list",
  );

  useEffect(() => {
    dispatch(fetchConversations());
  }, [dispatch]);

  // When swapId param changes (e.g. navigating from SwappedTab)
  useEffect(() => {
    if (swapId) setMobileView("chat");
  }, [swapId]);

  const activeConv = swapId
    ? conversations.find((c) => c._id === swapId)
    : null;

  const getPartner = (conv: ConversationItem) => {
    if (!user?.id) return conv.proposer;
    return conv.proposerId === user.id ? conv.receiver : conv.proposer;
  };

  const filteredConvs = conversations.filter((c) => {
    if (!search.trim()) return true;
    const partner = getPartner(c);
    const q = search.toLowerCase();
    return (
      partner.name.toLowerCase().includes(q) ||
      c.offeredBook.title.toLowerCase().includes(q) ||
      c.requestedBook.title.toLowerCase().includes(q)
    );
  });

  const handleSelectConv = (conv: ConversationItem) => {
    navigate(`/chat/${conv._id}`);
    setMobileView("chat");
  };

  const renderSidebar = () => (
    <aside
      className={`${cls.sidebar} ${
        mobileView === "list" ? cls.sidebarVisible : cls.sidebarHidden
      }`}
    >
      <div className={cls.sidebarHeader}>
        <h2 className={cls.sidebarTitle}>Messages</h2>
        <p className={cls.sidebarSub}>
          {conversations.length} active conversation
          {conversations.length !== 1 ? "s" : ""}
        </p>
        <div className={cls.searchWrap}>
          <Search size={14} className="shrink-0 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search conversations…"
            className={cls.searchInput}
          />
        </div>
      </div>

      <div className={cls.convList}>
        {conversationsLoading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="animate-spin text-teal-500" size={22} />
          </div>
        ) : !filteredConvs.length ? (
          <div className="flex flex-col items-center gap-2 py-16 text-slate-400">
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
          filteredConvs.map((conv) => {
            const partner = getPartner(conv);
            const isActive = conv._id === swapId;
            const isOnline = partnerOnline[conv._id];
            const initials = getInitials(partner.name);

            return (
              <button
                key={conv._id}
                onClick={() => handleSelectConv(conv)}
                className={`${cls.convItem} w-full text-left ${
                  isActive ? cls.convItemActive : ""
                }`}
              >
                <div className="relative">
                  <div className={`${cls.convAvatar} ${cls.convAvatarDefault}`}>
                    {initials}
                  </div>
                  <span
                    className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white ${
                      isOnline ? "bg-teal-500" : "bg-slate-300"
                    }`}
                  />
                </div>

                <div className={cls.convInfo}>
                  <p className={cls.convName}>{partner.name}</p>
                  <p className={cls.convBook}>
                    {conv.offeredBook.title} ↔ {conv.requestedBook.title}
                  </p>
                  {conv.lastMessage && (
                    <p className={cls.convLastMsg}>
                      {conv.lastMessage.senderId === user?.id ? "You: " : ""}
                      {conv.lastMessage.text}
                    </p>
                  )}
                </div>

                <div className="flex shrink-0 flex-col items-end gap-1">
                  {conv.lastMessage && (
                    <span className={cls.convTime}>
                      {formatRelativeTime(conv.lastMessage.createdAt)}
                    </span>
                  )}
                </div>
              </button>
            );
          })
        )}
      </div>
    </aside>
  );

  const renderMain = () => {
    if (!activeConv) {
      return (
        <div
          className={`${
            mobileView === "chat" ? cls.mainVisible : cls.main
          } ${cls.emptyPanel}`}
        >
          <div className={cls.emptyIcon}>
            <MessageCircle size={32} />
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-slate-600">
              Select a conversation
            </p>
            <p className="mt-1 text-xs">
              Choose from your accepted swaps on the left
            </p>
          </div>
        </div>
      );
    }

    const partner = getPartner(activeConv);
    const initials = getInitials(partner.name);
    const bookContext = `${activeConv.offeredBook.title} ↔ ${activeConv.requestedBook.title}`;

    return (
      <div
        className={`${mobileView === "chat" ? cls.mainVisible : cls.main} flex-col`}
      >
        <ChatWindow
          swapId={activeConv._id}
          partnerName={partner.name}
          partnerInitials={initials}
          bookContext={bookContext}
          onBack={() => {
            setMobileView("list");
            navigate("/chat");
          }}
        />
      </div>
    );
  };

  return (
    <div className={cls.page}>
      {renderSidebar()}
      {renderMain()}
    </div>
  );
};

export default ChatPage;
