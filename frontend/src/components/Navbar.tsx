import { NavLink, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { logout } from '../store/auth/authSlice';
import { BookOpen, PlusCircle } from 'lucide-react';

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm transition-colors ${
      isActive
        ? 'text-teal-600 font-bold'
        : 'text-slate-500 hover:text-teal-600 font-medium'
    }`;

  const firstName = user?.name?.split(' ')[0] || 'Guest';
  const formattedName =
    firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();

  return (
    <nav className="bg-white border-b border-slate-200 border-l-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2">
            <BookOpen size={22} strokeWidth={2.4} className="text-teal-600" />
            <span className="text-[17px] font-extrabold tracking-tight">
              Read <span className="text-teal-600">Cycle</span>
            </span>
          </Link>

          <div className="flex items-center gap-7">
            <NavLink to="/" className={navLinkClass}>
              Explore
            </NavLink>

            {user ? (
              <>
                <NavLink to="/profile" className={navLinkClass}>
                  Hi, {formattedName}
                </NavLink>
                <Link
                  to="/create-listing"
                  className="flex items-center gap-2 px-4 py-2 bg-teal-50 text-teal-600 rounded-lg font-bold text-sm hover:bg-teal-100 transition-all"
                >
                  <PlusCircle size={18} />
                  List a Book
                </Link>
                <button
                  onClick={() => dispatch(logout())}
                  className="text-sm font-medium text-slate-500 hover:text-red-500 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className={navLinkClass}>
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="text-sm font-bold text-white px-5 py-2 rounded-lg transition-opacity hover:opacity-90"
                  style={{
                    background:
                      'linear-gradient(135deg, #0d9488 0%, #0f766e 100%)',
                  }}
                >
                  Sign Up →
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
