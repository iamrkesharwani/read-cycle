import { BookMarked } from "lucide-react";
import { cls } from "./style";

const Empty = ({ label }: { label: string }) => (
  <div className={cls.emptyWrap}>
    <div className={cls.emptyIcon}>
      <BookMarked size={28} strokeWidth={1.5} />
    </div>
    <div className="text-center">
      <p className="text-sm font-semibold text-slate-500">No {label} yet</p>
    </div>
  </div>
);

export default Empty;
