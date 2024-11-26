import { Navigate, Route, Routes } from "react-router-dom";
import HomeLayout from "./components/HomeLayout";
import Login from "./features/login";
import Register from "./features/Register";
import EmailVerification from "./features/EmailVerification";
import ResendCode from "./features/ResendCode";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import WelcomePage from "./components/WelcomePage";
import LoadingSpinner from "./utils/LoadingSpinner";
import WelcomeLayout from "./components/WelcomeLayout";
import AdminDashBoard from "./components/AdminDashBoard";
import { useMemberStore } from "./store/memberStore";
import AddMember from "./features/AddMember";
import AdminLayout from "./components/AdminLayout";
import AdminDonationPage from "./components/AdminDonationPage";
import NormalDonation from "./components/NormalDonation";
import DonationConfirmation from "./components/DonationConfirmation";
import DonationSuccess from "./components/DonationSuccess";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    console.log("this user is not authenticated");

    return <Navigate to="/" replace />;
  }

  if (!user.isVerified) {
    console.log("this user is not verified");
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};

const AdminRoute = ({ children }) => {
  const { isAdmin, user } = useAuthStore();
  if (!isAdmin) {
    console.log("You don't have permission to access this page");
    return <Navigate to="/home" replace />;
  }
  return children;
};

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/home" replace />;
  }
  return children;
};

function App() {
  const {
    isCheckingAuth,
    checkAuth,
    checkAdmin,
    isAuthenticated,
    user,
    isAdmin,
    // listAllUsers,
    isCheckingAdmin,
  } = useAuthStore();

  useEffect(() => {
    checkAuth();
    checkAdmin();
    // listAllUsers();
  }, [checkAuth, checkAdmin]);

  if (isCheckingAuth) return <LoadingSpinner />;
  if (isCheckingAdmin) return <LoadingSpinner />;

  return (
    <>
      <Routes>
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <WelcomeLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/home" element={<WelcomePage />} />
          <Route path="/home/add-member" element={<AddMember />} />
          <Route path="/home/make-donation" element={<NormalDonation />} />
          <Route
            path="/home/donation-confirmation"
            element={<DonationConfirmation />}
          />
          <Route path="/home/donation-success" element={<DonationSuccess />} />
        </Route>
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route path="/admin" element={<AdminDashBoard />} />
          <Route path="/admin/donations" element={<AdminDonationPage />} />
        </Route>
        <Route path="/" element={<HomeLayout />}>
          <Route
            path="/"
            element={
              <RedirectAuthenticatedUser>
                <Login />
              </RedirectAuthenticatedUser>
            }
          />

          <Route
            path="/register"
            element={
              <RedirectAuthenticatedUser>
                <Register />
              </RedirectAuthenticatedUser>
            }
          />

          <Route path="/verify-email" element={<EmailVerification />} />

          <Route path="/resend-code" element={<ResendCode />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
