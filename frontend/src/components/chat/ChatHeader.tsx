import { ArrowLeft } from "lucide-react";
import { headerCls } from "./chatStyles";

interface Props {
  partnerName: string;
  initials: string;
  bookContext?: string;
  isOnline: boolean;
  onBack?: () => void;
}

const ChatHeader = ({
  partnerName,
  initials,
  bookContext,
  isOnline,
  onBack,
}: Props) => {
  return (
    <div className={headerCls.root}>
      {onBack && (
        <button className={headerCls.backBtn} onClick={onBack}>
          <ArrowLeft size={16} />
        </button>
      )}

      <div className={headerCls.avatarWrap}>
        <div className={headerCls.avatar}>{initials}</div>
        <span
          className={`${headerCls.onlineDot} ${isOnline ? "bg-teal-500" : "bg-slate-300"}`}
        />
      </div>

      <div className={headerCls.info}>
        <p className={headerCls.name}>{partnerName}</p>
        {bookContext && <p className={headerCls.sub}>{bookContext}</p>}
      </div>
    </div>
  );
};

export default ChatHeader;
