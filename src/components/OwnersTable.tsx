import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Owner {
  id: string;
  name: string;
  email: string;
  properties: number;
  status: string;
}

const mockOwners: Owner[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    properties: 3,
    status: "Active",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    properties: 2,
    status: "Active",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "m.brown@example.com",
    properties: 1,
    status: "Pending",
  },
];

export const OwnersTable = () => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Properties</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockOwners.map((owner) => (
            <TableRow key={owner.id}>
              <TableCell className="font-medium">{owner.name}</TableCell>
              <TableCell>{owner.email}</TableCell>
              <TableCell>{owner.properties}</TableCell>
              <TableCell>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    owner.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {owner.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};