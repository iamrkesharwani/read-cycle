import { useFormContext, useWatch } from 'react-hook-form';
import { AlertCircle, AlignLeft } from 'lucide-react';
import type { CreateBookInput } from '../../../../shared/schemas/book/create.schema.js';

const MAX_CHARS = 1000;

const Description = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<CreateBookInput>();

  const description = useWatch({ control, name: 'description' }) || '';

  const charCount = description.length;
  const isOverLimit = charCount > MAX_CHARS;
  const isNearLimit = charCount > MAX_CHARS * 0.85 && !isOverLimit;
  const progressPct = Math.min((charCount / MAX_CHARS) * 100, 100);

  return (
    <div className="space-y-3">
      {/* Label row */}
      <div className="flex items-center justify-between">
        <label
          htmlFor="description"
          className="flex items-center gap-2 text-sm font-semibold text-gray-700"
        >
          <AlignLeft size={14} className="text-slate-400" />
          Description
        </label>
        <span
          className={`text-xs font-bold tabular-nums px-2 py-0.5 rounded-md transition-colors ${
            isOverLimit
              ? 'text-red-500 bg-red-50'
              : isNearLimit
                ? 'text-amber-600 bg-amber-50'
                : 'text-slate-400 bg-slate-100'
          }`}
        >
          {charCount} / {MAX_CHARS}
        </span>
      </div>

      {/* Textarea */}
      <div className="relative">
        <textarea
          {...register('description')}
          id="description"
          rows={7}
          placeholder="Describe the book's content, its condition in detail, any notable markings, highlights, or damage..."
          className={`w-full px-4 py-3 bg-slate-50 border rounded-xl text-sm text-gray-900 placeholder:text-slate-400 outline-none transition-all duration-200 resize-none leading-relaxed ${
            errors.description
              ? 'border-red-400 ring-1 ring-red-400 bg-red-50/30'
              : 'border-slate-200 focus:border-teal-400 focus:ring-1 focus:ring-teal-400 focus:bg-white'
          }`}
        />

        {/* Character progress bar at bottom of textarea */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-xl overflow-hidden">
          <div
            className={`h-full transition-all duration-200 ${
              isOverLimit
                ? 'bg-red-400'
                : isNearLimit
                  ? 'bg-amber-400'
                  : 'bg-teal-400'
            }`}
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Error or hint */}
      {errors.description ? (
        <p className="flex items-center gap-1.5 text-xs text-red-500">
          <AlertCircle size={12} className="shrink-0" />
          {errors.description.message}
        </p>
      ) : (
        <p className="text-[11px] text-slate-400 leading-relaxed">
          Minimum 10 characters. Mention any markings, highlights, or damage to
          help the buyer make an informed decision.
        </p>
      )}
    </div>
  );
};

export default Description;
