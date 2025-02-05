import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { PropertiesTable } from "@/components/PropertiesTable";
import { PropertyDetails } from "@/components/PropertyDetails";
import { Filter, ListFilter, Plus, Building2, FileText, DollarSign, Wrench } from "lucide-react";
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { useToast } from "@/hooks/use-toast";
import { AddPropertyDialog } from "@/components/AddPropertyDialog";
import { cn } from "@/lib/utils";

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
  const { toast } = useToast();
  const [addPropertyOpen, setAddPropertyOpen] = useState(false);

  const handleFilterClick = () => {
    toast({
      title: "Filter Applied",
      description: "Property filter functionality coming soon",
    });
  };

  const handleViewListings = () => {
    toast({
      title: "View Listings",
      description: "Property listings view coming soon",
    });
  };

  const handleAddProperty = () => {
    setAddPropertyOpen(true);
  };

  const handlePropertyTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    toast({
      title: "Property Type Changed",
      description: `Selected: ${event.target.value}`,
    });
  };

  const handleQuickAccessClick = (action: string) => {
    toast({
      title: "Quick Access",
      description: `${action} functionality coming soon`,
    });
  };

  return (
    <Layout>
      <div className="space-y-4 animate-fade-in">
        {/* Summary Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Summary</h1>
          <div className="flex items-center gap-4">
            <select 
              className="rounded-md border border-gray-300 px-3 py-1.5 bg-white shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
              onChange={handlePropertyTypeChange}
            >
              <option>All Properties</option>
              <option>Residential</option>
              <option>Commercial</option>
            </select>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleFilterClick}
              className="hover:bg-gray-50 transition-colors"
            >
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Card className="p-4 bg-gradient-to-br from-blue-600 to-blue-700 text-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-4xl font-bold">1</p>
                <p className="text-sm opacity-90">Vacancy</p>
              </div>
              <Building2 className="h-8 w-8 opacity-80" />
            </div>
          </Card>
          <Card className="p-4 bg-gradient-to-br from-yellow-400 to-yellow-500 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-4xl font-bold">0</p>
                <p className="text-sm opacity-90">Leases Expire Soon</p>
              </div>
              <FileText className="h-8 w-8 opacity-80" />
            </div>
          </Card>
          <Card className="p-4 bg-gradient-to-br from-red-400 to-red-500 text-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-4xl font-bold">0</p>
                <p className="text-sm opacity-90">Rent Overdue</p>
              </div>
              <DollarSign className="h-8 w-8 opacity-80" />
            </div>
          </Card>
          <Card className="p-4 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-4xl font-bold">0</p>
                <p className="text-sm opacity-90">Open Work Orders</p>
              </div>
              <Wrench className="h-8 w-8 opacity-80" />
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Property Summary Chart */}
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

          {/* Net Income Summary */}
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
        </div>

        {/* System Updates & News */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
        </div>

        {/* Quick Access */}
        <Card className="p-4 hover:shadow-lg transition-all duration-300">
          <h2 className="text-lg font-semibold mb-4 text-gray-900">Quick Access</h2>
          <div className="flex flex-wrap gap-4">
            {['File Library', 'Inspections', 'Signature Requests', 'Tenant Screening'].map((action) => (
              <Button 
                key={action}
                variant="link" 
                className="text-blue-600 hover:text-blue-700 transition-colors"
                onClick={() => handleQuickAccessClick(action)}
              >
                {action}
              </Button>
            ))}
          </div>
        </Card>

        {/* Properties Table Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-xl font-semibold text-gray-900">Properties</h2>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2">
              <select 
                className="rounded-md border border-gray-300 px-3 py-1.5 bg-white shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                onChange={handlePropertyTypeChange}
              >
                <option>All</option>
                <option>Vacant</option>
                <option>Occupied</option>
              </select>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleFilterClick}
                className="hover:bg-gray-50 transition-colors"
              >
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleViewListings}
                className="hover:bg-gray-50 transition-colors"
              >
                <ListFilter className="mr-2 h-4 w-4" />
                View Listings (0)
              </Button>
              <Button 
                size="sm" 
                onClick={handleAddProperty}
                className="bg-primary hover:bg-primary/90 transition-colors"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add a Property
              </Button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <PropertiesTable />
          </div>
          <div className="w-full">
            <PropertyDetails />
          </div>
        </div>
      </div>
      <AddPropertyDialog 
        open={addPropertyOpen} 
        onOpenChange={setAddPropertyOpen}
      />
    </Layout>
  );
};

export default Properties;
