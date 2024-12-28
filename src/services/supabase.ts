import { createClient } from "@supabase/supabase-js";

// const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhpb25mbGhpd2tsZXNocndta294Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMxMTU4NzEsImV4cCI6MjA0ODY5MTg3MX0.-IXUzJm5u7FTydDBLlK1nFw_O4YK85FAnQwp-8KiGIc';
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
