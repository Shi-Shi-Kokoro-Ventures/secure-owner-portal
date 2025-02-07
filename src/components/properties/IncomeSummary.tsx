
import { Card } from "@/components/ui/card";

export const IncomeSummary = () => {
  return (
    <Card className="p-4 hover:shadow-lg transition-all duration-300">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Net Income Summary</h2>
        <select className="rounded-md border border-gray-300 px-3 py-1.5 bg-white shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors">
          <option>This Year</option>
        </select>
      </div>
      <div className="space-y-4">
        <div className="flex justify-between py-2 border-b">
          <span className="text-gray-600">Income</span>
          <span className="font-medium text-gray-900">$0.00</span>
        </div>
        <div className="flex justify-between py-2 border-b">
          <span className="text-gray-600">Expenses</span>
          <span className="font-medium text-gray-900">$0.00</span>
        </div>
        <div className="flex justify-between py-2 bg-gray-50 rounded-lg px-3">
          <span className="font-medium text-gray-900">Net Income</span>
          <span className="font-medium text-gray-900">$0.00</span>
        </div>
      </div>
    </Card>
  );
};
