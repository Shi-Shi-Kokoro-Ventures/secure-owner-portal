
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
import { WhatWeOfferSection } from "@/components/landing/WhatWeOfferSection";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
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
                <span className="text-2xl font-bold text-[#1a4f7c]">Shi Shi Kokoro</span>
                <span className="text-sm text-gray-600">Property Management</span>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#about" className="text-gray-600 hover:text-[#1a4f7c] transition-colors duration-200">About Us</a>
              <a href="#services" className="text-gray-600 hover:text-[#1a4f7c] transition-colors duration-200">Services</a>
              <a href="#locations" className="text-gray-600 hover:text-[#1a4f7c] transition-colors duration-200">Locations</a>
              <a href="#contact" className="text-gray-600 hover:text-[#1a4f7c] transition-colors duration-200">Contact</a>
              <Button 
                onClick={handleLoginClick} 
                className="bg-[#1a4f7c] hover:bg-[#153f63] text-white transition-colors duration-200"
              >
                Login
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-600"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden absolute top-20 left-0 right-0 bg-white shadow-lg py-4 px-4 space-y-4">
              <a href="#about" className="block text-gray-600 hover:text-[#1a4f7c] py-2">About Us</a>
              <a href="#services" className="block text-gray-600 hover:text-[#1a4f7c] py-2">Services</a>
              <a href="#locations" className="block text-gray-600 hover:text-[#1a4f7c] py-2">Locations</a>
              <a href="#contact" className="block text-gray-600 hover:text-[#1a4f7c] py-2">Contact</a>
              <Button 
                onClick={handleLoginClick} 
                className="w-full bg-[#1a4f7c] hover:bg-[#153f63] text-white"
              >
                Login
              </Button>
            </div>
          )}
        </div>
      </nav>
      
      <Hero />
      <AboutSection />
      <WhatWeOfferSection />
      <ServicesSection />
      <LocationsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
