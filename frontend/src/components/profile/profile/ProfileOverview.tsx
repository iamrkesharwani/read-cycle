import { Link } from "react-router-dom";
import { useAppSelector } from "../../../hooks/reduxHooks";
import ProfileHeader from "./ProfileHeader";
import ProfileStats from "./ProfileStats";
import {
  User,
  BookMarked,
  History,
  EyeOff,
  Settings,
  ChevronRight,
} from "lucide-react";

const sections = [
  { label: "Personal Information", path: "/personal", icon: User },
  { label: "Active Listings", path: "/active", icon: BookMarked },
  { label: "Swapped", path: "/swapped", icon: History },
  { label: "Inactive Listings", path: "/inactive", icon: EyeOff },
  { label: "Account Settings", path: "/settings", icon: Settings },
];

const ProfileOverview = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className="space-y-5">
      {/* Mobile-only profile card */}
      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white md:hidden">
        <ProfileHeader
          name={user?.name || "Reader"}
          bio={user?.bio}
          username={user?.username}
          city={user?.city}
        />
        <ProfileStats />
      </div>

      {/* Section tiles */}
      <div className="flex flex-col divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-100 bg-white md:gap-3 md:divide-y-0 md:overflow-visible md:rounded-none md:border-0 md:bg-transparent">
        {sections.map((section) => (
          <Link
            key={section.path}
            to={section.path}
            className="flex items-center gap-3 px-5 py-4 transition-colors hover:bg-slate-50 md:rounded-2xl md:border md:border-slate-100 md:bg-white"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100">
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
