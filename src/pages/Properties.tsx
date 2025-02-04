import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { PropertiesTable } from "@/components/PropertiesTable";
import { PropertyDetails } from "@/components/PropertyDetails";
import { Filter, ListFilter, Plus, Building2, FileText, DollarSign, Wrench } from "lucide-react";
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

const systemUpdates = [
  { date: 'Jan 20', title: 'Rentec Direct Product Development Update: Made Live in Q4 2024' },
  { date: 'Jan 15', title: 'Feature Update | New Permissions: Allow or Prohibit Ordering Letters Through the Mailing Wizard' },
  { date: 'Dec 27', title: 'New Feature | Select Your Preferred Account When Receiving Application Fees' },
  { date: 'Dec 18', title: 'Feature Enhancement | Instantly Match Vacancies With Tenant Leads' },
  { date: 'Nov 22', title: 'Feature Enhancement | Text and Email Property Owners Through Work Orders' },
];

const newsAndTips = [
  { date: 'Feb 03', title: 'Easy Rental Real Estate Marketing Ideas for the Busy Landlord' },
  { date: 'Jan 31', title: 'Is this Real Estate Investment a Good Deal? - Video' },
  { date: 'Jan 29', title: 'Rentec Direct Awards Showcase: Year in Review' },
  { date: 'Jan 27', title: 'Winter Plumbing Tips for Landlords' },
  { date: 'Jan 24', title: 'How to Communicate with Customers | Tips for Great Customer Service' },
];

const Properties = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Summary</h1>
          <div className="flex items-center gap-4">
            <select className="rounded-md border border-gray-300 px-3 py-1.5">
              <option>All Properties</option>
            </select>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4 bg-blue-600 text-white">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-4xl font-bold">1</p>
                <p className="text-sm">Vacancy</p>
              </div>
              <Building2 className="h-8 w-8 opacity-80" />
            </div>
          </Card>
          <Card className="p-4 bg-yellow-400">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-4xl font-bold">0</p>
                <p className="text-sm">Leases Expire Soon</p>
              </div>
              <FileText className="h-8 w-8 opacity-80" />
            </div>
          </Card>
          <Card className="p-4 bg-red-400 text-white">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-4xl font-bold">0</p>
                <p className="text-sm">Rent Overdue</p>
              </div>
              <DollarSign className="h-8 w-8 opacity-80" />
            </div>
          </Card>
          <Card className="p-4 bg-emerald-500 text-white">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-4xl font-bold">0</p>
                <p className="text-sm">Open Work Orders</p>
              </div>
              <Wrench className="h-8 w-8 opacity-80" />
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Property Summary Chart */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Property Summary</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={summaryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Line type="monotone" dataKey="value" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-gray-500 mt-4">0 of 1 units currently occupied - 0%</p>
          </Card>

          {/* Net Income Summary */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Net Income Summary</h2>
              <select className="rounded-md border border-gray-300 px-3 py-1.5">
                <option>This Year</option>
              </select>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between py-2">
                <span>Income</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between py-2">
                <span>Expenses</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between py-2 bg-gray-50">
                <span>Net Income</span>
                <span>$0.00</span>
              </div>
            </div>
          </Card>
        </div>

        {/* System Updates & News */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">System Updates</h2>
            <div className="space-y-4">
              {systemUpdates.map((update, index) => (
                <div key={index} className="flex gap-4">
                  <span className="text-sm text-gray-500 whitespace-nowrap">{update.date}</span>
                  <p className="text-sm text-blue-600 hover:underline cursor-pointer">{update.title}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">News & Tips</h2>
            <div className="space-y-4">
              {newsAndTips.map((news, index) => (
                <div key={index} className="flex gap-4">
                  <span className="text-sm text-gray-500 whitespace-nowrap">{news.date}</span>
                  <p className="text-sm text-blue-600 hover:underline cursor-pointer">{news.title}</p>
                </div>
              ))}
            </div>
            <Button variant="link" className="mt-4 text-blue-600 p-0">
              more blog posts...
            </Button>
          </Card>
        </div>

        {/* Quick Access */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Quick Access</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="link" className="text-blue-600">File Library</Button>
            <Button variant="link" className="text-blue-600">Inspections</Button>
            <Button variant="link" className="text-blue-600">Signature Requests</Button>
            <Button variant="link" className="text-blue-600">Tenant Screening</Button>
          </div>
        </Card>

        {/* Properties Table Section */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Properties</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <select className="rounded-md border border-gray-300 px-3 py-1.5">
                <option>All</option>
                <option>Vacant</option>
                <option>Occupied</option>
              </select>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <ListFilter className="mr-2 h-4 w-4" />
                View Listings (0)
              </Button>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add a Property
              </Button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <PropertiesTable />
          </div>
          <div>
            <PropertyDetails />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Properties;