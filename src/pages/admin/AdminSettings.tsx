import { AdminLayout } from "@/components/admin/AdminLayout";
import { ThemeCustomizer } from "@/components/admin/settings/ThemeCustomizer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminSettings() {
  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Settings</h1>
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Theme Customization</CardTitle>
            </CardHeader>
            <CardContent>
              <ThemeCustomizer />
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}