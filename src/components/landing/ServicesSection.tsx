import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  Building2, 
  Users, 
  Home, 
  FileText, 
  DollarSign, 
  Wrench, 
  Shield, 
  Phone, 
  Mail, 
  Star,
  ArrowRight 
} from "lucide-react";

export const ServicesSection = () => {
  const navigate = useNavigate();

  const handleTenantLoginClick = () => {
    navigate("/login");
  };

  const handleTenantServicesClick = () => {
    navigate("/tenant-services");
  };

  return (
    <section id="services" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">Our Services</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold mb-6 flex items-center">
              <Building2 className="mr-2 text-primary" />
              For Property Owners
            </h3>
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <ul className="space-y-4">
                    <li className="flex items-center">
                      <Home className="w-5 h-5 text-primary mr-2" />
                      <span>Full-Service Property Management</span>
                    </li>
                    <li className="flex items-center">
                      <FileText className="w-5 h-5 text-primary mr-2" />
                      <span>Tenant Screening & Lease Management</span>
                    </li>
                    <li className="flex items-center">
                      <DollarSign className="w-5 h-5 text-primary mr-2" />
                      <span>Rent Collection & Financial Reporting</span>
                    </li>
                    <li className="flex items-center">
                      <Wrench className="w-5 h-5 text-primary mr-2" />
                      <span>Maintenance & Repairs Coordination</span>
                    </li>
                    <li className="flex items-center">
                      <Shield className="w-5 h-5 text-primary mr-2" />
                      <span>Evictions & Legal Compliance</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-6 flex items-center">
              <Users className="mr-2 text-primary" />
              For Tenants
            </h3>
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <ul className="space-y-4">
                    <li className="flex items-center">
                      <FileText className="w-5 h-5 text-primary mr-2" />
                      <span>Easy Online Rental Applications</span>
                    </li>
                    <li className="flex items-center">
                      <Home className="w-5 h-5 text-primary mr-2" />
                      <span>Well-Maintained Properties</span>
                    </li>
                    <li className="flex items-center">
                      <Star className="w-5 h-5 text-primary mr-2" />
                      <span>Tenant Rewards Program</span>
                    </li>
                    <li className="flex items-center">
                      <Phone className="w-5 h-5 text-primary mr-2" />
                      <span>24/7 Maintenance Support</span>
                    </li>
                    <li className="flex items-center">
                      <Mail className="w-5 h-5 text-primary mr-2" />
                      <span>Dedicated Communication Portal</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Button 
                className="w-full group"
                onClick={handleTenantLoginClick}
              >
                Tenant Login
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};