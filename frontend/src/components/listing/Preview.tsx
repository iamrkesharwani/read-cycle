import { useFormContext } from 'react-hook-form';
import {
  CheckCircle2,
  FileText,
  Image as ImageIcon,
  BookOpen,
  Tag,
  Info,
} from 'lucide-react';
import type { CreateBookInput } from '../../../../shared/schemas/book/create.schema.js';

const Preview = () => {
  const { getValues } = useFormContext<CreateBookInput>();
  const data = getValues();
  const imageUrls = data.images.map((file) => URL.createObjectURL(file));

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-teal-50 border border-teal-100 p-4 rounded-xl flex gap-3">
        <CheckCircle2 className="text-teal-600 shrink-0" size={20} />
        <div>
          <h3 className="text-sm font-semibold text-teal-900">
            Ready to Publish
          </h3>
          <p className="text-xs text-teal-700">
            Please review your book details below before submitting.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
            <ImageIcon size={16} className="text-gray-400" />
            Images
          </label>
          <div className="grid grid-cols-2 gap-2">
            {imageUrls.map((url, i) => (
              <img
                key={i}
                src={url}
                className="w-full h-32 object-cover rounded-lg border border-gray-100"
                alt="Book preview"
              />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-1">
            <label className="flex items-center gap-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              <BookOpen size={12} />
              Book Details
            </label>
            <h2 className="text-xl font-bold text-gray-900">{data.title}</h2>
            <p className="text-gray-600">by {data.author}</p>
          </div>

          <div className="flex gap-4">
            <div className="flex-1 space-y-1">
              <label className="flex items-center gap-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                <Tag size={12} />
                Category
              </label>
              <p className="text-sm font-medium text-gray-800">{data.genre}</p>
            </div>
            <div className="flex-1 space-y-1">
              <label className="flex items-center gap-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                <Info size={12} />
                Condition
              </label>
              <p className="text-sm font-medium text-gray-800">
                {data.condition}
              </p>
            </div>
          </div>

          <div className="space-y-1">
            <label className="flex items-center gap-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              <FileText size={12} />
              Description
            </label>
            <p className="text-sm text-gray-600 leading-relaxed italic">
              "{data.description}"
            </p>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-gray-100 flex flex-col gap-3">
        <button
          form="listing-form"
          type="submit"
          className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold shadow-lg shadow-teal-100 transition-all active:scale-[0.98]"
        >
          Publish Listing
        </button>
        <button
          type="button"
          onClick={() => console.log('Save as Draft logic goes here')}
          className="w-full py-3 bg-white border border-gray-200 text-gray-600 rounded-xl font-semibold hover:bg-gray-50 transition-all"
        >
          Save as Draft
        </button>
      </div>
    </div>
  );
};

export default Preview;
