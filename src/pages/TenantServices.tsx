import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Clock, 
  Globe, 
  FileText, 
  Users, 
  BookOpen,
  ArrowLeft
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const TenantServices = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-primary/10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button 
            variant="ghost" 
            className="mb-6"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          
          {/* Logo Section */}
          <div className="flex justify-center mb-8">
            <img 
              src="/lovable-uploads/40334d61-cc63-4970-bdb9-d08d169244d0.png"
              alt="Shi Shi Kokoro Property Management"
              className="h-48 w-auto"
            />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Tenant Services
          </h1>
          <p className="text-lg text-center max-w-3xl mx-auto">
            At Shi Shi Kokoro Property Management, we are committed to providing our tenants with exceptional services to ensure a comfortable and enjoyable living experience.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <Clock className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">24/7 Maintenance Support</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Prompt response to maintenance requests</li>
                  <li>• Emergency services available around the clock</li>
                  <li>• Professional and skilled maintenance team</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <Globe className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">Online Tenant Portal</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Secure rent payment platform</li>
                  <li>• Easy maintenance request submission</li>
                  <li>• Access to important documents</li>
                  <li>• Direct communication channel</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <FileText className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">Transparent Lease Agreements</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Clear and comprehensive terms</li>
                  <li>• Assistance with renewals</li>
                  <li>• Professional lease amendments</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <Users className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">Community Engagement</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Regular community events</li>
                  <li>• Property updates newsletter</li>
                  <li>• Local community information</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <BookOpen className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">Tenant Resources</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Comprehensive FAQ library</li>
                  <li>• Educational workshops</li>
                  <li>• Financial planning resources</li>
                  <li>• Home maintenance guides</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Need Assistance?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            We value our tenants and strive to create a supportive and responsive environment. 
            For any questions or assistance, please contact our office or access the tenant portal.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button onClick={() => navigate("/login")}>
              Access Tenant Portal
            </Button>
            <Button variant="outline" onClick={() => navigate("/?scrollTo=contact")}>
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TenantServices;