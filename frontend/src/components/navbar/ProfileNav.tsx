import { PROFILE_NAV_ITEMS } from "../../constants/navItem";

export const cls = {
  navBtn:
    "w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200",
  activeBtn: "bg-teal-600 text-white shadow-sm shadow-teal-200",
  inactiveBtn: "text-slate-500 hover:bg-slate-50 hover:text-gray-700",
  count: "text-[10px] font-bold px-1.5 py-0.5 rounded-md",
  countActive: "bg-white/20 text-white",
  countInactive: "bg-slate-100 text-slate-400",
  logoutBtn:
    "mt-4 w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-500 hover:bg-red-50 hover:text-red-500 transition-all duration-200",
};

export type TabId = "personal" | "active" | "swapped" | "inactive" | "settings";

type Props = {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
};

const ProfileNav = ({ activeTab, onTabChange }: Props) => {
  return (
    <nav className="flex flex-1 flex-col overflow-y-auto px-4 py-4 [&::-webkit-scrollbar]:w-0">
      <div className="flex-1 space-y-1">
        {PROFILE_NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`${cls.navBtn} ${isActive ? cls.activeBtn : cls.inactiveBtn}`}
            >
              <item.icon size={15} className="shrink-0" />
              <span className="flex-1 text-left">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default ProfileNav;
