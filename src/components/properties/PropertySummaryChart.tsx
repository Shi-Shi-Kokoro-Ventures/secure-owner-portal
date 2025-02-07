
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const summaryData = [
  { month: 'Mar', value: 0 },
  { month: 'Apr', value: 0 },
  { month: 'May', value: 0 },
  { month: 'Jun', value: 0 },
  { month: 'Jul', value: 0 },
  { month: 'Aug', value: 0 },
  { month: 'Sep', value: 0 },
  { month: 'Oct', value: 0 },
  { month: 'Nov', value: 0 },
  { month: 'Dec', value: 0 },
  { month: 'Jan', value: 0 },
  { month: 'Feb', value: 0 },
];

export const PropertySummaryChart = () => {
  return (
    <Card className="p-4 hover:shadow-lg transition-all duration-300">
      <h2 className="text-lg font-semibold mb-4 text-gray-900">Property Summary</h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={summaryData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="month" stroke="#6B7280" />
            <YAxis stroke="#6B7280" />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#1a4f7c"
              strokeWidth={2}
              dot={{ fill: '#1a4f7c' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className="text-sm text-gray-500 mt-4">0 of 1 units currently occupied - 0%</p>
    </Card>
  );
};
