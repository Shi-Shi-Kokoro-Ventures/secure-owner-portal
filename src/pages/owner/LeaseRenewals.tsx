import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const LeaseRenewals = () => {
  const renewals = [
    {
      id: 1,
      tenant: "John Smith",
      property: "123 Main St, Apt 4B",
      currentEnd: "2024-03-31",
      status: "Pending",
    },
    {
      id: 2,
      tenant: "Sarah Johnson",
      property: "456 Oak Ave, Unit 2",
      currentEnd: "2024-04-15",
      status: "Approved",
    },
  ];

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: "default" | "secondary" | "destructive" } = {
      Pending: "secondary",
      Approved: "default",
      Declined: "destructive",
    };
    return <Badge variant={variants[status]}>{status}</Badge>;
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Lease Renewals</h1>
        <Button>Generate Renewal Notices</Button>
      </div>

      <Card className="p-4">
        <ScrollArea className="h-[600px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tenant</TableHead>
                <TableHead>Property</TableHead>
                <TableHead>Current Lease Ends</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {renewals.map((renewal) => (
                <TableRow key={renewal.id}>
                  <TableCell>{renewal.tenant}</TableCell>
                  <TableCell>{renewal.property}</TableCell>
                  <TableCell>{renewal.currentEnd}</TableCell>
                  <TableCell>{getStatusBadge(renewal.status)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Review
                      </Button>
                      <Button variant="outline" size="sm">
                        Send Reminder
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </Card>
    </div>
  );
};

export default LeaseRenewals;