import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardMetrics } from "@/components/owner/DashboardMetrics";
import { QuickActions } from "@/components/owner/QuickActions";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const performanceData = [
  { month: "Jan", income: 42000, expenses: 15000 },
  { month: "Feb", income: 45000, expenses: 14000 },
  { month: "Mar", income: 48000, expenses: 16000 },
  { month: "Apr", income: 47000, expenses: 13000 },
  { month: "May", income: 46000, expenses: 15000 },
  { month: "Jun", income: 48000, expenses: 14000 },
];

const OwnerDashboard = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Owner Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your properties
        </p>
      </div>

      <div className="space-y-6">
        <DashboardMetrics />

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Performance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="income"
                      stroke="#8884d8"
                      name="Income"
                    />
                    <Line
                      type="monotone"
                      dataKey="expenses"
                      stroke="#82ca9d"
                      name="Expenses"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <QuickActions />
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;