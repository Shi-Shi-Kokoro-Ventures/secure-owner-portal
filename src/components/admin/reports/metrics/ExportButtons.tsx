import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface ExportButtonsProps {
  onExport: (format: 'csv' | 'pdf' | 'excel') => void;
}

export const ExportButtons = ({ onExport }: ExportButtonsProps) => {
  return (
    <div className="flex gap-2">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => onExport('csv')}
        className="transition-all hover:scale-105"
      >
        <Download className="h-4 w-4 mr-2" />
        Export CSV
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => onExport('pdf')}
        className="transition-all hover:scale-105"
      >
        <Download className="h-4 w-4 mr-2" />
        Export PDF
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => onExport('excel')}
        className="transition-all hover:scale-105"
      >
        <Download className="h-4 w-4 mr-2" />
        Export Excel
      </Button>
    </div>
  );
};