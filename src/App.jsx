import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Task from "./components/Task";
import Calendar from "./components/Calendar";
import Teams from "./components/Teams";
import Reports from "./components/Reports";
import Login from "./components/Login";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Dashboard from "./components/Dashboard"; // optional dashboard landing page

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Login */}
          <Route path="/login" element={<Login />} />

          {/* Dashboard pages */}
          <Route
            path="/dashboard/tasks"
            element={
              <PrivateRoute>
                <Task />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/calendar"
            element={
              <PrivateRoute>
                <Calendar />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/teams"
            element={
              <PrivateRoute>
                <Teams />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/reports"
            element={
              <PrivateRoute>
                <Reports />
              </PrivateRoute>
            }
          />

          {/* Dashboard root */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard /> {/* or use <Navigate to="/dashboard/tasks" replace /> */}
              </PrivateRoute>
            }
          />

          {/* Default root */}
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
