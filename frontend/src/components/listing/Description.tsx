import { useFormContext, useWatch } from 'react-hook-form';
import { AlertCircle, AlignLeft } from 'lucide-react';
import type { CreateBookInput } from '../../../../shared/schemas/book/create.schema.js';

const Description = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<CreateBookInput>();

  const description =
    useWatch({
      control,
      name: 'description',
    }) || '';

  const charCount = description.length;
  const isOverLimit = charCount > 1000;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label
          htmlFor="description"
          className="flex items-center gap-2 text-sm font-semibold text-gray-800"
        >
          <AlignLeft size={16} className="text-gray-400" />
          Description
        </label>
        <span
          className={`text-[11px] font-medium transition-colors ${
            isOverLimit ? 'text-red-500' : 'text-gray-400'
          }`}
        >
          {charCount} / 1000
        </span>
      </div>

      <div className="relative">
        <textarea
          {...register('description')}
          id="description"
          rows={8}
          placeholder="Describe the book's content, its condition in detail, or any other notes..."
          className={`w-full px-4 py-3 bg-gray-50 border rounded-xl outline-none transition-all resize-none
            ${
              errors.description
                ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                : 'border-gray-200 focus:border-teal-400 focus:ring-1 focus:ring-teal-400'
            }`}
        />
      </div>

      {errors.description ? (
        <p className="flex items-center gap-1.5 text-xs text-red-500">
          <AlertCircle size={13} />
          {errors.description.message}
        </p>
      ) : (
        <p className="text-[11px] text-gray-400 leading-relaxed">
          Provide details about markings, highlightings, or any damage to help
          the buyer. Minimum 10 characters required.
        </p>
      )}
    </div>
  );
};

export default Description;
