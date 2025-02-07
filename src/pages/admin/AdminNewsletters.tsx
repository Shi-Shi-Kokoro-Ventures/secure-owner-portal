import { AdminLayout } from "@/components/admin/AdminLayout";
import { NewsletterList } from "@/components/admin/newsletters/NewsletterList";
import { NewsletterGenerator } from "@/components/admin/newsletters/NewsletterGenerator";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function AdminNewsletters() {
  const [showGenerator, setShowGenerator] = useState(false);

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Newsletters</h1>
            <p className="text-muted-foreground">
              Create and manage your property management newsletters
            </p>
          </div>
          <Button onClick={() => setShowGenerator(!showGenerator)}>
            <Plus className="h-4 w-4 mr-2" />
            {showGenerator ? "View List" : "Create Newsletter"}
          </Button>
        </div>

        {showGenerator ? (
          <NewsletterGenerator />
        ) : (
          <NewsletterList />
        )}
      </div>
    </AdminLayout>
  );
}