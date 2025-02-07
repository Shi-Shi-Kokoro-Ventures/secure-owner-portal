import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';
import Stripe from 'https://esm.sh/stripe@12.5.0?target=deno';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const PLATFORM_FEE_PERCENTAGE = 0.05; // 5% platform fee

serve(async (req) => {
  try {
    // Handle CORS preflight requests
    if (req.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // Initialize Stripe with error handling
    const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!stripeSecretKey) {
      throw new Error('Stripe secret key is not configured');
    }

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2023-10-16',
      httpClient: Stripe.createFetchHttpClient(),
    });

    // Validate authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ 
          error: 'No authorization header provided',
          details: 'Authentication is required for this endpoint'
        }),
        { 
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Initialize Supabase client with error handling
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY');
    
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Supabase configuration is missing');
    }

    const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
      auth: { persistSession: false }
    });

    // Get and validate the current user
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    
    if (userError) {
      console.error('Authentication error:', userError);
      return new Response(
        JSON.stringify({ 
          error: 'Invalid user session', 
          details: userError.message 
        }),
        { 
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    if (!user) {
      console.error('No user found in session');
      return new Response(
        JSON.stringify({ 
          error: 'No user found in session',
          details: 'User authentication is required'
        }),
        { 
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    console.log('Successfully authenticated user:', user.id);

    // Parse request body with error handling
    let requestBody;
    try {
      requestBody = await req.json();
    } catch (error) {
      console.error('Failed to parse request body:', error);
      return new Response(
        JSON.stringify({ 
          error: 'Invalid request body',
          details: 'Request body must be valid JSON'
        }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const { amount, leaseId, action } = requestBody;

    // Handle refund action
    if (action === 'refund') {
      const { paymentId } = requestBody;
      if (!paymentId) {
        return new Response(
          JSON.stringify({ 
            error: 'Payment ID is required for refund',
            details: 'Please provide a valid payment ID'
          }),
          { 
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        );
      }

      try {
        const refund = await stripe.refunds.create({
          payment_intent: paymentId,
        });
        
        return new Response(
          JSON.stringify({ success: true, refund }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      } catch (error) {
        console.error('Refund error:', error);
        return new Response(
          JSON.stringify({ 
            error: 'Failed to process refund',
            details: error.message
          }),
          { 
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        );
      }
    }

    // Validate amount for payment
    if (!amount) {
      return new Response(
        JSON.stringify({ 
          error: 'Amount is required',
          details: 'Please provide a valid payment amount'
        }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Get the lease details with error handling
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
      console.error('Failed to fetch lease details:', leaseError);
      return new Response(
        JSON.stringify({ 
          error: 'Failed to fetch lease details',
          details: leaseError.message
        }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    if (!lease) {
      return new Response(
        JSON.stringify({ 
          error: 'Lease not found',
          details: 'Please provide a valid lease ID'
        }),
        { 
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Get the owner's Stripe Connect account with error handling
    const { data: connectAccount, error: connectError } = await supabaseClient
      .from('stripe_connect_accounts')
      .select('stripe_account_id')
      .eq('user_id', lease.units.properties.owner_id)
      .single();

    if (connectError) {
      console.error('Failed to fetch connect account:', connectError);
      return new Response(
        JSON.stringify({ 
          error: 'Failed to fetch connect account',
          details: connectError.message
        }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    if (!connectAccount) {
      return new Response(
        JSON.stringify({ 
          error: 'Property owner has not set up payments',
          details: 'The property owner needs to complete their Stripe Connect setup'
        }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Get or create Stripe customer with error handling
    let stripeCustomerId;
    try {
      const { data: existingCustomer, error: customerError } = await supabaseClient
        .from('stripe_customers')
        .select('stripe_customer_id')
        .eq('user_id', user.id)
        .single();

      if (customerError && customerError.code !== 'PGRST116') {
        throw customerError;
      }

      if (existingCustomer) {
        stripeCustomerId = existingCustomer.stripe_customer_id;
        console.log('Using existing Stripe customer:', stripeCustomerId);
      } else {
        // Get user details for new customer
        const { data: userData, error: userDataError } = await supabaseClient
          .from('users')
          .select('email, first_name, last_name')
          .eq('id', user.id)
          .single();

        if (userDataError) {
          throw userDataError;
        }

        if (!userData) {
          throw new Error('User details not found');
        }

        // Create new Stripe customer
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
          throw insertError;
        }

        stripeCustomerId = customer.id;
        console.log('Created new Stripe customer:', stripeCustomerId);
      }
    } catch (error) {
      console.error('Failed to get/create Stripe customer:', error);
      return new Response(
        JSON.stringify({ 
          error: 'Failed to process customer information',
          details: error.message
        }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
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

    // Create payment intent with error handling
    try {
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

      console.log('Successfully created payment intent:', paymentIntent.id);

      return new Response(
        JSON.stringify({ clientSecret: paymentIntent.client_secret }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      );
    } catch (error) {
      console.error('Failed to create payment intent:', error);
      return new Response(
        JSON.stringify({ 
          error: 'Failed to create payment intent',
          details: error.message
        }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }
  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'An unexpected error occurred',
        details: error.message
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});