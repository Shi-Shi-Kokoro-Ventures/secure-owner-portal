import { PaymentForm } from "@/components/PaymentForm";

const NewPayment = () => {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Make a Payment</h1>
        <p className="text-muted-foreground">
          Complete the form below to process your payment securely
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="rounded-lg border p-6">
          <PaymentForm />
        </div>
      </div>

      <div className="max-w-2xl mx-auto mt-4">
        <div className="bg-muted/50 rounded-lg p-4">
          <h3 className="font-semibold mb-2">Security Notice</h3>
          <p className="text-sm text-muted-foreground">
            Your payment information is securely processed and encrypted. We comply
            with PCI DSS requirements and never store your card details.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewPayment;