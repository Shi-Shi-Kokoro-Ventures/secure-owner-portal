
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ThemeCustomizer } from "@/components/admin/settings/ThemeCustomizer";

const AdminSettings = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">System Settings</h1>
        <ThemeCustomizer />
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
