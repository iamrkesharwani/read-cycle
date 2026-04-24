import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/reduxHooks';
import ProfileHeader from './ProfileHeader';
import ProfileStats from './ProfileStats';
import {
  User,
  BookMarked,
  History,
  EyeOff,
  Settings,
  ChevronRight,
} from 'lucide-react';

const sections = [
  { label: 'Personal Information', path: '/personal', icon: User },
  { label: 'Active Listings', path: '/active', icon: BookMarked },
  { label: 'Swapped', path: '/swapped', icon: History },
  { label: 'Inactive Listings', path: '/inactive', icon: EyeOff },
  { label: 'Account Settings', path: '/settings', icon: Settings },
];

const ProfileOverview = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className="space-y-5">
      {/* Mobile-only profile card */}
      <div className="md:hidden bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <ProfileHeader
          name={user?.name || 'Reader'}
          email={user?.email || ''}
          bio={user?.bio}
        />
        <ProfileStats />
      </div>

      {/* Section tiles */}
      <div className="flex flex-col md:gap-3 divide-y divide-slate-100 md:divide-y-0 bg-white md:bg-transparent rounded-2xl md:rounded-none border border-slate-100 md:border-0 overflow-hidden md:overflow-visible">
        {sections.map((section) => (
          <Link
            key={section.path}
            to={section.path}
            className="flex items-center gap-3 px-5 py-4 hover:bg-slate-50 transition-colors md:bg-white md:rounded-2xl md:border md:border-slate-100"
          >
            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
              <section.icon size={15} className="text-slate-500" />
            </div>
            <span className="flex-1 text-sm font-semibold text-gray-800">
              {section.label}
            </span>
            <ChevronRight size={15} className="text-slate-300" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProfileOverview;