import { Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../hooks/reduxHooks";
import { logout } from "../../store/auth/authSlice";
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
} from "lucide-react";
import type { TabId } from "../profile/ProfileNav";

const tabs: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: "personal", label: "Personal Information", icon: User },
  { id: "active", label: "Active Listings", icon: BookMarked },
  { id: "swapped", label: "Swapped", icon: History },
  { id: "inactive", label: "Inactive Listings", icon: EyeOff },
  { id: "settings", label: "Account Settings", icon: Settings },
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
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 z-50 flex h-full w-72 flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <p className="text-sm font-bold text-gray-900">
            {user ? `Hi, ${user.name?.split(" ")[0]}` : "Menu"}
          </p>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-gray-700"
          >
            <X size={16} />
          </button>
        </div>

        {/* Nav items */}
        <div className="flex-1 space-y-0.5 overflow-y-auto px-3 py-3 [&::-webkit-scrollbar]:w-0">
          <Link
            to="/"
            onClick={onClose}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-gray-900"
          >
            <Compass size={15} className="shrink-0 text-slate-400" />
            Explore
          </Link>

          {user && (
            <>
              <div className="px-3 pb-1 pt-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Profile
                </p>
              </div>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => goToTab(tab.id)}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-gray-900"
                >
                  <tab.icon size={15} className="shrink-0 text-slate-400" />
                  {tab.label}
                </button>
              ))}

              <div className="px-3 pb-1 pt-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Account
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-red-500 transition-colors hover:bg-red-50"
              >
                <LogOut size={15} className="shrink-0" />
                Log Out
              </button>
            </>
          )}
        </div>

        {/* List a Book */}
        {user && (
          <div className="border-t border-slate-100 px-4 py-4">
            <Link
              to="/create"
              onClick={onClose}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 py-3 text-sm font-bold text-white transition-all hover:bg-teal-700"
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
