import { useFormContext } from 'react-hook-form';
import { AlertCircle, BookText, User } from 'lucide-react';
import type { CreateBookInput } from '../../../../shared/schemas/book/create.schema';

const TitleAuthor = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<CreateBookInput>();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label
          htmlFor="title"
          className="flex items-center gap-2 text-sm font-semibold text-gray-800"
        >
          <BookText size={16} className="text-gray-400" />
          Book Title
        </label>
        <div className="relative">
          <input
            {...register('title')}
            type="text"
            id="title"
            placeholder="e.g. The Great Gatsby"
            className={`w-full px-4 py-2.5 bg-gray-50 border rounded-xl outline-none transition-all
              ${
                errors.title
                  ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                  : 'border-gray-200 focus:border-teal-400 focus:ring-1 focus:ring-teal-400'
              }`}
          />
          {errors.title && (
            <p className="flex items-center gap-1.5 text-sm text-red-500 mt-1">
              <AlertCircle size={13} />
              {errors.title.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="author"
            className="flex items-center gap-2 text-sm font-semibold text-gray-800"
          >
            <User size={16} className="text-gray-400" />
            Author Name
          </label>
          <div className="relative">
            <input
              {...register('author')}
              id="author"
              type="text"
              placeholder="e.g. F. Scott Fitzgerald"
              className={`w-full px-4 py-2.5 bg-gray-50 border rounded-xl outline-none transition-all
              ${
                errors.author
                  ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                  : 'border-gray-200 focus:border-teal-400 focus:ring-1 focus:ring-teal-400'
              }`}
            />
          </div>
          {errors.author && (
            <p className="flex items-center gap-1.5 text-sm text-red-500 mt-1">
              <AlertCircle size={13} />
              {errors.author.message}
            </p>
          )}
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
        <p className="text-xs text-blue-700 leading-relaxed">
          <strong>Pro tip:</strong> Use the exact title and author name as it
          appears on the book cover to help other users find your listing more
          easily.
        </p>
      </div>
    </div>
  );
};

export default TitleAuthor;
