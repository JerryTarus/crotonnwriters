
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/contexts/AuthContext';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://crotonn-writers.replit.app'),
  title: {
    default: 'Crotonn Writers - Premium Academic Writing Services | Essays, Research Papers & Dissertations',
    template: '%s | Crotonn Writers'
  },
  description: 'Professional academic writing services with expert writers. Custom essays, research papers, dissertations, and more. 100% original content, on-time delivery, 24/7 support. Get A+ grades guaranteed.',
  keywords: [
    'academic writing services',
    'essay writing help',
    'research paper writing',
    'dissertation writing',
    'professional writers',
    'custom essays',
    'academic papers',
    'college essay help',
    'thesis writing service',
    'plagiarism free writing',
    'academic writing assistance',
    'university papers',
    'graduate writing help'
  ],
  authors: [{ name: 'Crotonn Writers', url: 'https://crotonn-writers.replit.app' }],
  creator: 'Crotonn Writers',
  publisher: 'Crotonn Writers',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://crotonn-writers.replit.app',
    title: 'Crotonn Writers - Premium Academic Writing Services',
    description: 'Get expert help with essays, research papers, and dissertations. 100% original content, on-time delivery, 24/7 support. Trusted by thousands of students.',
    siteName: 'Crotonn Writers',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Crotonn Writers - Academic Writing Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crotonn Writers - Premium Academic Writing Services',
    description: 'Expert academic writing help. Essays, research papers, dissertations. 100% original content, guaranteed.',
    creator: '@crotonn_writers',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
  alternates: {
    canonical: 'https://crotonn-writers.replit.app',
    languages: {
      'en-US': 'https://crotonn-writers.replit.app',
    },
  },
  category: 'education',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="canonical" href="https://crotonn-writers.replit.app" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Crotonn Writers",
              "description": "Premium academic writing services with expert writers",
              "url": "https://crotonn-writers.replit.app",
              "logo": "https://crotonn-writers.replit.app/logo.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-800-WRITERS",
                "contactType": "customer service",
                "areaServed": "Worldwide",
                "availableLanguage": "English"
              },
              "sameAs": [
                "https://facebook.com/crotonn-writers",
                "https://twitter.com/crotonn_writers",
                "https://linkedin.com/company/crotonn-writers"
              ],
              "service": {
                "@type": "Service",
                "name": "Academic Writing Services",
                "description": "Professional essay writing, research papers, and dissertation services",
                "provider": {
                  "@type": "Organization",
                  "name": "Crotonn Writers"
                },
                "areaServed": "Worldwide",
                "hasOfferCatalog": {
                  "@type": "OfferCatalog",
                  "name": "Academic Writing Services",
                  "itemListElement": [
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Essay Writing"
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Research Papers"
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Dissertation Writing"
                      }
                    }
                  ]
                }
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "2500"
              }
            })
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <AuthProvider>
          {children}
          <Toaster position="top-right" />
        </AuthProvider>
      </body>
    </html>
  );
}
