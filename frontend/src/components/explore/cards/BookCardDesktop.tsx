import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import type { Book } from '../../../../../shared/types/book';

const BASE_URL = import.meta.env.VITE_BASE_URL ?? 'http://127.0.0.1:5000';

const BookCardDesktop = ({ book }: { book: Book }) => (
  <Link
    to={`/listing/${book._id}`}
    className="group bg-white rounded-xl border border-slate-100 overflow-hidden hover:border-teal-100 hover:shadow-lg hover:shadow-teal-50/60 transition-all duration-300 flex flex-col"
  >
    <div className="aspect-square w-full overflow-hidden bg-slate-50 relative">
      <img
        src={`${BASE_URL}${book.images[0]}`}
        alt={book.title}
        className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500 ease-out"
        onError={(e) => {
          (e.target as HTMLImageElement).src = '/placeholder-book.jpg';
        }}
      />
      <div className="absolute top-1.5 right-1.5 px-1.5 py-0.5 bg-white/95 backdrop-blur-sm rounded-md shadow-sm">
        <span className="text-[8px] font-black text-teal-600 uppercase tracking-widest whitespace-nowrap">
          {book.condition}
        </span>
      </div>
    </div>
    <div className="p-2 flex flex-col gap-0.5">
      <h3 className="text-[11px] font-bold text-slate-900 line-clamp-1 group-hover:text-teal-600 transition-colors">
        {book.title}
      </h3>
      <p className="text-[10px] text-slate-400 font-medium truncate">
        {book.author}
      </p>
      <div className="mt-1.5 pt-1.5 border-t border-slate-100 flex items-center justify-between gap-1">
        <span className="inline-flex items-center gap-0.5 text-[9px] font-semibold text-slate-400 truncate">
          <MapPin size={8} className="text-teal-400 shrink-0" />
          <span className="truncate uppercase tracking-wide">
            {book.city || 'Kolkata'}
          </span>
        </span>
        <span className="shrink-0 px-1 py-0.5 bg-slate-100 rounded text-[8px] font-bold text-slate-500 uppercase tracking-tight">
          {book.genre}
        </span>
      </div>
    </div>
  </Link>
);

export default BookCardDesktop;
