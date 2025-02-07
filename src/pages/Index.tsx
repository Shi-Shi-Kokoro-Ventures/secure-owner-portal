
import React, { useEffect, useState } from "react";
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

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center space-x-4">
              <img 
                src="/lovable-uploads/40096a48-9069-46bc-9f6f-b4957de0ef74.png" 
                alt="Shi Shi Kokoro Property Management" 
                className="h-16 w-auto object-contain transition-transform hover:scale-105"
              />
              <div className="flex flex-col">
                <span className={`text-2xl font-bold ${isScrolled ? 'text-[#1a4f7c]' : 'text-white'}`}>
                  Shi Shi Kokoro
                </span>
                <span className={`text-sm ${isScrolled ? 'text-gray-600' : 'text-white/80'}`}>
                  Property Management
                </span>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a 
                href="#about" 
                className={`transition-colors duration-200 hover:text-[#1a4f7c] ${
                  isScrolled ? 'text-gray-600' : 'text-white'
                }`}
              >
                About Us
              </a>
              <a 
                href="/services" 
                className={`transition-colors duration-200 hover:text-[#1a4f7c] ${
                  isScrolled ? 'text-gray-600' : 'text-white'
                }`}
              >
                Services
              </a>
              <a 
                href="#locations" 
                className={`transition-colors duration-200 hover:text-[#1a4f7c] ${
                  isScrolled ? 'text-gray-600' : 'text-white'
                }`}
              >
                Locations
              </a>
              <a 
                href="#contact" 
                className={`transition-colors duration-200 hover:text-[#1a4f7c] ${
                  isScrolled ? 'text-gray-600' : 'text-white'
                }`}
              >
                Contact
              </a>
              <Button 
                onClick={handleLoginClick} 
                className={`${
                  isScrolled 
                    ? 'bg-[#1a4f7c] hover:bg-[#153f63] text-white' 
                    : 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm'
                } transition-all duration-200`}
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
                className={isScrolled ? 'text-gray-600' : 'text-white'}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden absolute top-20 left-0 right-0 bg-white shadow-lg py-4 px-4 space-y-4 animate-fade-in">
              <a href="#about" className="block text-gray-600 hover:text-[#1a4f7c] py-2">About Us</a>
              <a href="/services" className="block text-gray-600 hover:text-[#1a4f7c] py-2">Services</a>
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
