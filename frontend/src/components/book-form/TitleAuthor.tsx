import { useFormContext } from 'react-hook-form';
import { AlertCircle, BookText, User } from 'lucide-react';
import type { CreateBookInput } from '../../../../shared/schemas/book/create.schema';

const InputField = ({
  id,
  label,
  icon: Icon,
  placeholder,
  error,
  registration,
  type = 'text',
}: {
  id: string;
  label: string;
  icon: React.ElementType;
  placeholder: string;
  error?: string;
  registration: object;
  type?: string;
}) => (
  <div className="space-y-1.5">
    <label
      htmlFor={id}
      className="flex items-center gap-2 text-sm font-semibold text-gray-700"
    >
      <Icon size={14} className="text-slate-400" />
      {label}
    </label>
    <input
      {...registration}
      id={id}
      type={type}
      placeholder={placeholder}
      className={`w-full px-4 py-3 bg-slate-50 border rounded-xl text-sm text-gray-900 placeholder:text-slate-400 outline-none transition-all duration-200 font-medium ${
        error
          ? 'border-red-400 ring-1 ring-red-400 bg-red-50/30'
          : 'border-slate-200 focus:border-teal-400 focus:ring-1 focus:ring-teal-400 focus:bg-white'
      }`}
    />
    {error && (
      <p className="flex items-center gap-1.5 text-xs text-red-500">
        <AlertCircle size={12} className="shrink-0" />
        {error}
      </p>
    )}
  </div>
);

const TitleAuthor = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<CreateBookInput>();

  return (
    <div className="space-y-5">
      <InputField
        id="title"
        label="Book Title"
        icon={BookText}
        placeholder="e.g. The Great Gatsby"
        error={errors.title?.message}
        registration={register('title')}
      />
      <InputField
        id="author"
        label="Author Name"
        icon={User}
        placeholder="e.g. F. Scott Fitzgerald"
        error={errors.author?.message}
        registration={register('author')}
      />
    </div>
  );
};

export default TitleAuthor;
