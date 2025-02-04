import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, FileText, Mail, Phone } from "lucide-react";
import { useState } from "react";

interface Owner {
  id: string;
  name: string;
  phone: string;
  email: string;
  properties: number;
  balance: number;
  lastPayment: string;
  status: string;
}

const mockOwners: Owner[] = [
  {
    id: "1",
    name: "John Smith",
    phone: "(555) 123-4567",
    email: "john.smith@example.com",
    properties: 3,
    balance: 5000.00,
    lastPayment: "2024-02-15",
    status: "Active"
  },
  {
    id: "2",
    name: "Sarah Johnson",
    phone: "(555) 987-6543",
    email: "sarah.j@example.com",
    properties: 2,
    balance: 3200.50,
    lastPayment: "2024-02-10",
    status: "Active"
  }
];

export const OwnersTable = () => {
  const [owners] = useState<Owner[]>(mockOwners);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow className="bg-[#4C8DAE] hover:bg-[#4C8DAE]">
            <TableHead className="text-white font-semibold">Name</TableHead>
            <TableHead className="text-white font-semibold">Contact</TableHead>
            <TableHead className="text-white font-semibold text-center">Properties</TableHead>
            <TableHead className="text-white font-semibold text-right">Balance</TableHead>
            <TableHead className="text-white font-semibold">Last Payment</TableHead>
            <TableHead className="text-white font-semibold">Status</TableHead>
            <TableHead className="text-white font-semibold text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {owners.length === 0 ? (
            <TableRow className="bg-gray-100">
              <TableCell colSpan={7} className="text-center py-8">
                No data available in table
              </TableCell>
            </TableRow>
          ) : (
            owners.map((owner) => (
              <TableRow key={owner.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">{owner.name}</TableCell>
                <TableCell>
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span>{owner.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span>{owner.email}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-center">{owner.properties}</TableCell>
                <TableCell className="text-right font-medium">
                  {formatCurrency(owner.balance)}
                </TableCell>
                <TableCell>{formatDate(owner.lastPayment)}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    owner.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {owner.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button variant="ghost" size="icon" title="View Details">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" title="View Statements">
                      <FileText className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <div className="p-4 text-sm text-gray-600 border-t">
        Showing {owners.length} entries
      </div>
    </div>
  );
};