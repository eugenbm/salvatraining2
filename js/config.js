// Supabase Configuration
const SUPABASE_URL = 'https://brsrfelxvvzasyaugenk.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJyc3JmZWx4dnZ6YXN5YXVnZW5rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwMTUxOTksImV4cCI6MjA5MjU5MTE5OX0.WKVO_drhLdtzLqyNX518sPrc2Vfe_CXaR5n_BT3wZ7g';

// Initializare client Supabase
const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);