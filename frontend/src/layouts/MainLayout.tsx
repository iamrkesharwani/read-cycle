import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import MinimalHeader from '../components/navbar/MinimalHeader';

const MainLayout = () => {
  const { pathname } = useLocation();
  const isAuthPage = ['/login', '/register'].includes(pathname);
  const isListingPage = pathname === '/create-listing';

  const mainClass = isAuthPage
    ? 'flex-1 flex flex-col'
    : isListingPage
      ? 'flex-1 flex flex-col overflow-hidden'
      : 'flex-1 max-w-7xl mx-auto w-full px-4 py-8';

  return (
    <div
      className={`flex flex-col text-gray-900 ${isListingPage ? 'h-screen overflow-hidden' : 'min-h-screen'}`}
    >
      {isAuthPage ? <MinimalHeader /> : <Navbar />}
      <main className={mainClass}>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
