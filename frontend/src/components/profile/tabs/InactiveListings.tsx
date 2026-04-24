import { useState } from 'react';
import { cls } from '../../../style/profile/InactiveListings';
import {
  EyeOff,
  MoreVertical,
  ChevronDown,
  RotateCcw,
  Trash2,
  BookMarked,
} from 'lucide-react';

const mockInactive = [
  {
    id: 1,
    title: 'Norwegian Wood',
    author: 'Haruki Murakami',
    genre: 'Literary Fiction',
    deactivatedOn: 'Feb 2025',
  },
  {
    id: 2,
    title: 'The Subtle Art',
    author: 'Mark Manson',
    genre: 'Self-Help',
    deactivatedOn: 'Dec 2024',
  },
];

const ActionsDropdown = ({ onClose }: { onClose: () => void }) => (
  <div className={cls.dropdown}>
    <button
      className={`${cls.dropdownItem} text-teal-600 hover:bg-teal-50`}
      onClick={() => {
        console.log('reactivate listing');
        onClose();
      }}
    >
      <RotateCcw size={13} /> Reactivate
    </button>
    <div className="h-px bg-slate-200 mx-3" />
    <button
      className={`${cls.dropdownItem} bg-red-50 text-red-600 font-bold hover:bg-red-100`}
      onClick={() => {
        console.log('delete listing');
        onClose();
      }}
    >
      <Trash2 size={13} /> Delete
    </button>
  </div>
);

const InactiveListings = () => {
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  if (mockInactive.length === 0) {
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
          {mockInactive.length} hidden from the exchange
        </p>
      </div>

      <div className="space-y-2.5">
        {mockInactive.map((book) => (
          <div key={book.id} className={cls.card}>
            <div className={cls.inner}>
              <div className="w-14 h-14 rounded-xl bg-slate-200 flex items-center justify-center shrink-0">
                <BookMarked size={20} className="text-slate-400" />
              </div>
              <div className="flex-1 min-w-0 space-y-1.5">
                <p className={cls.title}>{book.title}</p>
                <p className={cls.author}>by {book.author}</p>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className={cls.badge}>{book.genre}</span>
                  <span className={cls.badgeDate}>
                    Off since {book.deactivatedOn}
                  </span>
                </div>
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

export default InactiveListings;
