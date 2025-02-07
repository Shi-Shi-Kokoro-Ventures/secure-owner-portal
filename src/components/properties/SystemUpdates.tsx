
import { Card } from "@/components/ui/card";

const systemUpdates = [
  { date: 'Jan 20', title: 'Rentec Direct Product Development Update: Made Live in Q4 2024' },
  { date: 'Jan 15', title: 'Feature Update | New Permissions: Allow or Prohibit Ordering Letters Through the Mailing Wizard' },
  { date: 'Dec 27', title: 'New Feature | Select Your Preferred Account When Receiving Application Fees' },
  { date: 'Dec 18', title: 'Feature Enhancement | Instantly Match Vacancies With Tenant Leads' },
  { date: 'Nov 22', title: 'Feature Enhancement | Text and Email Property Owners Through Work Orders' },
];

export const SystemUpdates = () => {
  return (
    <Card className="p-4 hover:shadow-lg transition-all duration-300">
      <h2 className="text-lg font-semibold mb-4 text-gray-900">System Updates</h2>
      <div className="space-y-4">
        {systemUpdates.map((update, index) => (
          <div key={index} className="flex gap-4 group">
            <span className="text-sm text-gray-500 whitespace-nowrap">{update.date}</span>
            <p className="text-sm text-blue-600 group-hover:text-blue-700 cursor-pointer transition-colors">{update.title}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};
