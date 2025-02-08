
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AtSign, Key, User, Phone, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { UserRole } from "@/types/user";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    role: "tenant" as UserRole,
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            phone: formData.phone,
            role: formData.role,
          },
        },
      });

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Please check your email to confirm your account.",
      });

      // Navigate to login after successful signup
      navigate("/login");
    } catch (error: any) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleRoleChange = (value: UserRole) => {
    setFormData((prev) => ({
      ...prev,
      role: value,
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-pink-300 to-purple-500 p-4">
      <div className="w-full max-w-4xl h-[800px] bg-gradient-to-r from-purple-300/20 to-pink-300/20 backdrop-blur-xl rounded-3xl shadow-2xl flex overflow-hidden">
        {/* Left side - 3D illustration */}
        <div className="relative hidden lg:block w-1/2">
          <img 
            src="/lovable-uploads/d793c034-9fa4-46a8-a72a-1f53f7440e0c.png"
            alt="Background decoration"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent" />
        </div>

        {/* Right side - Signup form */}
        <div className="w-full lg:w-1/2 p-8 bg-[#1A1F2C]/95 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full space-y-8">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <div className="w-32 h-32 relative">
                <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-400 rounded flex items-center justify-center overflow-hidden">
                  <img 
                    src="/lovable-uploads/40334d61-cc63-4970-bdb9-d08d169244d0.png" 
                    alt="Property Management Logo" 
                    className="w-full h-full object-contain p-2"
                  />
                </div>
              </div>
            </div>

            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
              <p className="text-gray-400 text-sm">
                Please fill in your information below
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div className="space-y-4">
                {/* First Name */}
                <div>
                  <Label htmlFor="firstName" className="sr-only">
                    First Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="firstName"
                      placeholder="First Name"
                      className="pl-10 bg-transparent border-gray-700 text-white focus:ring-purple-500 focus:border-purple-500"
                      value={formData.firstName}
                      onChange={handleInputChange("firstName")}
                      required
                    />
                  </div>
                </div>

                {/* Last Name */}
                <div>
                  <Label htmlFor="lastName" className="sr-only">
                    Last Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="lastName"
                      placeholder="Last Name"
                      className="pl-10 bg-transparent border-gray-700 text-white focus:ring-purple-500 focus:border-purple-500"
                      value={formData.lastName}
                      onChange={handleInputChange("lastName")}
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <Label htmlFor="email" className="sr-only">
                    Email address
                  </Label>
                  <div className="relative">
                    <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Email Address"
                      className="pl-10 bg-transparent border-gray-700 text-white focus:ring-purple-500 focus:border-purple-500"
                      value={formData.email}
                      onChange={handleInputChange("email")}
                      required
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <Label htmlFor="phone" className="sr-only">
                    Phone Number
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Phone Number"
                      className="pl-10 bg-transparent border-gray-700 text-white focus:ring-purple-500 focus:border-purple-500"
                      value={formData.phone}
                      onChange={handleInputChange("phone")}
                      required
                    />
                  </div>
                </div>

                {/* Role Selection */}
                <div>
                  <Label htmlFor="role" className="sr-only">
                    Role
                  </Label>
                  <Select value={formData.role} onValueChange={handleRoleChange}>
                    <SelectTrigger className="w-full bg-transparent border-gray-700 text-white focus:ring-purple-500 focus:border-purple-500">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tenant">Tenant</SelectItem>
                      <SelectItem value="property_manager">Property Manager</SelectItem>
                      <SelectItem value="owner">Owner</SelectItem>
                      <SelectItem value="vendor">Vendor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Password */}
                <div>
                  <Label htmlFor="password" className="sr-only">
                    Password
                  </Label>
                  <div className="relative">
                    <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Password"
                      className="pl-10 bg-transparent border-gray-700 text-white focus:ring-purple-500 focus:border-purple-500"
                      value={formData.password}
                      onChange={handleInputChange("password")}
                      required
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white py-3 rounded-lg transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  'Sign up'
                )}
              </Button>

              <p className="text-center text-gray-400 text-sm">
                Already have an account?{" "}
                <button
                  onClick={() => navigate("/login")}
                  className="text-purple-400 hover:text-purple-300 font-medium"
                >
                  Sign in
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
