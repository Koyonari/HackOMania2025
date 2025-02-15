import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

export async function updateSession(request) {
  // Start by creating a base response that we may modify
  let supabaseResponse = NextResponse.next({ request });

  // Create your Supabase client with custom cookie handling.
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          // Create a new response so we can set cookies on it
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Get the current URL for checking the pathname
  const url = request.nextUrl.clone();
  const currentPath = url.pathname;

  // IMPORTANT: DO NOT run any code between createServerClient and supabase.auth.getUser()
  // Get the user from the auth session.
  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  // // Query your users table based on the user id.
  // const { data, error } = await supabase
  //   .from('users')
  //   .select('*')
  //   .eq('id', user?.id);
  //   if (currentPath.startsWith('/app'))
  //   {
  // // If there is no user, redirect to /login if you're not already there.
  //       if (!user) {
  //           if (currentPath !== '/login') {
  //           url.pathname = '/login';
  //           return NextResponse.redirect(url);
  //           }
  //           return NextResponse.next();
  //       }
  //       // If the user is logged in but no matching row in your users table, redirect to /app/settings
  //       else if (user && (!data || data.length === 0)) {
  //           if (currentPath !== '/app/settings' && currentPath !== '/app/settings/wallet') {
  //           url.pathname = '/app/settings';
  //           return NextResponse.redirect(url);
  //           }
  //           return NextResponse.next();
  //       }
  //       // If the user is logged in and has a row in the users table, redirect to /app if not already there.
  //       else if (user && data && data.length > 0) {
  //           if (currentPath !== '/app') {
  //           url.pathname = '/app';
  //           return NextResponse.redirect(url);
  //           }
  //           return NextResponse.next();
  //       }
  //   }
  // Fallback: return the original response if none of the above conditions matched.
  return supabaseResponse;
}
