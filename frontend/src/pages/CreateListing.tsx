import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { createBookListing } from '../store/book/bookThunk';
import { GENRES, CONDITIONS } from '../../../shared/types/book';
import {
  BookOpen,
  User,
  Loader2,
  X,
  ImagePlus,
  Tag,
  Star,
  AlignLeft,
  ChevronDown,
} from 'lucide-react';
import {
  createBookSchema,
  type CreateBookInput,
} from '../../../shared/schemas/book/create.schema';
import { useEffect, useState } from 'react';
import { resetBookStatus } from '../store/book/bookSlice';

const Label = ({ children }: { children: React.ReactNode }) => (
  <p className="text-xs font-semibold text-slate-600 uppercase tracking-widest mb-1.5">
    {children}
  </p>
);

const ErrorMsg = ({ msg }: { msg?: string }) =>
  msg ? (
    <p className="text-red-500 text-[11px] font-semibold mt-1">{msg}</p>
  ) : null;

const inputBase =
  'w-full py-2.5 pr-3 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all';

const CreateListing = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useAppSelector((state) => state.book);
  const [previews, setPreviews] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  useEffect(() => {
    return () => {
      dispatch(resetBookStatus());
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [dispatch, previews]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateBookInput>({
    resolver: zodResolver(createBookSchema),
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const updated = [...selectedFiles, ...files].slice(0, 4);
    setSelectedFiles(updated);
    setValue('images', updated as any, { shouldValidate: true });
    setPreviews(updated.map((f) => URL.createObjectURL(f)));
  };

  const removeImage = (index: number) => {
    const updated = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updated);
    setValue('images', updated as any, { shouldValidate: true });
    setPreviews(updated.map((f) => URL.createObjectURL(f)));
  };

  const onSubmit = async (data: CreateBookInput) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('author', data.author);
    formData.append('genre', data.genre);
    formData.append('condition', data.condition);
    formData.append('description', data.description);
    selectedFiles.forEach((file) => formData.append('images', file));
    const result = await dispatch(createBookListing(formData));
    if (createBookListing.fulfilled.match(result)) navigate('/');
  };

  return (
    <div className="w-full bg-white/90 backdrop-blur-sm border border-slate-200 rounded-2xl shadow-xl overflow-hidden">
      {/* Card header */}
      <div className="flex items-center gap-3 px-8 py-5 border-b border-slate-100">
        <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center shadow shadow-teal-700/20">
          <BookOpen size={15} className="text-white" />
        </div>
        <h1 className="text-base font-bold text-slate-800">New Listing</h1>
      </div>

      {/* Body */}
      <div className="flex divide-x divide-slate-100">
        {/* Photos column */}
        <div className="w-72 flex-shrink-0 px-6  flex flex-col gap-3">
          <Label>Photos</Label>

          {/* Primary slot */}
          <div className="w-full aspect-square rounded-xl overflow-hidden flex-shrink-0">
            {previews[0] ? (
              <div className="group relative w-full h-full">
                <img
                  src={previews[0]}
                  className="w-full h-full object-cover"
                  alt="Preview 1"
                />
                <button
                  type="button"
                  onClick={() => removeImage(0)}
                  className="absolute top-2 right-2 w-6 h-6 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={11} className="text-white" />
                </button>
              </div>
            ) : (
              <label className="group w-full h-full flex flex-col items-center justify-center gap-2 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 cursor-pointer hover:border-teal-400 hover:bg-teal-50/50 transition-all">
                <ImagePlus
                  size={24}
                  className="text-slate-300 group-hover:text-teal-500 transition-colors"
                />
                <span className="text-xs font-semibold text-slate-400 group-hover:text-teal-500 transition-colors text-center px-2">
                  Add cover photo
                </span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                />
              </label>
            )}
          </div>

          {/* Secondary slots */}
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map((index) => (
              <div key={index} className="aspect-square">
                {previews[index] ? (
                  <div className="group relative w-full h-full rounded-lg overflow-hidden">
                    <img
                      src={previews[index]}
                      className="w-full h-full object-cover"
                      alt={`Preview ${index + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"
                    >
                      <X size={11} className="text-white" />
                    </button>
                  </div>
                ) : (
                  <label className="group w-full h-full flex items-center justify-center border-2 border-dashed border-slate-200 rounded-lg bg-slate-50 cursor-pointer hover:border-teal-400 hover:bg-teal-50/50 transition-all">
                    <X
                      size={12}
                      className="text-slate-300 rotate-45 group-hover:text-teal-400 transition-colors"
                    />
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                    />
                  </label>
                )}
              </div>
            ))}
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed mt-auto pt-2 pb-4">
            Clear photos greatly increase your chances of a successful swap.
          </p>
        </div>

        {/* Fields */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 p-6 flex flex-col gap-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Title</Label>
              <div className="relative">
                <BookOpen
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  {...register('title')}
                  placeholder="e.g. Dune"
                  className={`${inputBase} pl-9`}
                />
              </div>
              <ErrorMsg msg={errors.title?.message} />
            </div>
            <div>
              <Label>Author</Label>
              <div className="relative">
                <User
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  {...register('author')}
                  placeholder="e.g. Frank Herbert"
                  className={`${inputBase} pl-9`}
                />
              </div>
              <ErrorMsg msg={errors.author?.message} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Genre</Label>
              <div className="relative">
                <Tag
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
                <ChevronDown
                  size={14}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
                <select
                  {...register('genre')}
                  className={`${inputBase} pl-9 pr-8 appearance-none cursor-pointer`}
                >
                  <option value="">Select genre</option>
                  {GENRES.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>
              <ErrorMsg msg={errors.genre?.message} />
            </div>
            <div>
              <Label>Condition</Label>
              <div className="relative">
                <Star
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
                <ChevronDown
                  size={14}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
                <select
                  {...register('condition')}
                  className={`${inputBase} pl-9 pr-8 appearance-none cursor-pointer`}
                >
                  <option value="">Select condition</option>
                  {CONDITIONS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <ErrorMsg msg={errors.condition?.message} />
            </div>
          </div>

          <div className="flex-1 flex flex-col">
            <Label>Description</Label>
            <div className="relative flex-1">
              <AlignLeft
                size={14}
                className="absolute left-3 top-3 text-slate-400"
              />
              <textarea
                {...register('description')}
                rows={5}
                placeholder="Briefly describe the edition, printing, or any wear and tear…"
                className={`${inputBase} pl-9 resize-none h-full`}
              />
            </div>
            <ErrorMsg msg={errors.description?.message} />
          </div>

          <div className="flex flex-col gap-2 pt-1">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-teal-600 hover:bg-teal-700 disabled:opacity-60 text-white rounded-xl text-sm font-bold tracking-wide shadow-md shadow-teal-700/20 flex items-center justify-center gap-2 transition-colors active:scale-[0.99]"
            >
              {isLoading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <>
                  <BookOpen size={15} /> Publish Listing
                </>
              )}
            </button>
            {error && (
              <p className="text-center text-red-500 text-xs font-semibold">
                {error}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateListing;
