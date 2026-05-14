import { Star } from "lucide-react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { toggleBookInterest } from "../../store/book/bookThunk";
import OwnBookModal from "./OwnBookModal";

interface InterestButtonProps {
  bookId: string;
  isOwnBook: boolean;
}

const InterestButton = ({ bookId, isOwnBook }: InterestButtonProps) => {
  const dispatch = useAppDispatch();
  const { isInterested, isLoading } = useAppSelector((state) => state.book);
  const [showModal, setShowModal] = useState(false);

  const handleToggle = () => {
    if (isOwnBook) {
      setShowModal(true);
      return;
    }
    dispatch(toggleBookInterest(bookId));
  };

  return (
    <>
      <button
        onClick={handleToggle}
        disabled={isLoading}
        className={`flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border px-4 text-sm font-semibold transition-all ${
          isInterested
            ? "border-amber-100 bg-amber-50 text-amber-600"
            : "border-slate-200 bg-white text-slate-400 hover:border-teal-400 hover:text-teal-600"
        } disabled:opacity-50`}
      >
        <Star
          size={20}
          fill={isInterested ? "currentColor" : "none"}
          strokeWidth={isInterested ? 0 : 2}
        />
        {isInterested ? "Interested" : "Express Interest"}
      </button>

      {showModal && <OwnBookModal onClose={() => setShowModal(false)} />}
    </>
  );
};

export default InterestButton;
