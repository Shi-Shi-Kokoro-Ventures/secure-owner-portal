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

const Applications = () => {
  const applications = [
    {
      id: 1,
      applicant: "John Doe",
      property: "123 Main St",
      submitted: "2024-02-20",
      status: "Pending Review",
    },
    {
      id: 2,
      applicant: "Jane Smith",
      property: "456 Oak Ave",
      submitted: "2024-02-19",
      status: "Under Review",
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Rental Applications</h1>
        <Button>Export Applications</Button>
      </div>

      <Card className="p-4">
        <ScrollArea className="h-[600px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Applicant</TableHead>
                <TableHead>Property</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((application) => (
                <TableRow key={application.id}>
                  <TableCell>{application.applicant}</TableCell>
                  <TableCell>{application.property}</TableCell>
                  <TableCell>{application.submitted}</TableCell>
                  <TableCell>{application.status}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      Review
                    </Button>
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

export default Applications;