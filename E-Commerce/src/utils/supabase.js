import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://moisaxorlewmnvjeargf.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vaXNheG9ybGV3bW52amVhcmdmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyNTUyOTIsImV4cCI6MjA2OTgzMTI5Mn0.l9sVfrZLrNXu9AkAt5cFL7CsCH44u9TRGZtps5hDmZ0";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
