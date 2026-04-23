import { useFormContext } from 'react-hook-form';
import { AlertCircle, Layers, Activity } from 'lucide-react';
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
    <div className="space-y-8">
      <div className="space-y-2">
        <label
          htmlFor="genre"
          className="flex items-center gap-2 text-sm font-semibold text-gray-800"
        >
          <Layers size={16} className="text-gray-400" />
          Category
        </label>
        <select
          {...register('genre')}
          id="genre"
          className={`w-full px-4 py-2.5 bg-gray-50 border rounded-xl outline-none appearance-none transition-all cursor-pointer
            ${
              errors.genre
                ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                : 'border-gray-200 focus:border-teal-400 focus:ring-1 focus:ring-teal-400'
            }`}
        >
          <option value="">Select a category</option>
          {GENRES.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
        {errors.genre && (
          <p className="flex items-center gap-1.5 text-sm text-red-500 mt-1">
            <AlertCircle size={13} />
            {errors.genre.message}
          </p>
        )}
      </div>

      <div className="space-y-3">
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
          <Activity size={16} className="text-gray-400" />
          Book Condition
        </label>
        <div className="grid grid-cols-2 gap-3">
          {CONDITIONS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setValue('condition', c, { shouldValidate: true })}
              className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all
                ${
                  selectedCondition === c
                    ? 'border-teal-500 bg-teal-50 text-teal-700 ring-1 ring-teal-500'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                }`}
            >
              {c}
            </button>
          ))}
        </div>
        {errors.condition && (
          <p className="flex items-center gap-1.5 text-sm text-red-500 mt-1">
            <AlertCircle size={13} />
            {errors.condition.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Detail;
