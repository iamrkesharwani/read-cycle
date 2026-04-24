import { User, BookMarked, History, EyeOff, Settings } from 'lucide-react';
import { cls } from '../../style/profile/ProfileNav';

export type TabId = 'personal' | 'active' | 'swapped' | 'inactive' | 'settings';

const navItems: {
  id: TabId;
  label: string;
  icon: React.ElementType;
  count?: number;
}[] = [
  { id: 'personal', label: 'Personal Information', icon: User },
  { id: 'active', label: 'Active Listings', icon: BookMarked, count: 12 },
  { id: 'swapped', label: 'Swapped', icon: History, count: 24 },
  { id: 'inactive', label: 'Inactive Listings', icon: EyeOff },
  { id: 'settings', label: 'Account Settings', icon: Settings },
];

type Props = {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
};

const ProfileNav = ({ activeTab, onTabChange }: Props) => {
  return (
    <nav className="flex-1 px-4 py-4 flex flex-col overflow-y-auto [&::-webkit-scrollbar]:w-0">
      <div className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`${cls.navBtn} ${isActive ? cls.activeBtn : cls.inactiveBtn}`}
            >
              <item.icon size={15} className="shrink-0" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.count !== undefined && (
                <span
                  className={`${cls.count} ${isActive ? cls.countActive : cls.countInactive}`}
                >
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default ProfileNav;
