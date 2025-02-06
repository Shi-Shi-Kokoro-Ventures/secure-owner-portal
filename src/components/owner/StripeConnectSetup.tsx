import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ArrowRight, CheckCircle2, AlertCircle, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

export function StripeConnectSetup() {
  const [isLoading, setIsLoading] = useState(true);
  const [accountStatus, setAccountStatus] = useState<'not_created' | 'pending' | 'complete' | null>(null);
  const { toast } = useToast();

  // Get the current session
  const { data: session } = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;
      return session;
    },
  });

  const checkAccountStatus = async () => {
    try {
      if (!session) {
        throw new Error('No active session');
      }

      const { data, error } = await supabase.functions.invoke('stripe-connect', {
        body: { action: 'check_account_status' },
      });

      if (error) throw error;
      setAccountStatus(data.status);
    } catch (error) {
      console.error('Error checking account status:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to check account status",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      checkAccountStatus();
    }
  }, [session]);

  const handleSetupAccount = async () => {
    try {
      if (!session) {
        throw new Error('Please log in to set up Stripe Connect');
      }

      setIsLoading(true);
      const { data, error } = await supabase.functions.invoke('stripe-connect', {
        body: { action: 'create_account' },
      });

      if (error) throw error;

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Error setting up Stripe Connect:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to set up Stripe Connect",
      });
      setIsLoading(false);
    }
  };

  const handleOpenDashboard = async () => {
    try {
      if (!session) {
        throw new Error('Please log in to access the dashboard');
      }

      setIsLoading(true);
      const { data, error } = await supabase.functions.invoke('stripe-connect', {
        body: { action: 'create_login_link' },
      });

      if (error) throw error;

      if (data.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Error opening Stripe dashboard:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to open Stripe dashboard",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!session) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-muted-foreground">
            Please log in to manage payment settings
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Settings</CardTitle>
        <CardDescription>
          Set up your payment processing to receive rent payments directly to your bank account
        </CardDescription>
      </CardHeader>
      <CardContent>
        {accountStatus === 'complete' ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle2 className="h-5 w-5" />
              <span>Your Stripe Connect account is set up and ready to receive payments</span>
            </div>
            <Button onClick={handleOpenDashboard} className="w-full">
              Open Stripe Dashboard
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>
        ) : accountStatus === 'pending' ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-yellow-600">
              <AlertCircle className="h-5 w-5" />
              <span>Your account setup is incomplete</span>
            </div>
            <Button onClick={handleSetupAccount} className="w-full">
              Complete Account Setup
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              To receive rent payments, you need to set up a Stripe Connect account. This will allow
              you to receive payments directly to your bank account.
            </p>
            <Button onClick={handleSetupAccount} className="w-full">
              Set Up Stripe Connect
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}