import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { fetchInterestedUsers } from "../../../store/book/bookThunk";
import { createPortal } from "react-dom";
import { ExternalLink, Star, User, X } from "lucide-react";
import LoadingState from "../../live/state/LoadingState";
import { NavLink } from "react-router-dom";

interface InterestedUsersModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookId: string;
  bookTitle: string;
}

const InterestedUsersModal = ({
  isOpen,
  onClose,
  bookId,
  bookTitle,
}: InterestedUsersModalProps) => {
  const dispatch = useAppDispatch();
  const { interestedUsers, isLoading } = useAppSelector((state) => state.book);

  useEffect(() => {
    if (isOpen && bookId) dispatch(fetchInterestedUsers(bookId));
  }, [isOpen, bookId, dispatch]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-50 bg-slate-50/30 px-6 py-4">
          <div className="min-w-0 flex-1">
            <h3 className="font-bold text-slate-900">Interested Users</h3>
            <p className="truncate text-[11px] text-slate-400">{bookTitle}</p>
          </div>
          <button
            onClick={onClose}
            className="ml-4 rounded-full border border-transparent p-2 text-slate-400 transition-colors hover:border-slate-100 hover:bg-white hover:text-slate-600"
          >
            <X size={18} />
          </button>
        </div>

        <div className="max-h-[400px] overflow-y-auto p-2">
          {isLoading ? (
            <div className="py-12">
              <LoadingState />
            </div>
          ) : interestedUsers.length === 0 ? (
            <div className="py-16 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-100 bg-slate-50">
                <Star size={20} className="text-slate-300" />
              </div>
              <p className="text-sm font-medium italic text-slate-400">
                No interest expressed yet
              </p>
            </div>
          ) : (
            <div className="space-y-1 p-2">
              {interestedUsers.map((user) => (
                <div
                  key={user._id}
                  className="group flex items-center justify-between rounded-2xl border border-transparent p-3 transition-all hover:border-teal-100 hover:bg-teal-50/30"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-100 bg-slate-50 text-slate-400 transition-colors group-hover:bg-white group-hover:text-teal-600">
                      <User size={18} />
                    </div>
                    <div className="flex flex-col">
                      <NavLink
                        to={`/@${user.username}`}
                        className="flex items-center gap-1 text-sm font-bold text-slate-900 transition-colors hover:text-teal-600"
                      >
                        @{user.username}{" "}
                        <ExternalLink
                          size={10}
                          className="opacity-0 transition-opacity group-hover:opacity-100"
                        />
                      </NavLink>
                      <span className="text-[10px] font-bold uppercase tracking-tight text-slate-400">
                        {user.city}
                      </span>
                    </div>
                  </div>
                  <div className="h-9 w-9 rounded-xl border border-slate-100 bg-white transition-colors group-hover:border-teal-200" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default InterestedUsersModal;
