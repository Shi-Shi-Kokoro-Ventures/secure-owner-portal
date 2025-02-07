import { Card, CardContent } from "@/components/ui/card";

export const ErrorState = () => {
  return (
    <Card className="border-destructive">
      <CardContent className="pt-6">
        <div className="flex items-center justify-center h-[300px] text-destructive">
          Error loading financial data
        </div>
      </CardContent>
    </Card>
  );
};