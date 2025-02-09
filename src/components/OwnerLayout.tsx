
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { OwnerSidebar } from "./OwnerSidebar";
import { Header } from "./Header";

export const OwnerLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <OwnerSidebar />
      <div className="lg:pl-64">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default OwnerLayout;
