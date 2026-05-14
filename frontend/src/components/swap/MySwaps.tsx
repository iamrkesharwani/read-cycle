import { cls } from "./style";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { useEffect, useState } from "react";
import { fetchMySwaps, respondToSwap } from "../../store/swap/swapThunk";
import { Loader2 } from "lucide-react";
import SwappedTab from "./SwappedTab";
import ReceivedTab from "./ReceivedTab";
import SentTab from "./SentTab";
import ConfirmModal from "./ConfirmModal";

export const BASE_URL =
  import.meta.env.VITE_BASE_URL ?? "http://127.0.0.1:5000";

type TabId = "swapped" | "received" | "sent";
type SwapAction = "accept" | "reject" | "cancel";

interface ConfirmState {
  id: string;
  action: SwapAction;
}

const tabs: { id: TabId; label: string }[] = [
  { id: "swapped", label: "Swapped" },
  { id: "received", label: "Received" },
  { id: "sent", label: "Sent" },
];

const MySwaps = () => {
  const dispatch = useAppDispatch();
  const { received, sent, listLoading } = useAppSelector((s) => s.swap);
  const [tab, setTab] = useState<TabId>("swapped");
  const [actingId, setActingId] = useState<string | null>(null);
  const [confirmModal, setConfirmModal] = useState<ConfirmState | null>(null);

  useEffect(() => {
    dispatch(fetchMySwaps());
  }, [dispatch]);

  const swapped = [...received, ...sent].filter((s) => s.status === "accepted");
  const pendingReceived = received.filter((s) => s.status !== "accepted");
  const pendingSent = sent.filter((s) => s.status !== "accepted");

  const handleAccept = (id: string) =>
    setConfirmModal({ id, action: "accept" });
  const handleReject = (id: string) =>
    setConfirmModal({ id, action: "reject" });
  const handleCancel = (id: string) =>
    setConfirmModal({ id, action: "cancel" });

  const executeConfirmedAction = async () => {
    if (!confirmModal) return;
    const { id, action } = confirmModal;
    const statusMap: Record<SwapAction, "accepted" | "rejected" | "canceled"> =
      {
        accept: "accepted",
        reject: "rejected",
        cancel: "canceled",
      };
    setConfirmModal(null);
    setActingId(id);
    await dispatch(respondToSwap({ id, status: statusMap[action] }));
    dispatch(fetchMySwaps());
    setActingId(null);
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
              received={pendingReceived}
              onAccept={handleAccept}
              onReject={handleReject}
              respondingId={actingId}
            />
          )}
          {tab === "sent" && (
            <SentTab
              sent={pendingSent}
              onCancel={handleCancel}
              cancelingId={actingId}
            />
          )}
        </>
      )}

      {confirmModal && (
        <ConfirmModal
          confirmModal={confirmModal}
          setConfirmModal={setConfirmModal}
          executeConfirmedAction={executeConfirmedAction}
        />
      )}
    </div>
  );
};

export default MySwaps;
