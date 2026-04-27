import { useEffect } from 'react';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';

interface Props {
  title: string;
  description?: string;
  onClose: () => void;
  children: React.ReactNode;
}

const DeleteAccountGeneral = ({
  title,
  description,
  onClose,
  children,
}: Props) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-white rounded-2xl shadow-xl p-6 flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-gray-900">{title}</h2>
            {description && (
              <p className="text-xs text-slate-400 mt-1">{description}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="shrink-0 w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={13} />
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default DeleteAccountGeneral;
