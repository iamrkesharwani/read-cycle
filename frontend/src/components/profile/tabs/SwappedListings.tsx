import { useState } from 'react';
import { cls } from '../../../style/profile/SwappedListings';
import {
  History,
  BookMarked,
  ArrowLeftRight,
  MoreVertical,
  ChevronDown,
  Trash2,
} from 'lucide-react';

const mockSwaps = [
  {
    id: 1,
    gave: 'The Alchemist',
    gaveAuthor: 'Paulo Coelho',
    received: 'Sapiens',
    receivedAuthor: 'Yuval Noah Harari',
    with: 'arjun_reads',
    date: 'Mar 2025',
  },
  {
    id: 2,
    gave: 'Atomic Habits',
    gaveAuthor: 'James Clear',
    received: '1984',
    receivedAuthor: 'George Orwell',
    with: 'bookworm_priya',
    date: 'Jan 2025',
  },
  {
    id: 3,
    gave: 'Dune',
    gaveAuthor: 'Frank Herbert',
    received: 'Foundation',
    receivedAuthor: 'Isaac Asimov',
    with: 'sci_fi_sid',
    date: 'Nov 2024',
  },
];

const ActionsDropdown = ({ onClose }: { onClose: () => void }) => (
  <div className={cls.dropdown}>
    <button
      className={`${cls.dropdownItem} bg-red-50 text-red-600 font-bold hover:bg-red-100`}
      onClick={() => {
        console.log('delete swap record');
        onClose();
      }}
    >
      <Trash2 size={13} /> Delete Record
    </button>
  </div>
);

const SwappedListings = () => {
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  if (mockSwaps.length === 0) {
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
          {mockSwaps.length} completed exchanges
        </p>
      </div>

      <div className="space-y-2.5">
        {mockSwaps.map((swap) => (
          <div key={swap.id} className={cls.card}>
            {/* Two covers with arrow */}
            <div className="flex items-center gap-1.5 shrink-0">
              <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center">
                <BookMarked size={16} className="text-teal-500" />
              </div>
              <ArrowLeftRight size={12} className="text-slate-300 shrink-0" />
              <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
                <BookMarked size={16} className="text-slate-400" />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0 space-y-1.5">
              <div className="flex items-center gap-1.5 min-w-0">
                <p className={cls.title}>{swap.gave}</p>
                <span className="text-slate-300 text-xs shrink-0">→</span>
                <p className={cls.title}>{swap.received}</p>
              </div>
              <p className={cls.author}>
                with{' '}
                <span className="font-semibold text-teal-600">
                  @{swap.with}
                </span>
              </p>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className={cls.badgeDate}>{swap.date}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="relative shrink-0">
              <button
                className={cls.menuBtn}
                onClick={() =>
                  setOpenMenu(openMenu === swap.id ? null : swap.id)
                }
              >
                <MoreVertical size={14} />
                <span className="hidden sm:inline text-xs font-semibold">
                  Actions
                </span>
                <ChevronDown size={12} className="hidden sm:inline" />
              </button>
              {openMenu === swap.id && (
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

export default SwappedListings;
