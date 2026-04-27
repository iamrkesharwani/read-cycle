import { AlertTriangle, Loader2 } from 'lucide-react';
import { createPortal } from 'react-dom';

interface DeletListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  isDeleting?: boolean;
}

const DeleteListingModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  isDeleting,
}: DeletListingModalProps) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl p-6 shadow-xl w-full max-w-sm border border-slate-100">
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4">
            <AlertTriangle className="text-red-600" size={24} />
          </div>

          <h3 className="text-lg font-bold text-slate-900">Delete Listing?</h3>
          <p className="text-sm text-slate-500 mt-2">
            Are you sure you want to delete{' '}
            <span className="font-semibold text-slate-700">"{title}"</span>?
            This action cannot be undone.
          </p>
        </div>

        <div className="flex gap-3 mt-8">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 text-sm font-semibold text-white hover:bg-red-700 transition-colors flex items-center justify-center gap-2 disabled:bg-red-400"
          >
            {isDeleting ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              'Delete'
            )}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default DeleteListingModal;
