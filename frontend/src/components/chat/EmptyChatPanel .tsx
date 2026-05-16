import { MessageCircle } from "lucide-react";
import { mainPanelCls } from "./chatStyles";

const EmptyChatPanel = () => (
  <div className={`${mainPanelCls.emptyWrap} flex flex-1`}>
    <div className={mainPanelCls.emptyIcon}>
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

export default EmptyChatPanel;
