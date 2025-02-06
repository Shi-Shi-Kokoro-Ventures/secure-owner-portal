import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const mockData = [
  { month: 'Jan', income: 4000, expenses: 2400 },
  { month: 'Feb', income: 3000, expenses: 1398 },
  { month: 'Mar', income: 2000, expenses: 9800 },
  { month: 'Apr', income: 2780, expenses: 3908 },
  { month: 'May', income: 1890, expenses: 4800 },
  { month: 'Jun', income: 2390, expenses: 3800 },
];

export const FinancialMetrics = () => {
  const { data: financialData, isLoading } = useQuery({
    queryKey: ['financial-metrics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('payments')
        .select(`
          amount_paid,
          payment_date,
          status
        `)
        .gte('payment_date', new Date(new Date().setMonth(new Date().getMonth() - 6)).toISOString());

      if (error) throw error;
      return data;
    },
  });

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
              <BarChart data={mockData}>
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