
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  const navigate = useNavigate();

  const handleConsultationClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLearnMoreClick = () => {
    navigate("/services");
  };

  return (
    <div className="relative pt-16">
      <div className="absolute inset-0 bg-gradient-to-r from-[#1a4f7c]/90 to-[#1a4f7c]/70 z-10" />
      <div 
        className="relative h-[700px] bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3')" }}
      >
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center text-white px-4 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in">
              Elevating Property Management<br />
              to an Art Form
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90 animate-fade-in delay-100">
              Experience the perfect blend of traditional values and modern innovation
              in property management with Shi Shi Kokoro.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in delay-200">
              <Button 
                size="lg" 
                onClick={handleConsultationClick}
                className="bg-white text-[#1a4f7c] hover:bg-gray-100 font-semibold text-lg group"
              >
                Free Consultation
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={handleLearnMoreClick}
                className="bg-white/20 border-white text-white hover:bg-white/30 font-semibold text-lg"
              >
                View Available Properties
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Hero Features */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm py-6 z-30">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-[#1a4f7c] mb-2">Professional Service</h3>
            <p className="text-gray-600">Expert property management solutions</p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold text-[#1a4f7c] mb-2">24/7 Support</h3>
            <p className="text-gray-600">Always here when you need us</p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold text-[#1a4f7c] mb-2">Innovative Solutions</h3>
            <p className="text-gray-600">Modern technology meets traditional values</p>
          </div>
        </div>
      </div>
    </div>
  );
};

