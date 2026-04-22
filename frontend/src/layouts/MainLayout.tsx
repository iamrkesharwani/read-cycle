import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import MinimalHeader from '../components/MinimalHeader';

const MainLayout = () => {
  const { pathname } = useLocation();
  const isAuthPage = ['/login', '/register'].includes(pathname);

  return (
    <div className="min-h-screen text-gray-900 flex flex-col">
      {isAuthPage ? <MinimalHeader /> : <Navbar />}

      <main
        className={
          isAuthPage ? 'flex-1 flex flex-col' : 'max-w-7xl mx-auto px-4 py-8'
        }
      >
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
