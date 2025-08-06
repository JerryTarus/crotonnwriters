import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const next = requestUrl.searchParams.get('next') || '/';

  if (code) {
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: any) {
            cookieStore.set({ name, value, ...options });
          },
          remove(name: string, options: any) {
            cookieStore.set({ name, value: '', ...options });
          },
        },
      }
    );

    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error) {
      // Get the user session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        // Check if user exists in the database
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single();

        // If user doesn't exist, create a new user record
        if (!userData && !userError) {
          const { error: insertError } = await supabase
            .from('users')
            .insert([
              {
                id: session.user.id,
                email: session.user.email,
                full_name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0],
                role: 'client',
                created_at: new Date().toISOString(),
              },
            ]);

          if (insertError) {
            console.error('Error creating user:', insertError);
          }
        }
      }
    }
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(new URL(next, request.url));
}
