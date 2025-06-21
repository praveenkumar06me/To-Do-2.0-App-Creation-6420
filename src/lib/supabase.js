import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://ajtgtrfknkqzegzpostj.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqdGd0cmZrbmtxemVnenBvc3RqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzNTE0NzgsImV4cCI6MjA2NTkyNzQ3OH0.iuRHkIOS17NXr6FsV8FPmkDlqvpvBMnMLPn6BnlstPU'

if(SUPABASE_URL == 'https://<PROJECT-ID>.supabase.co' || SUPABASE_ANON_KEY == '<ANON_KEY>' ){
  throw new Error('Missing Supabase variables');
}

export default createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
})