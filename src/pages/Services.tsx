import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Building2, 
  Shield, 
  Star, 
  Clock, 
  Heart,
  DollarSign,
  Phone,
  Mail,
  CheckCircle2
} from "lucide-react";

const Services = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-primary/10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Discover Shi Shi Kokoro Property Management Services
          </h1>
          <p className="text-lg text-center max-w-3xl mx-auto">
            We specialize in providing high-quality, tenant-focused property management solutions that prioritize efficiency, tenant satisfaction, and long-term property value growth.
          </p>
        </div>
      </div>

      {/* Service Packages */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Comprehensive Service Packages</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Basic Management Package",
                price: "10%",
                features: [
                  "Rent Collection & Deposits",
                  "Tenant Screening & Placement",
                  "Lease Management & Enforcement",
                  "Basic Financial Reporting"
                ]
              },
              {
                title: "Standard Management Package",
                price: "15%",
                features: [
                  "Everything in Basic Package",
                  "Routine Maintenance Coordination",
                  "Tenant Communication",
                  "Periodic Property Inspections",
                  "Contractor Coordination"
                ]
              },
              {
                title: "Full-Service Management Package",
                price: "20%",
                features: [
                  "Everything in Standard Package",
                  "24/7 Emergency Response",
                  "Complete Maintenance Management",
                  "Legal Support",
                  "Strategic Property Planning",
                  "Short-Term Rental Management"
                ]
              }
            ].map((pkg, index) => (
              <Card key={index} className="relative hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold mb-2">{pkg.title}</h3>
                    <p className="text-3xl font-bold text-primary">{pkg.price}</p>
                    <p className="text-sm text-gray-600">of Monthly Rent</p>
                  </div>
                  <ul className="space-y-3">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <CheckCircle2 className="w-5 h-5 text-primary mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6">Get Started</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Additional Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Building2,
                title: "Tenant Placement Services",
                description: "Expert tenant screening and placement services, ensuring qualified, responsible tenants."
              },
              {
                icon: Shield,
                title: "Lease Renewal & Compliance",
                description: "Complete handling of lease renewals, amendments, and tenant compliance."
              },
              {
                icon: Star,
                title: "Property Maintenance",
                description: "Partnerships with vetted contractors for quality maintenance and repairs."
              },
              {
                icon: Clock,
                title: "24/7 Emergency Response",
                description: "Swift action for emergencies, from natural disasters to system failures."
              },
              {
                icon: Heart,
                title: "Tenant Rewards Program",
                description: "Kokoro Perks program rewarding great tenants with exclusive benefits."
              },
              {
                icon: DollarSign,
                title: "Financial Management",
                description: "Detailed financial reporting and legal compliance management."
              }
            ].map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <service.icon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">Let's Work Together!</h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
            <Button className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Contact Us
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              info@shishikokoroproperty.com
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;