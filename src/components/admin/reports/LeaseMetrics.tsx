import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const mockData = [
  { month: 'Jan', renewals: 4, expirations: 2 },
  { month: 'Feb', renewals: 3, expirations: 1 },
  { month: 'Mar', renewals: 2, expirations: 3 },
  { month: 'Apr', renewals: 5, expirations: 2 },
  { month: 'May', renewals: 4, expirations: 1 },
  { month: 'Jun', renewals: 6, expirations: 2 },
];

export const LeaseMetrics = () => {
  const { data: leaseData, isLoading } = useQuery({
    queryKey: ['lease-metrics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('leases')
        .select(`
          start_date,
          end_date,
          status
        `)
        .gte('end_date', new Date(new Date().setMonth(new Date().getMonth() - 6)).toISOString());

      if (error) throw error;
      return data;
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lease Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ChartContainer
            config={{
              renewals: {
                label: "Renewals",
                color: "#3B82F6",
              },
              expirations: {
                label: "Expirations",
                color: "#F59E0B",
              },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip content={ChartTooltip} />
                <Line type="monotone" dataKey="renewals" stroke="var(--color-renewals)" />
                <Line type="monotone" dataKey="expirations" stroke="var(--color-expirations)" />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};