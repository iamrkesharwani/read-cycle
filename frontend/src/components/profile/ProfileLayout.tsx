import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/reduxHooks';
import ProfileHeader from './ProfileHeader';
import ProfileStats from './ProfileStats';
import ProfileNav, { type TabId } from './ProfileNav';

const pathToTab: Record<string, TabId> = {
  '/personal': 'personal',
  '/active': 'active',
  '/swapped': 'swapped',
  '/inactive': 'inactive',
  '/settings': 'settings',
};

const ProfileLayout = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const activeTab = pathToTab[pathname] ?? 'personal';

  return (
    <div className="h-[calc(100vh-4rem)] flex overflow-hidden bg-slate-50">
      {/* Sidebar — desktop only */}
      <aside className="hidden md:flex flex-col w-72 xl:w-80 bg-white border-r border-slate-100 shrink-0 overflow-hidden">
        <ProfileHeader
          name={user?.name || 'Reader'}
          bio={user?.bio}
          username={user?.username}
          city={user?.city}
        />
        <ProfileStats />
        <ProfileNav
          activeTab={activeTab}
          onTabChange={(tab) => navigate(`/${tab}`)}
        />
      </aside>

      {/* Content */}
      <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-0">
        <div className="px-4 py-7 max-w-3xl mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
