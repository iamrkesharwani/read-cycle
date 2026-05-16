import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { useEffect, useState } from "react";
import { fetchConversations } from "../../store/chat/chatThunk";
import type { ConversationItem } from "../../../../shared/types/chat";
import { mainPanelCls, pageCls, sidebarCls } from "./chatStyles";
import ConversationList from "./ConversationList";
import ChatWindow from "./ChatWindow";
import EmptyChatPanel from "./EmptyChatPanel ";

function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() ?? "")
    .join("");
}
const ChatPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { swapId } = useParams<{ swapId?: string }>();
  const { user } = useAppSelector((s) => s.auth);
  const { conversations, conversationsLoading, partnerOnline } = useAppSelector(
    (s) => s.chat,
  );

  const [activePanel, setActivePanel] = useState<"list" | "chat">(
    swapId ? "chat" : "list",
  );

  useEffect(() => {
    dispatch(fetchConversations());
  }, [dispatch]);

  useEffect(() => {
    if (swapId) setActivePanel("chat");
  }, [swapId]);

  const activeConv: ConversationItem | undefined = swapId
    ? conversations.find((c) => c._id === swapId)
    : undefined;

  const handleSelect = (conv: ConversationItem) => {
    navigate(`/chat/${conv._id}`);
    setActivePanel("chat");
  };

  const handleBack = () => {
    setActivePanel("list");
    navigate("/chat");
  };

  const sidebarClass = `${sidebarCls.root} ${
    activePanel === "list"
      ? sidebarCls.visibleOnMobile
      : sidebarCls.hiddenOnMobile
  }`;

  const mainClass = `${mainPanelCls.base} ${
    activePanel === "chat"
      ? mainPanelCls.visibleOnMobile
      : mainPanelCls.hiddenOnMobile
  } flex flex-1`;

  return (
    <div className={pageCls.root}>
      <ConversationList
        conversations={conversations}
        loading={conversationsLoading}
        activeSwapId={swapId}
        currentUserId={user?.id}
        partnerOnline={partnerOnline}
        onSelect={handleSelect}
        className={sidebarClass}
      />

      <div className={mainClass}>
        {activeConv ? (
          <ChatWindow
            swapId={activeConv._id}
            partnerName={
              activeConv.proposerId === user?.id
                ? activeConv.receiver.name
                : activeConv.proposer.name
            }
            partnerInitials={getInitials(
              activeConv.proposerId === user?.id
                ? activeConv.receiver.name
                : activeConv.proposer.name,
            )}
            bookContext={`${activeConv.offeredBook.title} ↔ ${activeConv.requestedBook.title}`}
            onBack={handleBack}
          />
        ) : (
          <EmptyChatPanel />
        )}
      </div>
    </div>
  );
};

export default ChatPage;
