import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../hooks/reduxHooks";
import { BookOpen, PlusCircle, ArrowRight, Menu } from "lucide-react";
import MobileMenu from "./MobileMenu";
import MobileSearch from "./MobileSearch";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const firstName = user?.name?.split(" ")[0] || "";
  const formattedName =
    firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();

  return (
    <>
      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <NavLink
              to="/"
              className={`flex shrink-0 items-center gap-2 transition-all duration-200 ${
                mobileSearchOpen
                  ? "pointer-events-none w-0 overflow-hidden opacity-0"
                  : "opacity-100"
              }`}
            >
              <BookOpen size={22} strokeWidth={2.4} className="text-teal-600" />
              <span className="text-[17px] font-extrabold tracking-tight">
                Read <span className="text-teal-600">Cycle</span>
              </span>
            </NavLink>

            {/* Desktop nav */}
            <div className="hidden items-center gap-6 lg:flex">
              <SearchBar />

              {user ? (
                <>
                  <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                      `rounded-xl px-3.5 py-2 text-sm font-medium text-teal-600 transition-all transition-colors hover:bg-teal-100 ${isActive ? "bg-teal-50" : ""}`
                    }
                  >
                    Hi, {formattedName}
                  </NavLink>
                  <NavLink
                    to="/create"
                    className={({ isActive }) =>
                      `flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-sm font-medium text-teal-600 transition-all hover:bg-teal-100 ${
                        isActive ? "bg-teal-50" : ""
                      }`
                    }
                  >
                    <PlusCircle size={15} />
                    List a Book
                  </NavLink>
                </>
              ) : (
                <NavLink
                  to="/register"
                  className="group flex items-center gap-1 text-sm font-bold text-gray-900 transition-colors hover:text-teal-600"
                >
                  Get Started
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </NavLink>
              )}
            </div>

            {/* Mobile + Tablet */}
            <div className="flex items-center gap-2 lg:hidden">
              <MobileSearch
                isOpen={mobileSearchOpen}
                onOpen={() => setMobileSearchOpen(true)}
                onClose={() => setMobileSearchOpen(false)}
              />

              {/* Greeting + hamburger */}
              <div
                className={`flex items-center gap-3 transition-all duration-200 ${
                  mobileSearchOpen
                    ? "pointer-events-none w-0 overflow-hidden opacity-0"
                    : "opacity-100"
                }`}
              >
                {user ? (
                  <>
                    <NavLink
                      to="/profile"
                      className="text-sm font-medium text-slate-600 transition-colors hover:text-gray-900"
                    >
                      Hi, {formattedName}
                    </NavLink>
                    <button
                      onClick={() => setMenuOpen(true)}
                      className="p-1 text-gray-700 transition-colors hover:text-teal-600"
                      aria-label="Open menu"
                    >
                      <Menu size={20} />
                    </button>
                  </>
                ) : (
                  <NavLink
                    to="/register"
                    className="group flex items-center gap-1 text-sm font-bold text-gray-900 transition-colors hover:text-teal-600"
                  >
                    Get Started
                    <ArrowRight
                      size={14}
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </NavLink>
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
