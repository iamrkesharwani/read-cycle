import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../hooks/reduxHooks";
import ProfileHeader from "./ProfileHeader";
import ProfileStats from "./ProfileStats";
import ProfileNav, { type TabId } from "../../navbar/ProfileNav";

const pathToTab: Record<string, TabId> = {
  "/personal": "personal",
  "/active": "active",
  "/swapped": "swapped",
  "/inactive": "inactive",
  "/settings": "settings",
};

const ProfileLayout = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const activeTab = pathToTab[pathname] ?? "personal";

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden bg-slate-50">
      <aside className="hidden w-72 shrink-0 flex-col overflow-hidden border-r border-slate-100 bg-white md:flex xl:w-80">
        <ProfileHeader
          name={user?.name || "Reader"}
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

      <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-0">
        <div className="mx-auto max-w-3xl px-4 py-7">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
