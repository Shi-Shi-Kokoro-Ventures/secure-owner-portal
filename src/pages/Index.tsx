import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client"; 
import { 
  Building2, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  Heart, 
  Home, 
  Mail, 
  MapPin, 
  Phone, 
  Star, 
  Users,
  FileText,
  Wrench,
  Shield,
  ArrowRight,
  Loader2 
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

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

  const handleConsultationClick = () => {
    console.log("Booking consultation");
  };

  const handleLearnMoreClick = () => {
    navigate("/services");
  };

  const handleTenantLoginClick = () => {
    navigate("/login");
  };

  const handleTenantServicesClick = () => {
    navigate("/tenant-services");
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter an email address",
        variant: "destructive",
      });
      return;
    }

    setIsSubscribing(true);
    try {
      // Check for existing subscription
      const { data: existingSubscription, error: fetchError } = await supabase
        .from('newsletter_subscriptions')
        .select('*')
        .eq('email', email)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError;
      }

      if (existingSubscription) {
        if (existingSubscription.status === 'active') {
          toast({
            title: "Already Subscribed",
            description: "This email is already subscribed to our newsletter",
            variant: "default",
          });
        } else {
          // Reactivate unsubscribed email
          const { error: updateError } = await supabase
            .from('newsletter_subscriptions')
            .update({ status: 'active' })
            .eq('email', email);

          if (updateError) throw updateError;

          toast({
            title: "Welcome Back!",
            description: "Your newsletter subscription has been reactivated",
          });
        }
      } else {
        // New subscription
        const { error: insertError } = await supabase
          .from('newsletter_subscriptions')
          .insert([{ email }]);

        if (insertError) throw insertError;

        toast({
          title: "Success!",
          description: "Thank you for subscribing to our newsletter",
        });
      }
      setEmail("");
    } catch (error) {
      console.error('Subscription error:', error);
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubscribing(false);
    }
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
      
      <section id="services" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">Our Services</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-6 flex items-center">
                <Building2 className="mr-2 text-primary" />
                For Property Owners
              </h3>
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <ul className="space-y-4">
                      <li className="flex items-center">
                        <Home className="w-5 h-5 text-primary mr-2" />
                        <span>Full-Service Property Management</span>
                      </li>
                      <li className="flex items-center">
                        <FileText className="w-5 h-5 text-primary mr-2" />
                        <span>Tenant Screening & Lease Management</span>
                      </li>
                      <li className="flex items-center">
                        <DollarSign className="w-5 h-5 text-primary mr-2" />
                        <span>Rent Collection & Financial Reporting</span>
                      </li>
                      <li className="flex items-center">
                        <Wrench className="w-5 h-5 text-primary mr-2" />
                        <span>Maintenance & Repairs Coordination</span>
                      </li>
                      <li className="flex items-center">
                        <Shield className="w-5 h-5 text-primary mr-2" />
                        <span>Evictions & Legal Compliance</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-6 flex items-center">
                <Users className="mr-2 text-primary" />
                For Tenants
              </h3>
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <ul className="space-y-4">
                      <li className="flex items-center">
                        <FileText className="w-5 h-5 text-primary mr-2" />
                        <span>Easy Online Rental Applications</span>
                      </li>
                      <li className="flex items-center">
                        <Home className="w-5 h-5 text-primary mr-2" />
                        <span>Well-Maintained Properties</span>
                      </li>
                      <li className="flex items-center">
                        <Star className="w-5 h-5 text-primary mr-2" />
                        <span>Tenant Rewards Program</span>
                      </li>
                      <li className="flex items-center">
                        <Phone className="w-5 h-5 text-primary mr-2" />
                        <span>24/7 Maintenance Support</span>
                      </li>
                      <li className="flex items-center">
                        <Mail className="w-5 h-5 text-primary mr-2" />
                        <span>Dedicated Communication Portal</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                <Button 
                  className="w-full group"
                  onClick={handleTenantLoginClick}
                >
                  Tenant Login
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

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

      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-8">Contact Us</h2>
              <div className="space-y-6">
                <div className="flex items-center">
                  <MapPin className="w-6 h-6 text-primary mr-4" />
                  <div>
                    <h3 className="font-semibold">Our Locations</h3>
                    <p>Pennsylvania (HQ), Georgia, Delaware, Maryland, Arizona</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="w-6 h-6 text-primary mr-4" />
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p>(555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="w-6 h-6 text-primary mr-4" />
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p>contact@shishikokoro.com</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-6">Get in Touch</h3>
              <form className="space-y-4">
                <Input placeholder="Your Name" />
                <Input type="email" placeholder="Your Email" />
                <Input placeholder="Phone Number" />
                <textarea 
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  rows={4}
                  placeholder="Message"
                />
                <Button className="w-full">Send Message</Button>
              </form>
            </div>
          </div>
        </div>
      </section>

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
              <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
              <p className="mb-4">Subscribe to get property management tips & market updates</p>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <Input 
                  placeholder="Your Email" 
                  className="bg-white" 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubscribing}
                />
                <Button type="submit" disabled={isSubscribing}>
                  {isSubscribing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Subscribing...
                    </>
                  ) : (
                    'Subscribe'
                  )}
                </Button>
              </form>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p>&copy; 2024 Shi Shi Kokoro Property Management. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
