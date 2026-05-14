import { ArrowLeftRight } from "lucide-react";
import type { PopulatedSwapRequest } from "../../../../shared/types/swap";
import BookCover from "./BookCover";
import Empty from "./Empty";
import { cls } from "./style";
import StatusBadge from "./StatusBadge";

const SwappedTab = ({ swapped }: { swapped: PopulatedSwapRequest[] }) => {
  if (!swapped.length) return <Empty label="completed swaps" />;
  return (
    <div className="space-y-2.5">
      {swapped.map((s) => (
        <div key={s._id as string} className={cls.card}>
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
          </div>
          <StatusBadge status={s.status} />
        </div>
      ))}
    </div>
  );
};

export default SwappedTab;
