import { MapPin, AtSign, Star, Repeat, BookMarked } from "lucide-react";

type Props = {
  name: string;
  bio?: string;
  username?: string;
  city?: string;
};

const stats = [
  { label: "Rating", value: "4.8", icon: Star, color: "text-amber-500" },
  { label: "Swaps", value: "24", icon: Repeat, color: "text-teal-500" },
  { label: "Listed", value: "12", icon: BookMarked, color: "text-blue-500" },
];

const PublicProfileHeader = ({ name, bio, username, city }: Props) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const displayName =
    name.split(" ")[0].charAt(0).toUpperCase() +
    name.split(" ")[0].slice(1).toLowerCase();

  return (
    <div>
      <div className="flex justify-center px-6 py-6">
        <div className="flex items-start gap-5">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="flex h-[72px] w-[72px] items-center justify-center rounded-2xl bg-gradient-to-br from-teal-400 to-teal-600 text-xl font-bold text-white shadow-md shadow-teal-200">
              {initials}
            </div>
            <div className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-400" />
          </div>

          {/* Details + bio */}
          <div className="min-w-0">
            <h2 className="text-base font-bold text-slate-900">
              {displayName}
            </h2>
            <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5">
              {username && (
                <div className="flex items-center gap-1">
                  <AtSign size={10} className="shrink-0 text-slate-400" />
                  <span className="text-[11px] text-slate-400">{username}</span>
                </div>
              )}
              {city && (
                <div className="flex items-center gap-1">
                  <MapPin size={10} className="shrink-0 text-slate-400" />
                  <span className="text-[11px] text-slate-400">{city}</span>
                </div>
              )}
            </div>
            <p className="mt-2 line-clamp-2 max-w-xs text-xs italic leading-relaxed text-slate-400">
              {bio ||
                "No bio added yet. Tell the community what you're currently reading!"}
            </p>
          </div>
        </div>
      </div>

      {/* Stats bar — desktop only */}
      <div className="hidden md:flex md:items-center md:justify-center md:py-3">
        {stats.map((stat, i) => (
          <div key={stat.label} className="flex items-center">
            {i !== 0 && <div className="h-4 w-px bg-slate-200" />}
            <div className="flex items-center gap-2 px-8">
              <stat.icon size={13} className={`${stat.color} shrink-0`} />
              <span className="text-sm font-bold text-slate-800">
                {stat.value}
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                {stat.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublicProfileHeader;
