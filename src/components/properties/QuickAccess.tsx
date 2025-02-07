
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export const QuickAccess = () => {
  const { toast } = useToast();

  const handleQuickAccessClick = (action: string) => {
    toast({
      title: "Quick Access",
      description: `${action} functionality coming soon`,
    });
  };

  return (
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
  );
};
