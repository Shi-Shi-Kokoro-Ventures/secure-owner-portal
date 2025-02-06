import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const { toast } = useToast();

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
        .from('newsletter_subscribers')
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
            .from('newsletter_subscribers')
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
          .from('newsletter_subscribers')
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
  );
};