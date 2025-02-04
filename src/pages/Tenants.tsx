import { Layout } from "@/components/Layout";
import { AddTenantForm } from "@/components/AddTenantForm";
import { TenantsTable } from "@/components/TenantsTable";
import { useState } from "react";

const Tenants = () => {
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddTenant = () => {
    setShowAddForm(true);
  };

  return (
    <Layout>
      {showAddForm ? (
        <AddTenantForm />
      ) : (
        <TenantsTable onAddTenant={handleAddTenant} />
      )}
    </Layout>
  );
};

export default Tenants;