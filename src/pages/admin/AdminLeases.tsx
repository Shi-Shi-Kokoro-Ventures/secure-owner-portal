
import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FileText, AlertCircle, CheckCircle2, Clock, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface Lease {
  id: string;
  lease_number: string;
  tenant: {
    first_name: string;
    last_name: string;
  };
  unit: {
    unit_number: string;
    property: {
      property_name: string;
    };
  };
  start_date: string;
  end_date: string;
  monthly_rent: number;
  status: 'active' | 'terminated' | 'pending';
  lease_type: 'fixed' | 'month-to-month' | 'short-term';
  security_deposit_status: 'pending' | 'received' | 'returned';
  deposit_amount: number;
  auto_renewal: boolean;
  notice_period_days: number;
  rent_due_day: number;
  late_fee_percentage: number;
  late_fee_grace_period_days: number;
}

const AdminLeases = () => {
  const { toast } = useToast();
  const [isNewLeaseDialogOpen, setIsNewLeaseDialogOpen] = useState(false);

  const { data: leases, isLoading } = useQuery({
    queryKey: ['leases'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('leases')
        .select(`
          id,
          lease_number,
          tenant:tenant_id(first_name, last_name),
          unit:unit_id(
            unit_number,
            property:property_id(property_name)
          ),
          start_date,
          end_date,
          monthly_rent,
          status,
          lease_type,
          security_deposit_status,
          deposit_amount,
          auto_renewal,
          notice_period_days,
          rent_due_day,
          late_fee_percentage,
          late_fee_grace_period_days
        `)
        .order('created_at', { ascending: false });

      if (error) {
        toast({
          variant: "destructive",
          title: "Error fetching leases",
          description: error.message,
        });
        return [];
      }

      return data as Lease[];
    },
  });

  const getStatusBadge = (status: Lease['status']) => {
    const variants = {
      active: <Badge className="bg-green-500">Active</Badge>,
      terminated: <Badge variant="destructive">Terminated</Badge>,
      pending: <Badge variant="secondary">Pending</Badge>,
    };
    return variants[status];
  };

  const getSecurityDepositBadge = (status: Lease['security_deposit_status']) => {
    const variants = {
      pending: <Badge variant="secondary">Pending</Badge>,
      received: <Badge className="bg-green-500">Received</Badge>,
      returned: <Badge variant="destructive">Returned</Badge>,
    };
    return variants[status];
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Lease Management</h1>
            <p className="text-muted-foreground mt-1">
              Manage and track all property leases
            </p>
          </div>
          <Button onClick={() => setIsNewLeaseDialogOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            New Lease
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Leases</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {leases?.filter(lease => lease.status === 'active').length || 0}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {leases?.filter(lease => lease.status === 'pending').length || 0}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Security Deposits</CardTitle>
              <Shield className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${leases?.reduce((acc, lease) => acc + Number(lease.deposit_amount), 0).toLocaleString()}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <FileText className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${leases?.reduce((acc, lease) => acc + Number(lease.monthly_rent), 0).toLocaleString()}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Leases</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Lease #</TableHead>
                    <TableHead>Property</TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead>Tenant</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Monthly Rent</TableHead>
                    <TableHead>Security Deposit</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leases?.map((lease) => (
                    <TableRow key={lease.id}>
                      <TableCell className="font-medium">{lease.lease_number}</TableCell>
                      <TableCell>{lease.unit.property.property_name}</TableCell>
                      <TableCell>{lease.unit.unit_number}</TableCell>
                      <TableCell>{`${lease.tenant.first_name} ${lease.tenant.last_name}`}</TableCell>
                      <TableCell className="capitalize">{lease.lease_type.replace('-', ' ')}</TableCell>
                      <TableCell>{new Date(lease.start_date).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(lease.end_date).toLocaleDateString()}</TableCell>
                      <TableCell>${lease.monthly_rent.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <span>${lease.deposit_amount.toLocaleString()}</span>
                          {getSecurityDepositBadge(lease.security_deposit_status)}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(lease.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        <Dialog open={isNewLeaseDialogOpen} onOpenChange={setIsNewLeaseDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Lease</DialogTitle>
              <DialogDescription>
                This feature will be implemented in the next phase.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminLeases;
