import { useFormContext, useWatch } from 'react-hook-form';
import type { CreateBookInput } from '../../../../shared/schemas/book/create.schema';
import type { ChangeEvent } from 'react';
import { ImagePlus, X, AlertCircle } from 'lucide-react';

const SLOTS = [0, 1, 2, 3] as const;

const ImageUpload = () => {
  const {
    setValue,
    control,
    formState: { errors },
  } = useFormContext<CreateBookInput>();

  const images: File[] = useWatch({ control, name: 'images' }) || [];

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, slot: number) => {
    if (!e.target.files?.[0]) return;
    const updated = [...images];
    updated[slot] = e.target.files[0];
    setValue('images', updated.filter(Boolean), {
      shouldValidate: true,
      shouldDirty: true,
    });
    e.target.value = '';
  };

  const removeImage = (e: React.MouseEvent, slot: number) => {
    e.preventDefault();
    const updated = [...images];
    updated.splice(slot, 1);
    setValue('images', updated.filter(Boolean), {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-gray-800">
          Book Images
        </label>
        <span className="text-xs text-gray-400">
          {images.length} of 4 · min. 2 required
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {SLOTS.map((slot) => {
          const file = images[slot];

          return (
            <div key={slot} className="relative group h-28">
              <input
                id={`image-slot-${slot}`}
                type="file"
                accept="image/png, image/jpeg, image/webp, image/avif"
                onChange={(e) => handleFileChange(e, slot)}
                className="hidden"
              />

              <label
                htmlFor={`image-slot-${slot}`}
                className="block w-28 h-28 cursor-pointer"
              >
                {file ? (
                  <div className="relative w-full h-full rounded-xl overflow-hidden ring-1 ring-gray-200 hover:ring-teal-400 transition-all duration-200">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Book image ${slot + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200" />
                  </div>
                ) : (
                  <div
                    className="w-full h-full flex flex-col items-center justify-center gap-2
                      rounded-xl border-[1.5px] border-dashed border-gray-300
                      bg-gray-50 hover:bg-teal-50 hover:border-teal-400
                      transition-all duration-200"
                  >
                    <ImagePlus
                      size={20}
                      className="text-gray-400 group-hover:text-teal-500 transition-colors"
                    />
                    <span className="text-[11px] font-medium text-gray-400 group-hover:text-teal-600 transition-colors">
                      Photo {slot + 1}
                    </span>
                  </div>
                )}
              </label>

              {file && (
                <button
                  type="button"
                  onClick={(e) => removeImage(e, slot)}
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full
                    bg-white border border-gray-200 hover:bg-red-500 hover:border-red-500
                    text-gray-500 hover:text-white flex items-center justify-center
                    shadow-sm transition-all duration-150 z-10
                    opacity-0 group-hover:opacity-100"
                >
                  <X size={11} strokeWidth={2.5} />
                </button>
              )}
            </div>
          );
        })}
      </div>

      {errors.images && (
        <p className="flex items-center gap-1.5 text-sm text-red-500">
          <AlertCircle size={15} />
          {errors.images.message as string}
        </p>
      )}
    </div>
  );
};

export default ImageUpload;
