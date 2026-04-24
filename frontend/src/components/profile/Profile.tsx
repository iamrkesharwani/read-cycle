import { useState } from 'react';
import { useAppSelector } from '../../hooks/reduxHooks';
import ProfileHeader from './ProfileHeader';
import ProfileStats from './ProfileStats';
import ProfileNav, { type TabId } from './ProfileNav';
import PersonalInfo from './tabs/PersonalInfo';
import ActiveListings from './tabs/ActiveListings';
import SwappedListings from './tabs/SwappedListings';
import InactiveListings from './tabs/InactiveListings';
import AccountSettings from './tabs/AccountSettings';

const Profile = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState<TabId>('personal');

  const renderTab = () => {
    switch (activeTab) {
      case 'personal':
        return <PersonalInfo name={user?.name} email={user?.email} />;
      case 'active':
        return <ActiveListings />;
      case 'swapped':
        return <SwappedListings />;
      case 'inactive':
        return <InactiveListings />;
      case 'settings':
        return <AccountSettings />;
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex overflow-hidden bg-slate-50">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-72 xl:w-80 bg-white border-r border-slate-100 shrink-0 overflow-hidden">
        <ProfileHeader
          name={user?.name || 'Reader'}
          email={user?.email || ''}
          bio={user?.bio}
        />
        <ProfileStats />
        <ProfileNav activeTab={activeTab} onTabChange={setActiveTab} />
      </aside>

      {/* Content panel */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Profile */}
        <div className="md:hidden bg-white border-b border-slate-100 shrink-0">
          <ProfileHeader
            name={user?.name || 'Reader'}
            email={user?.email || ''}
            bio={user?.bio}
          />
          <ProfileStats />
          <div className="px-4 py-2 overflow-x-auto [&::-webkit-scrollbar]:w-0">
            <div className="flex gap-2 w-max">
              {(
                [
                  'personal',
                  'active',
                  'swapped',
                  'inactive',
                  'settings',
                ] as TabId[]
              ).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize whitespace-nowrap transition-all ${
                    activeTab === tab
                      ? 'bg-teal-600 text-white'
                      : 'text-slate-500 bg-slate-100'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-0">
          <div className="px-4 py-7 max-w-3xl mx-auto">{renderTab()}</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
