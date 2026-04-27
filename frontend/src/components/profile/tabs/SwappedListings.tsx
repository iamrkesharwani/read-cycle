import { useEffect, useState } from 'react';
import {
  History,
  BookMarked,
  ArrowLeftRight,
  MoreVertical,
  ChevronDown,
  Trash2,
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import {
  deleteBookListing,
  fetchUserBooks,
} from '../../../store/book/bookThunk';
import DeleteListingModal from './DeleteListingModal';

export const cls = {
  card: 'flex items-center gap-4 p-4 bg-slate-50 border border-slate-100 rounded-xl hover:border-slate-200 transition-all',
  title: 'text-sm font-bold text-gray-800 truncate',
  author: 'text-xs text-slate-400 truncate',
  badge:
    'text-[10px] font-bold px-2 py-0.5 bg-white border border-slate-200 rounded-lg text-slate-500',
  badgeDate:
    'text-[10px] font-bold px-2 py-0.5 bg-slate-100 rounded-lg text-slate-400',
  menuBtn:
    'flex items-center gap-1.5 px-2.5 py-2 rounded-xl border border-slate-200 bg-white text-slate-500 hover:text-gray-700 hover:border-slate-300 transition-colors',
  dropdown:
    'absolute right-0 top-10 z-20 w-44 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden',
  dropdownItem:
    'w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold transition-colors text-left',
  coversRow: 'flex items-center gap-1.5',
  coverGave:
    'w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center',
  coverReceived:
    'w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center',
  mobileTitlesRow: 'flex items-start gap-1.5 mt-1.5 sm:hidden',
  mobileTitleText:
    'w-12 text-[10px] font-semibold text-gray-700 text-center leading-tight line-clamp-2',
  mobileTitleSpacer: 'w-3 shrink-0',
  desktopTitleRow: 'hidden sm:flex items-center gap-1.5 min-w-0',
  desktopTitleArrow: 'text-slate-300 text-xs shrink-0',
  infoBlock: 'flex-1 min-w-0 space-y-1.5',
};

const BASE_URL = import.meta.env.VITE_BASE_URL ?? 'http://127.0.0.1:5000';

interface ActionsDropdownProps {
  onClose: () => void;
  onDelete: () => void;
}

const ActionsDropdown = ({ onClose, onDelete }: ActionsDropdownProps) => (
  <div className={cls.dropdown}>
    <button
      className={`${cls.dropdownItem} bg-red-50 text-red-600 font-bold hover:bg-red-100`}
      onClick={() => {
        onDelete();
        onClose();
      }}
    >
      <Trash2 size={13} /> Delete Record
    </button>
  </div>
);

const SwappedListings = () => {
  const dispatch = useAppDispatch();
  const { books } = useAppSelector((state) => state.book);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [bookToDelete, setBookToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    dispatch(fetchUserBooks());
  }, [dispatch]);

  const swappedBooks = books.filter((b) => b.isSwapped);
  const selectedBook = books.find((b) => b._id === bookToDelete);

  const handleConfirmDelete = async () => {
    if (!bookToDelete) return;
    setIsDeleting(true);
    await dispatch(deleteBookListing(bookToDelete));
    setIsDeleting(false);
    setBookToDelete(null);
  };

  if (swappedBooks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-3 text-slate-400 py-20">
        <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center">
          <History size={28} strokeWidth={1.5} />
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-slate-500">No swaps yet</p>
          <p className="text-xs text-slate-400 mt-1">
            Completed exchanges will appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-base font-bold text-gray-900">Swapped Listings</h3>
        <p className="text-xs text-slate-400 mt-0.5">
          {swappedBooks.length} completed exchange
          {swappedBooks.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="space-y-2.5">
        {swappedBooks.map((book) => {
          const id = book._id ?? '';
          return (
            <div key={id} className={cls.card}>
              <div className="shrink-0">
                <div className={cls.coversRow}>
                  <div className={cls.coverGave}>
                    {book.images?.[0] ? (
                      <img
                        src={`${BASE_URL}${book.images[0]}`}
                        alt={book.title}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    ) : (
                      <BookMarked size={16} className="text-teal-500" />
                    )}
                  </div>

                  <ArrowLeftRight
                    size={12}
                    className="text-slate-300 shrink-0"
                  />

                  <div className={cls.coverReceived}>
                    <BookMarked size={16} className="text-slate-400" />
                  </div>
                </div>

                <div className={cls.mobileTitlesRow}>
                  <p className={cls.mobileTitleText}>{book.title}</p>
                  <span className={cls.mobileTitleSpacer} />
                  <p className={cls.mobileTitleText}>—</p>
                </div>
              </div>

              {/* Info */}
              <div className={cls.infoBlock}>
                <div className={cls.desktopTitleRow}>
                  <p className={cls.title}>{book.title}</p>
                </div>
                <p className={cls.author}>by {book.author}</p>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className={cls.badge}>{book.genre}</span>
                  <span className={cls.badgeDate}>
                    {new Date(book.updatedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="relative shrink-0">
                <button
                  className={cls.menuBtn}
                  onClick={() => setOpenMenu(openMenu === id ? null : id)}
                >
                  <MoreVertical size={14} />
                  <span className="hidden sm:inline text-xs font-semibold">
                    Actions
                  </span>
                  <ChevronDown size={12} className="hidden sm:inline" />
                </button>
                {openMenu === id && (
                  <ActionsDropdown
                    onClose={() => setOpenMenu(null)}
                    onDelete={() => setBookToDelete(id)}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>

      <DeleteListingModal
        isOpen={!!bookToDelete}
        title={selectedBook?.title ?? 'This Listing'}
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

export default SwappedListings;
