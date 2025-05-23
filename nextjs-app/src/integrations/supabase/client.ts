import { createClient } from '@supabase/supabase-js';
import type { Database } from './types'; // Assuming types.ts is in the same directory

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error("NEXT_PUBLIC_SUPABASE_URL is not defined. Please set it in your .env.local file.");
}
if (!supabaseAnonKey) {
  throw new Error("NEXT_PUBLIC_SUPABASE_ANON_KEY is not defined. Please set it in your .env.local file.");
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
