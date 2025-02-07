
import { Bed, Home, Wrench } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const WhatWeOfferSection = () => {
  const services = [
    {
      title: "Short Term Rentals",
      description: "Flexible, fully-furnished accommodations perfect for temporary stays, vacations, or business trips. Experience comfort and convenience in prime locations.",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
      icon: Bed
    },
    {
      title: "Long Term Rentals",
      description: "Secure, long-term housing solutions with professional property management. Find your perfect home with our extensive portfolio of quality properties.",
      image: "https://images.unsplash.com/photo-1524230572899-a752b3835840",
      icon: Home
    },
    {
      title: "Property Maintenance",
      description: "Comprehensive maintenance services to keep your property in pristine condition. From routine upkeep to emergency repairs, we've got you covered.",
      image: "https://images.unsplash.com/photo-1486718448742-163732cd1544",
      icon: Wrench
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-primary-600 font-serif">
          What We Offer
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <img
                  src={service.image}
                  alt={service.title}
                  className="object-cover w-full h-full rounded-t-lg"
                />
              </div>
              <CardContent className="bg-white p-6 rounded-b-lg">
                <div className="flex items-center gap-2 mb-3">
                  <service.icon className="h-6 w-6 text-primary-500" />
                  <h3 className="text-2xl font-semibold text-primary-700">
                    {service.title}
                  </h3>
                </div>
                <p className="text-gray-600 text-lg">
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
