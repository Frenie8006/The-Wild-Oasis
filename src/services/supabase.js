import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://gesiammmobhfxmqixycc.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdlc2lhbW1tb2JoZnhtcWl4eWNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3OTc4OTAsImV4cCI6MjA3NDM3Mzg5MH0.xE-JWMH0kJ-3Wk0gp4ruYULtFXXvy_1-hKeAse1Spfw";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
