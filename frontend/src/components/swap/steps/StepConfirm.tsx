import { ArrowRightLeft, Loader2 } from "lucide-react";
import { useAppSelector } from "../../../hooks/reduxHooks";

const BASE_URL = import.meta.env.VITE_BASE_URL ?? "http://127.0.0.1:5000";

interface StepConfirmProps {
  selectedId: string;
  onBack: () => void;
  onConfirm: () => void;
  isSubmitting: boolean;
}

const StepConfirm = ({
  selectedId,
  onBack,
  onConfirm,
  isSubmitting,
}: StepConfirmProps) => {
  const { books } = useAppSelector((state) => state.book);
  const { currentBook: targetBook } = useAppSelector((state) => state.book);

  const selectedBook = books.find((b) => b._id === selectedId);

  return (
    <div className="p-6">
      <div className="mb-8 text-center">
        <h3 className="text-lg font-bold text-slate-900">Confirm Proposal</h3>
        <p className="mt-1 text-sm text-slate-500">
          Review your trade before sending
        </p>
      </div>

      <div className="mb-10 flex items-center justify-center gap-6">
        {/* Offered Book */}
        <div className="w-28 space-y-2 text-center">
          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border-2 border-teal-500 shadow-md">
            <img
              src={`${BASE_URL}${selectedBook?.images?.[0]}`}
              className="h-full w-full object-cover"
              alt="Offered"
            />
            <div className="absolute inset-x-0 bottom-0 bg-teal-500 py-1 text-[8px] font-bold uppercase text-white">
              Your Offer
            </div>
          </div>
          <p className="truncate text-[10px] font-bold uppercase text-slate-700">
            {selectedBook?.title}
          </p>
        </div>

        <ArrowRightLeft className="shrink-0 text-slate-300" size={24} />

        <div className="w-28 space-y-2 text-center">
          <div className="aspect-[3/4] overflow-hidden rounded-2xl border border-slate-100 opacity-60 shadow-sm">
            <img
              src={`${BASE_URL}${targetBook?.images?.[0]}`}
              className="h-full w-full object-cover"
              alt="Requested"
            />
          </div>
          <p className="truncate text-[10px] font-bold uppercase text-slate-400">
            {targetBook?.title}
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          disabled={isSubmitting}
          className="flex-1 rounded-xl border border-slate-200 py-3 text-sm font-bold text-slate-500 transition-colors hover:bg-slate-50 disabled:opacity-50"
        >
          Back
        </button>
        <button
          onClick={onConfirm}
          disabled={isSubmitting}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-teal-600 py-3 text-sm font-bold text-white transition-all hover:bg-teal-700 disabled:opacity-50"
        >
          {isSubmitting ? (
            <Loader2 className="animate-spin" size={16} />
          ) : (
            "Send Proposal"
          )}
        </button>
      </div>
    </div>
  );
};

export default StepConfirm;
