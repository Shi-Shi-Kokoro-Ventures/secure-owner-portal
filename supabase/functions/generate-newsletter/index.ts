import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface NewsletterRequest {
  topic?: string;
  propertyUpdates?: string[];
  marketingContent?: boolean;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { topic, propertyUpdates, marketingContent }: NewsletterRequest = await req.json();

    console.log('Generating newsletter content with parameters:', { topic, propertyUpdates, marketingContent });

    let prompt = `Generate a professional property management newsletter. Include a main article`;
    
    if (topic) {
      prompt += ` about ${topic}.`;
    }

    if (propertyUpdates && propertyUpdates.length > 0) {
      prompt += `\n\nInclude updates about the following properties:\n${propertyUpdates.join('\n')}`;
    }

    if (marketingContent) {
      prompt += `\n\nInclude a marketing section highlighting our property management services and value proposition.`;
    }

    prompt += `\n\nFormat the content in HTML with appropriate headings and sections.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a professional property management newsletter writer. Create engaging, informative content that provides value to property owners and tenants.'
          },
          { role: 'user', content: prompt }
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenAI API error:', error);
      throw new Error('Failed to generate newsletter content');
    }

    const data = await response.json();
    const generatedContent = data.choices[0].message.content;

    console.log('Successfully generated newsletter content');

    return new Response(JSON.stringify({ 
      content: generatedContent,
      title: topic || 'Property Management Newsletter'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-newsletter function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});