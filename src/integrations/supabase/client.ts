// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://cinohyzbtfzfcdtkgvij.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpbm9oeXpidGZ6ZmNkdGtndmlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk1NjQ3NzMsImV4cCI6MjA1NTE0MDc3M30.T838s7TDQVjTAyLLFwsDu_31VVh2Zh4fsmiRpnXz0fg";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);