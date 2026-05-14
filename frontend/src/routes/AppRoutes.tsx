import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { ProtectedRoute } from "./ProtectedRoute";
import Explore from "../components/explore/Explore";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import Listing from "../components/book-form/BookForm";
import ProfileLayout from "../components/profile/overview/ProfileLayout";
import ProfileOverview from "../components/profile/overview/ProfileOverview";
import PersonalInfo from "../components/profile/tabs/PersonalInfo";
import ActiveListings from "../components/profile/tabs/ActiveListings";
import InactiveListings from "../components/profile/tabs/InactiveListings";
import AccountSettings from "../components/profile/tabs/AccountSettings";
import MainListing from "../components/live/MainListing";
import EditListing from "../components/book-form/EditBookForm";
import PublicProfile from "../components/public-profile/PublicProfile";
import MySwaps from "../components/swap/MySwaps";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Explore />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user/:username" element={<PublicProfile />} />
        <Route path="/listing/:id" element={<MainListing />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<ProfileLayout />}>
            <Route path="/profile" element={<ProfileOverview />} />
            <Route path="/personal" element={<PersonalInfo />} />
            <Route path="/active" element={<ActiveListings />} />
            <Route path="/swapped" element={<MySwaps />} />
            <Route path="/inactive" element={<InactiveListings />} />
            <Route path="/settings" element={<AccountSettings />} />
          </Route>

          <Route path="/create" element={<Listing />} />
          <Route path="/edit/:id" element={<EditListing />} />
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
