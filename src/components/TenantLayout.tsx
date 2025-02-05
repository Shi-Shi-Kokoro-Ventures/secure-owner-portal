import { Outlet } from "react-router-dom";
import { TenantSidebar } from "./TenantSidebar";
import { Header } from "./Header";

export const TenantLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <TenantSidebar />
      <div className="lg:pl-64">
        <Header />
        <main className="py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default TenantLayout;