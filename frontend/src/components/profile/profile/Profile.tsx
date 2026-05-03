import { Outlet, useMatch, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../hooks/reduxHooks";
import ProfileHeader from "./ProfileHeader";
import ProfileStats from "./ProfileStats";
import ProfileNav, { type TabId } from "./ProfileNav";

const Profile = () => {
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  console.log("user:", user);
  console.log("username:", user?.username);

  const match = useMatch("/profile/:tab");
  const activeTab = (match?.params.tab as TabId) || "overview";

  const handleTabChange = (tab: TabId) => navigate(`/${tab}`);

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden bg-slate-50">
      <aside className="hidden w-72 shrink-0 flex-col overflow-hidden border-r border-slate-100 bg-white md:flex xl:w-80">
        <ProfileHeader
          name={user?.name || "Reader"}
          bio={user?.bio}
          username={user?.username || "user"}
          city={user?.city || "Kolkata"}
        />
        <ProfileStats />
        <ProfileNav activeTab={activeTab} onTabChange={handleTabChange} />
      </aside>

      {/* Content panel */}
      <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-0">
        <div className="mx-auto max-w-3xl px-4 py-7">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Profile;
