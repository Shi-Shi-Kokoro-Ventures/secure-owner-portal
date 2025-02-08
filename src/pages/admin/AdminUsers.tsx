import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useUsers } from "@/hooks/use-users";
import { UserHeader } from "@/components/admin/users/UserHeader";
import { UserManagementCards } from "@/components/admin/users/UserManagementCards";
import { EditUserDialog } from "@/components/admin/users/EditUserDialog";
import { DeleteUserDialog } from "@/components/admin/users/DeleteUserDialog";
import { AddUserWizard } from "@/components/admin/users/AddUserWizard";
import type { User, UserFormState } from "@/types/user";

const INITIAL_FORM_STATE: UserFormState = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  role: "tenant",
  date_of_birth: "",
  ssn_last_four: "",
  government_id: null,
  street_address: "",
  city: "",
  state: "",
  zip_code: "",
  company_name: "",
  vendor_type: null,
  assigned_properties: [],
  emergency_contact_name: "",
  emergency_contact_phone: "",
  two_factor_enabled: false,
  status: "pending_approval",
  temporary_password: "",
};

const AdminUsers = () => {
  const { users, isLoading, refetch, deleteUser, updateUser, uploadProfilePicture } = useUsers();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState<UserFormState>(INITIAL_FORM_STATE);

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setEditForm({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone: user.phone || "",
      role: user.role,
      status: user.status,
      two_factor_enabled: user.two_factor_enabled,
      ssn_last_four: user.ssn_last_four || "",
      government_id: null,
      street_address: "",
      city: "",
      state: "",
      zip_code: "",
      company_name: "",
      vendor_type: null,
      assigned_properties: [],
      emergency_contact_name: "",
      emergency_contact_phone: "",
      temporary_password: user.temporary_password || "",
    });
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!selectedUser) return;

    const success = await updateUser(selectedUser.id, {
      first_name: editForm.first_name,
      last_name: editForm.last_name,
      email: editForm.email,
      phone: editForm.phone,
      role: editForm.role,
      status: editForm.status,
    });

    if (success) {
      setIsEditDialogOpen(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedUser) return;
    const success = await deleteUser(selectedUser.id);
    if (success) {
      setIsDeleteDialogOpen(false);
    }
  };

  const handleProfilePictureUpload = async (event: React.ChangeEvent<HTMLInputElement>, userId: string) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    await uploadProfilePicture(file, userId);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <UserHeader onAddUser={() => setIsAddDialogOpen(true)} />
        <UserManagementCards
          users={users}
          isLoading={isLoading}
          onEdit={handleEdit}
          onDelete={(user) => {
            setSelectedUser(user);
            setIsDeleteDialogOpen(true);
          }}
          onProfilePictureUpload={handleProfilePictureUpload}
        />

        <EditUserDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          formData={editForm}
          onFormChange={setEditForm}
          onSubmit={handleSaveEdit}
        />

        <DeleteUserDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          onConfirm={handleDelete}
        />
        
        <AddUserWizard
          open={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;
