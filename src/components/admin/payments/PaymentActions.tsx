import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Payment } from "@/types/payment.types";
import { MoreHorizontal, RefreshCw, Ban, FileText, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface PaymentActionsProps {
  payment: Payment;
  onRefund?: () => void;
}

export function PaymentActions({ payment, onRefund }: PaymentActionsProps) {
  const { toast } = useToast();

  const handleRefund = async () => {
    try {
      const { error } = await supabase.functions.invoke('stripe-payment', {
        body: { 
          action: 'refund',
          paymentId: payment.stripe_payment_intent_id 
        },
      });

      if (error) throw error;

      toast({
        title: "Refund initiated",
        description: "The refund has been processed successfully.",
      });

      if (onRefund) onRefund();
    } catch (error) {
      console.error('Refund error:', error);
      toast({
        variant: "destructive",
        title: "Refund failed",
        description: "There was an error processing the refund.",
      });
    }
  };

  const handleLateFee = async () => {
    try {
      const { error } = await supabase.rpc('apply_late_fees', {
        p_tenant_id: payment.tenant_id
      });

      if (error) throw error;

      toast({
        title: "Late fee applied",
        description: "The late fee has been applied successfully.",
      });
    } catch (error) {
      console.error('Late fee error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to apply late fee.",
      });
    }
  };

  const openStripeTransaction = () => {
    if (payment.stripe_payment_intent_id) {
      window.open(
        `https://dashboard.stripe.com/payments/${payment.stripe_payment_intent_id}`,
        '_blank'
      );
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {payment.status === 'completed' && (
          <DropdownMenuItem onClick={handleRefund}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Issue Refund
          </DropdownMenuItem>
        )}
        {payment.status === 'pending' && (
          <DropdownMenuItem onClick={handleLateFee}>
            <Ban className="mr-2 h-4 w-4" />
            Apply Late Fee
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={() => {}}>
          <FileText className="mr-2 h-4 w-4" />
          Generate Invoice
        </DropdownMenuItem>
        {payment.stripe_payment_intent_id && (
          <DropdownMenuItem onClick={openStripeTransaction}>
            <ExternalLink className="mr-2 h-4 w-4" />
            View in Stripe
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}