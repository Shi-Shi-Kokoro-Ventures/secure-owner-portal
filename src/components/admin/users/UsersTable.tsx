import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, UserCheck, Upload } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import type { User } from "@/types/user";

interface UsersTableProps {
  users: User[];
  isLoading: boolean;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  onProfilePictureUpload: (event: React.ChangeEvent<HTMLInputElement>, userId: string) => void;
}

export const UsersTable = ({
  users,
  isLoading,
  onEdit,
  onDelete,
  onProfilePictureUpload
}: UsersTableProps) => {
  const getRoleBadgeColor = (role: string) => {
    const colors = {
      admin: 'bg-red-100 text-red-800',
      property_manager: 'bg-blue-100 text-blue-800',
      owner: 'bg-green-100 text-green-800',
      tenant: 'bg-purple-100 text-purple-800',
    };
    return colors[role as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const LoadingSkeleton = () => (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-4 w-20" />
        </div>
      </TableCell>
      <TableCell><Skeleton className="h-4 w-32" /></TableCell>
      <TableCell><Skeleton className="h-4 w-40" /></TableCell>
      <TableCell><Skeleton className="h-4 w-24" /></TableCell>
      <TableCell><Skeleton className="h-4 w-24" /></TableCell>
      <TableCell><Skeleton className="h-4 w-32" /></TableCell>
      <TableCell><Skeleton className="h-4 w-24" /></TableCell>
      <TableCell><Skeleton className="h-4 w-32" /></TableCell>
    </TableRow>
  );

  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-[#4C8DAE] hover:bg-[#4C8DAE]">
          <TableHead className="text-white font-semibold">Profile</TableHead>
          <TableHead className="text-white font-semibold">Name</TableHead>
          <TableHead className="text-white font-semibold">Email</TableHead>
          <TableHead className="text-white font-semibold">Role</TableHead>
          <TableHead className="text-white font-semibold">Status</TableHead>
          <TableHead className="text-white font-semibold">Phone</TableHead>
          <TableHead className="text-white font-semibold">Joined</TableHead>
          <TableHead className="text-white font-semibold text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <LoadingSkeleton key={index} />
          ))
        ) : users.length === 0 ? (
          <TableRow>
            <TableCell colSpan={8} className="text-center py-8">
              No users found
            </TableCell>
          </TableRow>
        ) : (
          users.map((user) => (
            <TableRow key={user.id} className="hover:bg-gray-50">
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.profile_picture_url || undefined} alt={`${user.first_name} ${user.last_name}`} />
                    <AvatarFallback>{user.first_name[0]}{user.last_name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="relative">
                    <Input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id={`profile-upload-${user.id}`}
                      onChange={(e) => onProfilePictureUpload(e, user.id)}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute -left-2 -top-2"
                      onClick={() => document.getElementById(`profile-upload-${user.id}`)?.click()}
                    >
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </TableCell>
              <TableCell className="font-medium">
                {user.first_name} {user.last_name}
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(user.role)}`}>
                  {user.role}
                </span>
              </TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(user.status)}`}>
                  {user.status}
                </span>
              </TableCell>
              <TableCell>{user.phone || '-'}</TableCell>
              <TableCell>{formatDate(user.created_at)}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    title="Edit User"
                    onClick={() => onEdit(user)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    title="Delete User"
                    onClick={() => onDelete(user)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    title="Change Role"
                    onClick={() => onEdit(user)}
                  >
                    <UserCheck className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );

  const getStatusBadgeColor = (status: string) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      pending_approval: 'bg-yellow-100 text-yellow-800',
      suspended: 'bg-red-100 text-red-800',
      archived: 'bg-gray-100 text-gray-800',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };
};