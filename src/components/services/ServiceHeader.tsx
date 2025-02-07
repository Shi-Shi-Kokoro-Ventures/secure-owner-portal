import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const ServiceHeader = () => {
  const navigate = useNavigate();
  
  return (
    <div className="text-center space-y-4">
      <h1 className="text-4xl font-bold tracking-tight">Our Services</h1>
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
        Comprehensive property management solutions designed to maximize your investment's potential
      </p>
      <div className="flex justify-center gap-4">
        <Button onClick={() => navigate("/contact")} className="gap-2">
          Get Started <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};