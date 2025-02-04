import { Layout } from "@/components/Layout";
import { AddTenantForm } from "@/components/AddTenantForm";
import { TenantsTable } from "@/components/TenantsTable";
import { useState } from "react";

const Tenants = () => {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <Layout>
      {showAddForm ? <AddTenantForm /> : <TenantsTable />}
    </Layout>
  );
};

export default Tenants;