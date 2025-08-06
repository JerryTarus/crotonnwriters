import { Inter } from 'next/font/google';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from 'react-hot-toast';
import DashboardNav from '@/components/dashboard/DashboardNav';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Crotonn Writers - Dashboard',
  description: 'Manage your writing projects and orders',
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const supabase = createClient();
  
  // Check if user is authenticated
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    redirect('/auth/login?redirectTo=/dashboard');
  }

  // Get user role
  const { data: userData } = await supabase
    .from('users')
    .select('role')
    .eq('id', session.user.id)
    .single();

  const userRole = userData?.role || 'client';

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="min-h-screen bg-gray-50">
            <DashboardNav userRole={userRole} />
            <div className="pt-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {children}
              </div>
            </div>
            <Toaster position="top-right" />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
