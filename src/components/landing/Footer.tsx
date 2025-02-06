import { Link, useNavigate } from "react-router-dom";
import { NewsletterSection } from "./NewsletterSection";

export const Footer = () => {
  const navigate = useNavigate();
  
  const handleTenantServicesClick = () => {
    navigate("/tenant-services");
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-primary">Home</a></li>
              <li><a href="#about" className="hover:text-primary">About Us</a></li>
              <li><a href="#services" className="hover:text-primary">Services</a></li>
              <li><a href="#contact" className="hover:text-primary">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-primary">Property Management</a></li>
              <li>
                <button 
                  onClick={handleTenantServicesClick}
                  className="hover:text-primary"
                >
                  Tenant Services
                </button>
              </li>
              <li><a href="#" className="hover:text-primary">Maintenance</a></li>
              <li><a href="#" className="hover:text-primary">Investment Consulting</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Locations</h3>
            <ul className="space-y-2">
              <li>Pennsylvania (HQ)</li>
              <li>Georgia</li>
              <li>Delaware</li>
              <li>Maryland</li>
              <li>Arizona</li>
            </ul>
          </div>
          <div>
            <NewsletterSection />
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p>&copy; 2024 Shi Shi Kokoro Property Management. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};