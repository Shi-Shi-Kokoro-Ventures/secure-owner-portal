import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';
import Stripe from 'https://esm.sh/stripe@12.5.0?target=deno';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '', {
  apiVersion: '2023-10-16',
  httpClient: Stripe.createFetchHttpClient(),
});

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const PLATFORM_FEE_PERCENTAGE = 0.05; // 5% platform fee

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: { headers: { Authorization: req.headers.get('Authorization')! } },
      }
    );

    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    if (userError || !user) {
      throw new Error('Unauthorized');
    }

    const { amount, leaseId } = await req.json();

    // Get the lease details to find the property owner
    const { data: lease } = await supabaseClient
      .from('leases')
      .select(`
        unit_id,
        units!inner (
          property_id,
          properties!inner (
            owner_id
          )
        )
      `)
      .eq('id', leaseId)
      .single();

    if (!lease) {
      throw new Error('Lease not found');
    }

    // Get the owner's Stripe Connect account
    const { data: connectAccount } = await supabaseClient
      .from('stripe_connect_accounts')
      .select('stripe_account_id')
      .eq('user_id', lease.units.properties.owner_id)
      .single();

    if (!connectAccount) {
      throw new Error('Property owner has not set up payments');
    }

    // Get or create customer
    const { data: existingCustomer } = await supabaseClient
      .from('stripe_customers')
      .select('stripe_customer_id')
      .eq('user_id', user.id)
      .single();

    let stripeCustomerId;
    if (existingCustomer) {
      stripeCustomerId = existingCustomer.stripe_customer_id;
    } else {
      const { data: userData } = await supabaseClient
        .from('users')
        .select('email, first_name, last_name')
        .eq('id', user.id)
        .single();

      const customer = await stripe.customers.create({
        email: userData.email,
        name: `${userData.first_name} ${userData.last_name}`,
        metadata: {
          supabaseUserId: user.id,
        },
      });

      await supabaseClient.from('stripe_customers').insert({
        user_id: user.id,
        stripe_customer_id: customer.id,
      });

      stripeCustomerId = customer.id;
    }

    // Calculate platform fee
    const amountInCents = amount * 100;
    const platformFee = Math.round(amountInCents * PLATFORM_FEE_PERCENTAGE);

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: 'usd',
      customer: stripeCustomerId,
      metadata: {
        leaseId,
        userId: user.id,
      },
      transfer_data: {
        destination: connectAccount.stripe_account_id,
      },
      application_fee_amount: platformFee,
    });

    // Send the client secret to the client
    return new Response(
      JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});