import { useState } from "react";
import { Loader2, TriangleAlert } from "lucide-react";
import DeleteAccountGeneral from "./DeleteAccountGeneral";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { deleteAccount } from "../../../store/auth/authThunk";
import { logoutUser } from "../../../store/auth/authThunk";
import { useNavigate } from "react-router-dom";

interface Props {
  onClose: () => void;
}

const DeleteAccountModal = ({ onClose }: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((s) => s.auth);
  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    setLoading(true);
    setError(null);
    try {
      await dispatch(deleteAccount()).unwrap();
      dispatch(logoutUser());
      navigate("/");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
      setLoading(false);
    }
  };

  if (step === 1) {
    return (
      <DeleteAccountGeneral
        title="Delete Account"
        description="This action is permanent and cannot be undone."
        onClose={onClose}
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 px-4 py-3">
            <TriangleAlert size={15} className="mt-0.5 shrink-0 text-red-500" />
            <p className="text-xs leading-relaxed text-red-600">
              Deleting your account will permanently remove your profile,
              listings, and all associated data. This cannot be reversed.
            </p>
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 transition-colors hover:border-slate-300"
            >
              Cancel
            </button>
            <button
              onClick={() => setStep(2)}
              className="rounded-xl bg-red-500 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-red-600"
            >
              Continue
            </button>
          </div>
        </div>
      </DeleteAccountGeneral>
    );
  }

  return (
    <DeleteAccountGeneral
      title="Are you absolutely sure?"
      description={`This will permanently delete @${user?.username ?? user?.name}'s account.`}
      onClose={onClose}
    >
      <div className="flex flex-col gap-4">
        <p className="text-sm text-slate-600">
          Type{" "}
          <span className="font-mono font-bold text-slate-800">
            delete my account
          </span>{" "}
          below to confirm.
        </p>
        <ConfirmInput onConfirmed={handleDelete} loading={loading} />
        {error && <p className="text-xs text-red-500">{error}</p>}
        <div className="flex justify-end">
          <button
            onClick={() => setStep(1)}
            className="text-xs text-slate-400 transition-colors hover:text-slate-600"
          >
            ← Go back
          </button>
        </div>
      </div>
    </DeleteAccountGeneral>
  );
};

const CONFIRM_PHRASE = "delete my account";

const ConfirmInput = ({
  onConfirmed,
  loading,
}: {
  onConfirmed: () => void;
  loading: boolean;
}) => {
  const [value, setValue] = useState("");
  const matched = value === CONFIRM_PHRASE;

  return (
    <div className="flex flex-col gap-2">
      <input
        autoFocus
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="delete my account"
        className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none transition-all focus:border-red-300 focus:ring-1 focus:ring-red-300"
      />
      <button
        onClick={onConfirmed}
        disabled={!matched || loading}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 py-2 text-xs font-bold text-white transition-all hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {loading && <Loader2 size={12} className="animate-spin" />}
        Delete My Account
      </button>
    </div>
  );
};

export default DeleteAccountModal;
