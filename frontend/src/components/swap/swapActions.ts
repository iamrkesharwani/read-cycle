type SwapAction = "accept" | "reject" | "cancel";

export const ACTION_COPY: Record<
  SwapAction,
  { title: string; desc: string; btn: string; btnCls: string }
> = {
  accept: {
    title: "Accept swap?",
    desc: "This will finalise the exchange. Both books will be marked as swapped.",
    btn: "Accept",
    btnCls: "bg-teal-600 hover:bg-teal-700 text-white",
  },
  reject: {
    title: "Reject swap?",
    desc: "The proposer will be notified that their request was declined.",
    btn: "Reject",
    btnCls: "bg-red-500 hover:bg-red-600 text-white",
  },
  cancel: {
    title: "Cancel request?",
    desc: "Your swap proposal will be withdrawn. This cannot be undone.",
    btn: "Cancel request",
    btnCls: "bg-slate-700 hover:bg-slate-800 text-white",
  },
};
