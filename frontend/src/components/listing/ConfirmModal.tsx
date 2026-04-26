import { BookMarked, X, Loader2, Pencil } from 'lucide-react';
import { createPortal } from 'react-dom';

interface Props {
  isOpen: boolean;
  isPublishing: boolean;
  mode?: 'create' | 'edit';
  title: string;
  author: string;
  condition: string;
  genre: string;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmModal = ({
  isOpen,
  isPublishing,
  mode = 'create',
  title,
  author,
  condition,
  genre,
  onClose,
  onConfirm,
}: Props) => {
  if (!isOpen) return null;
  const isEdit = mode === 'edit';

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 flex flex-col gap-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div className="w-11 h-11 rounded-xl bg-teal-50 flex items-center justify-center">
            {isEdit ? (
              <Pencil size={18} className="text-teal-600" />
            ) : (
              <BookMarked size={20} className="text-teal-600" />
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <div>
          <h3 className="text-base font-bold text-gray-900">
            {isEdit ? 'Save your changes?' : 'Ready to list this book?'}
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            {isEdit
              ? 'Your listing will be updated with the new details.'
              : 'Your listing will go live and others can request a swap.'}
          </p>
        </div>

        <div className="bg-slate-50 rounded-xl px-4 py-3 space-y-1.5">
          {[
            { label: 'Title', value: title },
            { label: 'Author', value: author },
            { label: 'Condition', value: condition },
            { label: 'Genre', value: genre },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between text-sm">
              <span className="text-slate-400 font-medium">{label}</span>
              <span className="text-gray-800 font-semibold truncate max-w-[60%] text-right">
                {value}
              </span>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-gray-500 border border-gray-200 hover:bg-gray-50 transition-all"
          >
            Go back
          </button>
          <button
            type="button"
            disabled={isPublishing}
            onClick={onConfirm}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold bg-teal-600 text-white hover:bg-teal-700 active:scale-95 transition-all shadow-sm shadow-teal-200 disabled:opacity-60"
          >
            {isPublishing ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                {isEdit ? 'Saving...' : 'Publishing...'}
              </>
            ) : isEdit ? (
              'Update it!'
            ) : (
              'List it!'
            )}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ConfirmModal;
