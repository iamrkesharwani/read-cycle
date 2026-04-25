export const cls = {
  // Layout
  card: 'flex items-center gap-4 p-4 bg-slate-50 border border-slate-100 rounded-xl hover:border-slate-200 transition-all',
  loadingWrapper: 'flex items-center justify-center py-20 text-slate-400',
  emptyWrapper:
    'flex flex-col items-center justify-center h-full gap-4 text-slate-400 py-20',
  emptyIconBox:
    'w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center',

  // Typography
  title: 'text-sm font-bold text-gray-800 truncate',
  author: 'text-xs text-slate-400 mt-0.5 truncate',
  emptyTitle: 'text-sm font-semibold text-slate-500',
  emptySubtitle: 'text-xs text-slate-400 mt-1',
  sectionTitle: 'text-base font-bold text-gray-900',
  sectionCount: 'text-xs text-slate-400 mt-0.5',

  // Badges
  badge:
    'text-[10px] font-bold px-2 py-0.5 bg-white border border-slate-200 rounded-lg text-slate-500',
  badgeTeal:
    'text-[10px] font-bold px-2 py-0.5 bg-teal-50 border border-teal-100 rounded-lg text-teal-600',
  badgeViews:
    'flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 bg-slate-100 rounded-lg text-slate-500',

  // Buttons
  btnPrimary:
    'flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold bg-teal-600 text-white hover:bg-teal-700 transition-all',
  btnPrimarySmall:
    'flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-teal-600 text-white hover:bg-teal-700 transition-all',
  menuBtn:
    'flex items-center gap-1.5 px-2.5 py-2 rounded-xl border border-slate-200 bg-white text-slate-500 hover:text-gray-700 hover:border-slate-300 transition-colors',

  // Dropdown
  dropdown:
    'absolute right-0 top-10 z-20 w-44 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden',
  dropdownItem:
    'w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold transition-colors text-left',
  dropdownDivider: 'h-px bg-slate-100 mx-3',
};
