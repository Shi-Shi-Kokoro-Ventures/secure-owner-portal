
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import type { User } from "@/types/user";

export const useUsers = () => {
  const { toast } = useToast();

  const fetchUsers = async (): Promise<User[]> => {
    const { data, error } = await supabase
      .from('users')
      .select(`
        *,
        addresses(street_address, city, state, zip_code),
        emergency_contacts(name, phone)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return data || [];
  };

  const {
    data: users = [],
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
    meta: {
      onSettled: (data, error) => {
        if (error) {
          console.error('Error fetching users:', error);
          toast({
            title: "Error",
            description: "Failed to fetch users. Please try again.",
            variant: "destructive",
          });
        }
      },
    },
  });

  const deleteUser = async (userId: string) => {
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
      
      refetch();
      return true;
    } catch (error) {
      console.error('Error deleting user:', error);
      toast({
        title: "Error",
        description: "Failed to delete user. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  const updateUser = async (userId: string, userData: Partial<User>) => {
    try {
      // Check if user is being updated to tenant role and has no profile picture
      const { data: currentUser } = await supabase
        .from('users')
        .select('profile_picture_url')
        .eq('id', userId)
        .single();

      if (userData.role === 'tenant' && !currentUser?.profile_picture_url) {
        toast({
          title: "Error",
          description: "Profile picture is required for tenant users.",
          variant: "destructive",
        });
        return false;
      }

      const { error } = await supabase
        .from('users')
        .update(userData)
        .eq('id', userId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "User updated successfully",
      });
      
      refetch();
      return true;
    } catch (error) {
      console.error('Error updating user:', error);
      toast({
        title: "Error",
        description: "Failed to update user. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  const uploadProfilePicture = async (file: File, userId: string) => {
    try {
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

      refetch();
      return true;
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      toast({
        title: "Error",
        description: "Failed to upload profile picture. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    users,
    isLoading,
    error,
    deleteUser,
    updateUser,
    uploadProfilePicture,
    refetch
  };
};
