
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth, AuthProvider } from "@/hooks/use-auth";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/dashboard/Dashboard";
import MyFiles from "@/pages/dashboard/MyFiles";
import Settings from "@/pages/dashboard/Settings";
import DashboardLayout from "@/components/layout/DashboardLayout";
import RecycleBin from "@/pages/dashboard/RecycleBin";

const AppRoutes = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={
          isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
        }
      />
      <Route
        path="/login"
        element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />}
      />
      <Route
        path="/register"
        element={isLoggedIn ? <Navigate to="/dashboard" /> : <Register />}
      />
      <Route
        path="/dashboard"
        element={
          isLoggedIn ? (
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/dashboard/my-files"
        element={
          isLoggedIn ? (
            <DashboardLayout>
              <MyFiles />
            </DashboardLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/dashboard/recycle-bin"
        element={
          isLoggedIn ? (
            <DashboardLayout>
              <RecycleBin />
            </DashboardLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/dashboard/settings"
        element={
          isLoggedIn ? (
            <DashboardLayout>
              <Settings />
            </DashboardLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
};

export default App;
