import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { ProtectedRoute } from '../components/ProtectedRoute';

const Explore = () => <div className="text-2xl font-bold">Explore</div>;
const Login = () => <div className="text-2xl font-bold">Login</div>;
const Register = () => <div className="text-2xl font-bold">Register</div>;
const Profile = () => <div className="text-2xl font-bold">User Profile</div>;

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Explore />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route
          path="*"
          element={<div className="text-red-500">404: Not Found</div>}
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
