import { Card, CardContent } from "@/components/ui/card";
import { Building2, Users, Clock, Star } from "lucide-react";

export const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">About Us</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Founded in 2020, Shi Shi Kokoro Property Management helps property owners manage their 
            investments while ensuring tenants feel safe, secure, and comfortable in a place they can call home.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: Building2,
              title: "Automated Property Management",
              description: "We handle everything from rent collection to maintenance."
            },
            {
              icon: Users,
              title: "Tenant-Centric Approach",
              description: "We prioritize tenant satisfaction, reducing vacancy rates."
            },
            {
              icon: Clock,
              title: "Advanced Technology",
              description: "Our platform provides real-time property insights and automated processes."
            },
            {
              icon: Star,
              title: "Experienced Team",
              description: "Licensed real estate professionals with 5+ years of experience."
            }
          ].map((feature, index) => (
            <Card key={index} className="border-none shadow-lg">
              <CardContent className="pt-6 text-center">
                <feature.icon className="w-12 h-12 mx-auto text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};