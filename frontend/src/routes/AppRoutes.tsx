import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { ProtectedRoute } from './ProtectedRoute';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import Listing from '../components/listing/Listing';
import ProfileLayout from '../components/profile/ProfileLayout';
import ProfileOverview from '../components/profile/ProfileOverview';
import PersonalInfo from '../components/profile/tabs/PersonalInfo';
import ActiveListings from '../components/profile/tabs/ActiveListings';
import SwappedListings from '../components/profile/tabs/SwappedListings';
import InactiveListings from '../components/profile/tabs/InactiveListings';
import AccountSettings from '../components/profile/tabs/AccountSettings';
import ListingDetail from '../components/listing/ListingDetail';

const Explore = () => <div className="text-2xl font-bold">Explore</div>;

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Explore />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<ProfileLayout />}>
            <Route path="/profile" element={<ProfileOverview />} />
            <Route path="/personal" element={<PersonalInfo />} />
            <Route path="/active" element={<ActiveListings />} />
            <Route path="/swapped" element={<SwappedListings />} />
            <Route path="/inactive" element={<InactiveListings />} />
            <Route path="/settings" element={<AccountSettings />} />
          </Route>

          <Route path="/create-listing" element={<Listing />} />
          <Route path="/listing/:id" element={<ListingDetail />} />
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
