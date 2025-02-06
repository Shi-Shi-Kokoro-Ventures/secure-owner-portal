import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { PieChart, Pie, ResponsiveContainer, Tooltip, Cell } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const COLORS = ['#10B981', '#F59E0B', '#EF4444'];

const mockData = [
  { name: 'Completed', value: 400 },
  { name: 'In Progress', value: 300 },
  { name: 'Pending', value: 200 },
];

export const MaintenanceMetrics = () => {
  const { data: maintenanceData, isLoading } = useQuery({
    queryKey: ['maintenance-metrics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('maintenance_requests')
        .select('status')
        .gte('created_at', new Date(new Date().setMonth(new Date().getMonth() - 6)).toISOString());

      if (error) throw error;
      return data;
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Maintenance Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ChartContainer
            config={{
              completed: {
                label: "Completed",
                color: "#10B981",
              },
              inProgress: {
                label: "In Progress",
                color: "#F59E0B",
              },
              pending: {
                label: "Pending",
                color: "#EF4444",
              },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {mockData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={({ active, payload, label }) => (
                  <ChartTooltip 
                    active={active} 
                    payload={payload} 
                    label={label}
                  />
                )} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};