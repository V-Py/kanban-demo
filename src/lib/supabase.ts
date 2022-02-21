import {createClient} from '@supabase/supabase-js'

const SUPABASE_URL = 'https://dulibtpeqmjtbggmwqsy.supabase.co';
const SUPABASE_PUBLIC_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjQyOTMxOTc3LCJleHAiOjE5NTg1MDc5Nzd9.0FEzgxcFp0d97dx70scDYljCHaocfl4MKkJZQbBKm-U';

const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY);
export default supabase;