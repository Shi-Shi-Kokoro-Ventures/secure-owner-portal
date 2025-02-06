import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Hero } from "@/components/landing/Hero";
import { AboutSection } from "@/components/landing/AboutSection";
import { ServicesSection } from "@/components/landing/ServicesSection";
import { LocationsSection } from "@/components/landing/LocationsSection";
import { ContactSection } from "@/components/landing/ContactSection";
import { Footer } from "@/components/landing/Footer";

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    // Handle scrollTo parameter
    const params = new URLSearchParams(location.search);
    const scrollTo = params.get('scrollTo');
    if (scrollTo === 'contact') {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 w-full bg-white shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center space-x-4">
              <img 
                src="/lovable-uploads/40096a48-9069-46bc-9f6f-b4957de0ef74.png" 
                alt="Shi Shi Kokoro Property Management" 
                className="h-16 w-auto object-contain transition-transform hover:scale-105"
              />
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-primary">Shi Shi Kokoro</span>
                <span className="text-sm text-gray-600">Property Management</span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#about" className="text-gray-600 hover:text-primary transition-colors duration-200">About Us</a>
              <a href="#services" className="text-gray-600 hover:text-primary transition-colors duration-200">Services</a>
              <a href="#locations" className="text-gray-600 hover:text-primary transition-colors duration-200">Locations</a>
              <a href="#contact" className="text-gray-600 hover:text-primary transition-colors duration-200">Contact</a>
              <Button 
                onClick={handleLoginClick} 
                variant="outline"
                className="font-semibold hover:bg-primary hover:text-white transition-colors duration-200"
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      </nav>
      
      <Hero />
      <AboutSection />
      <ServicesSection />
      <LocationsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;