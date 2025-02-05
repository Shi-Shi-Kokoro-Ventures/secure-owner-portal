import { Layout } from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';
import {
  Building2,
  DollarSign,
  Users,
  Wrench,
  Download,
  Filter,
  Printer,
  AlertCircle,
  Calendar,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

const mockFinancialData = [
  { month: 'Jan', rent: 52000, maintenance: 8400, vacancy: 2400 },
  { month: 'Feb', rent: 54000, maintenance: 7398, vacancy: 1398 },
  { month: 'Mar', rent: 51000, maintenance: 9800, vacancy: 3200 },
  { month: 'Apr', rent: 53780, maintenance: 6908, vacancy: 2100 },
  { month: 'May', rent: 55890, maintenance: 7800, vacancy: 1800 },
  { month: 'Jun', rent: 57390, maintenance: 8800, vacancy: 2400 },
];

const recentActivities = [
  { date: '2024-02-20', type: 'application', activity: 'New tenant application received for Unit 4B at Oakwood Apartments' },
  { date: '2024-02-19', type: 'payment', activity: 'Rent payment ($2,450) received for Unit 4B at Sunset Heights' },
  { date: '2024-02-18', type: 'maintenance', activity: 'Urgent maintenance request: Water leak in Unit 2C at Pine Valley' },
  { date: '2024-02-17', type: 'lease', activity: 'Lease renewal completed for Unit 305 at Metropolitan Towers' },
  { date: '2024-02-16', type: 'inspection', activity: 'Property inspection scheduled for Riverside Complex' },
];

const upcomingTasks = [
  { date: '2024-02-25', task: 'Lease renewal - Unit 305, Metropolitan Towers' },
  { date: '2024-02-26', task: 'Property inspection - Riverside Complex' },
  { date: '2024-02-28', task: 'Vendor meeting - HVAC maintenance' },
];

const Dashboard = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Property Manager Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's what's happening with your properties.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Properties Under Management</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-bold">24</p>
                    <span className="text-sm text-green-600 flex items-center">
                      <ArrowUpRight className="h-4 w-4" />
                      +2
                    </span>
                  </div>
                </div>
                <Building2 className="h-8 w-8 text-primary opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Total Units</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-bold">156</p>
                    <span className="text-sm text-green-600 flex items-center">
                      <ArrowUpRight className="h-4 w-4" />
                      95%
                    </span>
                  </div>
                </div>
                <Users className="h-8 w-8 text-primary opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-bold">$157,890</p>
                    <span className="text-sm text-green-600 flex items-center">
                      <ArrowUpRight className="h-4 w-4" />
                      +8.2%
                    </span>
                  </div>
                </div>
                <DollarSign className="h-8 w-8 text-primary opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Maintenance Requests</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-bold">12</p>
                    <span className="text-sm text-red-600 flex items-center">
                      <ArrowDownRight className="h-4 w-4" />
                      4 urgent
                    </span>
                  </div>
                </div>
                <Wrench className="h-8 w-8 text-primary opacity-80" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Financial Overview Chart */}
          <Card className="lg:col-span-2">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Financial Overview</h2>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockFinancialData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="rent" name="Rental Income" stroke="#8884d8" />
                    <Line type="monotone" dataKey="maintenance" name="Maintenance Costs" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="vacancy" name="Vacancy Loss" stroke="#ff7300" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Tasks */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Upcoming Tasks</h2>
              <div className="space-y-4">
                {upcomingTasks.map((task, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">{task.task}</p>
                      <p className="text-sm text-muted-foreground">{task.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activities */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
                  <AlertCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm">{activity.activity}</p>
                    <p className="text-sm text-muted-foreground">{activity.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;