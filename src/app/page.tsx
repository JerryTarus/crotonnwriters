'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function Home() {
  const { user, loading } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <Link href="/" className="text-2xl font-bold text-blue-600">
                Crotonn Writers
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                Features
              </a>
              <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                How It Works
              </a>
              <a href="#pricing" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                Pricing
              </a>
              <a href="#testimonials" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                Testimonials
              </a>
            </nav>
            <div className="flex items-center space-x-4">
              {!loading && (
                <>
                  {user ? (
                    <Link 
                      href="/dashboard" 
                      className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                    >
                      Go to Dashboard
                    </Link>
                  ) : (
                    <>
                      <Link 
                        href="/auth/login" 
                        className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                      >
                        Sign In
                      </Link>
                      <Link 
                        href="/auth/signup" 
                        className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                      >
                        Get Started
                      </Link>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative bg-blue-700 overflow-hidden pt-16">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-blue-700 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                  <span className="block">Professional Academic</span>
                  <span className="block text-blue-200">Writing Services</span>
                </h1>
                <p className="mt-3 text-base text-blue-100 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Get high-quality, custom-written papers tailored to your needs. Our expert writers deliver 100% original content with guaranteed on-time delivery.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link
                      href={user ? "/dashboard/orders/new" : "/auth/signup"}
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                    >
                      Place an Order
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link
                      href="#how-it-works"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-800 hover:bg-blue-900 md:py-4 md:text-lg md:px-10"
                    >
                      How It Works
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
            alt="Student studying"
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              A better way to get your papers done
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              We provide top-notch academic writing services tailored to your needs.
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {/* Professional Writers */}
              <div className="pt-6">
                <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8 h-full">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Professional Writers</h3>
                    <p className="mt-5 text-base text-gray-500">
                      Our team consists of experienced writers with advanced degrees in various academic fields.
                    </p>
                  </div>
                </div>
              </div>

              {/* 24/7 Support */}
              <div className="pt-6">
                <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8 h-full">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-green-500 rounded-md shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">24/7 Support</h3>
                    <p className="mt-5 text-base text-gray-500">
                      Our support team is available around the clock to assist you with any questions or concerns.
                    </p>
                  </div>
                </div>
              </div>

              {/* Plagiarism-Free */}
              <div className="pt-6">
                <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8 h-full">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-purple-500 rounded-md shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">100% Original</h3>
                    <p className="mt-5 text-base text-gray-500">
                      We guarantee original, plagiarism-free content with free Turnitin reports upon request.
                    </p>
                  </div>
                </div>
              </div>

              {/* On-Time Delivery */}
              <div className="pt-6">
                <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8 h-full">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-red-500 rounded-md shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">On-Time Delivery</h3>
                    <p className="mt-5 text-base text-gray-500">
                      We meet all deadlines, even the tightest ones, with our express delivery options.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div id="how-it-works" className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Process</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              How It Works
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Get your custom paper in just a few simple steps
            </p>
          </div>

          <div className="mt-16">
            <div className="relative">
              {/* Vertical line */}
              <div className="hidden md:block absolute top-0 h-full w-0.5 bg-blue-200 left-1/2 transform -translate-x-1/2"></div>
              
              {/* Step 1 */}
              <div className="relative mb-16 md:flex items-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-500 text-white font-bold text-xl z-10 mx-auto md:mx-0">1</div>
                <div className="mt-4 md:mt-0 md:ml-12 md:w-1/2">
                  <h3 className="text-xl font-bold text-gray-900">Place Your Order</h3>
                  <p className="mt-2 text-gray-600">
                    Fill out the order form with your paper details, requirements, and deadline. The more detailed your instructions, the better!
                  </p>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="relative mb-16 md:flex items-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-500 text-white font-bold text-xl z-10 mx-auto md:mx-0">2</div>
                <div className="mt-4 md:mt-0 md:ml-12 md:w-1/2 md:mr-auto order-first">
                  <h3 className="text-xl font-bold text-gray-900">Make Payment</h3>
                  <p className="mt-2 text-gray-600">
                    Complete the secure payment process. Your funds are held in escrow and only released when you're satisfied with the work.
                  </p>
                </div>
              </div>
              
              {/* Step 3 */}
              <div className="relative mb-16 md:flex items-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-500 text-white font-bold text-xl z-10 mx-auto md:mx-0">3</div>
                <div className="mt-4 md:mt-0 md:ml-12 md:w-1/2">
                  <h3 className="text-xl font-bold text-gray-900">Track Progress</h3>
                  <p className="mt-2 text-gray-600">
                    Monitor the progress of your order and communicate directly with your writer through our messaging system.
                  </p>
                </div>
              </div>
              
              {/* Step 4 */}
              <div className="relative md:flex items-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-500 text-white font-bold text-xl z-10 mx-auto md:mx-0">4</div>
                <div className="mt-4 md:mt-0 md:ml-12 md:w-1/2 md:mr-auto order-first">
                  <h3 className="text-xl font-bold text-gray-900">Receive Your Paper</h3>
                  <p className="mt-2 text-gray-600">
                    Download your completed paper, review it, and request revisions if needed. We offer unlimited revisions until you're completely satisfied.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div id="pricing" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Pricing</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Simple, transparent pricing
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Choose the perfect plan for your academic needs
            </p>
          </div>

          <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0">
            {/* Standard Plan */}
            <div className="border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200">
              <div className="p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Standard</h3>
                <p className="mt-4">
                  <span className="text-4xl font-extrabold text-gray-900">$15</span>
                  <span className="text-base font-medium text-gray-500">/page</span>
                </p>
                <p className="mt-4 text-sm text-gray-500">Perfect for regular academic papers</p>
                <Link
                  href={user ? "/dashboard/orders/new" : "/auth/signup"}
                  className="mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium bg-blue-50 text-blue-700 hover:bg-blue-100"
                >
                  Get Started
                </Link>
              </div>
              <div className="px-6 pt-6 pb-8">
                <h4 className="text-xs font-medium text-gray-900 tracking-wide uppercase">What's included</h4>
                <ul className="mt-6 space-y-4">
                  <li className="flex">
                    <svg className="flex-shrink-0 h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="ml-3 text-base text-gray-500">Up to 10 pages</span>
                  </li>
                  <li className="flex">
                    <svg className="flex-shrink-0 h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="ml-3 text-base text-gray-500">Standard delivery (7 days)</span>
                  </li>
                  <li className="flex">
                    <svg className="flex-shrink-0 h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="ml-3 text-base text-gray-500">Free revisions (within 14 days)</span>
                  </li>
                  <li className="flex">
                    <svg className="flex-shrink-0 h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="ml-3 text-base text-gray-500">24/7 customer support</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Premium Plan */}
            <div className="border-2 border-blue-500 rounded-lg shadow-sm divide-y divide-gray-200">
              <div className="px-3 py-1 bg-blue-500 text-white text-sm font-medium text-center rounded-t-lg">
                Most Popular
              </div>
              <div className="p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Premium</h3>
                <p className="mt-4">
                  <span className="text-4xl font-extrabold text-gray-900">$25</span>
                  <span className="text-base font-medium text-gray-500">/page</span>
                </p>
                <p className="mt-4 text-sm text-gray-500">Ideal for urgent and complex papers</p>
                <Link
                  href={user ? "/dashboard/orders/new" : "/auth/signup"}
                  className="mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium bg-blue-600 text-white hover:bg-blue-700"
                >
                  Get Started
                </Link>
              </div>
              <div className="px-6 pt-6 pb-8">
                <h4 className="text-xs font-medium text-gray-900 tracking-wide uppercase">What's included</h4>
                <ul className="mt-6 space-y-4">
                  <li className="flex">
                    <svg className="flex-shrink-0 h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="ml-3 text-base text-gray-500">Up to 20 pages</span>
                  </li>
                  <li className="flex">
                    <svg className="flex-shrink-0 h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="ml-3 text-base text-gray-500">Express delivery (3 days)</span>
                  </li>
                  <li className="flex">
                    <svg className="flex-shrink-0 h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="ml-3 text-base text-gray-500">Free revisions (within 30 days)</span>
                  </li>
                  <li className="flex">
                    <svg className="flex-shrink-0 h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="ml-3 text-base text-gray-500">Priority customer support</span>
                  </li>
                  <li className="flex">
                    <svg className="flex-shrink-0 h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="ml-3 text-base text-gray-500">Plagiarism report</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Custom Plan */}
            <div className="border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200">
              <div className="p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Custom</h3>
                <p className="mt-4">
                  <span className="text-4xl font-extrabold text-gray-900">Custom</span>
                </p>
                <p className="mt-4 text-sm text-gray-500">Tailored to your specific needs</p>
                <Link
                  href={user ? "/dashboard/orders/new" : "/auth/signup"}
                  className="mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium bg-blue-50 text-blue-700 hover:bg-blue-100"
                >
                  Contact Us
                </Link>
              </div>
              <div className="px-6 pt-6 pb-8">
                <h4 className="text-xs font-medium text-gray-900 tracking-wide uppercase">What's included</h4>
                <ul className="mt-6 space-y-4">
                  <li className="flex">
                    <svg className="flex-shrink-0 h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="ml-3 text-base text-gray-500">Unlimited pages</span>
                  </li>
                  <li className="flex">
                    <svg className="flex-shrink-0 h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="ml-3 text-base text-gray-500">Flexible deadlines</span>
                  </li>
                  <li className="flex">
                    <svg className="flex-shrink-0 h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="ml-3 text-base text-gray-500">Dedicated writer</span>
                  </li>
                  <li className="flex">
                    <svg className="flex-shrink-0 h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="ml-3 text-base text-gray-500">24/7 VIP support</span>
                  </li>
                  <li className="flex">
                    <svg className="flex-shrink-0 h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="ml-3 text-base text-gray-500">Multiple revisions</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-12 bg-gray-50" id="testimonials">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Testimonials</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              What our clients say
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Don't just take our word for it
            </p>
          </div>

          <div className="mt-16">
            <div className="space-y-12 lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0">
              {/* Testimonial 1 */}
              <div className="relative p-8 bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="absolute -top-6 left-6">
                  <svg className="h-12 w-12 text-blue-100" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.016 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.016 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                </div>
                <div className="relative">
                  <p className="text-gray-600 mt-2">
                    "The quality of the research paper I received was outstanding. The writer followed all my instructions and delivered before the deadline. Will definitely use this service again!"
                  </p>
                  <div className="mt-6 flex items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-600 font-medium">JD</span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">John D.</p>
                      <p className="text-sm text-gray-500">MBA Student</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="relative p-8 bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="absolute -top-6 left-6">
                  <svg className="h-12 w-12 text-blue-100" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.016 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.016 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                </div>
                <div className="relative">
                  <p className="text-gray-600 mt-2">
                    "I was skeptical at first, but the writer exceeded my expectations. The essay was well-researched and original. The support team was very responsive to my revision requests."
                  </p>
                  <div className="mt-6 flex items-center">
                    <div className="h-10 w-10 rounded-full bg-pink-100 flex items-center justify-center">
                      <span className="text-pink-600 font-medium">SR</span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">Sarah M.</p>
                      <p className="text-sm text-gray-500">Undergraduate</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="relative p-8 bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="absolute -top-6 left-6">
                  <svg className="h-12 w-12 text-blue-100" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.016 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.016 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                </div>
                <div className="relative">
                  <p className="text-gray-600 mt-2">
                    "As a working professional pursuing my master's, I don't always have time for all my assignments. This service has been a lifesaver for me. The quality is consistently excellent."
                  </p>
                  <div className="mt-6 flex items-center">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-green-600 font-medium">DR</span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">David R.</p>
                      <p className="text-sm text-gray-500">Graduate Student</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="space-y-8 xl:col-span-1">
              <span className="text-white text-2xl font-bold">Crotonn<span className="text-blue-400">Writers</span></span>
              <p className="text-gray-300 text-sm">
                Your trusted partner for academic excellence. We help students achieve their academic goals with high-quality writing services.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Services</h3>
                  <ul className="mt-4 space-y-2">
                    <li><a href="#" className="text-gray-400 hover:text-white text-sm">Essay Writing</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white text-sm">Research Papers</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white text-sm">Dissertations</a></li>
                  </ul>
                </div>
                <div className="mt-12 md:mt-0">
                  <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Company</h3>
                  <ul className="mt-4 space-y-2">
                    <li><a href="#" className="text-gray-400 hover:text-white text-sm">About Us</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white text-sm">Our Writers</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white text-sm">Contact</a></li>
                  </ul>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Contact</h3>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-gray-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="ml-3 text-gray-400 text-sm">support@crotonnwriters.com</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-gray-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="ml-3 text-gray-400 text-sm">+1 (555) 123-4567</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-700 pt-8">
            <p className="text-gray-400 text-sm text-center">
              &copy; {new Date().getFullYear()} CrotonnWriters. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
