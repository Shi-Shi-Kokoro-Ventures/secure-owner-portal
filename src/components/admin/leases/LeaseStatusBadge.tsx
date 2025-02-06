import { Badge } from "@/components/ui/badge";
import { Lease } from "@/types/lease";

interface LeaseStatusBadgeProps {
  status: Lease['status'];
  type: 'status' | 'security_deposit';
  value: string;
}

export const LeaseStatusBadge = ({ status, type, value }: LeaseStatusBadgeProps) => {
  if (type === 'status') {
    const variants = {
      active: <Badge className="bg-emerald-500 hover:bg-emerald-600">Active</Badge>,
      terminated: <Badge variant="destructive" className="hover:bg-red-600">Terminated</Badge>,
      pending: <Badge variant="secondary" className="hover:bg-gray-600">Pending</Badge>,
    };
    return variants[status];
  }

  const variants = {
    pending: <Badge variant="secondary" className="hover:bg-gray-600">Pending</Badge>,
    received: <Badge className="bg-emerald-500 hover:bg-emerald-600">Received</Badge>,
    returned: <Badge variant="destructive" className="hover:bg-red-600">Returned</Badge>,
  };
  return variants[value as keyof typeof variants];
};