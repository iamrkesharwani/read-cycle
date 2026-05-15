import { ArrowLeftRight, MessageCircle } from "lucide-react";
import type { PopulatedSwapRequest } from "../../../../shared/types/swap";
import BookCover from "./BookCover";
import Empty from "./Empty";
import { cls } from "./style";
import StatusBadge from "./StatusBadge";
import { useNavigate } from "react-router-dom";

const SwappedTab = ({ swapped }: { swapped: PopulatedSwapRequest[] }) => {
  const navigate = useNavigate();

  if (!swapped.length) return <Empty label="completed swaps" />;

  return (
    <div className="space-y-2.5">
      {swapped.map((s) => {
        const id = s._id as string;
        return (
          <div key={id} className={cls.card}>
            <BookCover
              src={s.offeredBook.images[0]}
              title={s.offeredBook.title}
            />
            <ArrowLeftRight size={12} className="shrink-0 text-slate-300" />
            <BookCover
              src={s.requestedBook.images[0]}
              title={s.requestedBook.title}
            />
            <div className="min-w-0 flex-1 space-y-0.5">
              <p className={cls.title}>{s.offeredBook.title}</p>
              <p className={cls.sub}>↔ {s.requestedBook.title}</p>
              <StatusBadge status={s.status} />
            </div>
            <button
              onClick={() => navigate(`/chat/${id}`)}
              className="flex shrink-0 items-center gap-1.5 rounded-lg border border-teal-200 bg-teal-50 px-3 py-1.5 text-xs font-bold text-teal-700 transition-all hover:bg-teal-100"
            >
              <MessageCircle size={12} />
              Chat
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default SwappedTab;
