
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/contexts/AuthContext';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Crotonn Writers - Premium Academic Writing Services',
  description: 'Professional academic writing services with expert writers. Essays, research papers, dissertations, and more. Guaranteed quality and on-time delivery.',
  keywords: 'academic writing, essay writing, research papers, dissertations, professional writers',
  authors: [{ name: 'Crotonn Writers' }],
  openGraph: {
    title: 'Crotonn Writers - Premium Academic Writing Services',
    description: 'Professional academic writing services with expert writers',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <Toaster position="top-right" />
        </AuthProvider>
      </body>
    </html>
  );
}
