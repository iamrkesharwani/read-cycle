import { AlertTriangle, X } from "lucide-react";
import { createPortal } from "react-dom";
import { ACTION_COPY } from "./swapActions";

type SwapAction = "accept" | "reject" | "cancel";

interface ConfirmState {
  id: string;
  action: SwapAction;
}

interface ConfirmModalProps {
  confirmModal: ConfirmState;
  setConfirmModal: React.Dispatch<React.SetStateAction<ConfirmState | null>>;
  executeConfirmedAction: () => void | Promise<void>;
}

const ConfirmModal = ({
  confirmModal,
  setConfirmModal,
  executeConfirmedAction,
}: ConfirmModalProps) => {
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-slate-100 px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="rounded-xl bg-amber-50 p-1.5 text-amber-500">
              <AlertTriangle size={16} />
            </div>
            <h3 className="text-sm font-bold text-slate-900">
              {ACTION_COPY[confirmModal.action].title}
            </h3>
          </div>
          <button
            onClick={() => setConfirmModal(null)}
            className="text-slate-400 transition-colors hover:text-slate-600"
          >
            <X size={18} />
          </button>
        </div>
        <div className="px-5 py-4">
          <p className="text-sm text-slate-500">
            {ACTION_COPY[confirmModal.action].desc}
          </p>
        </div>
        <div className="flex gap-2 border-t border-slate-100 px-5 py-4">
          <button
            onClick={() => setConfirmModal(null)}
            className="flex-1 rounded-xl border border-slate-200 bg-white py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50"
          >
            Go back
          </button>
          <button
            onClick={executeConfirmedAction}
            className={`flex-1 rounded-xl py-2.5 text-sm font-semibold transition-colors ${ACTION_COPY[confirmModal.action].btnCls}`}
          >
            {ACTION_COPY[confirmModal.action].btn}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default ConfirmModal;
