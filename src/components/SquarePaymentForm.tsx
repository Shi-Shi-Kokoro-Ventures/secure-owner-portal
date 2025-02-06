import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Info, CreditCard, Clock } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { supabase } from "@/integrations/supabase/client";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

const PaymentForm = ({ amount = 1200, leaseId = "", onSuccess }: { 
  amount: number;
  leaseId: string;
  onSuccess?: () => void;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [enableAutoPay, setEnableAutoPay] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements) return;
    
    setIsLoading(true);
    
    try {
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-confirmation`,
          payment_method_data: {
            metadata: {
              lease_id: leaseId,
              auto_pay_enabled: enableAutoPay ? 'true' : 'false'
            }
          } as any // Type assertion needed due to Stripe types limitation
        },
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

      toast({
        title: "Payment Successful",
        description: "Your payment has been processed successfully.",
      });

      if (onSuccess) {
        onSuccess();
      }
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
      
      <div className="flex items-center space-x-2">
        <Switch
          id="autopay"
          checked={enableAutoPay}
          onCheckedChange={setEnableAutoPay}
        />
        <Label htmlFor="autopay">Enable AutoPay for future rent payments</Label>
      </div>

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

export function StripePaymentForm({ amount = 1200, leaseId = "", onSuccess }: { 
  amount?: number;
  leaseId?: string;
  onSuccess?: () => void;
}) {
  const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('stripe-payment', {
          body: { amount, leaseId },
        });

        if (error) {
          throw error;
        }

        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error('Error creating payment intent:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to initialize payment. Please try again.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    createPaymentIntent();
  }, [amount, leaseId, toast]);

  if (isLoading) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="pt-6">
          <div className="flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </CardContent>
      </Card>
    );
  }

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
            <PaymentForm amount={amount} leaseId={leaseId} onSuccess={onSuccess} />
          </Elements>
        )}
      </CardContent>
    </Card>
  );
}