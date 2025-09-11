import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import "./Sidebar.css";

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>ToDo App</h2>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <Link to="/dashboard">📊 Dashboard</Link>
          </li>
          <li>
            <Link to="/tasks">✅ Tasks</Link>
          </li>
          <li>
            <Link to="/calendar">📅 Calendar</Link>
          </li>
          <li>
            <Link to="/reports">📈 Reports</Link>
          </li>
          <li>
            <Link to="/teams">👥 Teams</Link>
          </li>
        </ul>
      </nav>
      <div className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
