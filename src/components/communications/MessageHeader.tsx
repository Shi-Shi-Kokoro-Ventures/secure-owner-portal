
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const MessageHeader = () => {
  const navigate = useNavigate();
  
  return (
    <Button
      variant="ghost"
      className="gap-2"
      onClick={() => navigate("/tenant/communications")}
    >
      <ArrowLeft className="h-4 w-4" />
      Back to Communications
    </Button>
  );
};
