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
    // Get the authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: { headers: { Authorization: authHeader } },
      }
    );

    // Get authenticated user
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    
    if (userError || !user) {
      throw new Error('Unauthorized');
    }

    // Get user role
    const { data: userData, error: roleError } = await supabaseClient
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single();

    if (roleError || !userData) {
      throw new Error('Failed to get user role');
    }

    if (userData.role !== 'owner') {
      throw new Error('Only property owners can access Stripe Connect');
    }

    const { action } = await req.json();

    switch (action) {
      case 'create_account': {
        // Check if user already has a Connect account
        const { data: existingAccount } = await supabaseClient
          .from('stripe_connect_accounts')
          .select('stripe_account_id')
          .eq('user_id', user.id)
          .single();

        if (existingAccount) {
          return new Response(
            JSON.stringify({ accountId: existingAccount.stripe_account_id }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        // Create new Connect account
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

        // Store the account ID
        const { error: insertError } = await supabaseClient
          .from('stripe_connect_accounts')
          .insert({
            user_id: user.id,
            stripe_account_id: account.id,
          });

        if (insertError) {
          throw new Error('Failed to store Stripe account');
        }

        // Create account link for onboarding
        const accountLink = await stripe.accountLinks.create({
          account: account.id,
          refresh_url: `${req.headers.get('origin')}/owner/payments?refresh=true`,
          return_url: `${req.headers.get('origin')}/owner/payments?success=true`,
          type: 'account_onboarding',
        });

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
          return new Response(
            JSON.stringify({ status: 'not_created' }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        const account = await stripe.accounts.retrieve(connectAccount.stripe_account_id);

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
          throw new Error('No Stripe Connect account found');
        }

        const loginLink = await stripe.accounts.createLoginLink(
          connectAccount.stripe_account_id
        );

        return new Response(
          JSON.stringify({ url: loginLink.url }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      default:
        throw new Error('Invalid action');
    }

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: error.message === 'Unauthorized' ? 401 : 400
      }
    );
  }
});