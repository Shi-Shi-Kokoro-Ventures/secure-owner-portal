import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get the request body
    const { message } = await req.json()

    // Create a system-wide conversation
    const { data: conversationData, error: conversationError } = await supabaseClient
      .from('conversations')
      .insert({
        type: 'group',
        last_message: message,
      })
      .select()
      .single()

    if (conversationError) {
      console.error('Error creating conversation:', conversationError)
      throw conversationError
    }

    // Get all users
    const { data: users, error: usersError } = await supabaseClient
      .from('users')
      .select('id')

    if (usersError) {
      console.error('Error fetching users:', usersError)
      throw usersError
    }

    // Create a message in the conversation
    const { error: messageError } = await supabaseClient
      .from('messages')
      .insert({
        conversation_id: conversationData.id,
        sender_id: req.headers.get('x-admin-id'),
        message_content: message,
        message_type: 'text',
        status: 'sent'
      })

    if (messageError) {
      console.error('Error creating message:', messageError)
      throw messageError
    }

    return new Response(
      JSON.stringify({ success: true }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Error in broadcast-announcement:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})