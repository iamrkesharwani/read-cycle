import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import DeleteListingModal from "../modals/DeleteListingModal";
import {
  deleteBookListing,
  fetchUserBooks,
  updateListingStatus,
} from "../../../store/book/bookThunk";
import {
  EyeOff,
  MoreVertical,
  ChevronDown,
  RotateCcw,
  Trash2,
  BookMarked,
  Loader2,
} from "lucide-react";
import ConfirmModal from "../modals/ConfirmModal";

export const cls = {
  card: "group flex items-center gap-4 p-4 bg-slate-50 border border-slate-100 rounded-xl hover:border-slate-200 transition-all",
  inner:
    "flex items-center gap-4 flex-1 min-w-0 opacity-75 group-hover:opacity-100 transition-opacity",
  title: "text-sm font-bold text-gray-700 truncate",
  author: "text-xs text-slate-400 mt-0.5 truncate",
  badge:
    "text-[10px] font-bold px-2 py-0.5 bg-white border border-slate-200 rounded-lg text-slate-400",
  badgeDate:
    "text-[10px] font-bold px-2 py-0.5 bg-slate-100 rounded-lg text-slate-400",
  menuBtn:
    "flex items-center gap-1.5 px-2.5 py-2 rounded-xl border border-slate-200 bg-white text-slate-500 hover:text-gray-700 hover:border-slate-300 transition-colors",
  dropdown:
    "absolute right-0 top-10 z-20 w-44 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden",
  dropdownItem:
    "w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold transition-colors text-left",
};

const BASE_URL = import.meta.env.VITE_BASE_URL ?? "http://127.0.0.1:5000";

interface ActionsDropdownProps {
  onClose: () => void;
  onReactivate: () => void;
  onDelete: () => void;
}

const ActionsDropdown = ({
  onClose,
  onReactivate,
  onDelete,
}: ActionsDropdownProps) => (
  <div className={cls.dropdown}>
    <button
      className={`${cls.dropdownItem} text-teal-600 hover:bg-teal-50`}
      onClick={() => {
        onReactivate();
        onClose();
      }}
    >
      <RotateCcw size={13} /> Reactivate
    </button>
    <div className="mx-3 h-px bg-slate-200" />
    <button
      className={`${cls.dropdownItem} bg-red-50 font-bold text-red-600 hover:bg-red-100`}
      onClick={() => {
        onDelete();
        onClose();
      }}
    >
      <Trash2 size={13} /> Delete
    </button>
  </div>
);

const InactiveListings = () => {
  const dispatch = useAppDispatch();
  const { books, isLoading } = useAppSelector((state) => state.book);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [bookToDelete, setBookToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [bookToActivate, setBookToActivate] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    dispatch(fetchUserBooks());
  }, [dispatch]);

  const inactiveBooks = books.filter(
    (b) => b.status === "inactive" && !b.isSwapped,
  );

  const selectedDeleteBook = books.find((b) => b._id === bookToDelete);
  const selectedActivateBook = books.find((b) => b._id === bookToActivate);

  const handleConfirmDelete = async () => {
    if (!bookToDelete) return;
    setIsDeleting(true);
    await dispatch(deleteBookListing(bookToDelete));
    setIsDeleting(false);
    setBookToDelete(null);
  };

  const handleConfirmReactivate = async () => {
    if (!bookToActivate) return;
    setIsUpdating(true);
    await dispatch(
      updateListingStatus({ id: bookToActivate, status: "published" }),
    );
    setIsUpdating(false);
    setBookToActivate(null);
  };

  if (isLoading && books.length === 0) {
    return (
      <div className="flex items-center justify-center py-20 text-slate-400">
        <Loader2 size={20} className="mr-2 animate-spin" />
        <span className="text-sm">Loading listings...</span>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-base font-bold text-gray-900">Inactive Listings</h3>
        <p className="mt-0.5 text-xs text-slate-400">
          {inactiveBooks.length} hidden from the exchange
        </p>
      </div>

      {inactiveBooks.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center gap-3 py-20 text-slate-400">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
            <EyeOff size={28} strokeWidth={1.5} />
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-slate-500">
              No inactive listings
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Deactivated listings will appear here.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-2.5">
          {inactiveBooks.map((book) => {
            const id = book._id ?? "";
            return (
              <div key={id} className={cls.card}>
                <div className={cls.inner}>
                  <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-slate-100 bg-slate-200">
                    {book.images?.[0] ? (
                      <img
                        src={`${BASE_URL}${book.images[0]}`}
                        alt={book.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <BookMarked size={20} className="text-slate-400" />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1 space-y-1.5">
                    <p className={cls.title}>{book.title}</p>
                    <p className={cls.author}>by {book.author}</p>
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className={cls.badge}>{book.genre}</span>
                      <span className={cls.badgeDate}>
                        Updated{" "}
                        {new Date(book.updatedAt).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="relative shrink-0">
                  <button
                    className={cls.menuBtn}
                    onClick={() => setOpenMenu(openMenu === id ? null : id)}
                  >
                    <MoreVertical size={14} />
                    <span className="hidden text-xs font-semibold sm:inline">
                      Actions
                    </span>
                    <ChevronDown size={12} className="hidden sm:inline" />
                  </button>
                  {openMenu === id && (
                    <ActionsDropdown
                      onClose={() => setOpenMenu(null)}
                      onReactivate={() => setBookToActivate(id)}
                      onDelete={() => setBookToDelete(id)}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <ConfirmModal
        isOpen={!!bookToActivate}
        onClose={() => setBookToActivate(null)}
        onConfirm={handleConfirmReactivate}
        title="Reactivate Listing?"
        message={`This will make "${selectedActivateBook?.title}" visible to everyone again. Ready to swap?`}
        confirmText="Make Active"
        variant="teal"
        isLoading={isUpdating}
      />

      <DeleteListingModal
        isOpen={!!bookToDelete}
        title={selectedDeleteBook?.title ?? "This Listing"}
        isDeleting={isDeleting}
        onClose={() => setBookToDelete(null)}
        onConfirm={handleConfirmDelete}
      />

      {openMenu !== null && (
        <div className="fixed inset-0 z-10" onClick={() => setOpenMenu(null)} />
      )}
    </div>
  );
};

export default InactiveListings;
