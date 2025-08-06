'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase/client';

type Role = 'admin' | 'writer' | 'client';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  role: Role | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData: any) => Promise<void>;
  signOut: () => Promise<void>;
  // signInWithGoogle: () => Promise<void>; // Disabled for MVP
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Helper to extract user role from metadata
  const getUserRole = (user: User | null): Role | null => {
    if (!user) return null;
    // Supabase user metadata (from signUp)
    const metadataRole = user.user_metadata?.role as Role | undefined;
    return metadataRole || 'client'; // Default to client
  };

  useEffect(() => {
    // Fetch initial session
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);
      setUser(session?.user ?? null);
      const currentRole = getUserRole(session?.user ?? null);
      setRole(currentRole);
      setLoading(false);

      // Redirect to dashboard based on role
      if (session?.user) redirectByRole(currentRole);
    };

    getSession();

    // Listen for changes in authentication state
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);

        const currentRole = getUserRole(session?.user ?? null);
        setRole(currentRole);
        setLoading(false);

        if (session?.user) redirectByRole(currentRole);
      }
    );

    // Cleanup subscription on unmount
    return () => {
      subscription?.subscription.unsubscribe();
    };
  }, []);

  const redirectByRole = (role: Role | null) => {
    if (!role) return;
    switch (role) {
      case 'admin':
        router.push('/dashboard/admin');
        break;
      case 'writer':
        router.push('/dashboard/writer');
        break;
      default:
        router.push('/dashboard/client');
    }
  };

  const signIn = async (email: string, password: string) => {
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;

    const currentRole = getUserRole(data.user ?? null);
    redirectByRole(currentRole);
  };

  const signUp = async (email: string, password: string, userData: any) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: userData.fullName,
          role: 'client', // Default new users as clients
        },
      },
    });

    if (error) throw error;

    // Create user profile in Supabase table
    if (data.user) {
      const { error: profileError } = await supabase.from('users').insert([
        {
          id: data.user.id,
          email: data.user.email,
          full_name: userData.fullName,
          role: 'client',
          created_at: new Date().toISOString(),
        },
      ]);
      if (profileError) throw profileError;
    }

    redirectByRole('client');
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    router.push('/auth/login');
  };

  /*
  // Google OAuth (disabled for MVP)
  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });
    if (error) throw error;
  };
  */

  const value = {
    user,
    session,
    loading,
    role,
    signIn,
    signUp,
    signOut,
    // signInWithGoogle, // disabled
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
