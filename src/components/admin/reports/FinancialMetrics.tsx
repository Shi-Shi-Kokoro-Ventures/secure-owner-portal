import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { LoadingState } from "./metrics/LoadingState";
import { ErrorState } from "./metrics/ErrorState";
import { FinancialChart } from "./metrics/FinancialChart";

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
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState />;
  }

  const chartData = financialData?.data || mockData;

  return (
    <Card className="transform transition-all duration-300 hover:shadow-lg">
      <CardHeader>
        <CardTitle>Financial Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <FinancialChart data={chartData} />
      </CardContent>
    </Card>
  );
};