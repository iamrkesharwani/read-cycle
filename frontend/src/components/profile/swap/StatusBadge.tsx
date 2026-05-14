import { cls } from "./style";

const StatusBadge = ({ status }: { status: string }) => {
  const badgeCls =
    status === "pending"
      ? cls.badgePending
      : status === "accepted"
        ? cls.badgeAccepted
        : cls.badgeCanceled;
  return <span className={`${cls.badge} ${badgeCls}`}>{status}</span>;
};

export default StatusBadge;
