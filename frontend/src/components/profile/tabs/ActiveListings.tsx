import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  fetchUserBooks,
  swapBookListing,
  updateListingStatus,
} from '../../../store/book/bookThunk';
import {
  BookMarked,
  ChevronDown,
  Loader2,
  MoreVertical,
  Pencil,
  Plus,
  Repeat,
  EyeOff,
} from 'lucide-react';
import SwapConfirmModal from '../modals/SwapConfirmModal';

export const cls = {
  card: 'flex items-center gap-4 p-4 bg-slate-50 border border-slate-100 rounded-xl hover:border-slate-200 transition-all',
  loadingWrapper: 'flex items-center justify-center py-20 text-slate-400',
  emptyWrapper:
    'flex flex-col items-center justify-center h-full gap-4 text-slate-400 py-20',
  emptyIconBox:
    'w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center',
  title: 'text-sm font-bold text-gray-800 truncate',
  author: 'text-xs text-slate-400 mt-0.5 truncate',
  emptyTitle: 'text-sm font-semibold text-slate-500',
  emptySubtitle: 'text-xs text-slate-400 mt-1',
  sectionTitle: 'text-base font-bold text-gray-900',
  sectionCount: 'text-xs text-slate-400 mt-0.5',
  badge:
    'text-[10px] font-bold px-2 py-0.5 bg-white border border-slate-200 rounded-lg text-slate-500',
  badgeTeal:
    'text-[10px] font-bold px-2 py-0.5 bg-teal-50 border border-teal-100 rounded-lg text-teal-600',
  badgeViews:
    'flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 bg-slate-100 rounded-lg text-slate-500',
  btnPrimary:
    'flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold bg-teal-600 text-white hover:bg-teal-700 transition-all',
  btnPrimarySmall:
    'flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-teal-600 text-white hover:bg-teal-700 transition-all',
  menuBtn:
    'flex items-center gap-1.5 px-2.5 py-2 rounded-xl border border-slate-200 bg-white text-slate-500 hover:text-gray-700 hover:border-slate-300 transition-colors',
  dropdown:
    'absolute right-0 top-10 z-20 w-44 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden',
  dropdownItem:
    'w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold transition-colors text-left',
  dropdownDivider: 'h-px bg-slate-100 mx-3',
};

interface ActionsDropdownProps {
  bookId: string;
  onClose: () => void;
  onSwap: () => void;
  onInactive: () => void;
  onEdit: (id: string) => void;
}

const BASE_URL = import.meta.env.VITE_BASE_URL ?? 'http://127.0.0.1:5000';

const ActionsDropdown = ({
  bookId,
  onClose,
  onSwap,
  onInactive,
  onEdit,
}: ActionsDropdownProps) => (
  <div className={cls.dropdown}>
    <button
      className={`${cls.dropdownItem} text-teal-600 hover:bg-teal-50`}
      onClick={() => {
        onSwap();
        onClose();
      }}
    >
      <Repeat size={13} /> Mark as Swapped
    </button>
    <button
      className={`${cls.dropdownItem} text-gray-700 hover:bg-slate-50`}
      onClick={() => {
        onEdit(bookId);
        onClose();
      }}
    >
      <Pencil size={13} /> Edit Listing
    </button>
    <div className={cls.dropdownDivider} />
    <button
      className={`${cls.dropdownItem} text-gray-700 hover:bg-slate-50`}
      onClick={() => {
        onInactive();
        onClose();
      }}
    >
      <EyeOff size={13} /> Mark Inactive
    </button>
  </div>
);

const ActiveListings = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { books, isLoading } = useAppSelector((state) => state.book);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [bookToSwap, setBookToSwap] = useState<string | null>(null);
  const [isSwapping, setIsSwapping] = useState(false);

  useEffect(() => {
    dispatch(fetchUserBooks());
  }, [dispatch]);

  const activeBooks = books.filter((b) => b.status === 'published');
  const selectedBook = books.find((b) => b._id === bookToSwap);

  const handleConfirmSwap = async () => {
    if (!bookToSwap) return;
    setIsSwapping(true);
    await dispatch(swapBookListing(bookToSwap));
    setIsSwapping(false);
    setBookToSwap(null);
  };

  if (isLoading && books.length === 0) {
    return (
      <div className={cls.loadingWrapper}>
        <Loader2 size={20} className="animate-spin mr-2" />
        <span className="text-sm">Loading your listings...</span>
      </div>
    );
  }

  if (!isLoading && activeBooks.length === 0) {
    return (
      <div className={cls.emptyWrapper}>
        <div className={cls.emptyIconBox}>
          <BookMarked size={28} strokeWidth={1.5} />
        </div>
        <div className="text-center">
          <p className={cls.emptyTitle}>No active listings</p>
          <p className={cls.emptySubtitle}>
            Books you list for exchange will appear here.
          </p>
        </div>
        <button onClick={() => navigate('/create')} className={cls.btnPrimary}>
          <Plus size={15} /> List a Book
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className={cls.sectionTitle}>Active Listings</h3>
          <p className={cls.sectionCount}>
            {activeBooks.length} book{activeBooks.length !== 1 ? 's' : ''}{' '}
            currently listed
          </p>
        </div>
        <button
          onClick={() => navigate('/create')}
          className={cls.btnPrimarySmall}
        >
          <Plus size={13} /> Add New
        </button>
      </div>

      <div className="space-y-2.5">
        {activeBooks.map((book) => {
          const id = book._id ?? '';
          return (
            <div key={id} className={cls.card}>
              <Link
                to={`/listing/${id}`}
                className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-slate-100 bg-teal-50 block"
              >
                {book.images?.[0] ? (
                  <img
                    src={`${BASE_URL}${book.images[0]}`}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <BookMarked size={20} className="text-teal-400" />
                  </div>
                )}
              </Link>

              <div className="flex-1 min-w-0 space-y-1.5">
                <Link to={`/listing/${id}`}>
                  <p
                    className={`${cls.title} hover:text-teal-600 transition-colors`}
                  >
                    {book.title}
                  </p>
                </Link>
                <p className={cls.author}>by {book.author}</p>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className={cls.badge}>{book.genre}</span>
                  <span className={cls.badgeTeal}>{book.condition}</span>
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
                    bookId={id}
                    onClose={() => setOpenMenu(null)}
                    onSwap={() => setBookToSwap(id)}
                    onEdit={(bookId) => navigate(`/edit/${bookId}`)}
                    onInactive={() => {
                      dispatch(updateListingStatus({ id, status: 'inactive' }));
                      setOpenMenu(null);
                    }}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>

      <SwapConfirmModal
        isOpen={!!bookToSwap}
        title={selectedBook?.title ?? 'This Listing'}
        isSwapping={isSwapping}
        onClose={() => setBookToSwap(null)}
        onConfirm={handleConfirmSwap}
      />

      {openMenu !== null && (
        <div className="fixed inset-0 z-10" onClick={() => setOpenMenu(null)} />
      )}
    </div>
  );
};

export default ActiveListings;
