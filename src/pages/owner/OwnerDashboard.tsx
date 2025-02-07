import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardMetrics } from "@/components/owner/DashboardMetrics";
import { QuickActions } from "@/components/owner/QuickActions";
import { LeaseReviewSection } from "@/components/owner/LeaseReviewSection";
import { ApplicationReviewSection } from "@/components/owner/ApplicationReviewSection";
import { PropertyStats } from "@/components/owner/PropertyStats";
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
    <div className="container mx-auto px-4 py-8 space-y-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">
          Welcome Back
        </h1>
        <p className="text-muted-foreground text-lg">
          Here's an overview of your property portfolio
        </p>
      </div>

      <PropertyStats />

      <div className="space-y-8">
        <DashboardMetrics />

        <div className="grid gap-8 md:grid-cols-2">
          <Card className="transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Financial Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis 
                      dataKey="month" 
                      stroke="#6B7280"
                      tick={{ fill: '#6B7280' }}
                    />
                    <YAxis 
                      stroke="#6B7280"
                      tick={{ fill: '#6B7280' }}
                      tickFormatter={(value) => `$${value.toLocaleString()}`}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#FFF',
                        border: '1px solid #E5E7EB',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                      formatter={(value) => [`$${value.toLocaleString()}`, '']}
                    />
                    <Line
                      type="monotone"
                      dataKey="income"
                      stroke="#9b87f5"
                      strokeWidth={2}
                      dot={{ fill: '#9b87f5', strokeWidth: 2 }}
                      name="Income"
                    />
                    <Line
                      type="monotone"
                      dataKey="expenses"
                      stroke="#7E69AB"
                      strokeWidth={2}
                      dot={{ fill: '#7E69AB', strokeWidth: 2 }}
                      name="Expenses"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <QuickActions />
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <LeaseReviewSection />
          <ApplicationReviewSection />
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;