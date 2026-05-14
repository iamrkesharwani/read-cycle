import { Star, X } from "lucide-react";
import { createPortal } from "react-dom";

const OwnBookModal = ({ onClose }: { onClose: () => void }) => {
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50">
            <Star size={18} className="text-amber-500" fill="currentColor" />
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 transition-colors hover:text-slate-600"
          >
            <X size={18} />
          </button>
        </div>
        <h3 className="text-base font-bold text-slate-900">
          This is your listing
        </h3>
        <p className="mt-1.5 text-sm text-slate-500">
          You can't express interest in a book you listed yourself.
        </p>
        <button
          onClick={onClose}
          className="mt-5 w-full rounded-xl bg-slate-100 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-200"
        >
          Got it
        </button>
      </div>
    </div>,
    document.body,
  );
};

export default OwnBookModal;
