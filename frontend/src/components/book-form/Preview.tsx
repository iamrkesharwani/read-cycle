import { useFormContext } from 'react-hook-form';
import type { CreateBookInput } from '../../../../shared/schemas/book/create.schema.js';
import {
  FileText,
  Image as ImageIcon,
  BookOpen,
  Tag,
  Activity,
} from 'lucide-react';

const SectionLabel = ({
  icon: Icon,
  children,
}: {
  icon: React.ElementType;
  children: React.ReactNode;
}) => (
  <p className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
    <Icon size={11} />
    {children}
  </p>
);

const resolveUrl = (entry: string | File): string =>
  entry instanceof File ? URL.createObjectURL(entry) : entry;

const Preview = () => {
  const { watch } = useFormContext<CreateBookInput>();
  const data = watch();

  const images = data.images as unknown as (string | File)[];
  const imageUrls = images.map(resolveUrl);

  return (
    <div className="space-y-5">
      <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
        {imageUrls.length > 0 ? (
          <div className="flex gap-2 p-3 bg-slate-50 border-b border-slate-100 overflow-x-auto">
            {imageUrls.map((url, i) => (
              <img
                key={i}
                src={url}
                alt={`Book photo ${i + 1}`}
                className={`h-20 w-20 object-cover rounded-xl shrink-0 border border-slate-200 ${
                  i === 0 ? 'ring-2 ring-teal-400' : ''
                }`}
              />
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-2 text-slate-400 p-5 border-b border-slate-100">
            <ImageIcon size={16} />
            <span className="text-xs">No images uploaded</span>
          </div>
        )}

        <div className="p-5 space-y-5">
          <div>
            <SectionLabel icon={BookOpen}>Book Details</SectionLabel>
            <h3 className="text-lg font-bold text-gray-900 leading-tight">
              {data.title || '—'}
            </h3>
            <p className="text-sm text-slate-500 mt-0.5">
              by {data.author || '—'}
            </p>
          </div>

          <div className="flex gap-6">
            <div>
              <SectionLabel icon={Tag}>Category</SectionLabel>
              <span className="inline-flex items-center px-2.5 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg">
                {data.genre || '—'}
              </span>
            </div>
            <div>
              <SectionLabel icon={Activity}>Condition</SectionLabel>
              <span className="inline-flex items-center px-2.5 py-1 bg-teal-50 text-teal-700 text-xs font-semibold rounded-lg border border-teal-100">
                {data.condition || '—'}
              </span>
            </div>
          </div>

          <div>
            <SectionLabel icon={FileText}>Description</SectionLabel>
            <p className="text-sm text-slate-600 leading-relaxed line-clamp-4">
              {data.description || '—'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
