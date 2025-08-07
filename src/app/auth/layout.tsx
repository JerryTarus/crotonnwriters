
import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'Authentication | Crotonn Writers',
  description: 'Sign in or create your Crotonn Writers account to access premium academic writing services.',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {children}
      </div>
      <Toaster position="top-right" />
    </>
  );
}
