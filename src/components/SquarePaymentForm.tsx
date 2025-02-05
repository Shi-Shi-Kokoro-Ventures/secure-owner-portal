import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Info } from "lucide-react";
import { testPaymentMethods } from "@/utils/testParameters";

declare global {
  interface Window {
    Square: any;
  }
}

export function SquarePaymentForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentInstance, setPaymentInstance] = useState<any>(null);
  const [card, setCard] = useState<any>(null);
  const [isTestMode, setIsTestMode] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sandbox.web.squarecdn.com/v1/square.js";
    script.type = "text/javascript";
    script.async = true;
    script.onload = initializeSquare;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const initializeSquare = async () => {
    if (!window.Square) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load Square payment system",
      });
      return;
    }

    try {
      const payments = window.Square.payments("sandbox-sq0idb-SANDBOX-APP-ID", "SANDBOX-LOCATION-ID");
      setPaymentInstance(payments);

      const cardInstance = await payments.card();
      await cardInstance.attach("#card-container");
      setCard(cardInstance);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to initialize payment form",
      });
      console.error("Square initialization error:", error);
    }
  };

  const handlePayment = async () => {
    if (!card) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Payment form not initialized",
      });
      return;
    }

    setIsLoading(true);

    try {
      const result = await card.tokenize();
      if (result.status === "OK") {
        // This is where we'll handle the payment token later
        toast({
          title: "Success",
          description: "Payment processed successfully",
        });
      } else {
        throw new Error("Payment tokenization failed");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Payment Failed",
        description: error instanceof Error ? error.message : "An error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Make a Payment</CardTitle>
        <CardDescription>
          Enter your card details to process the payment securely
        </CardDescription>
        {isTestMode && (
          <div className="mt-2 p-2 bg-blue-50 rounded-md">
            <div className="flex items-center gap-2 text-sm text-blue-700">
              <Info className="h-4 w-4" />
              <span>Test Mode Active - Use test card numbers:</span>
            </div>
            <div className="mt-2 text-sm text-blue-600 space-y-1">
              <p>Success: {testPaymentMethods.creditCards.visa.success}</p>
              <p>Decline: {testPaymentMethods.creditCards.visa.decline}</p>
              <p>CVV Failure: {testPaymentMethods.creditCards.visa.cvvFailure}</p>
            </div>
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        <div 
          id="card-container" 
          className="min-h-[100px] border rounded-md p-4"
        ></div>
        <Button
          onClick={handlePayment}
          disabled={isLoading || !card}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Pay Now"
          )}
        </Button>
      </CardContent>
    </Card>
  );
}