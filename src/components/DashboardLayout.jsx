import React from "react";
import Sidebar from "./Sidebar.jsx";
import "./DashboardLayout.css";

const DashboardLayout = ({ children }) => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="dashboard-content">{children}</main>
    </div>
  );
};

export default DashboardLayout;
