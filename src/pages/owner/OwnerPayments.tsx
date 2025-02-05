import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, ArrowUpRight, ArrowDownRight, Download, Filter, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

const OwnerPayments = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Payments</h1>
        <p className="text-muted-foreground">
          Track your income and payment history
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$24,500</div>
            <p className="text-xs text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$3,200</div>
            <p className="text-xs text-muted-foreground">Due this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Expenses</CardTitle>
            <ArrowDownRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$5,400</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Payment History</CardTitle>
          <div className="flex items-center gap-2">
            <Input
              type="date"
              className="w-[150px]"
            />
            <span>to</span>
            <Input
              type="date"
              className="w-[150px]"
            />
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Property</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  {
                    date: "2024-02-01",
                    description: "Rent Payment - Unit 101",
                    property: "123 Main St",
                    type: "income",
                    amount: 2500,
                    status: "completed"
                  },
                  {
                    date: "2024-01-30",
                    description: "Maintenance Repair",
                    property: "456 Oak Ave",
                    type: "expense",
                    amount: 450,
                    status: "completed"
                  },
                  {
                    date: "2024-01-28",
                    description: "Rent Payment - Unit 202",
                    property: "789 Pine Rd",
                    type: "income",
                    amount: 1800,
                    status: "pending"
                  },
                ].map((payment, index) => (
                  <TableRow key={index}>
                    <TableCell>{payment.date}</TableCell>
                    <TableCell>{payment.description}</TableCell>
                    <TableCell>{payment.property}</TableCell>
                    <TableCell>
                      <Badge variant={payment.type === "income" ? "default" : "outline"}>
                        {payment.type}
                      </Badge>
                    </TableCell>
                    <TableCell className={payment.type === "income" ? "text-green-600" : "text-red-600"}>
                      {payment.type === "income" ? "+" : "-"}${payment.amount}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={payment.status === "completed" ? "default" : "secondary"}
                      >
                        {payment.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default OwnerPayments;