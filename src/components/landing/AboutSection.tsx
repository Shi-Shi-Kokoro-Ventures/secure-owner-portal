
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Users, Clock, Star } from "lucide-react";

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#1a4f7c] mb-6">About Shi Shi Kokoro</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Founded on principles of excellence and innovation, we deliver unparalleled property 
            management services that blend traditional values with modern solutions.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: Building2,
              title: "Property Excellence",
              description: "Expert management solutions for your real estate investments"
            },
            {
              icon: Users,
              title: "Client-First Approach",
              description: "Dedicated to exceeding client expectations every day"
            },
            {
              icon: Clock,
              title: "Timely Service",
              description: "Fast response times and efficient problem resolution"
            },
            {
              icon: Star,
              title: "Quality Assured",
              description: "Maintaining the highest standards in property management"
            }
          ].map((feature, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="pt-6 text-center">
                <feature.icon className="w-12 h-12 mx-auto text-[#1a4f7c] mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-20 bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2 items-center">
            <div className="p-12">
              <h3 className="text-3xl font-bold text-[#1a4f7c] mb-6">Our Mission</h3>
              <p className="text-gray-600 mb-6">
                To provide exceptional property management services that create value for property owners 
                while ensuring comfortable and well-maintained homes for tenants.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center text-gray-600">
                  <Star className="w-5 h-5 text-[#1a4f7c] mr-2" />
                  Professional management services
                </li>
                <li className="flex items-center text-gray-600">
                  <Star className="w-5 h-5 text-[#1a4f7c] mr-2" />
                  Transparent communication
                </li>
                <li className="flex items-center text-gray-600">
                  <Star className="w-5 h-5 text-[#1a4f7c] mr-2" />
                  Innovation in property solutions
                </li>
              </ul>
            </div>
            <div className="h-full">
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3"
                alt="Office interior" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
