import { ArrowLeftRight, Clock, Loader2 } from "lucide-react";
import { cls } from "./style";
import StatusBadge from "./StatusBadge";
import BookCover from "./BookCover";
import type { PopulatedSwapRequest } from "../../../../../shared/types/swap";
import Empty from "./Empty";

const SentTab = ({
  sent,
  onCancel,
  cancelingId,
}: {
  sent: PopulatedSwapRequest[];
  onCancel: (id: string) => void;
  cancelingId: string | null;
}) => {
  if (!sent.length) return <Empty label="sent requests" />;
  return (
    <div className="space-y-2.5">
      {sent.map((s) => {
        const id = s._id as string;
        const isCanceling = cancelingId === id;
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
            <div className="min-w-0 flex-1 space-y-1">
              <p className={cls.title}>{s.offeredBook.title}</p>
              <p className={cls.sub}>→ {s.requestedBook.title}</p>
              <StatusBadge status={s.status} />
            </div>
            {s.status === "pending" && (
              <button
                className={`${cls.actionBtn} ${cls.cancelBtn}`}
                onClick={() => onCancel(id)}
                disabled={isCanceling}
              >
                {isCanceling ? (
                  <Loader2 size={11} className="animate-spin" />
                ) : (
                  <Clock size={11} />
                )}
                Cancel
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SentTab;
