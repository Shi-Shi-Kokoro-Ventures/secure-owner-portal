import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

interface FinancialChartProps {
  data: Array<{
    month: string;
    income: number;
    expenses: number;
  }>;
}

export const FinancialChart = ({ data }: FinancialChartProps) => {
  return (
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
          <BarChart data={data}>
            <XAxis 
              dataKey="month" 
              tick={{ fill: 'currentColor' }}
              tickLine={{ stroke: 'currentColor' }}
            />
            <YAxis 
              tick={{ fill: 'currentColor' }}
              tickLine={{ stroke: 'currentColor' }}
            />
            <Tooltip 
              content={({ active, payload, label }) => (
                <ChartTooltip 
                  active={active} 
                  payload={payload} 
                  label={label}
                />
              )}
              wrapperStyle={{ outline: 'none' }}
            />
            <Bar 
              dataKey="income" 
              fill="var(--color-income)"
              radius={[4, 4, 0, 0]}
              className="animate-fade-in"
            />
            <Bar 
              dataKey="expenses" 
              fill="var(--color-expenses)"
              radius={[4, 4, 0, 0]}
              className="animate-fade-in"
            />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};