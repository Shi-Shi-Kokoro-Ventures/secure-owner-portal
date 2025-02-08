
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ThemeCustomizer } from "@/components/admin/settings/ThemeCustomizer";
import { TestModeToggle } from "@/components/admin/settings/TestModeToggle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth-context";

export default function AdminSettings() {
  const { userProfile } = useAuth();

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

          {userProfile?.role === 'special_admin' && (
            <TestModeToggle />
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
