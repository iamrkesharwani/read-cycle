import { NavLink, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { logout } from '../store/auth/authSlice';
import { Book, LogOut, User, LogIn } from 'lucide-react';
import { UserPlus, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const navLinkClass = ({ isActive }: { isActive: boolean }) => {
    return `flex items-center gap-2 transition-colors ${
      isActive
        ? 'text-blue-600 font-semibold'
        : 'text-gray-600 hover:text-blue-500'
    }`;
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-bold text-blue-600"
          >
            <Book size={28} />
            <span>Read Cycle</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            <NavLink to="/" className={navLinkClass}>
              <LayoutDashboard size={18} />
              <span>Explore</span>
            </NavLink>

            {user ? (
              <>
                <NavLink to="/profile" className={navLinkClass}>
                  <User size={18} />
                  <span>{user.name}</span>
                </NavLink>
                <button
                  onClick={() => dispatch(logout())}
                  className="flex items-center gap-2 text-red-500 hover:text-red-700 font-medium"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className={navLinkClass}>
                  <LogIn size={18} />
                  <span>Login</span>
                </NavLink>
                <NavLink
                  to="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <UserPlus size={18} />
                  <span>Sign Up</span>
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
