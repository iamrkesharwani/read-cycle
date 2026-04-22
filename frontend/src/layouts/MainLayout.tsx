import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import MinimalHeader from '../components/MinimalHeader';

const BACKGROUND_ROUTES = ['/create-listing']; // add more routes here as needed

const MainLayout = () => {
  const { pathname } = useLocation();
  const isAuthPage = ['/login', '/register'].includes(pathname);
  const hasBackground = BACKGROUND_ROUTES.includes(pathname);

  return (
    <div
      className="min-h-screen text-gray-900 flex flex-col"
      style={
        hasBackground
          ? {
              backgroundImage:
                'url(https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1920&q=80)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : {}
      }
    >
      {hasBackground && (
        <div className="fixed inset-0 bg-white/70 backdrop-blur-[3px] -z-10" />
      )}

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
