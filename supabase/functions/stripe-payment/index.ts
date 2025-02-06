import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';
import Stripe from 'https://esm.sh/stripe@12.5.0?target=deno';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const PLATFORM_FEE_PERCENTAGE = 0.05; // 5% platform fee

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '', {
      apiVersion: '2023-10-16',
      httpClient: Stripe.createFetchHttpClient(),
    });

    // Get the authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      console.error('No authorization header provided');
      throw new Error('No authorization header');
    }

    // Create Supabase client with the user's JWT
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: { 
          headers: { Authorization: authHeader } 
        },
        auth: {
          persistSession: false
        }
      }
    );

    // Get the current user
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    
    if (userError || !user) {
      console.error('Auth error:', userError);
      throw new Error('Authentication failed');
    }

    console.log('Authenticated user:', user.id);

    // Get request body
    const { amount, leaseId, action } = await req.json();

    // Handle refund action
    if (action === 'refund') {
      const { paymentId } = await req.json();
      const refund = await stripe.refunds.create({
        payment_intent: paymentId,
      });
      
      return new Response(
        JSON.stringify({ success: true, refund }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!amount) {
      console.error('Amount is required');
      throw new Error('Amount is required');
    }

    // Get the lease details to find the property owner
    const { data: lease, error: leaseError } = await supabaseClient
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

    if (leaseError) {
      console.error('Lease error:', leaseError);
      throw new Error('Error fetching lease details');
    }

    if (!lease) {
      console.error('Lease not found');
      throw new Error('Lease not found');
    }

    // Get the owner's Stripe Connect account
    const { data: connectAccount, error: connectError } = await supabaseClient
      .from('stripe_connect_accounts')
      .select('stripe_account_id')
      .eq('user_id', lease.units.properties.owner_id)
      .single();

    if (connectError) {
      console.error('Connect account error:', connectError);
      throw new Error('Error fetching connect account');
    }

    if (!connectAccount) {
      console.error('Property owner has not set up payments');
      throw new Error('Property owner has not set up payments');
    }

    // Get or create customer
    const { data: existingCustomer, error: customerError } = await supabaseClient
      .from('stripe_customers')
      .select('stripe_customer_id')
      .eq('user_id', user.id)
      .single();

    if (customerError && customerError.code !== 'PGRST116') {
      console.error('Customer error:', customerError);
      throw new Error('Error fetching customer');
    }

    let stripeCustomerId;
    if (existingCustomer) {
      stripeCustomerId = existingCustomer.stripe_customer_id;
    } else {
      // Get user details
      const { data: userData, error: userDataError } = await supabaseClient
        .from('users')
        .select('email, first_name, last_name')
        .eq('id', user.id)
        .single();

      if (userDataError) {
        console.error('User data error:', userDataError);
        throw new Error('Error fetching user details');
      }

      if (!userData) {
        console.error('User details not found');
        throw new Error('User details not found');
      }

      // Create Stripe customer
      const customer = await stripe.customers.create({
        email: userData.email,
        name: `${userData.first_name} ${userData.last_name}`,
        metadata: {
          supabaseUserId: user.id,
        },
      });

      // Save customer ID
      const { error: insertError } = await supabaseClient
        .from('stripe_customers')
        .insert({
          user_id: user.id,
          stripe_customer_id: customer.id,
        });

      if (insertError) {
        console.error('Insert customer error:', insertError);
        throw new Error('Error saving customer');
      }

      stripeCustomerId = customer.id;
    }

    // Calculate platform fee
    const amountInCents = amount * 100;
    const platformFee = Math.round(amountInCents * PLATFORM_FEE_PERCENTAGE);

    console.log('Creating payment intent:', {
      amount: amountInCents,
      customerId: stripeCustomerId,
      connectAccountId: connectAccount.stripe_account_id,
      platformFee
    });

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

    console.log('Payment intent created:', paymentIntent.id);

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