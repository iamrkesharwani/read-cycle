import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks';
import { logout } from '../../store/auth/authSlice';
import {
  X,
  User,
  BookMarked,
  History,
  EyeOff,
  Settings,
  Compass,
  PlusCircle,
  LogOut,
} from 'lucide-react';
import type { TabId } from '../profile/ProfileNav';

const tabs: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: 'personal', label: 'Personal Information', icon: User },
  { id: 'active', label: 'Active Listings', icon: BookMarked },
  { id: 'swapped', label: 'Swapped', icon: History },
  { id: 'inactive', label: 'Inactive Listings', icon: EyeOff },
  { id: 'settings', label: 'Account Settings', icon: Settings },
];

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const MobileMenu = ({ isOpen, onClose }: Props) => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const goToTab = (tab: TabId) => {
    navigate(`/${tab}`);
    onClose();
  };

  const handleLogout = () => {
    dispatch(logout());
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-200 ${
          isOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <p className="text-sm font-bold text-gray-900">
            {user ? `Hi, ${user.name?.split(' ')[0]}` : 'Menu'}
          </p>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-gray-700 hover:bg-slate-100 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Nav items */}
        <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-0 px-3 py-3 space-y-0.5">
          <Link
            to="/"
            onClick={onClose}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-gray-900 transition-colors"
          >
            <Compass size={15} className="text-slate-400 shrink-0" />
            Explore
          </Link>

          {user && (
            <>
              <div className="px-3 pt-3 pb-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Profile
                </p>
              </div>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => goToTab(tab.id)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-gray-900 transition-colors text-left"
                >
                  <tab.icon size={15} className="text-slate-400 shrink-0" />
                  {tab.label}
                </button>
              ))}

              <div className="px-3 pt-4 pb-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Account
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors text-left"
              >
                <LogOut size={15} className="shrink-0" />
                Log Out
              </button>
            </>
          )}
        </div>

        {/* List a Book CTA */}
        {user && (
          <div className="px-4 py-4 border-t border-slate-100">
            <Link
              to="/create-listing"
              onClick={onClose}
              className="flex items-center justify-center gap-2 w-full py-3 bg-teal-600 text-white rounded-xl font-bold text-sm hover:bg-teal-700 transition-all"
            >
              <PlusCircle size={16} />
              List a Book
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default MobileMenu;
