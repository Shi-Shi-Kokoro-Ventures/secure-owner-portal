
import React from "react";
import { ServiceHeader } from "@/components/services/ServiceHeader";
import { ServiceCard } from "@/components/services/ServiceCard";
import { Bed, Home, Wrench } from "lucide-react";

const Services = () => {
  const services = [
    {
      title: "Short Term Rentals",
      description: "Flexible, fully-furnished accommodations perfect for temporary stays, vacations, or business trips. Experience comfort and convenience in prime locations.",
      icon: Bed,
      image: "/lovable-uploads/744f84b5-867e-48b9-a7e8-bb1c342ac29e.png"
    },
    {
      title: "Long Term Rentals",
      description: "Secure, long-term housing solutions with professional property management. Find your perfect home with our extensive portfolio of quality properties.",
      icon: Home,
      image: "/lovable-uploads/827fcd71-4f61-45be-9958-b406fdb49719.png"
    },
    {
      title: "Property Maintenance",
      description: "Comprehensive maintenance services to keep your property in pristine condition. From routine upkeep to emergency repairs, we've got you covered.",
      icon: Wrench,
      image: "/lovable-uploads/147caf5a-ef6d-4b52-a1d8-80df8bb6f75b.png"
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
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-[#1a4f7c] mb-4">Our Services</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive property management solutions designed to meet your needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <service.icon className="h-6 w-6 text-[#1a4f7c]" />
                    <h3 className="text-2xl font-semibold text-[#1a4f7c]">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-lg">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <a 
              href="/?scrollTo=contact" 
              className="inline-block bg-[#1a4f7c] text-white px-8 py-3 rounded-lg hover:bg-[#153f63] transition-colors duration-200"
            >
              Contact Us
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Services;
