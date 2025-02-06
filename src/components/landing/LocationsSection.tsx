import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const LocationsSection = () => {
  const navigate = useNavigate();

  return (
    <section id="locations" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">Our Locations</h2>
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
          {[
            { city: "Pennsylvania", subtitle: "Headquarters", address: "123 Main St, Philadelphia" },
            { city: "Georgia", subtitle: "Southeast Office", address: "456 Peach Ave, Atlanta" },
            { city: "Delaware", subtitle: "Northeast Office", address: "789 State St, Dover" },
            { city: "Maryland", subtitle: "Mid-Atlantic Office", address: "321 Bay View Dr, Baltimore" },
            { city: "Arizona", subtitle: "Southwest Office", address: "654 Desert Rd, Phoenix" }
          ].map((location, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6 text-center">
                <MapPin className="w-8 h-8 mx-auto text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">{location.city}</h3>
                <p className="text-sm text-gray-600 mb-2">{location.subtitle}</p>
                <p className="text-sm text-gray-500">{location.address}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button 
            variant="outline"
            onClick={() => navigate("/contact")}
            className="inline-flex items-center"
          >
            <Phone className="w-4 h-4 mr-2" />
            Contact Your Local Office
          </Button>
        </div>
      </div>
    </section>
  );
};