import React, { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks.js";
import { resetBookStatus } from "../../store/book/bookSlice.js";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchBookById,
  updateBookListing,
} from "../../store/book/bookThunk.js";
import {
  editFormSchema,
  type EditBookInput,
} from "../../../../shared/schemas/book/create.schema.js";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Camera,
  BookOpen,
  Tag,
  AlignLeft,
  Eye,
  Loader2,
} from "lucide-react";

import Image from "./Image.js";
import TitleAuthor from "./TitleAuthor.js";
import Detail from "./Detail.js";
import Description from "./Description.js";
import Preview from "./Preview.js";
import ConfirmModal from "./ConfirmModal.js";

type StepConfig = {
  component: React.ReactNode;
  fields?: (keyof EditBookInput)[];
  label: string;
  subtitle: string;
};

const STEPS_META = [
  { label: "Photos", subtitle: "Upload book images", icon: Camera },
  { label: "Details", subtitle: "Title & author", icon: BookOpen },
  { label: "Category", subtitle: "Genre & condition", icon: Tag },
  { label: "Description", subtitle: "Tell buyers more", icon: AlignLeft },
  { label: "Preview", subtitle: "Review & publish", icon: Eye },
];

const BASE_URL = import.meta.env.VITE_BASE_URL ?? "http://127.0.0.1:5000";

const EditBookForm = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentBook, isLoading } = useAppSelector((state) => state.book);

  const [step, setStep] = useState(0);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [existingImages, setExistingImages] = useState<string[]>([]);

  const methods = useForm<EditBookInput>({
    resolver: zodResolver(editFormSchema),
    defaultValues: {
      images: [],
      title: "",
      author: "",
      genre: undefined,
      condition: undefined,
      description: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (id) dispatch(fetchBookById(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (!currentBook) return;

    const serverImages = currentBook.images.map(
      (path: string) => `${BASE_URL}${path}`,
    );
    setExistingImages(currentBook.images);
    methods.reset({
      images: serverImages as unknown as File[],
      title: currentBook.title,
      author: currentBook.author,
      genre: currentBook.genre,
      condition: currentBook.condition,
      description: currentBook.description,
    });
  }, [currentBook, methods]);

  const { isSubmitting } = methods.formState;
  const isPublishing = isSubmitting || isLoading;

  const steps: StepConfig[] = useMemo(
    () => [
      {
        component: (
          <Image
            existingImages={existingImages}
            onExistingImagesChange={setExistingImages}
          />
        ),
        fields: ["images"],
        ...STEPS_META[0],
      },
      {
        component: <TitleAuthor />,
        fields: ["title", "author"],
        ...STEPS_META[1],
      },
      {
        component: <Detail />,
        fields: ["genre", "condition"],
        ...STEPS_META[2],
      },
      { component: <Description />, fields: ["description"], ...STEPS_META[3] },
      { component: <Preview />, ...STEPS_META[4] },
    ],
    [existingImages],
  );

  const totalSteps = steps.length;
  const isFirstStep = step === 0;
  const isLastStep = step === totalSteps - 1;
  const progressPct = Math.round((step / (totalSteps - 1)) * 100);
  const formValues = methods.watch();

  const handleNext = async () => {
    const currentStep = steps[step];
    if (currentStep.fields) {
      const isValid = await methods.trigger(currentStep.fields);
      if (!isValid) return;
    }
    setStep((prev) => Math.min(prev + 1, totalSteps - 1));
  };

  const handleConfirm = async () => {
    if (!id) return;

    const data = formValues;
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("author", data.author);
    formData.append("condition", data.condition);
    formData.append("genre", data.genre);
    formData.append("description", data.description);
    formData.append("existingImages", JSON.stringify(existingImages));
    data.images.forEach((file) => {
      if (file instanceof File) formData.append("images", file);
    });

    const resultAction = await dispatch(
      updateBookListing({ id, data: formData }),
    );

    if (updateBookListing.fulfilled.match(resultAction)) {
      dispatch(resetBookStatus());
      navigate(`/listing/${id}`);
    }
  };

  if (isLoading && !currentBook) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center text-slate-400">
        <Loader2 size={20} className="mr-2 animate-spin" />
        <span className="text-sm">Loading listing...</span>
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <ConfirmModal
        isOpen={confirmOpen}
        isPublishing={isPublishing}
        mode="edit"
        title={formValues.title}
        author={formValues.author}
        condition={formValues.condition}
        genre={formValues.genre}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirm}
      />

      <div className="flex h-[calc(100vh-4rem)] overflow-hidden bg-slate-50">
        {/* Sidebar */}
        <aside className="hidden w-64 shrink-0 flex-col border-r border-slate-100 bg-white px-6 py-8 lg:flex xl:w-72">
          <div className="mb-10">
            <h1 className="text-[15px] font-bold tracking-tight text-gray-900">
              Edit Listing
            </h1>
            <p className="mt-0.5 text-xs text-gray-400">
              Update your book details
            </p>
          </div>

          <nav className="flex flex-col">
            {steps.map((s, i) => {
              const isCompleted = i < step;
              const isActive = i === step;
              const Icon = STEPS_META[i].icon;
              return (
                <div key={i} className="relative flex items-start gap-3">
                  {i < totalSteps - 1 && (
                    <div
                      className={`absolute left-[15px] top-9 h-10 w-0.5 rounded-full transition-colors duration-500 ${
                        isCompleted ? "bg-teal-400" : "bg-slate-100"
                      }`}
                    />
                  )}
                  <div
                    className={`relative z-10 mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all duration-300 ${
                      isCompleted
                        ? "bg-teal-500 text-white shadow-sm shadow-teal-200"
                        : isActive
                          ? "bg-white text-teal-600 shadow-sm ring-2 ring-teal-500"
                          : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {isCompleted ? (
                      <Check size={13} strokeWidth={2.5} />
                    ) : (
                      <Icon size={13} />
                    )}
                  </div>
                  <div
                    className={`pb-10 transition-all duration-200 ${
                      isActive ? "opacity-100" : "opacity-35"
                    }`}
                  >
                    <p
                      className={`text-sm font-semibold leading-tight ${
                        isActive ? "text-gray-900" : "text-gray-600"
                      }`}
                    >
                      {s.label}
                    </p>
                    <p className="mt-0.5 text-xs text-gray-400">{s.subtitle}</p>
                  </div>
                </div>
              );
            })}
          </nav>

          <div className="mt-auto pt-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs text-gray-400">Progress</span>
              <span className="text-xs font-bold text-teal-600">
                {progressPct}%
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-teal-500 transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        </aside>

        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Mobile progress strip */}
          <div className="shrink-0 border-b border-slate-100 bg-white px-5 pb-3 pt-4 lg:hidden">
            <div className="mb-2.5 flex items-center justify-between">
              <span className="text-sm font-bold text-gray-800">
                {steps[step].label}
              </span>
              <span className="text-xs font-medium text-gray-400">
                {step + 1} / {totalSteps}
              </span>
            </div>
            <div className="flex gap-1.5">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                    i <= step ? "bg-teal-500" : "bg-slate-200"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Desktop step header */}
          <div className="hidden shrink-0 border-b border-slate-100 bg-slate-50 px-8 pb-5 pt-7 lg:block">
            <div className="mx-auto max-w-3xl">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.12em] text-teal-600">
                Step {step + 1} of {totalSteps}
              </p>
              <h2 className="text-xl font-bold text-gray-900">
                {steps[step].label}
              </h2>
              <p className="mt-0.5 text-sm text-gray-400">
                {steps[step].subtitle}
              </p>
            </div>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-0">
            <div className="mx-auto max-w-3xl px-5 py-6 lg:px-8">
              <div
                onKeyDown={(e) => {
                  if (
                    e.key === "Enter" &&
                    (e.target as HTMLElement).tagName !== "TEXTAREA"
                  ) {
                    e.preventDefault();
                  }
                }}
              >
                {steps.map((s, i) => (
                  <div key={i} className={i === step ? "block" : "hidden"}>
                    {s.component}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom navigation */}
          <div className="flex shrink-0 items-center justify-between gap-2 border-t border-slate-100 bg-white px-4 py-3.5 lg:px-8">
            <button
              type="button"
              disabled={isFirstStep}
              onClick={() => setStep((prev) => Math.max(prev - 1, 0))}
              className="flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm font-semibold text-gray-500 transition-all hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-25"
            >
              <ChevronLeft size={15} />
              <span className="hidden sm:inline">Previous</span>
            </button>

            {!isLastStep ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-1.5 whitespace-nowrap rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm shadow-teal-200 transition-all hover:bg-teal-700 active:scale-95"
              >
                Continue
                <ChevronRight size={15} />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmOpen(true)}
                className="flex items-center gap-1.5 whitespace-nowrap rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm shadow-teal-200 transition-all hover:bg-teal-700 active:scale-95"
              >
                Save Changes
                <ChevronRight size={15} />
              </button>
            )}
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default EditBookForm;
