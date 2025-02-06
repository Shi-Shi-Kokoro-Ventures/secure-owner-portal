import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();

  const handleConsultationClick = () => {
    console.log("Booking consultation");
  };

  const handleLearnMoreClick = () => {
    navigate("/services");
  };

  return (
    <div className="relative pt-16">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70 z-10" />
      <div 
        className="relative h-[600px] bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1487958449943-2429e8be8625')" }}
      >
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Stress-Free Property Management.<br />
              Maximizing Your Rental Income.
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              At Shi Shi Kokoro Property Management, we provide expert property management services 
              designed to maximize ROI and keep tenants happy.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                size="lg" 
                onClick={handleConsultationClick}
                className="bg-white text-primary hover:bg-gray-100"
              >
                Schedule a Free Consultation
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={handleLearnMoreClick}
                className="border-white text-white hover:bg-white/10"
              >
                Learn More About Our Services
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};