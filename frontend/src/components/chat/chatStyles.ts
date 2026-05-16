export const windowCls = {
  root: "flex h-full flex-col bg-white",
  messageArea:
    "flex-1 overflow-y-auto px-4 py-4 space-y-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-200",
};

export const headerCls = {
  root: "flex items-center gap-3 border-b border-slate-100 px-4 py-3.5 shrink-0",
  backBtn:
    "flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors lg:hidden",
  avatarWrap: "relative shrink-0",
  avatar:
    "flex h-9 w-9 items-center justify-center rounded-full bg-teal-100 text-sm font-bold text-teal-700",
  onlineDot:
    "absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white",
  info: "min-w-0 flex-1",
  name: "truncate text-sm font-bold text-slate-800",
  sub: "text-[11px] text-slate-400 truncate",
};

export const inputCls = {
  root: "shrink-0 border-t border-slate-100 p-3",
  wrap: "flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-1 ring-1 ring-transparent focus-within:ring-teal-200 transition-all",
  field:
    "flex-1 bg-transparent py-2 text-sm text-slate-800 outline-none placeholder:text-slate-400",
  sendBtn:
    "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all",
  sendActive: "bg-teal-600 text-white hover:bg-teal-700",
  sendDisabled: "bg-slate-200 text-slate-400 cursor-not-allowed",
};

export const msgCls = {
  dateSep:
    "my-3 flex items-center gap-3 text-[11px] font-semibold text-slate-400",
  dateLine: "h-px flex-1 bg-slate-100",
  row: "flex",
  rowMe: "justify-end",
  rowThem: "justify-start",
  group: "flex max-w-[72%] flex-col gap-0.5",
  groupMe: "items-end",
  groupThem: "items-start",
  bubble: "px-3.5 py-2 text-sm leading-relaxed break-words rounded-2xl",
  bubbleMe: "bg-teal-600 text-white rounded-tr-sm",
  bubbleThem: "bg-slate-100 text-slate-800 rounded-tl-sm",
  bubblePending: "opacity-60",
  bubbleError: "bg-red-100 text-red-700",
  timestamp: "text-[10px] mt-0.5 select-none text-slate-400",
  timestampMe: "text-right",
  typingRow: "flex justify-start",
  typingBubble:
    "flex items-center gap-1.5 rounded-2xl rounded-tl-sm bg-slate-100 px-3.5 py-2.5",
  dot: "h-1.5 w-1.5 rounded-full bg-slate-400",
};

export const emptyCls = {
  center:
    "flex flex-1 flex-col items-center justify-center gap-2 text-slate-400",
  iconBox:
    "flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100",
  spinning: "flex flex-1 items-center justify-center",
};

export const pageCls = {
  root: "flex h-full w-full overflow-hidden bg-slate-50",
};

export const sidebarCls = {
  root: "flex w-full flex-col border-r border-slate-100 bg-white lg:w-80 xl:w-96",
  hiddenOnMobile: "hidden lg:flex",
  visibleOnMobile: "flex",
  header: "border-b border-slate-100 px-4 py-4",
  title: "text-base font-bold text-slate-900",
  sub: "mt-0.5 text-xs text-slate-400",
  searchWrap:
    "mt-3 flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 ring-1 ring-transparent focus-within:ring-teal-200 transition-all",
  searchInput:
    "flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400",
  list: "flex-1 overflow-y-auto py-2 [&::-webkit-scrollbar]:w-0",
  emptyWrap: "flex flex-col items-center gap-2 py-16 text-slate-400",
};

export const convItemCls = {
  btn: "flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-slate-50",
  btnActive: "bg-teal-50 hover:bg-teal-50",
  avatar:
    "relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-100 text-sm font-bold text-teal-700",
  onlineDot:
    "absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white",
  info: "min-w-0 flex-1",
  name: "truncate text-sm font-semibold text-slate-800",
  books: "truncate text-[11px] text-slate-400",
  lastMsg: "truncate text-xs text-slate-500 mt-0.5",
  time: "shrink-0 text-[10px] text-slate-400",
};

export const mainPanelCls = {
  base: "flex-col",
  hiddenOnMobile: "hidden lg:flex",
  visibleOnMobile: "flex",
  emptyWrap:
    "flex flex-1 flex-col items-center justify-center gap-3 text-slate-400",
  emptyIcon:
    "flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-100",
};
