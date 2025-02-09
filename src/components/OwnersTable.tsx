
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, FileText, Mail, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Owner {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  properties: number;
  balance: number;
  last_payment: string;
  status: string;
}

interface OwnersTableProps {
  onRefresh?: () => void;
}

export const OwnersTable = ({ onRefresh }: OwnersTableProps) => {
  const [owners, setOwners] = useState<Owner[]>([]);

  const fetchOwners = async () => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('role', 'owner');
    
    if (error) {
      console.error('Error fetching owners:', error);
      return;
    }

    // Transform the data to match our interface
    const transformedOwners = data.map(user => ({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      phone: user.phone || '',
      email: user.email,
      properties: 0, // We'll implement this count later
      balance: 0, // We'll implement this calculation later
      last_payment: new Date().toISOString(), // We'll implement this later
      status: 'Active'
    }));

    setOwners(transformedOwners);
  };

  useEffect(() => {
    fetchOwners();
  }, []);

  // Refresh data when onRefresh is called
  useEffect(() => {
    if (onRefresh) {
      fetchOwners();
    }
  }, [onRefresh]);

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
                <TableCell className="font-medium">{`${owner.first_name} ${owner.last_name}`}</TableCell>
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
                <TableCell>{formatDate(owner.last_payment)}</TableCell>
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
