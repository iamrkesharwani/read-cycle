import { NavLink, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { useEffect } from "react";
import { fetchPublicProfile } from "../../store/auth/authThunk";
import { fetchPublicUserListings } from "../../store/book/bookThunk";
import LoadingState from "../live/state/LoadingState";
import ErrorState from "../live/state/ErrorState";
import { BookMarked, Settings } from "lucide-react";
import BookCard from "../explore/BookCard";
import type { Book } from "../../../../shared/types/book";
import PublicProfileHeader from "./PublicProfileHeader";
import MobileProfileStats from "./MobileProfileStats";

const PublicProfile = () => {
  const { username } = useParams<{ username: string }>();
  const dispatch = useAppDispatch();
  const {
    user: currentUser,
    publicProfile,
    isLoading: authLoading,
    error: authError,
  } = useAppSelector((state) => state.auth);
  const { books, isLoading: bookLoading } = useAppSelector(
    (state) => state.book,
  );

  const cleanUsername = username?.startsWith("@")
    ? username.slice(1)
    : username;
  const isOwnProfile = currentUser?.username === cleanUsername;

  useEffect(() => {
    if (cleanUsername) {
      dispatch(fetchPublicProfile(cleanUsername));
    }
  }, [cleanUsername, dispatch]);

  useEffect(() => {
    if (publicProfile?._id) {
      dispatch(fetchPublicUserListings(publicProfile._id));
    }
  }, [publicProfile?._id, dispatch]);

  if (authLoading || (bookLoading && books.length === 0))
    return <LoadingState />;
  if (authError || !publicProfile)
    return <ErrorState message={authError || "User not found"} />;

  return (
    <div className="mx-auto h-[calc(100vh-65px)]">
      <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
        {/* Header */}
        <div className="relative">
          <PublicProfileHeader
            name={publicProfile.name}
            username={publicProfile.username}
            bio={publicProfile.bio}
            city={publicProfile.city}
          />
          {isOwnProfile && (
            <NavLink
              to="/settings"
              className="absolute right-6 top-6 rounded-xl border border-slate-100 bg-slate-50 p-2 text-slate-400 transition-all hover:bg-teal-50 hover:text-teal-600"
            >
              <Settings size={18} />
            </NavLink>
          )}
        </div>

        {/* Stats — mobile only */}
        <div className="md:hidden">
          <MobileProfileStats />
        </div>

        {/* Listings */}
        <div className="flex-1 overflow-y-auto bg-slate-50/30 p-6 lg:p-10 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-200 hover:[&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:w-1.5">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                {isOwnProfile ? "Your Listings" : "Active Listings"}
              </h3>
              <p className="text-xs text-slate-400 sm:text-sm">
                {isOwnProfile
                  ? "Books you're currently sharing"
                  : `Books from @${publicProfile.username}`}
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-slate-100 bg-white px-3 py-1.5 text-xs font-bold text-teal-600">
              <BookMarked size={14} />
              {books.length} Books
            </div>
          </div>

          {books.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white py-20 text-center">
              <p className="text-sm italic text-slate-400">
                No available listings to show.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {books.map((book: Book) => (
                <BookCard key={book._id} book={book} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicProfile;
