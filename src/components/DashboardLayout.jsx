// src/components/DashboardLayout.jsx
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const DashboardLayout = ({ children, title, subtitle }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="dashboard-layout">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="dashboard-main">
        <Header
          title={title}
          subtitle={subtitle}
          onToggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
        />
        <div className="dashboard-content">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
