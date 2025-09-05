import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Task from "./components/Task";
import Calendar from "./components/Calendar";
import Teams from "./components/Teams";
import Reports from "./components/Reports";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard"; // optional
import { AuthProvider, useAuth } from "./context/AuthContext";

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

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
                <Dashboard />
              </PrivateRoute>
            }
          />

          {/* Default route */}
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
