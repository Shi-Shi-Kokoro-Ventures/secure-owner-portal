
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
  Target
} from "lucide-react";

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
    },
    {
      icon: Wrench,
      title: "Hassle-Free Maintenance",
      description: "24/7 emergency response + vetted contractors."
    },
    {
      icon: ShieldCheck,
      title: "Legal Compliance",
      description: "Protecting owners from liability and risk."
    },
    {
      icon: Target,
      title: "Tailored Strategies",
      description: "Custom solutions for short-term & long-term rentals."
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
    },
    {
      icon: FileText,
      title: "Lease Management & Compliance",
      features: [
        "Legally Compliant Leases",
        "Evictions & Legal Support",
        "Tenant Retention & Lease Renewals"
      ],
      result: "Stay protected, reduce turnover, and keep your properties profitable."
    }
  ];

  const specializedServices = [
    {
      icon: Home,
      title: "Short-Term & Airbnb Management",
      features: [
        "Dynamic Pricing Strategies",
        "Guest Screening & 24/7 Support",
        "Turnover & Cleaning Management"
      ],
      result: "Boost earnings with short-term rentals, hassle-free."
    },
    {
      icon: TrendingUp,
      title: "Investor & Portfolio Growth Consulting",
      features: [
        "Market Analysis & Property Acquisition Advice",
        "DSCR & Creative Financing Strategies",
        "Scaling Support for Multi-Unit Rentals"
      ],
      result: "Expand your portfolio strategically & profitably."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 w-full bg-white shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <a href="/" className="flex items-center space-x-4">
              <img 
                src="/lovable-uploads/40096a48-9069-46bc-9f6f-b4957de0ef74.png" 
                alt="Shi Shi Kokoro Property Management" 
                className="h-16 w-auto object-contain transition-transform hover:scale-105"
              />
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-[#1a4f7c]">Shi Shi Kokoro</span>
                <span className="text-sm text-gray-600">Property Management</span>
              </div>
            </a>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-[#1a4f7c] mb-4">Property Management That Works for You</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Maximizing Property Value | Elevating Tenant Experience | Hassle-Free Management
            </p>
          </div>

          {/* Why Choose Us Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {mainServices.map((service, index) => (
              <Card key={index} className="transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <service.icon className="h-6 w-6 text-[#1a4f7c]" />
                    <h3 className="text-xl font-semibold text-[#1a4f7c]">{service.title}</h3>
                  </div>
                  <p className="text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Detailed Services */}
          <div className="space-y-12 mb-16">
            <h2 className="text-3xl font-bold text-center text-[#1a4f7c] mb-8">Our Services</h2>
            {detailedServices.map((service, index) => (
              <Card key={index} className="transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <service.icon className="h-8 w-8 text-[#1a4f7c]" />
                    <h3 className="text-2xl font-semibold text-[#1a4f7c]">{service.title}</h3>
                  </div>
                  <ul className="space-y-3 mb-4">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex items-center gap-2 text-[#1a4f7c]">
                    <Trophy className="h-5 w-5" />
                    <p className="font-medium">{service.result}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Specialized Services */}
          <div className="space-y-8 mb-16">
            <h2 className="text-3xl font-bold text-center text-[#1a4f7c] mb-8">Specialized Services</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {specializedServices.map((service, index) => (
                <Card key={index} className="transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <service.icon className="h-8 w-8 text-[#1a4f7c]" />
                      <h3 className="text-2xl font-semibold text-[#1a4f7c]">{service.title}</h3>
                    </div>
                    <ul className="space-y-3 mb-4">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 flex items-center gap-2 text-[#1a4f7c]">
                      <Trophy className="h-5 w-5" />
                      <p className="font-medium">{service.result}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Kokoro Perks */}
          <div className="mb-16">
            <Card className="transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Trophy className="h-8 w-8 text-[#1a4f7c]" />
                  <h3 className="text-2xl font-semibold text-[#1a4f7c]">Kokoro Perks Tenant Rewards Program</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  We don't just manage properties; we create communities where tenants want to stay long-term.
                  Kokoro Perks rewards responsible tenants for:
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-green-500" />
                    <span className="text-gray-600">Paying rent on time</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <span className="text-gray-600">Keeping their unit clean</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-green-500" />
                    <span className="text-gray-600">Renewing their lease</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-green-500" />
                    <span className="text-gray-600">Referring new tenants</span>
                  </li>
                </ul>
                <p className="text-[#1a4f7c] font-medium">
                  🏆 Rewards Include: Rent discounts, priority parking, free cleaning services, and more!
                </p>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#1a4f7c] mb-6">Ready to Take Your Property to the Next Level?</h2>
            <div className="space-y-4">
              <Button 
                onClick={() => window.location.href = "/?scrollTo=contact"}
                className="bg-[#1a4f7c] hover:bg-[#153f63] text-white px-8 py-3"
              >
                Contact Us Now
              </Button>
              <p className="text-gray-600">
                Where Real Estate Meets Real Results
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Services;
