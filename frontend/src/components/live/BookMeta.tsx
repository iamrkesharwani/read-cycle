import type { BookCondition } from '../../../../shared/types/book';

interface Props {
  title: string;
  author: string;
  condition?: BookCondition;
  description: string;
}

const ALL_CONDITIONS: BookCondition[] = ['New', 'Like New', 'Used', 'Worn'];

const BookMeta = ({ title, author, condition, description }: Props) => (
  <div className="flex flex-col gap-4">
    <div className="space-y-1">
      <h1 className="text-3xl font-bold text-slate-900 leading-tight tracking-tight">
        {title}
      </h1>
      <p className="text-sm text-slate-400 font-medium">{author}</p>
    </div>

    <div className="border-t border-slate-100" />

    <div className="flex flex-col gap-3">
      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
        Condition
      </p>
      <div className="flex flex-wrap gap-2">
        {ALL_CONDITIONS.map((c) => (
          <span
            key={c}
            className={`px-4 py-2 rounded-xl text-sm font-medium border transition-colors select-none
              ${
                c === condition
                  ? 'border-slate-700 text-slate-900 bg-white shadow-sm'
                  : 'border-slate-200 text-slate-400 bg-white'
              }`}
          >
            {c}
          </span>
        ))}
      </div>
    </div>

    <div className="border-t border-slate-100" />

    <div className="flex flex-col gap-2">
      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
        About
      </p>
      <p className="text-sm text-slate-600 leading-relaxed line-clamp-5">
        {description}
      </p>
    </div>
  </div>
);

export default BookMeta;
