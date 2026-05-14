import { cls } from "./style";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { useEffect, useState } from "react";
import { fetchMySwaps, respondToSwap } from "../../../store/swap/swapThunk";
import { Loader2 } from "lucide-react";
import SwappedTab from "./SwappedTab";
import ReceivedTab from "./ReceivedTab";
import SentTab from "./SentTab";

export const BASE_URL =
  import.meta.env.VITE_BASE_URL ?? "http://127.0.0.1:5000";

type TabId = "swapped" | "received" | "sent";

const tabs: { id: TabId; label: string }[] = [
  { id: "swapped", label: "Swapped" },
  { id: "received", label: "Received" },
  { id: "sent", label: "Sent" },
];

const MySwaps = () => {
  const dispatch = useAppDispatch();
  const { received, sent, listLoading } = useAppSelector((s) => s.swap);
  const [tab, setTab] = useState<TabId>("swapped");
  const [respondingId, setRespondingId] = useState<string | null>(null);
  const [cancelingId, setCancelingId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchMySwaps());
  }, [dispatch]);

  const swapped = [...received, ...sent].filter((s) => s.status === "accepted");

  const handleAccept = async (id: string) => {
    setRespondingId(id);
    await dispatch(respondToSwap({ id, status: "accepted" }));
    dispatch(fetchMySwaps());
    setRespondingId(null);
  };

  const handleReject = async (id: string) => {
    setRespondingId(id);
    await dispatch(respondToSwap({ id, status: "rejected" }));
    dispatch(fetchMySwaps());
    setRespondingId(null);
  };

  const handleCancel = async (id: string) => {
    setCancelingId(id);
    await dispatch(respondToSwap({ id, status: "canceled" }));
    dispatch(fetchMySwaps());
    setCancelingId(null);
  };

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-base font-bold text-gray-900">My Swaps</h3>
        <p className="mt-0.5 text-xs text-slate-400">
          {swapped.length} completed exchange{swapped.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className={cls.tabWrap}>
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`${cls.tabBtn} ${tab === t.id ? cls.tabActive : cls.tabInactive}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {listLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-teal-500" size={24} />
        </div>
      ) : (
        <>
          {tab === "swapped" && <SwappedTab swapped={swapped} />}
          {tab === "received" && (
            <ReceivedTab
              received={received}
              onAccept={handleAccept}
              onReject={handleReject}
              respondingId={respondingId}
            />
          )}
          {tab === "sent" && (
            <SentTab
              sent={sent}
              onCancel={handleCancel}
              cancelingId={cancelingId}
            />
          )}
        </>
      )}
    </div>
  );
};

export default MySwaps;
