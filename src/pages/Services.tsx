import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Megaphone, 
  CreditCard, 
  Wrench, 
  FileText, 
  Home, 
  TrendingUp,
  Trophy,
  Clock,
  CheckCircle2,
  Building2,
  DollarSign,
  Laptop,
  ShieldCheck,
  Target,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const Services = () => {
  const mainServices = [
    {
      icon: Building2,
      title: "Full-Service Management",
      description: "We do it all, so you don't have to."
    },
    {
      icon: DollarSign,
      title: "Maximize Cash Flow",
      description: "Reduce vacancies, cut costs, and increase profit."
    },
    {
      icon: Laptop,
      title: "Automated Efficiency",
      description: "State-of-the-art property management technology."
    }
  ];

  const detailedServices = [
    {
      icon: Megaphone,
      title: "Property Marketing & Tenant Placement",
      features: [
        "Professional HD Photos & Virtual Tours",
        "Listing syndication across major platforms",
        "Rigorous Tenant Screening",
        "Digital lease processing"
      ],
      result: "Get high-quality tenants in record time with minimal vacancy loss."
    },
    {
      icon: CreditCard,
      title: "Rent Collection & Financial Management",
      features: [
        "Automated Online Rent Collection",
        "Real-Time Financial Reporting",
        "Late Payment Enforcement",
        "Direct Deposit"
      ],
      result: "100% transparency & steady cash flow—without lifting a finger."
    },
    {
      icon: Wrench,
      title: "Full-Service Maintenance & Repairs",
      features: [
        "24/7 Emergency Repairs",
        "Routine Inspections & Preventative Maintenance",
        "Vetted Vendors & Cost-Effective Solutions"
      ],
      result: "Happier tenants, lower repair costs, & properties that stay in top shape."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Background Image */}
      <div 
        className="relative h-[600px] bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('/lovable-uploads/f67cd192-d8e7-4a2f-a972-9ecc209615dd.png')",
          backgroundBlendMode: "overlay",
          backgroundColor: "rgba(0,0,0,0.5)"
        }}
      >
        {/* Logo */}
        <div className="absolute top-4 left-4 z-20">
          <img 
            src="/lovable-uploads/40096a48-9069-46bc-9f6f-b4957de0ef74.png" 
            alt="Shi Shi Kokoro Property Management" 
            className="h-16 w-auto"
          />
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-5xl font-bold mb-6 animate-fade-in">
            Property Management That Works for You
          </h1>
          <p className="text-xl mb-8 max-w-2xl animate-fade-in">
            Maximizing Property Value | Elevating Tenant Experience | Hassle-Free Management
          </p>
          <div className="animate-fade-in">
            <Button 
              onClick={() => window.location.href = "/?scrollTo=contact"}
              className="bg-[#ff9500] hover:bg-[#ff8500] text-white px-8 py-6 text-lg rounded-full"
            >
              Contact Now
            </Button>
          </div>
        </div>
      </div>

      {/* Main Services Grid */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#1a4f7c] mb-4">Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We don't just manage properties—we optimize them for maximum profitability while creating 
            communities where tenants want to stay long-term.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mainServices.map((service, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <div className="w-16 h-16 mx-auto rounded-full bg-[#ff9500]/10 flex items-center justify-center group-hover:bg-[#ff9500] transition-colors duration-300">
                    <service.icon className="h-8 w-8 text-[#ff9500] group-hover:text-white transition-colors duration-300" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-[#1a4f7c] mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <Button 
                  variant="ghost"
                  className="group-hover:text-[#ff9500] transition-colors duration-300"
                >
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Detailed Services Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {detailedServices.map((service, index) => (
              <Card key={index} className={cn(
                "group hover:shadow-lg transition-all duration-300",
                index === 0 && "lg:col-span-3"
              )}>
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-[#ff9500]/10 flex items-center justify-center group-hover:bg-[#ff9500] transition-colors duration-300">
                      <service.icon className="h-6 w-6 text-[#ff9500] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="text-2xl font-semibold text-[#1a4f7c]">{service.title}</h3>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center gap-2 text-[#1a4f7c]">
                    <Trophy className="h-5 w-5" />
                    <p className="font-medium">{service.result}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="relative py-20 bg-[#1a4f7c] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="text-5xl font-serif mb-6">"</div>
          <p className="text-xl mb-6 italic">
            Shi Shi Kokoro Property Management has transformed how I manage my rental properties. 
            Their professionalism and efficiency have maximized my returns while minimizing my stress.
          </p>
          <p className="font-semibold">- Satisfied Property Owner</p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-[#1a4f7c] mb-6">Ready to Elevate Your Property Management?</h2>
          <Button 
            onClick={() => window.location.href = "/?scrollTo=contact"}
            className="bg-[#ff9500] hover:bg-[#ff8500] text-white px-8 py-6 text-lg rounded-full"
          >
            Get Started Today
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Services;
