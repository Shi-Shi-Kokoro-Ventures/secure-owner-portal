import { useState } from "react";
import { Outlet } from "react-router-dom";
import { OwnerSidebar } from "./OwnerSidebar";
import { Header } from "./Header";

export const OwnerLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      <OwnerSidebar />
      <div className="flex-1 flex flex-col lg:pl-64">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default OwnerLayout;