import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

const mockData = [
  { month: 'Jan', income: 4000, expenses: 2400 },
  { month: 'Feb', income: 3000, expenses: 1398 },
  { month: 'Mar', income: 2000, expenses: 9800 },
  { month: 'Apr', income: 2780, expenses: 3908 },
  { month: 'May', income: 1890, expenses: 4800 },
  { month: 'Jun', income: 2390, expenses: 3800 },
];

export const FinancialMetrics = () => {
  const { data: financialData, isLoading, error } = useQuery({
    queryKey: ['financial-metrics'],
    queryFn: async () => {
      if (import.meta.env.DEV) {
        return { data: mockData };
      }

      const { data, error } = await supabase.functions.invoke('get-financial-metrics');
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center h-[300px]">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center h-[300px] text-destructive">
            Error loading financial data
          </div>
        </CardContent>
      </Card>
    );
  }

  const chartData = financialData?.data || mockData;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Financial Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ChartContainer
            config={{
              income: {
                label: "Income",
                color: "#10B981",
              },
              expenses: {
                label: "Expenses",
                color: "#EF4444",
              },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip content={({ active, payload, label }) => (
                  <ChartTooltip 
                    active={active} 
                    payload={payload} 
                    label={label}
                  />
                )} />
                <Bar dataKey="income" fill="var(--color-income)" />
                <Bar dataKey="expenses" fill="var(--color-expenses)" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};