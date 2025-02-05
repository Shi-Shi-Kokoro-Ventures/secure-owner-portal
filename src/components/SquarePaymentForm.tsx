
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Info, CreditCard } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { supabase } from "@/integrations/supabase/client";

const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY || '');

const PaymentForm = ({ amount = 1200, leaseId = "" }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements) return;
    
    setIsLoading(true);
    
    try {
      // Use confirmPayment instead of createPaymentMethod
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-confirmation`,
        },
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

      toast({
        title: "Payment Successful",
        description: "Your payment has been processed successfully.",
      });
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        variant: "destructive",
        title: "Payment Failed",
        description: error instanceof Error ? error.message : "An error occurred during payment",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      <Button
        type="submit"
        disabled={!stripe || isLoading}
        className="w-full"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <CreditCard className="mr-2 h-4 w-4" />
            Pay ${amount / 100}
          </>
        )}
      </Button>
    </form>
  );
};

export function StripePaymentForm() {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const createPaymentIntent = async () => {
      const { data, error } = await supabase.functions.invoke('stripe-payment', {
        body: { amount: 1200, mode: 'setup' },
      });

      if (error) {
        console.error('Error creating payment intent:', error);
        return;
      }

      setClientSecret(data.clientSecret);
    };

    createPaymentIntent();
  }, []);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Make a Payment</CardTitle>
        <CardDescription>
          Enter your card details to process the payment securely
        </CardDescription>
        <div className="mt-2 p-2 bg-blue-50 rounded-md">
          <div className="flex items-center gap-2 text-sm text-blue-700">
            <Info className="h-4 w-4" />
            <span>Test Mode Active - Use test card numbers</span>
          </div>
          <div className="mt-2 text-sm text-blue-600 space-y-1">
            <p>Test card: 4242 4242 4242 4242</p>
            <p>Expiry: Any future date</p>
            <p>CVC: Any 3 digits</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {clientSecret && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <PaymentForm />
          </Elements>
        )}
      </CardContent>
    </Card>
  );
}
