import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import StepSelect from "./steps/StepSelect";
import StepConfirm from "./steps/StepConfirm";
import StepSuccess from "./steps/StepSuccess";

type ModalStep = "select" | "confirm" | "success";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (bookId: string) => void;
  isSubmitting: boolean;
}

const ProposeSwapModal = ({
  isOpen,
  onClose,
  onSelect,
  isSubmitting,
}: Props) => {
  const [step, setStep] = useState<ModalStep>("select");
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);

  useEffect(() => {
    if (step === "success") {
      const timer = setTimeout(() => handleClose(), 3500);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleClose = () => {
    setStep("select");
    setSelectedBookId(null);
    onClose();
  };

  const handleBookSelect = (id: string) => {
    setSelectedBookId(id);
    setStep("confirm");
  };

  const handleFinalConfirm = () => {
    if (selectedBookId) {
      onSelect(selectedBookId);
      setStep("success");
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm transition-all duration-200">
      <div className="animate-in zoom-in-95 w-full max-w-md overflow-hidden rounded-[2.5rem] bg-white shadow-2xl duration-200">
        {step === "select" && (
          <StepSelect onSelect={handleBookSelect} onClose={handleClose} />
        )}

        {step === "confirm" && (
          <StepConfirm
            selectedId={selectedBookId!}
            onBack={() => setStep("select")}
            onConfirm={handleFinalConfirm}
            isSubmitting={isSubmitting}
          />
        )}

        {step === "success" && <StepSuccess onClose={handleClose} />}
      </div>
    </div>,
    document.body,
  );
};

export default ProposeSwapModal;
