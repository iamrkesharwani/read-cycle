import { CalendarDays, BookOpen } from 'lucide-react';
import type { BookGenre } from '../../../../shared/types/book';

interface Props {
  owner?: { name: string; username?: string };
  createdAt: string | Date;
  genre?: BookGenre;
}

const ListingMeta = ({ owner, createdAt, genre }: Props) => {
  const formattedDate = new Date(createdAt).toLocaleDateString('en-IN', {
    month: 'short',
    year: 'numeric',
  });

  const displayName = owner?.name ?? 'Unknown';
  const initials = displayName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-600">
          <CalendarDays size={12} className="text-teal-500 flex-shrink-0" />
          Listed {formattedDate}
        </span>
        {genre && (
          <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-600">
            <BookOpen size={12} className="text-teal-500 flex-shrink-0" />
            {genre}
          </span>
        )}
      </div>

      <div className="flex items-center gap-3.5 px-4 py-3.5 rounded-2xl border border-slate-200 bg-white">
        <div className="w-10 h-10 rounded-full bg-teal-100 border border-teal-200 flex items-center justify-center flex-shrink-0">
          <span className="text-sm font-bold text-teal-700">{initials}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-slate-800 truncate">
            {displayName}
          </p>
          {owner?.username && (
            <p className="text-xs text-slate-400 mt-0.5">@{owner.username}</p>
          )}
        </div>
        <button className="flex-shrink-0 px-3.5 py-1.5 text-xs font-semibold text-slate-700 border border-slate-200 rounded-lg hover:border-teal-400 hover:text-teal-700 transition-colors whitespace-nowrap">
          View profile →
        </button>
      </div>
    </div>
  );
};

export default ListingMeta;
