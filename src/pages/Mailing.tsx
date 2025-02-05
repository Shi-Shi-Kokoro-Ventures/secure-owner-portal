import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Send, History } from "lucide-react";
import { Button } from "@/components/ui/button";

const Mailing = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Mailing</h1>
        <p className="text-muted-foreground">Manage your mail communications</p>
      </div>

      <div className="mb-8">
        <Button className="flex items-center space-x-2">
          <Send className="h-5 w-5" />
          <span>New Mail</span>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="transition-all duration-300 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-lg font-medium">Recent Mailings</CardTitle>
            <Mail className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">No recent mailings</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-lg font-medium">Scheduled</CardTitle>
            <Send className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">No scheduled mailings</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-lg font-medium">History</CardTitle>
            <History className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">No mailing history</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Mailing;