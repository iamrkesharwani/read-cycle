import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { createBookListing } from '../store/book/bookThunk';
import { GENRES, CONDITIONS } from '../../../shared/types/book';
import { BookOpen, User, ImageIcon, Loader2, Sparkles } from 'lucide-react';

import {
  createBookSchema,
  type CreateBookInput,
} from '../../../shared/schemas/book/create.schema';

const CreateListing = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useAppSelector((state) => state.book);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateBookInput>({
    resolver: zodResolver(createBookSchema),
  });

  const onSubmit = async (data: CreateBookInput) => {
    const result = await dispatch(createBookListing(data));
    if (createBookListing.fulfilled.match(result)) {
      navigate('/');
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 flex flex-col md:flex-row">
        <div className="bg-teal-600 w-full md:w-1/3 p-10 text-white">
          <Sparkles className="mb-6 text-amber-300" size={40} />
          <p className="text-teal-100 leading-relaxed">
            Fill in the details to let other readers find your treasure. Be
            honest about the condition!
          </p>
        </div>

        <div className="flex-1 p-10">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Title
                </label>
                <div className="relative">
                  <BookOpen
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    size={16}
                  />
                  <input
                    {...register('title')}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-teal-500 transition-all"
                  />
                </div>
                {errors.title && (
                  <p className="text-red-500 text-[10px] font-bold">
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* Author */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Author
                </label>
                <div className="relative">
                  <User
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    size={16}
                  />
                  <input
                    {...register('author')}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-teal-500 transition-all"
                  />
                </div>
                {errors.author && (
                  <p className="text-red-500 text-[10px] font-bold">
                    {errors.author.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Genre */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Genre
                </label>
                <select
                  {...register('genre')}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-teal-500 transition-all"
                >
                  <option value="">Select Genre</option>
                  {GENRES.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
                {errors.genre && (
                  <p className="text-red-500 text-[10px] font-bold">
                    {errors.genre.message}
                  </p>
                )}
              </div>

              {/* Condition */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Condition
                </label>
                <select
                  {...register('condition')}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-teal-500 transition-all"
                >
                  <option value="">Select Condition</option>
                  {CONDITIONS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                {errors.condition && (
                  <p className="text-red-500 text-[10px] font-bold">
                    {errors.condition.message}
                  </p>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                Description
              </label>
              <textarea
                {...register('description')}
                rows={3}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-teal-500 transition-all"
                placeholder="Briefly describe the edition or any damages..."
              />
              {errors.description && (
                <p className="text-red-500 text-[10px] font-bold">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Cover URL */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                Cover Image URL
              </label>
              <div className="relative">
                <ImageIcon
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={16}
                />
                <input
                  {...register('coverImageUrl')}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-teal-500 transition-all"
                  placeholder="https://..."
                />
              </div>
              {errors.coverImageUrl && (
                <p className="text-red-500 text-[10px] font-bold">
                  {errors.coverImageUrl.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-teal-600 text-white rounded-xl font-bold shadow-lg shadow-teal-600/20 hover:bg-teal-700 transition-all flex justify-center items-center gap-2"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                'Create Listing'
              )}
            </button>

            {error && (
              <p className="text-center text-red-500 text-xs font-bold">
                {error}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateListing;
