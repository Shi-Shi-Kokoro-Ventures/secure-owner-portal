
import { Bed, Home, Wrench } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const WhatWeOfferSection = () => {
  const services = [
    {
      title: "Short Term Rentals",
      description: "Flexible, fully-furnished accommodations perfect for temporary stays, vacations, or business trips. Experience comfort and convenience in prime locations.",
      image: "/lovable-uploads/a72ba9ea-6976-4c72-94fc-b367080b8734-1.png",
      icon: Bed
    },
    {
      title: "Long Term Rentals",
      description: "Secure, long-term housing solutions with professional property management. Find your perfect home with our extensive portfolio of quality properties.",
      image: "/lovable-uploads/a72ba9ea-6976-4c72-94fc-b367080b8734-2.png",
      icon: Home
    },
    {
      title: "Property Maintenance",
      description: "Comprehensive maintenance services to keep your property in pristine condition. From routine upkeep to emergency repairs, we've got you covered.",
      image: "/lovable-uploads/a72ba9ea-6976-4c72-94fc-b367080b8734-3.png",
      icon: Wrench
    }
  ];

  return (
    <section className="py-20 bg-[#1A1F2C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-[#F5D089] font-serif italic">
          What We Offer
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="overflow-hidden bg-transparent border-none">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <img
                  src={service.image}
                  alt={service.title}
                  className="object-cover w-full h-full rounded-lg"
                />
              </div>
              <CardContent className="bg-[#F5D089] p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <service.icon className="h-6 w-6 text-[#1A1F2C]" />
                  <h3 className="text-2xl font-semibold text-[#1A1F2C]">
                    {service.title}
                  </h3>
                </div>
                <p className="text-[#1A1F2C]/80 text-lg">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
