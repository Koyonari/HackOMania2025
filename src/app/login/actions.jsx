import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function signInWithGoogle() {
  const supabase = await createClient(supabaseUrl,
    supabaseAnonKey);
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  });

  if (error) {
    console.error(error);
    redirect('/error');
  }
}

export async function signInWithGithub() {
  const supabase = await createClient(supabaseUrl, supabaseAnonKey);
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
  });

  if (error) {
    console.error(error);
    redirect('/error');
  }
}