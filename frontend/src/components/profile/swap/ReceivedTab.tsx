import StatusBadge from "./StatusBadge";
import BookCover from "./BookCover";
import Empty from "./Empty";
import { cls } from "./style";
import { ArrowLeftRight, CheckCircle2, Loader2, XCircle } from "lucide-react";
import type { PopulatedSwapRequest } from "../../../../../shared/types/swap";

const ReceivedTab = ({
  received,
  onAccept,
  onReject,
  respondingId,
}: {
  received: PopulatedSwapRequest[];
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
  respondingId: string | null;
}) => {
  if (!received.length) return <Empty label="received requests" />;
  return (
    <div className="space-y-2.5">
      {received.map((s) => {
        const id = s._id as string;
        const isResponding = respondingId === id;
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
              <p className={cls.sub}>from {s.proposer.name}</p>
              <StatusBadge status={s.status} />
            </div>
            {s.status === "pending" && (
              <div className="flex shrink-0 flex-col gap-1.5">
                <button
                  className={`${cls.actionBtn} ${cls.acceptBtn}`}
                  onClick={() => onAccept(id)}
                  disabled={isResponding}
                >
                  {isResponding ? (
                    <Loader2 size={11} className="animate-spin" />
                  ) : (
                    <CheckCircle2 size={11} />
                  )}
                  Accept
                </button>
                <button
                  className={`${cls.actionBtn} ${cls.rejectBtn}`}
                  onClick={() => onReject(id)}
                  disabled={isResponding}
                >
                  <XCircle size={11} />
                  Reject
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ReceivedTab;
