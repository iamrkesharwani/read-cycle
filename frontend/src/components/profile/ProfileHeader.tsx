import { MapPin, Edit2 } from 'lucide-react';
import { cls } from '../../style/profile/ProfileHeader';

type Props = {
  name: string;
  email: string;
  bio?: string;
};

const ProfileHeader = ({ name, bio }: Props) => {
  const firstName = name.split(' ')[0] || 'Reader';
  const displayName =
    firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
  const username = name.replace(/\s+/g, '').toLowerCase();
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="px-5 pt-4 pb-3 md:px-6 md:pt-7 md:pb-5 border-b border-slate-100">
      <div className="flex items-center gap-3 md:items-start md:gap-4">
        <div className="relative shrink-0">
          <div className={cls.avatar}>{initials}</div>
          <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 md:w-4 md:h-4 rounded-full bg-emerald-400 border-2 border-white" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-sm md:text-base font-bold text-gray-900 truncate">
              {displayName}
            </h2>
            <button className={cls.editBtn}>
              <Edit2 size={12} />
            </button>
          </div>
          <p className={cls.username}>@{username}</p>
          <div className="flex items-center gap-1 mt-0.5">
            <MapPin size={10} className="text-slate-300 shrink-0" />
            <p className={cls.location}>Siliguri, India</p>
          </div>
        </div>
      </div>

      <div className={cls.bio}>
        <p className="text-xs text-slate-500 italic leading-relaxed line-clamp-2">
          {bio ||
            "No bio added yet. Tell the community what you're currently reading!"}
        </p>
      </div>
    </div>
  );
};

export default ProfileHeader;
