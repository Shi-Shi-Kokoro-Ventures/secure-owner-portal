import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useUsers } from "@/hooks/use-users";
import { UserHeader } from "@/components/admin/users/UserHeader";
import { UserManagementCards } from "@/components/admin/users/UserManagementCards";
import { EditUserDialog } from "@/components/admin/users/EditUserDialog";
import { DeleteUserDialog } from "@/components/admin/users/DeleteUserDialog";
import { AddUserWizard } from "@/components/admin/users/AddUserWizard";
import type { User, UserFormState } from "@/types/user";
import { supabase } from "@/integrations/supabase/client";

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
  const [addForm, setAddForm] = useState<UserFormState>(INITIAL_FORM_STATE);

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setEditForm({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone: user.phone || "",
      role: user.role,
      date_of_birth: user.date_of_birth || "",
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
      two_factor_enabled: user.two_factor_enabled,
      status: user.status,
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
      role: editForm.role
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

  const handleAddUser = async () => {
    try {
      const { data: userData, error: userError } = await supabase
        .from('users')
        .insert([{
          first_name: addForm.first_name,
          last_name: addForm.last_name,
          email: addForm.email,
          phone: addForm.phone,
          role: addForm.role,
          date_of_birth: addForm.date_of_birth,
          ssn_last_four: addForm.ssn_last_four,
          status: addForm.status,
          two_factor_enabled: addForm.two_factor_enabled,
          temporary_password: addForm.temporary_password
        }])
        .select()
        .single();

      if (userError) throw userError;

      const userId = userData.id;

      if (addForm.government_id) {
        const fileExt = addForm.government_id.name.split('.').pop();
        const filePath = `${userId}/government_id.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('user_documents')
          .upload(filePath, addForm.government_id);

        if (uploadError) throw uploadError;

        const { error: docError } = await supabase
          .from('user_documents')
          .insert([{
            user_id: userId,
            document_type: 'government_id',
            file_url: filePath
          }]);

        if (docError) throw docError;
      }

      if (addForm.street_address) {
        const { error: addressError } = await supabase
          .from('addresses')
          .insert([{
            user_id: userId,
            street_address: addForm.street_address,
            city: addForm.city,
            state: addForm.state,
            zip_code: addForm.zip_code
          }]);

        if (addressError) throw addressError;
      }

      if (addForm.emergency_contact_name) {
        const { error: emergencyContactError } = await supabase
          .from('emergency_contacts')
          .insert([{
            user_id: userId,
            name: addForm.emergency_contact_name,
            phone: addForm.emergency_contact_phone
          }]);

        if (emergencyContactError) throw emergencyContactError;
      }

      if (addForm.role === 'vendor' && addForm.company_name && addForm.vendor_type) {
        const { error: vendorError } = await supabase
          .from('vendor_details')
          .insert([{
            user_id: userId,
            company_name: addForm.company_name,
            vendor_type: addForm.vendor_type
          }]);

        if (vendorError) throw vendorError;
      }

      refetch();
      setIsAddDialogOpen(false);
      setAddForm(INITIAL_FORM_STATE);
    } catch (error) {
      console.error('Error adding user:', error);
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
          onSubmit={handleAddUser}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;
