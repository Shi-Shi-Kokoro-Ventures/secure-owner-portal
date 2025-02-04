import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BanknoteIcon,
  CreditCard,
  DollarSign,
  Download,
  Filter,
  Printer,
  Receipt,
  WalletCards,
} from "lucide-react";

const mockTransactions = [
  {
    id: "1",
    date: "2024-02-20",
    description: "Rent Payment - Unit 101",
    type: "Credit",
    amount: 1500.00,
    balance: 15000.00,
  },
  {
    id: "2",
    date: "2024-02-19",
    description: "Maintenance Fee",
    type: "Debit",
    amount: -200.00,
    balance: 13500.00,
  },
  {
    id: "3",
    date: "2024-02-18",
    description: "Security Deposit - Unit 205",
    type: "Credit",
    amount: 1000.00,
    balance: 13700.00,
  },
];

const Banking = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Banking</h1>
          <p className="text-muted-foreground">
            Manage your financial transactions and accounts
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-2">
              <WalletCards className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Total Balance</span>
            </div>
            <p className="mt-2 text-2xl font-bold">$15,000.00</p>
          </div>
          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium">Income (MTD)</span>
            </div>
            <p className="mt-2 text-2xl font-bold">$2,500.00</p>
          </div>
          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-2">
              <Receipt className="h-5 w-5 text-red-600" />
              <span className="text-sm font-medium">Expenses (MTD)</span>
            </div>
            <p className="mt-2 text-2xl font-bold">$800.00</p>
          </div>
          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium">Pending</span>
            </div>
            <p className="mt-2 text-2xl font-bold">$350.00</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>

        {/* Transactions Table */}
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Balance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>{transaction.type}</TableCell>
                  <TableCell className="text-right">
                    <span className={transaction.type === "Credit" ? "text-green-600" : "text-red-600"}>
                      ${Math.abs(transaction.amount).toFixed(2)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    ${transaction.balance.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Layout>
  );
};

export default Banking;