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

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: { headers: { Authorization: req.headers.get('Authorization')! } },
      }
    );

    // Get the current user to ensure they have permission
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    if (userError || !user) {
      throw new Error('Unauthorized');
    }

    // Get the last 6 months of data
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 6);

    // Fetch payments from Stripe
    const charges = await stripe.charges.list({
      created: { gte: Math.floor(startDate.getTime() / 1000) },
      limit: 100,
    });

    // Process the data into monthly summaries
    const monthlyData = charges.data.reduce((acc, charge) => {
      const date = new Date(charge.created * 1000);
      const month = date.toLocaleString('default', { month: 'short' });
      
      if (!acc[month]) {
        acc[month] = { income: 0, expenses: 0 };
      }

      // Income is successful charges
      if (charge.status === 'succeeded') {
        acc[month].income += charge.amount / 100; // Convert from cents to dollars
      }
      
      // Expenses are refunds and fees
      if (charge.refunded) {
        acc[month].expenses += charge.amount_refunded / 100;
      }
      acc[month].expenses += (charge.application_fee_amount || 0) / 100;

      return acc;
    }, {} as Record<string, { income: number; expenses: number }>);

    // Convert to array format expected by the chart
    const chartData = Object.entries(monthlyData).map(([month, data]) => ({
      month,
      income: Math.round(data.income),
      expenses: Math.round(data.expenses),
    }));

    return new Response(
      JSON.stringify({ data: chartData }),
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