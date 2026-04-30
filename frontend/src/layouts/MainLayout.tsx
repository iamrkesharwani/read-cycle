import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import MinimalHeader from '../components/navbar/MinimalHeader';

const MainLayout = () => {
  const { pathname } = useLocation();
  const isAuthPage = ['/login', '/register'].includes(pathname);
  const isListingPage = pathname === '/create' || pathname.startsWith('/edit');

  const isFullBleed =
    isListingPage ||
    pathname.startsWith('/listing/') ||
    pathname === '/' ||
    [
      '/profile',
      '/personal',
      '/active',
      '/swapped',
      '/inactive',
      '/settings',
    ].includes(pathname);

  const mainClass = isAuthPage
    ? 'flex-1 flex flex-col'
    : isFullBleed
      ? pathname === '/'
        ? 'flex-1 flex flex-col overflow-hidden px-4 sm:px-6 lg:px-8 py-5'
        : 'flex-1 flex flex-col overflow-hidden'
      : 'flex-1';

  return (
    <div
      className={`flex flex-col text-gray-900 ${
        isFullBleed ? 'lg:h-screen lg:overflow-hidden' : 'min-h-screen'
      }`}
    >
      {isAuthPage ? <MinimalHeader /> : <Navbar />}
      <main className={mainClass}>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
