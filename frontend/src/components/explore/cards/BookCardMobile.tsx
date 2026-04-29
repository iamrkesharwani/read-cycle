import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import type { Book } from '../../../../../shared/types/book';

const BASE_URL = import.meta.env.VITE_BASE_URL ?? 'http://127.0.0.1:5000';

const BookCardMobile = ({ book }: { book: Book }) => (
  <Link
    to={`/listing/${book._id}`}
    className="group flex gap-3 bg-white rounded-2xl border border-slate-100 p-3 hover:border-teal-100 hover:shadow-md hover:shadow-teal-50/60 transition-all duration-300"
  >
    <div className="w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-slate-50 relative">
      <img
        src={`${BASE_URL}${book.images[0]}`}
        alt={book.title}
        className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500 ease-out"
        onError={(e) => {
          (e.target as HTMLImageElement).src = '/placeholder-book.jpg';
        }}
      />
      <div className="absolute top-1 right-1 px-1 py-0.5 bg-white/95 backdrop-blur-sm rounded shadow-sm">
        <span className="text-[7px] font-black text-teal-600 uppercase tracking-widest whitespace-nowrap">
          {book.condition}
        </span>
      </div>
    </div>

    <div className="flex flex-col justify-between flex-1 min-w-0 py-0.5">
      <div>
        <h3 className="text-[13px] font-bold text-slate-900 line-clamp-1 group-hover:text-teal-600 transition-colors">
          {book.title}
        </h3>
        <p className="text-[11px] text-slate-400 font-medium truncate mt-0.5">
          {book.author}
        </p>
      </div>
      <div className="flex items-center justify-between gap-1">
        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-slate-400 truncate">
          <MapPin size={9} className="text-teal-400 shrink-0" />
          <span className="truncate uppercase tracking-wide">
            {book.city || 'Kolkata'}
          </span>
        </span>
        <span className="shrink-0 px-1.5 py-0.5 bg-slate-100 rounded-md text-[9px] font-bold text-slate-500 uppercase tracking-tight">
          {book.genre}
        </span>
      </div>
    </div>
  </Link>
);

export default BookCardMobile;
