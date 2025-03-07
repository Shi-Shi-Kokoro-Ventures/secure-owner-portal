import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';
import Stripe from 'https://esm.sh/stripe@12.5.0?target=deno';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '', {
      apiVersion: '2023-10-16',
      httpClient: Stripe.createFetchHttpClient(),
    });

    const signature = req.headers.get('stripe-signature');
    const body = await req.text();

    let event;
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature ?? '',
        Deno.env.get('STRIPE_WEBHOOK_SECRET') ?? ''
      );
    } catch (err) {
      console.error(`Webhook signature verification failed: ${err.message}`);
      return new Response(JSON.stringify({ error: 'Invalid signature' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    );

    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        await supabaseClient.from('payments').update({
          status: 'completed',
          stripe_payment_intent_id: paymentIntent.id,
          payment_date: new Date().toISOString(),
        }).match({ stripe_payment_intent_id: paymentIntent.id });

        // Update tenant rewards if applicable
        if (paymentIntent.metadata.tenant_id) {
          await supabaseClient.rpc('update_tenant_rewards', {
            p_tenant_id: paymentIntent.metadata.tenant_id,
            p_points: 10 // Award points for successful payment
          });
        }
        break;

      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object;
        await supabaseClient.from('payments').update({
          status: 'failed',
          stripe_payment_intent_id: failedPayment.id,
        }).match({ stripe_payment_intent_id: failedPayment.id });
        break;

      case 'charge.refunded':
        const refund = event.data.object;
        // Create a new payment record for the refund
        await supabaseClient.from('payments').insert({
          amount_paid: -(refund.amount_refunded / 100),
          payment_date: new Date().toISOString(),
          status: 'completed',
          method: 'credit_card',
          stripe_payment_intent_id: refund.payment_intent,
          tenant_id: refund.metadata.tenant_id,
          lease_id: refund.metadata.lease_id,
        });
        break;

      case 'charge.dispute.created':
        const dispute = event.data.object;
        await supabaseClient.from('payments').update({
          status: 'disputed',
          stripe_payment_intent_id: dispute.payment_intent,
        }).match({ stripe_payment_intent_id: dispute.payment_intent });
        break;

      case 'charge.dispute.closed':
        const closedDispute = event.data.object;
        const newStatus = closedDispute.status === 'won' ? 'completed' : 'refunded';
        await supabaseClient.from('payments').update({
          status: newStatus,
          stripe_payment_intent_id: closedDispute.payment_intent,
        }).match({ stripe_payment_intent_id: closedDispute.payment_intent });
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});