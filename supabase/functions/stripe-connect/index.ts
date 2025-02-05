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

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Request headers:', Object.fromEntries(req.headers.entries()));
    
    // Initialize Supabase client with auth context
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: { 
          headers: { Authorization: req.headers.get('Authorization') ?? '' }
        },
      }
    );

    // Get authenticated user
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    
    if (userError || !user) {
      console.error('Auth error:', userError);
      return new Response(
        JSON.stringify({ error: 'Unauthorized', details: userError?.message }),
        { 
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    console.log('Authenticated user:', user.id);

    // Get user role
    const { data: userData, error: roleError } = await supabaseClient
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single();

    if (roleError || !userData) {
      console.error('Role error:', roleError);
      return new Response(
        JSON.stringify({ error: 'Failed to get user role', details: roleError?.message }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    console.log('User role:', userData.role);

    if (userData.role !== 'owner') {
      return new Response(
        JSON.stringify({ error: 'Only property owners can access Stripe Connect' }),
        { 
          status: 403,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const { action } = await req.json();
    console.log('Action requested:', action);

    switch (action) {
      case 'create_account': {
        // Check if user already has a Connect account
        const { data: existingAccount } = await supabaseClient
          .from('stripe_connect_accounts')
          .select('stripe_account_id')
          .eq('user_id', user.id)
          .single();

        if (existingAccount) {
          console.log('Existing account found:', existingAccount);
          return new Response(
            JSON.stringify({ accountId: existingAccount.stripe_account_id }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        // Create new Connect account
        console.log('Creating new Stripe Connect account');
        const account = await stripe.accounts.create({
          type: 'express',
          country: 'US',
          capabilities: {
            card_payments: { requested: true },
            transfers: { requested: true },
          },
          business_type: 'individual',
          metadata: {
            supabaseUserId: user.id,
          },
        });

        console.log('Stripe account created:', account.id);

        // Store the account ID
        const { error: insertError } = await supabaseClient
          .from('stripe_connect_accounts')
          .insert({
            user_id: user.id,
            stripe_account_id: account.id,
          });

        if (insertError) {
          console.error('Insert error:', insertError);
          throw new Error('Failed to store Stripe account');
        }

        // Create account link for onboarding
        const accountLink = await stripe.accountLinks.create({
          account: account.id,
          refresh_url: `${req.headers.get('origin')}/owner/payments?refresh=true`,
          return_url: `${req.headers.get('origin')}/owner/payments?success=true`,
          type: 'account_onboarding',
        });

        console.log('Account link created');
        return new Response(
          JSON.stringify({ url: accountLink.url }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'check_account_status': {
        const { data: connectAccount } = await supabaseClient
          .from('stripe_connect_accounts')
          .select('stripe_account_id')
          .eq('user_id', user.id)
          .single();

        if (!connectAccount) {
          console.log('No connect account found');
          return new Response(
            JSON.stringify({ status: 'not_created' }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        const account = await stripe.accounts.retrieve(connectAccount.stripe_account_id);
        console.log('Account status:', account.charges_enabled ? 'complete' : 'pending');

        return new Response(
          JSON.stringify({
            status: account.charges_enabled ? 'complete' : 'pending',
            accountId: account.id,
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'create_login_link': {
        const { data: connectAccount } = await supabaseClient
          .from('stripe_connect_accounts')
          .select('stripe_account_id')
          .eq('user_id', user.id)
          .single();

        if (!connectAccount) {
          return new Response(
            JSON.stringify({ error: 'No Stripe Connect account found' }),
            { 
              status: 400,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          );
        }

        const loginLink = await stripe.accounts.createLoginLink(
          connectAccount.stripe_account_id
        );

        console.log('Login link created:', loginLink.url);
        return new Response(
          JSON.stringify({ url: loginLink.url }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      default:
        return new Response(
          JSON.stringify({ error: 'Invalid action' }),
          { 
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
    }

  } catch (error) {
    console.error('Error in stripe-connect function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        stack: error.stack,
        details: 'An unexpected error occurred'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: error.message === 'Unauthorized' ? 401 : 500
      }
    );
  }
});
