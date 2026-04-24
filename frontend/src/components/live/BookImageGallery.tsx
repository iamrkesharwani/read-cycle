import { useState } from 'react';
import { ImageOff } from 'lucide-react';

const BASE_URL = import.meta.env.VITE_BASE_URL ?? 'http://127.0.0.1:5000';

interface Props {
  images: string[];
  title: string;
}

const BookImageGallery = ({ images = [], title }: Props) => {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-3 h-full w-full">
      <div className="flex-1 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-50 to-teal-50/40 border border-slate-100 min-h-0 relative">
        {images[active] ? (
          <img
            src={`${BASE_URL}${images[active]}`}
            alt={title}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
            className="w-full h-full object-cover transition-opacity duration-300"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-teal-200">
            <ImageOff size={44} strokeWidth={1} />
            <span className="text-xs text-slate-300 font-medium tracking-wide">
              No image
            </span>
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 flex-shrink-0 flex-wrap">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-14 h-14 rounded-xl overflow-hidden border-[1.5px] transition-all duration-200 flex-shrink-0
                ${
                  active === i
                    ? 'border-teal-500 ring-2 ring-teal-500/20 scale-[1.03]'
                    : 'border-slate-200 hover:border-teal-300 opacity-70 hover:opacity-100'
                }`}
            >
              <img
                src={`${BASE_URL}${img}`}
                alt=""
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookImageGallery;
