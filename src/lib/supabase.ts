import { createClient } from '@supabase/supabase-js';

// These will be replaced with actual values when connecting through Lovable's Supabase integration
const supabaseUrl = '';
const supabaseKey = '';

export const supabase = createClient(supabaseUrl, supabaseKey);