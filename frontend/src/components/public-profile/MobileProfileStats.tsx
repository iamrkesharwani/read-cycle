import { Star, Repeat, BookMarked } from "lucide-react";

const stats = [
  { label: "Rating", value: "4.8", icon: Star, color: "text-amber-500" },
  { label: "Swaps", value: "24", icon: Repeat, color: "text-teal-500" },
  { label: "Listed", value: "12", icon: BookMarked, color: "text-blue-500" },
];

const MobileProfileStats = () => {
  return (
    <div className="flex items-center justify-around px-6 py-2.5">
      {stats.map((stat, i) => (
        <div key={stat.label} className="flex items-center gap-1.5">
          {i !== 0 && <div className="mr-1.5 h-3.5 w-px bg-slate-200" />}
          <stat.icon size={11} className={stat.color} />
          <span className="text-xs font-bold text-gray-800">{stat.value}</span>
          <span className="text-[10px] font-medium text-slate-400">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default MobileProfileStats;
