import { useFormContext } from 'react-hook-form';
import { AlertCircle, Layers, Activity, ChevronDown } from 'lucide-react';
import { GENRES, CONDITIONS } from '../../../../shared/types/book';
import type { CreateBookInput } from '../../../../shared/schemas/book/create.schema.js';

const Detail = () => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<CreateBookInput>();

  const selectedCondition = watch('condition');

  return (
    <div className="space-y-7">
      <div className="space-y-1.5">
        <label
          htmlFor="genre"
          className="flex items-center gap-2 text-sm font-semibold text-gray-700"
        >
          <Layers size={14} className="text-slate-400" />
          Category
        </label>
        <div className="relative">
          <select
            {...register('genre')}
            id="genre"
            className={`w-full px-4 py-3 bg-slate-50 border rounded-xl text-sm font-medium outline-none appearance-none cursor-pointer transition-all duration-200 ${
              errors.genre
                ? 'border-red-400 ring-1 ring-red-400 text-gray-700'
                : 'border-slate-200 focus:border-teal-400 focus:ring-1 focus:ring-teal-400 focus:bg-white text-gray-900'
            }`}
          >
            <option value="" className="text-slate-400">
              Select a category
            </option>
            {GENRES.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
          <ChevronDown
            size={15}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
        </div>
        {errors.genre && (
          <p className="flex items-center gap-1.5 text-xs text-red-500">
            <AlertCircle size={12} className="shrink-0" />
            {errors.genre.message}
          </p>
        )}
      </div>

      <div className="space-y-2.5">
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
          <Activity size={14} className="text-slate-400" />
          Book Condition
        </label>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
          {CONDITIONS.map((c) => {
            const isSelected = selectedCondition === c;
            return (
              <button
                key={c}
                type="button"
                onClick={() =>
                  setValue('condition', c, { shouldValidate: true })
                }
                className={`relative px-4 py-3.5 rounded-xl border text-left transition-all duration-200 ${
                  isSelected
                    ? 'border-teal-500 bg-teal-50 ring-1 ring-teal-500 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <p
                  className={`text-sm font-bold leading-tight ${isSelected ? 'text-teal-700' : 'text-gray-700'}`}
                >
                  {c}
                </p>
                {isSelected && (
                  <div className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-teal-500 flex items-center justify-center">
                    <svg
                      viewBox="0 0 10 10"
                      className="w-2.5 h-2.5 text-white"
                      fill="none"
                    >
                      <path
                        d="M2 5l2 2 4-4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </button>
            );
          })}
        </div>
        {errors.condition && (
          <p className="flex items-center gap-1.5 text-xs text-red-500">
            <AlertCircle size={12} className="shrink-0" />
            {errors.condition.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Detail;
