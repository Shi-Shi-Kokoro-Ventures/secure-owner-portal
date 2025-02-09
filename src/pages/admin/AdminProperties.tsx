
import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { PropertiesSection } from "@/components/properties/PropertiesSection";
import { DashboardSection } from "@/components/properties/DashboardSection";

const AdminProperties = () => {
  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-6 space-y-8">
        <DashboardSection />
        <PropertiesSection />
      </div>
    </AdminLayout>
  );
};

export default AdminProperties;
