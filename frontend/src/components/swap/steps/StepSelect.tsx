import { BookMarked, Loader2, X, AlertCircle } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { useEffect } from "react";
import { fetchUserBooks } from "../../../store/book/bookThunk";

const BASE_URL = import.meta.env.VITE_BASE_URL ?? "http://127.0.0.1:5000";

interface StepSelectProps {
  onSelect: (id: string) => void;
  onClose: () => void;
}

const StepSelect = ({ onSelect, onClose }: StepSelectProps) => {
  const dispatch = useAppDispatch();
  const { books, isLoading } = useAppSelector((state) => state.book);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUserBooks());
  }, [dispatch]);

  const myAvailableBooks = books.filter(
    (b) =>
      b.status === "published" &&
      !b.isSwapped &&
      b.ownerId === user?.id,
  );

  return (
    <>
      <div className="flex items-center justify-between border-b border-slate-50 px-6 py-4">
        <h3 className="font-bold text-slate-900">Select a book to offer</h3>
        <button
          onClick={onClose}
          className="text-slate-400 transition-colors hover:text-slate-600"
        >
          <X size={20} />
        </button>
      </div>

      <div className="max-h-[400px] overflow-y-auto p-4">
        {isLoading ? (
          <div className="flex flex-col items-center py-12 text-slate-400">
            <Loader2 className="mb-2 animate-spin" size={24} />
            <span className="text-sm font-medium">Loading your library...</span>
          </div>
        ) : myAvailableBooks.length === 0 ? (
          <div className="flex flex-col items-center py-12 text-center">
            <div className="mb-3 rounded-2xl bg-amber-50 p-3 text-amber-500">
              <AlertCircle size={24} />
            </div>
            <p className="text-sm font-bold text-slate-900">
              No books available
            </p>
            <p className="mt-1 px-6 text-xs text-slate-500">
              You need an active listing to propose a swap.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {myAvailableBooks.map((book) => (
              <button
                key={book._id}
                onClick={() => onSelect(book._id as string)}
                className="group flex w-full items-center gap-3 rounded-2xl border border-slate-100 p-3 text-left transition-all hover:border-teal-400 hover:bg-teal-50"
              >
                <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-slate-100 bg-slate-50">
                  {book.images?.[0] ? (
                    <img
                      src={`${BASE_URL}${book.images[0]}`}
                      alt={book.title}
                      className="h-full w-full object-cover transition-transform group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-slate-300">
                      <BookMarked size={20} />
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-slate-700">
                    {book.title}
                  </p>
                  <p className="truncate text-[11px] font-medium uppercase tracking-wider text-slate-400">
                    {book.author}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default StepSelect;