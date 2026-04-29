import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import type { Book } from '../../../../shared/types/book';

const BASE_URL = import.meta.env.VITE_BASE_URL ?? 'http://127.0.0.1:5000';

interface BookCardProps {
  book: Book;
}

const BookCard = ({ book }: BookCardProps) => {
  return (
    <Link
      to={`/listing/${book._id}`}
      className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 flex flex-col"
    >
      <div className="aspect-[3/4] overflow-hidden bg-slate-50 relative">
        <img
          src={`${BASE_URL}${book.images[0]}`}
          alt={book.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder-book.jpg';
          }}
        />
        <div className="absolute top-2 right-2 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-lg border border-slate-100 shadow-sm">
          <span className="text-[10px] font-bold text-teal-600 uppercase tracking-wider">
            {book.condition}
          </span>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1 min-w-0">
        <div className="flex-1">
          <h3 className="text-sm font-bold text-slate-900 line-clamp-1 group-hover:text-teal-600 transition-colors">
            {book.title}
          </h3>
          <p className="text-xs text-slate-400 font-medium mt-0.5 truncate">
            {book.author}
          </p>
        </div>

        <div className="mt-3 pt-3 border-t border-slate-50 flex items-center justify-between">
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-tight">
            <MapPin size={10} className="text-teal-500" />
            {book.city || 'Kolkata'}
          </span>
          <span className="px-2 py-0.5 bg-slate-100 rounded-md text-[10px] font-bold text-slate-500 uppercase">
            {book.genre}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
