import { redirect } from 'next/navigation';
import { getCurrentUser, getUserRole } from '@/lib/utils/auth';
import DashboardNav from '@/components/dashboard/DashboardNav';

export default async function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  const role = await getUserRole();

  // Redirect to login if not authenticated
  if (!user) {
    redirect('/auth/signin');
  }

  // Redirect to appropriate dashboard if not a client
  if (role !== 'client') {
    redirect(role === 'admin' ? '/dashboard/admin' : '/dashboard/writer');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNav user={user} role={role} />
      <div className="py-10">
        <main>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">Client Dashboard</h1>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
