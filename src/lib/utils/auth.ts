import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { Database } from '@/types/supabase';

export const getCurrentUser = async () => {
  const cookieStore = cookies();
  
  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return null;

  const { data: user } = await supabase
    .from('users')
    .select('*')
    .eq('id', session.user.id)
    .single();

  return user;
};

export const redirectIfAuthenticated = async (redirectTo = '/dashboard') => {
  const user = await getCurrentUser();
  if (user) {
    return {
      redirect: {
        destination: redirectTo,
        permanent: false,
      },
    };
  }
  return null;
};

export const redirectIfNotAuthenticated = async (redirectTo = '/auth/login') => {
  const user = await getCurrentUser();
  if (!user) {
    return {
      redirect: {
        destination: `${redirectTo}?redirectTo=${encodeURIComponent(redirectTo)}`,
        permanent: false,
      },
    };
  }
  return { user };
};

export const getUserRole = async () => {
  const user = await getCurrentUser();
  return user?.role || 'client';
};

export const isAuthorized = async (requiredRole: string) => {
  const user = await getCurrentUser();
  if (!user) return false;
  
  // Admin has access to everything
  if (user.role === 'admin') return true;
  
  // Check if user has the required role
  return user.role === requiredRole;
};
