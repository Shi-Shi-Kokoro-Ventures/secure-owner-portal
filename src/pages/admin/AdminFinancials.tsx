import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, Download, Filter, CreditCard } from "lucide-react";
import { StripeConnectSetup } from "@/components/owner/StripeConnectSetup";

const AdminFinancials = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Financial Management</h1>
          <p className="text-muted-foreground">
            Manage payments, transactions, and financial settings
          </p>
        </div>

        {/* Payment Processing Setup */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Payment Processing</CardTitle>
            </CardHeader>
            <CardContent>
              <StripeConnectSetup />
            </CardContent>
          </Card>

          {/* Financial Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Financial Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-primary" />
                    <span>Total Revenue (MTD)</span>
                  </div>
                  <span className="font-bold">$24,500</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    <span>Pending Payments</span>
                  </div>
                  <span className="font-bold">$3,200</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>

        {/* Transaction History */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Transaction history will be displayed here
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AdminFinancials;