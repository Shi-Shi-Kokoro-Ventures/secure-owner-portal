
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const newsAndTips = [
  { date: 'Feb 03', title: 'Easy Rental Real Estate Marketing Ideas for the Busy Landlord' },
  { date: 'Jan 31', title: 'Is this Real Estate Investment a Good Deal? - Video' },
  { date: 'Jan 29', title: 'Rentec Direct Awards Showcase: Year in Review' },
  { date: 'Jan 27', title: 'Winter Plumbing Tips for Landlords' },
  { date: 'Jan 24', title: 'How to Communicate with Customers | Tips for Great Customer Service' },
];

export const NewsAndTips = () => {
  return (
    <Card className="p-4 hover:shadow-lg transition-all duration-300">
      <h2 className="text-lg font-semibold mb-4 text-gray-900">News & Tips</h2>
      <div className="space-y-4">
        {newsAndTips.map((news, index) => (
          <div key={index} className="flex gap-4 group">
            <span className="text-sm text-gray-500 whitespace-nowrap">{news.date}</span>
            <p className="text-sm text-blue-600 group-hover:text-blue-700 cursor-pointer transition-colors">{news.title}</p>
          </div>
        ))}
      </div>
      <Button variant="link" className="mt-4 text-blue-600 p-0 hover:text-blue-700 transition-colors">
        more blog posts...
      </Button>
    </Card>
  );
};
