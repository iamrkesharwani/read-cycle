import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import DeleteConfirmModal from './DeleteConfirmModal';
import {
  deleteBookListing,
  fetchUserBooks,
  updateListingStatus,
} from '../../../store/book/bookThunk';
import {
  EyeOff,
  MoreVertical,
  ChevronDown,
  RotateCcw,
  Trash2,
  BookMarked,
  Loader2,
} from 'lucide-react';

export const cls = {
  card: 'group flex items-center gap-4 p-4 bg-slate-50 border border-slate-100 rounded-xl hover:border-slate-200 transition-all',
  inner:
    'flex items-center gap-4 flex-1 min-w-0 opacity-75 group-hover:opacity-100 transition-opacity',
  title: 'text-sm font-bold text-gray-700 truncate',
  author: 'text-xs text-slate-400 mt-0.5 truncate',
  badge:
    'text-[10px] font-bold px-2 py-0.5 bg-white border border-slate-200 rounded-lg text-slate-400',
  badgeDate:
    'text-[10px] font-bold px-2 py-0.5 bg-slate-100 rounded-lg text-slate-400',
  menuBtn:
    'flex items-center gap-1.5 px-2.5 py-2 rounded-xl border border-slate-200 bg-white text-slate-500 hover:text-gray-700 hover:border-slate-300 transition-colors',
  dropdown:
    'absolute right-0 top-10 z-20 w-44 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden',
  dropdownItem:
    'w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold transition-colors text-left',
};

const BASE_URL = import.meta.env.VITE_BASE_URL ?? 'http://127.0.0.1:5000';

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
    <div className="h-px bg-slate-200 mx-3" />
    <button
      className={`${cls.dropdownItem} bg-red-50 text-red-600 font-bold hover:bg-red-100`}
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

  useEffect(() => {
    dispatch(fetchUserBooks());
  }, [dispatch]);

  const inactiveBooks = books.filter((b) => b.status === 'inactive');
  const seletedBook = books.find((b) => b._id === bookToDelete);

  const handleConfirmDelete = async () => {
    if (bookToDelete) {
      await dispatch(deleteBookListing(bookToDelete));
      setBookToDelete(null);
    }
  };

  if (isLoading && books.length === 0) {
    return (
      <div className="flex items-center justify-center py-20 text-slate-400">
        <Loader2 size={20} className="animate-spin mr-2" />
        <span className="text-sm">Loading listings...</span>
      </div>
    );
  }

  if (inactiveBooks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-3 text-slate-400 py-20">
        <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center">
          <EyeOff size={28} strokeWidth={1.5} />
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-slate-500">
            No inactive listings
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Deactivated listings will appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-base font-bold text-gray-900">Inactive Listings</h3>
        <p className="text-xs text-slate-400 mt-0.5">
          {inactiveBooks.length} hidden from the exchange
        </p>
      </div>

      <div className="space-y-2.5">
        {inactiveBooks.map((book) => {
          const id = book._id ?? '';
          return (
            <div key={id} className={cls.card}>
              <div className={cls.inner}>
                <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-slate-100 bg-slate-200">
                  {book.images?.[0] ? (
                    <img
                      src={`${BASE_URL}${book.images[0]}`}
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <BookMarked size={20} className="text-slate-400" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0 space-y-1.5">
                  <p className={cls.title}>{book.title}</p>
                  <p className={cls.author}>by {book.author}</p>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className={cls.badge}>{book.genre}</span>
                    <span className={cls.badgeDate}>
                      Updated{' '}
                      {new Date(book.updatedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        year: 'numeric',
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
                  <span className="hidden sm:inline text-xs font-semibold">
                    Actions
                  </span>
                  <ChevronDown size={12} className="hidden sm:inline" />
                </button>
                {openMenu === id && (
                  <ActionsDropdown
                    onClose={() => setOpenMenu(null)}
                    onReactivate={() =>
                      dispatch(updateListingStatus({ id, status: 'published' }))
                    }
                    onDelete={() => setBookToDelete(id)}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>

      <DeleteConfirmModal
        isOpen={!!bookToDelete}
        title={seletedBook?.title ?? 'This Listing'}
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
