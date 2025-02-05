import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { UsersTable } from "@/components/admin/users/UsersTable";
import { EditUserDialog } from "@/components/admin/users/EditUserDialog";
import { DeleteUserDialog } from "@/components/admin/users/DeleteUserDialog";
import type { User, UserFormState } from "@/types/user";
import { AddUserWizard } from "@/components/admin/users/AddUserWizard";

const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState<UserFormState>({
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
  });
  const [addForm, setAddForm] = useState<UserFormState>({
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
  });
  const { toast } = useToast();

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: "Error",
        description: "Failed to fetch users. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setEditForm({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone: user.phone || "",
      role: user.role,
      profile_picture_url: user.profile_picture_url || "",
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

  const handleDelete = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', userId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "User deleted successfully",
      });
      
      fetchUsers();
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error('Error deleting user:', error);
      toast({
        title: "Error",
        description: "Failed to delete user. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSaveEdit = async () => {
    if (!selectedUser) return;

    try {
      const { error } = await supabase
        .from('users')
        .update({
          first_name: editForm.first_name,
          last_name: editForm.last_name,
          email: editForm.email,
          phone: editForm.phone,
          role: editForm.role
        })
        .eq('id', selectedUser.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "User updated successfully",
      });
      
      fetchUsers();
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error('Error updating user:', error);
      toast({
        title: "Error",
        description: "Failed to update user. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleAddUser = async () => {
    try {
      // First, create the user record
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

      // Upload government ID if provided
      if (addForm.government_id) {
        const fileExt = addForm.government_id.name.split('.').pop();
        const filePath = `${userId}/government_id.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('user_documents')
          .upload(filePath, addForm.government_id);

        if (uploadError) throw uploadError;

        // Save document reference
        const { error: docError } = await supabase
          .from('user_documents')
          .insert([{
            user_id: userId,
            document_type: 'government_id',
            file_url: filePath
          }]);

        if (docError) throw docError;
      }

      // Create address record
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

      // Create emergency contact record
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

      // Create vendor details if applicable
      if (addForm.role === 'vendor' && addForm.company_name) {
        const { error: vendorError } = await supabase
          .from('vendor_details')
          .insert([{
            user_id: userId,
            company_name: addForm.company_name,
            vendor_type: addForm.vendor_type
          }]);

        if (vendorError) throw vendorError;
      }

      toast({
        title: "Success",
        description: "User added successfully",
      });
      
      fetchUsers();
      setIsAddDialogOpen(false);
      setAddForm(INITIAL_FORM_STATE);
    } catch (error) {
      console.error('Error adding user:', error);
      toast({
        title: "Error",
        description: "Failed to add user. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleProfilePictureUpload = async (event: React.ChangeEvent<HTMLInputElement>, userId: string) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      const fileExt = file.name.split('.').pop();
      const filePath = `${userId}/profile.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('profile_pictures')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('profile_pictures')
        .getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from('users')
        .update({ profile_picture_url: publicUrl })
        .eq('id', userId);

      if (updateError) throw updateError;

      toast({
        title: "Success",
        description: "Profile picture updated successfully",
      });

      fetchUsers();
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      toast({
        title: "Error",
        description: "Failed to upload profile picture. Please try again.",
        variant: "destructive",
      });
    }
  };

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

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">User Management</h1>
          <Button 
            className="bg-[#4C8DAE] hover:bg-[#3a7a9b]"
            onClick={() => setIsAddDialogOpen(true)}
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Users</CardTitle>
          </CardHeader>
          <CardContent>
            <UsersTable
              users={users}
              isLoading={isLoading}
              onEdit={handleEdit}
              onDelete={(user) => {
                setSelectedUser(user);
                setIsDeleteDialogOpen(true);
              }}
              onProfilePictureUpload={handleProfilePictureUpload}
            />
          </CardContent>
        </Card>

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
          onConfirm={() => selectedUser && handleDelete(selectedUser.id)}
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
