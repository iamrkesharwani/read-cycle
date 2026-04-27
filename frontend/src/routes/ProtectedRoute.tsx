import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../hooks/reduxHooks';

export const ProtectedRoute = () => {
  const { token, isLoading } = useAppSelector((state) => state.auth);
  if (isLoading && !token) return null;
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};
