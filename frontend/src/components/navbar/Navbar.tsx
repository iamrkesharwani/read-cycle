import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/reduxHooks';
import { BookOpen, PlusCircle, ArrowRight, Menu } from 'lucide-react';
import MobileMenu from './MobileMenu';
import MobileSearch from './MobileSearch';
import SearchBar from './SearchBar';

const Navbar = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const firstName = user?.name?.split(' ')[0] || '';
  const formattedName =
    firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();

  return (
    <>
      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo — hidden on mobile/tablet when search is open */}
            <Link
              to="/"
              className={`flex items-center gap-2 shrink-0 transition-all duration-200 ${
                mobileSearchOpen
                  ? 'opacity-0 pointer-events-none w-0 overflow-hidden'
                  : 'opacity-100'
              }`}
            >
              <BookOpen size={22} strokeWidth={2.4} className="text-teal-600" />
              <span className="text-[17px] font-extrabold tracking-tight">
                Read <span className="text-teal-600">Cycle</span>
              </span>
            </Link>

            {/* Desktop nav — only on lg+ */}
            <div className="hidden lg:flex items-center gap-6">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `text-sm transition-colors ${
                    isActive
                      ? 'text-teal-600 font-bold'
                      : 'text-slate-500 hover:text-gray-800 font-medium'
                  }`
                }
              >
                Explore
              </NavLink>

              <SearchBar />

              {user ? (
                <>
                  <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                      `text-sm transition-colors ${
                        isActive
                          ? 'text-teal-600 font-bold'
                          : 'text-slate-500 hover:text-gray-800 font-medium'
                      }`
                    }
                  >
                    Hi, {formattedName}
                  </NavLink>
                  <Link
                    to="/create"
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-teal-50 text-teal-600 rounded-xl font-bold text-sm hover:bg-teal-100 transition-all"
                  >
                    <PlusCircle size={15} />
                    List a Book
                  </Link>
                </>
              ) : (
                <Link
                  to="/register"
                  className="group flex items-center gap-1 text-sm font-bold text-gray-900 hover:text-teal-600 transition-colors"
                >
                  Get Started
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </Link>
              )}
            </div>

            {/* Mobile + Tablet right side — visible below lg */}
            <div className="flex lg:hidden items-center gap-2">
              <MobileSearch
                isOpen={mobileSearchOpen}
                onOpen={() => setMobileSearchOpen(true)}
                onClose={() => setMobileSearchOpen(false)}
              />

              {/* Greeting + hamburger — hidden when search is open */}
              <div
                className={`flex items-center gap-3 transition-all duration-200 ${
                  mobileSearchOpen
                    ? 'opacity-0 pointer-events-none w-0 overflow-hidden'
                    : 'opacity-100'
                }`}
              >
                {user ? (
                  <>
                    <Link
                      to="/profile"
                      className="text-sm font-medium text-slate-600 hover:text-gray-900 transition-colors"
                    >
                      Hi, {formattedName}
                    </Link>
                    <button
                      onClick={() => setMenuOpen(true)}
                      className="p-1 text-gray-700 hover:text-teal-600 transition-colors"
                      aria-label="Open menu"
                    >
                      <Menu size={20} />
                    </button>
                  </>
                ) : (
                  <Link
                    to="/register"
                    className="group flex items-center gap-1 text-sm font-bold text-gray-900 hover:text-teal-600 transition-colors"
                  >
                    Get Started
                    <ArrowRight
                      size={14}
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
};

export default Navbar;
