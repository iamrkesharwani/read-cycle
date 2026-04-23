import { useFormContext, useWatch } from 'react-hook-form';
import type { CreateBookInput } from '../../../../shared/schemas/book/create.schema';
import { useEffect, useMemo, useState, type ChangeEvent } from 'react';
import { ImagePlus, X, AlertCircle } from 'lucide-react';
import { createPortal } from 'react-dom';

const SLOTS = [0, 1, 2, 3] as const;

const Image = () => {
  const [preview, setPreview] = useState<string | null>(null);

  const {
    setValue,
    control,
    formState: { errors },
  } = useFormContext<CreateBookInput>();

  const images: File[] = useWatch({ control, name: 'images' }) || [];

  const objectUrls = useMemo(
    () => images.map((file) => URL.createObjectURL(file)),
    [images]
  );

  useEffect(() => {
    return () => {
      objectUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [objectUrls]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

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

  const openPreview = (url: string) => {
    setPreview(url);
    document.body.style.overflow = 'hidden';
  };

  const closePreview = () => {
    setPreview(null);
    document.body.style.overflow = '';
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
          const url = objectUrls[slot];

          return (
            <div key={slot} className="relative group h-28">
              {!file && (
                <input
                  id={`image-slot-${slot}`}
                  type="file"
                  accept="image/png, image/jpeg, image/webp, image/avif"
                  onChange={(e) => handleFileChange(e, slot)}
                  className="hidden"
                />
              )}

              {!file ? (
                <label
                  htmlFor={`image-slot-${slot}`}
                  className="block w-28 h-28 cursor-pointer"
                >
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
                </label>
              ) : (
                <div
                  onClick={() => openPreview(url)}
                  className="block w-28 h-28 cursor-pointer"
                >
                  <div className="relative w-full h-full rounded-xl overflow-hidden ring-1 ring-gray-200 hover:ring-teal-400 transition-all duration-200">
                    <img
                      src={url}
                      alt={`Book image ${slot + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200" />
                  </div>
                </div>
              )}

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

      {preview &&
        createPortal(
          <div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-[9999]"
            onClick={closePreview}
          >
            <div
              className="relative max-w-3xl w-full p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={preview}
                className="w-full h-auto rounded-lg"
                alt="Preview"
              />
              <button
                onClick={closePreview}
                className="absolute top-2 right-2 bg-white rounded-full p-2"
              >
                <X size={16} />
              </button>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default Image;
