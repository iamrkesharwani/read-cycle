import { ArrowUpDown, Heart, Share2 } from "lucide-react";
import InterestButton from "./InterestButton";

interface ListingActionsProps {
  bookId: string | undefined;
  onSwapRequest: () => void;
  onShare: () => void;
  isOwnBook?: boolean;
}

const ListingActions = ({
  bookId,
  onSwapRequest,
  onShare,
  isOwnBook = false,
}: ListingActionsProps) => (
  <div className="flex w-full flex-col gap-2">
    <div className="flex items-center gap-2">
      <InterestButton bookId={bookId || ""} />

      <button className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 transition-colors hover:border-teal-400 hover:text-teal-600">
        <Heart size={16} />
      </button>

      <button
        onClick={onShare}
        className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 transition-colors hover:border-teal-400 hover:text-teal-600"
      >
        <Share2 size={16} />
      </button>
    </div>

    <button
      onClick={onSwapRequest}
      disabled={isOwnBook}
      title={isOwnBook ? "You cannot swap your own book" : undefined}
      className={
        isOwnBook
          ? "flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-100 py-3 text-sm font-semibold text-slate-400 transition-colors"
          : "flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-700 active:bg-teal-800"
      }
    >
      <ArrowUpDown size={15} />
      {isOwnBook ? "Your listing" : "Request swap"}
    </button>
  </div>
);

export default ListingActions;
