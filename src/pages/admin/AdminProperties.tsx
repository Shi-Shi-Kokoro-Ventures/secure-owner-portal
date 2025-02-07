
import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { PropertiesTable } from "@/components/PropertiesTable";
import { AddPropertyDialog } from "@/components/AddPropertyDialog";

// Mock data for properties
const mockProperties = [
  {
    id: "1",
    property_name: "Sunrise Apartments",
    address: "123 Main St, San Francisco, CA 94105",
    unit_count: 24,
    owner: {
      first_name: "John",
      last_name: "Smith"
    },
    units: [
      { id: "1", status: "occupied" },
      { id: "2", status: "vacant" }
    ],
    status: "active",
    property_type: "Residential",
    total_revenue: 450000,
    last_inspection_date: "2024-01-15"
  },
  {
    id: "2",
    property_name: "Downtown Business Center",
    address: "456 Market St, San Francisco, CA 94103",
    unit_count: 12,
    owner: {
      first_name: "Sarah",
      last_name: "Johnson"
    },
    units: [
      { id: "3", status: "occupied" },
      { id: "4", status: "occupied" },
      { id: "5", status: "vacant" }
    ],
    status: "active",
    property_type: "Commercial",
    total_revenue: 850000,
    last_inspection_date: "2024-02-01"
  },
  {
    id: "3",
    property_name: "Marina Heights",
    address: "789 Beach Rd, San Francisco, CA 94123",
    unit_count: 18,
    owner: {
      first_name: "Michael",
      last_name: "Davis"
    },
    units: [
      { id: "6", status: "occupied" },
      { id: "7", status: "under_maintenance" }
    ],
    status: "maintenance",
    property_type: "Mixed-Use",
    total_revenue: 620000,
    last_inspection_date: "2024-01-20"
  }
];

export default function AdminProperties() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Properties</h1>
          <AddPropertyDialog 
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
          />
        </div>
        <PropertiesTable properties={mockProperties} />
      </div>
    </AdminLayout>
  );
}
