import {
  Building2,
  ClipboardCheck,
  Coins,
  FileText,
  Home,
  MessageSquare,
  Shield,
  Tool,
  Users
} from "lucide-react";
import { ServiceCard } from "./ServiceCard";

export const ServiceGrid = () => {
  const services = [
    {
      icon: Building2,
      title: "Property Management",
      description: "Comprehensive management of your real estate investments"
    },
    {
      icon: Users,
      title: "Tenant Screening",
      description: "Thorough background and credit checks for quality tenants"
    },
    {
      icon: Tool,
      title: "Maintenance",
      description: "24/7 maintenance support and preventive care"
    },
    {
      icon: Coins,
      title: "Rent Collection",
      description: "Efficient and reliable rent collection services"
    },
    {
      icon: Shield,
      title: "Legal Compliance",
      description: "Ensuring compliance with all property laws and regulations"
    },
    {
      icon: MessageSquare,
      title: "Communication",
      description: "Seamless communication between owners and tenants"
    },
    {
      icon: ClipboardCheck,
      title: "Inspections",
      description: "Regular property inspections and condition reports"
    },
    {
      icon: FileText,
      title: "Financial Reporting",
      description: "Detailed financial reports and documentation"
    },
    {
      icon: Home,
      title: "Marketing",
      description: "Professional marketing to minimize vacancy rates"
    }
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {services.map((service, index) => (
        <ServiceCard key={index} {...service} />
      ))}
    </div>
  );
};