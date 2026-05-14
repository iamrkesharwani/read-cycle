import { CheckCircle2 } from "lucide-react";

interface StepSuccessProps {
  onClose: () => void;
}

const StepSuccess = ({ onClose }: StepSuccessProps) => {
  return (
    <div className="flex flex-col items-center p-10 text-center">
      <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-teal-50 text-teal-500 shadow-inner">
        <CheckCircle2
          size={40}
          strokeWidth={2.5}
          className="animate-in zoom-in duration-300"
        />
      </div>
      <h3 className="text-2xl font-bold text-slate-900">Proposal Sent!</h3>
      <p className="mt-3 px-4 text-sm font-medium leading-relaxed text-slate-500">
        We have notified the owner. You can track this request in your{" "}
        <span className="font-bold text-teal-600">Sent Requests</span>.
      </p>

      <button
        onClick={onClose}
        className="mt-8 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 transition-colors hover:text-teal-600"
      >
        Close Now
      </button>
    </div>
  );
};

export default StepSuccess;
