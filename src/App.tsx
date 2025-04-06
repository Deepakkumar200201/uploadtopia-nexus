import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/dashboard/Dashboard";
import MyFiles from "@/pages/dashboard/MyFiles";
import Settings from "@/pages/dashboard/Settings";
import DashboardLayout from "@/components/layout/DashboardLayout";
import AppSidebar from "@/components/layout/AppSidebar";
import RecycleBin from "@/pages/dashboard/RecycleBin";

const App = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Router>
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
              <DashboardLayout />
            ) : (
              <Navigate to="/login" />
            )
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="my-files" element={<MyFiles />} />
          <Route path="recycle-bin" element={<RecycleBin />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
