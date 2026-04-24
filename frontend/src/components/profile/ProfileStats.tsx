import { Star, Repeat, BookMarked } from 'lucide-react';

const stats = [
  {
    label: 'Rating',
    value: '4.8',
    icon: Star,
    color: 'text-amber-500',
    bg: 'bg-amber-50',
  },
  {
    label: 'Swaps',
    value: '24',
    icon: Repeat,
    color: 'text-teal-500',
    bg: 'bg-teal-50',
  },
  {
    label: 'Listed',
    value: '12',
    icon: BookMarked,
    color: 'text-blue-500',
    bg: 'bg-blue-50',
  },
];

const ProfileStats = () => {
  return (
    <div className="px-6 border-b border-slate-100">
      {/* Mobile: single tight inline row */}
      <div className="md:hidden flex items-center justify-around py-2.5">
        {stats.map((stat, i) => (
          <div key={stat.label} className="flex items-center gap-1.5">
            {i !== 0 && <div className="w-px h-3.5 bg-slate-200 mr-1.5" />}
            <stat.icon size={11} className={stat.color} />
            <span className="text-xs font-bold text-gray-800">
              {stat.value}
            </span>
            <span className="text-[10px] text-slate-400 font-medium">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* Desktop: card grid */}
      <div className="hidden md:grid grid-cols-3 gap-2 py-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`${stat.bg} rounded-xl px-2 py-3 flex flex-col items-center gap-1`}
          >
            <stat.icon size={14} className={stat.color} />
            <span className="text-sm font-bold text-gray-800">
              {stat.value}
            </span>
            <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileStats;
