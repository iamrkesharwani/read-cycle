import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxHooks";

export const ProtectedRoute = () => {
  const { user, isLoading } = useAppSelector((state) => state.auth);
  if (isLoading) return null;
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};
