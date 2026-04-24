import { useState } from 'react';
import { useAppSelector } from '../../hooks/reduxHooks';
import {
  User,
  BookMarked,
  History,
  EyeOff,
  Settings,
  Star,
  Calendar,
  Repeat,
} from 'lucide-react';

const Profile = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState('personal');

  // Logic: First name, sentence case
  const formatName = (name: string) => {
    const first = name.split(' ')[0] || 'Reader';
    return first.charAt(0).toUpperCase() + first.slice(1).toLowerCase();
  };

  const navItems = [
    { id: 'personal', label: 'Personal Information', icon: User },
    { id: 'active', label: 'Active Listings', icon: BookMarked },
    { id: 'swapped', label: 'Swapped Listings', icon: History },
    { id: 'inactive', label: 'Inactive Listings', icon: EyeOff },
    { id: 'settings', label: 'Account Settings', icon: Settings },
  ];

  return (
    <div className="max-w-5xl mx-auto py-10 px-6 space-y-8">
      {/* Top Section: Header Card */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex items-center gap-8">
        <div className="w-32 h-32 rounded-full bg-teal-100 border-4 border-white shadow-md flex items-center justify-center text-teal-600 text-4xl font-bold">
          {user?.name?.[0]}
        </div>
        <div className="flex-1 space-y-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-slate-800">
              {user?.name ? formatName(user.name) : 'Guest'}
            </h1>
            <p className="text-sm text-slate-400 font-medium lowercase">
              @{user?.name?.replace(/\s+/g, '').toLowerCase()}
            </p>
          </div>
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 italic text-slate-600 text-sm">
            {user?.bio ||
              "No bio added yet. Tell us what you're currently reading!"}
          </div>
        </div>
      </div>

      {/* Middle Section: Stats Bar */}
      <div className="grid grid-cols-3 gap-4">
        {[
          {
            label: 'Ratings',
            value: '4.8',
            icon: Star,
            color: 'text-amber-500',
          },
          {
            label: 'Account Age',
            value: '2 Years',
            icon: Calendar,
            color: 'text-blue-500',
          },
          {
            label: 'Total Swaps',
            value: '24',
            icon: Repeat,
            color: 'text-teal-500',
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white p-5 rounded-2xl border border-slate-100 flex flex-col items-center gap-1"
          >
            <stat.icon size={20} className={stat.color} />
            <span className="text-xl font-bold text-slate-800">
              {stat.value}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* Bottom Section: Sidebar + Content */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Navigation Sidebar */}
        <div className="w-full md:w-72 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl text-sm font-bold transition-all ${
                activeTab === item.id
                  ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/20'
                  : 'bg-white text-slate-500 hover:bg-slate-50 border border-transparent'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white rounded-3xl p-8 border border-slate-100 min-h-[400px]">
          {activeTab === 'personal' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-slate-800">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Full Name
                  </label>
                  <p className="text-sm font-medium text-slate-700">
                    {user?.name}
                  </p>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Email Address
                  </label>
                  <p className="text-sm font-medium text-slate-700">
                    {user?.email}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'active' && (
            <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-4">
              <BookMarked size={48} strokeWidth={1} />
              <p className="text-sm font-medium">
                Your active book listings will appear here.
              </p>
            </div>
          )}

          {/* Other tabs will go here */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
