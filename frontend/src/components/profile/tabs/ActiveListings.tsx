import { useState } from 'react';
import { cls } from '../../../style/profile/ActiveListings';
import {
  BookMarked,
  Plus,
  Eye,
  MoreVertical,
  ChevronDown,
  Repeat,
  Pencil,
  EyeOff,
} from 'lucide-react';

const mockListings = [
  {
    id: 1,
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    genre: 'Fiction',
    condition: 'Like New',
    views: 34,
  },
  {
    id: 2,
    title: 'Atomic Habits',
    author: 'James Clear',
    genre: 'Self-Help',
    condition: 'Very Good',
    views: 21,
  },
  {
    id: 3,
    title: 'Dune',
    author: 'Frank Herbert',
    genre: 'Sci-Fi',
    condition: 'Good',
    views: 18,
  },
];

const ActionsDropdown = ({ onClose }: { onClose: () => void }) => (
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
    <div className="h-px bg-slate-100 mx-3" />
    <button
      className={`${cls.dropdownItem} text-red-500 hover:bg-red-50`}
      onClick={() => {
        console.log('mark inactive');
        onClose();
      }}
    >
      <EyeOff size={13} /> Mark Inactive
    </button>
  </div>
);

const ActiveListings = () => {
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  if (mockListings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 text-slate-400 py-20">
        <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center">
          <BookMarked size={28} strokeWidth={1.5} />
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-slate-500">
            No active listings
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Books you list for exchange will appear here.
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold bg-teal-600 text-white hover:bg-teal-700 transition-all">
          <Plus size={15} /> List a Book
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-gray-900">Active Listings</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            {mockListings.length} books currently listed
          </p>
        </div>
        <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-teal-600 text-white hover:bg-teal-700 transition-all">
          <Plus size={13} /> Add New
        </button>
      </div>

      <div className="space-y-2.5">
        {mockListings.map((book) => (
          <div key={book.id} className={cls.card}>
            <div className="w-14 h-14 rounded-xl bg-teal-100 flex items-center justify-center shrink-0">
              <BookMarked size={20} className="text-teal-500" />
            </div>

            <div className="flex-1 min-w-0 space-y-1.5">
              <p className={cls.title}>{book.title}</p>
              <p className={cls.author}>by {book.author}</p>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className={cls.badge}>{book.genre}</span>
                <span className={cls.badgeTeal}>{book.condition}</span>
                <span className={cls.badgeViews}>
                  <Eye size={10} />
                  {book.views} views
                </span>
              </div>
            </div>

            <div className="relative shrink-0">
              <button
                className={cls.menuBtn}
                onClick={() =>
                  setOpenMenu(openMenu === book.id ? null : book.id)
                }
              >
                <MoreVertical size={14} />
                <span className="hidden sm:inline text-xs font-semibold">
                  Actions
                </span>
                <ChevronDown size={12} className="hidden sm:inline" />
              </button>
              {openMenu === book.id && (
                <ActionsDropdown onClose={() => setOpenMenu(null)} />
              )}
            </div>
          </div>
        ))}
      </div>

      {openMenu !== null && (
        <div className="fixed inset-0 z-10" onClick={() => setOpenMenu(null)} />
      )}
    </div>
  );
};

export default ActiveListings;
