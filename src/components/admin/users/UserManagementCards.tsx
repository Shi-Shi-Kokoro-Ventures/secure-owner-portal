
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UsersTable } from "./UsersTable";
import type { User } from "@/types/user";

interface UserManagementCardsProps {
  users: User[];
  isLoading: boolean;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  onProfilePictureUpload: (event: React.ChangeEvent<HTMLInputElement>, userId: string) => void;
}

export const UserManagementCards = ({
  users,
  isLoading,
  onEdit,
  onDelete,
  onProfilePictureUpload
}: UserManagementCardsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>All Users</CardTitle>
      </CardHeader>
      <CardContent>
        <UsersTable
          users={users}
          isLoading={isLoading}
          onEdit={onEdit}
          onDelete={onDelete}
          onProfilePictureUpload={onProfilePictureUpload}
        />
      </CardContent>
    </Card>
  );
};
