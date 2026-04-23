import { useFormContext, useWatch } from 'react-hook-form';
import type { CreateBookInput } from '../../../../shared/schemas/book/create.schema';
import { useEffect, useMemo, useRef, useState, type ChangeEvent } from 'react';
import { ImagePlus, X, AlertCircle, ZoomIn } from 'lucide-react';
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
  const urlCacheRef = useRef<Map<File, string>>(new Map());

  const objectUrls = useMemo(() => {
    const cache = urlCacheRef.current;
    images.forEach((file) => {
      if (!cache.has(file)) cache.set(file, URL.createObjectURL(file));
    });
    cache.forEach((url, file) => {
      if (!images.includes(file)) {
        URL.revokeObjectURL(url);
        cache.delete(file);
      }
    });
    return images.map((file) => cache.get(file)!);
  }, [images]);

  useEffect(() => {
    const cache = urlCacheRef.current;
    return () => {
      objectUrls.forEach((url) => URL.revokeObjectURL(url));
      cache.clear();
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
    e.stopPropagation();
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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-bold text-gray-800">Book Images</p>
          <p className="text-xs text-gray-400 mt-0.5">
            Minimum 2 required · up to 4 photos
          </p>
        </div>
        <span
          className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
            images.length >= 2
              ? 'bg-teal-50 text-teal-600'
              : 'bg-slate-100 text-slate-400'
          }`}
        >
          {images.length} / 4
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {SLOTS.map((slot) => {
          const file = images[slot];
          const url = objectUrls[slot];
          const isCover = slot === 0;

          return (
            <div key={slot} className="relative group aspect-square">
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
                  className="block w-full h-full cursor-pointer"
                >
                  <div
                    className={`w-full h-full flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed transition-all duration-200 ${
                      isCover
                        ? 'border-teal-300 bg-teal-50/50 hover:bg-teal-50 hover:border-teal-400'
                        : 'border-slate-200 bg-slate-50 hover:bg-teal-50/40 hover:border-teal-300'
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200 ${
                        isCover
                          ? 'bg-teal-100 group-hover:bg-teal-200'
                          : 'bg-slate-100 group-hover:bg-teal-100'
                      }`}
                    >
                      <ImagePlus
                        size={17}
                        className={`transition-colors duration-200 ${
                          isCover
                            ? 'text-teal-500'
                            : 'text-slate-400 group-hover:text-teal-500'
                        }`}
                      />
                    </div>
                    <div className="text-center">
                      <p
                        className={`text-[11px] font-semibold transition-colors duration-200 ${
                          isCover
                            ? 'text-teal-600'
                            : 'text-slate-400 group-hover:text-teal-600'
                        }`}
                      >
                        {isCover ? 'Cover Photo' : `Photo ${slot + 1}`}
                      </p>
                      {isCover && (
                        <p className="text-[10px] text-teal-400 mt-0.5">
                          shown first
                        </p>
                      )}
                    </div>
                  </div>
                </label>
              ) : (
                <button
                  type="button"
                  onClick={() => openPreview(url)}
                  className="block w-full h-full cursor-zoom-in"
                >
                  <div className="relative w-full h-full rounded-2xl overflow-hidden ring-1 ring-slate-200 group-hover:ring-teal-400 transition-all duration-200 shadow-sm">
                    <img
                      src={url}
                      alt={`Book image ${slot + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-200 flex items-center justify-center">
                      <ZoomIn
                        size={20}
                        className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 drop-shadow"
                      />
                    </div>
                    {isCover && (
                      <div className="absolute bottom-1.5 left-1.5 bg-teal-600/90 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md tracking-wide backdrop-blur-sm">
                        COVER
                      </div>
                    )}
                  </div>
                </button>
              )}

              {file && (
                <button
                  type="button"
                  onClick={(e) => removeImage(e, slot)}
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white border border-slate-200 hover:bg-red-500 hover:border-red-500 text-slate-400 hover:text-white flex items-center justify-center shadow-md transition-all duration-150 z-10 opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                >
                  <X size={11} strokeWidth={2.5} />
                </button>
              )}
            </div>
          );
        })}
      </div>

      {errors.images && (
        <div className="flex items-center gap-2 text-sm text-red-500 bg-red-50 border border-red-100 rounded-xl px-3 py-2.5">
          <AlertCircle size={14} className="shrink-0" />
          <span>{errors.images.message as string}</span>
        </div>
      )}

      {preview &&
        createPortal(
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[9999] p-4"
            onClick={closePreview}
          >
            <div
              className="relative max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={preview}
                className="w-full h-auto rounded-2xl shadow-2xl"
                alt="Preview"
              />
              <button
                onClick={closePreview}
                className="absolute -top-3 -right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-slate-100 transition-colors"
              >
                <X size={15} className="text-slate-600" />
              </button>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default Image;
