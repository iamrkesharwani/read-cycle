import { createPortal } from "react-dom";
import { AlertCircle, X, Loader2 } from "lucide-react";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  isLoading?: boolean;
  variant?: "danger" | "warning" | "teal";
}

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  isLoading = false,
  variant = "teal",
}: ConfirmModalProps) => {
  if (!isOpen) return null;

  const variantStyles = {
    danger: "bg-red-600 hover:bg-red-700",
    warning: "bg-amber-500 hover:bg-amber-600",
    teal: "bg-teal-600 hover:bg-teal-700",
  };

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-50 bg-slate-50/30 px-6 py-4">
          <div className="flex items-center gap-2">
            <div
              className={`rounded-lg p-1.5 text-white ${variantStyles[variant]}`}
            >
              <AlertCircle size={18} />
            </div>
            <h3 className="font-bold text-slate-900">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 transition-colors hover:text-slate-600"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-6 py-8 text-center">
          <p className="text-sm font-medium leading-relaxed text-slate-500">
            {message}
          </p>
        </div>

        <div className="flex gap-3 px-6 pb-6">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-slate-200 py-3 text-sm font-bold text-slate-500 transition-colors hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-white transition-all ${variantStyles[variant]} disabled:opacity-50`}
          >
            {isLoading && <Loader2 size={16} className="animate-spin" />}
            {confirmText}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default ConfirmModal;
