import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { useNavigate } from 'react-router-dom';
import { cls } from '../../../style/profile/ActiveListings';
import { Link } from 'react-router-dom';
import {
  fetchUserBooks,
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

interface ActionsDropdownProps {
  onClose: () => void;
  onSwap: () => void;
  onInactive: () => void;
}

const BASE_URL = import.meta.env.VITE_BASE_URL ?? 'http://127.0.0.1:5000';

const ActionsDropdown = ({
  onClose,
  onSwap,
  onInactive,
}: ActionsDropdownProps) => (
  <div className={cls.dropdown}>
    <button
      className={`${cls.dropdownItem} text-teal-600 hover:bg-teal-50`}
      onClick={() => {
        console.log('mark as swapped');
        onClose();
      }}
    >
      <Repeat size={13} /> Mark as Swapped
    </button>
    <button
      className={`${cls.dropdownItem} text-gray-700 hover:bg-slate-50`}
      onClick={() => {
        console.log('edit listing');
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

  useEffect(() => {
    dispatch(fetchUserBooks());
  }, [dispatch]);

  const activeBooks = books.filter((b) => b.status === 'published');

  if (isLoading && books.length === 0) {
    return (
      <div className={cls.loadingWrapper}>
        <Loader2 size={20} className="animate-spin mr-2" />
        <span className="text-sm">Loading your listings...</span>
      </div>
    );
  }

  if (books.length === 0) {
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
                    onClose={() => setOpenMenu(null)}
                    onSwap={() => {}}
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

      {openMenu !== null && (
        <div className="fixed inset-0 z-10" onClick={() => setOpenMenu(null)} />
      )}
    </div>
  );
};

export default ActiveListings;
