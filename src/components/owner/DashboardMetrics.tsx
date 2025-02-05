import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Building2, 
  DollarSign, 
  Users, 
  Wrench, 
  AlertCircle, 
  FileText,
  TrendingUp,
  Receipt,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

export const DashboardMetrics = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
          <Building2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">95%</div>
          <p className="text-xs text-muted-foreground">19 of 20 units occupied</p>
          <div className="mt-2 flex items-center text-xs text-green-600">
            <span>↑ 2.1% from last month</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Rent Collection</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$45,500</div>
          <p className="text-xs text-muted-foreground">$2,500 outstanding</p>
          <div className="mt-2 flex items-center gap-2">
            <div className="h-2 w-full rounded-full bg-gray-200">
              <div className="h-2 w-[95%] rounded-full bg-green-500"></div>
            </div>
            <span className="text-xs">95%</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
          <Receipt className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$12,300</div>
          <p className="text-xs text-muted-foreground">This month's total</p>
          <div className="mt-2 space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span>Maintenance</span>
              <span>$5,200</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span>Utilities</span>
              <span>$4,100</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span>Insurance</span>
              <span>$3,000</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Tenants</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">19</div>
          <p className="text-xs text-muted-foreground">2 leases expiring soon</p>
          <div className="mt-2 text-xs text-yellow-600">
            <span>⚠️ Review needed</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Property Value</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$4.2M</div>
          <p className="text-xs text-muted-foreground">Total portfolio value</p>
          <div className="mt-2 flex items-center text-xs text-green-600">
            <ArrowUpRight className="h-4 w-4 mr-1" />
            <span>+5.2% this year</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Net Income</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$33,200</div>
          <p className="text-xs text-muted-foreground">This month</p>
          <div className="mt-2 flex items-center text-xs text-green-600">
            <ArrowUpRight className="h-4 w-4 mr-1" />
            <span>+12% vs last month</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Maintenance</CardTitle>
          <Wrench className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">3</div>
          <p className="text-xs text-muted-foreground">1 urgent request</p>
          <div className="mt-2 flex flex-col gap-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-red-600">Urgent</span>
              <span>1</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-yellow-600">In Progress</span>
              <span>2</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Lease Renewals</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">2</div>
          <p className="text-xs text-muted-foreground">Due within 30 days</p>
          <div className="mt-2 text-xs text-blue-600">
            <span>Review pending</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Alerts</CardTitle>
          <AlertCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">4</div>
          <p className="text-xs text-muted-foreground">Require attention</p>
          <div className="mt-2 space-y-1">
            <div className="flex items-center gap-1 text-xs text-red-600">
              <span>●</span>
              <span>1 overdue payment</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-yellow-600">
              <span>●</span>
              <span>3 pending approvals</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};