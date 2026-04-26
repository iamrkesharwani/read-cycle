import { useState } from 'react';
import {
  History,
  BookMarked,
  ArrowLeftRight,
  MoreVertical,
  ChevronDown,
  Trash2,
} from 'lucide-react';

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
            {/* Covers + titles below on mobile */}
            <div className="shrink-0">
              <div className={cls.coversRow}>
                <div className={cls.coverGave}>
                  <BookMarked size={16} className="text-teal-500" />
                </div>
                <ArrowLeftRight size={12} className="text-slate-300 shrink-0" />
                <div className={cls.coverReceived}>
                  <BookMarked size={16} className="text-slate-400" />
                </div>
              </div>

              <div className={cls.mobileTitlesRow}>
                <p className={cls.mobileTitleText}>{swap.gave}</p>
                <span className={cls.mobileTitleSpacer} />
                <p className={cls.mobileTitleText}>{swap.received}</p>
              </div>
            </div>

            {/* Info */}
            <div className={cls.infoBlock}>
              <div className={cls.desktopTitleRow}>
                <p className={cls.title}>{swap.gave}</p>
                <span className={cls.desktopTitleArrow}>→</span>
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
