import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY

console.log("🔑 Supabase URL:", supabaseUrl)
console.log("🔐 Supabase Key:", supabaseKey?.slice(0, 8) + '...') // Hide the rest

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Supabase environment variables missing!")
}

export const supabase = createClient(supabaseUrl, supabaseKey)
