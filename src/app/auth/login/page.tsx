
'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'react-hot-toast';
import { EyeIcon, EyeSlashIcon, PencilIcon } from '@heroicons/react/24/outline';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') || '/dashboard';
  const error = searchParams.get('error');

  if (error) {
    toast.error(error);
    router.replace('/auth/login');
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      setIsLoading(true);
      await signIn(email, password);
      toast.success('Welcome back!');
      router.push(redirectTo);
    } catch (error: any) {
      toast.error(error.message || 'Failed to sign in');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Brand */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <div className="flex items-center mb-8">
            <PencilIcon className="h-12 w-12 text-white mr-4" />
            <span className="text-4xl font-bold">Crotonn Writers</span>
          </div>
          
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Welcome Back to
            <span className="block text-blue-200">Excellence</span>
          </h1>
          
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Continue your journey with premium academic writing services. 
            Your success story continues here.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center text-blue-100">
              <div className="w-2 h-2 bg-blue-300 rounded-full mr-3"></div>
              <span>Access your personalized dashboard</span>
            </div>
            <div className="flex items-center text-blue-100">
              <div className="w-2 h-2 bg-blue-300 rounded-full mr-3"></div>
              <span>Track your orders in real-time</span>
            </div>
            <div className="flex items-center text-blue-100">
              <div className="w-2 h-2 bg-blue-300 rounded-full mr-3"></div>
              <span>Direct communication with expert writers</span>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-blue-300/20 rounded-full blur-2xl"></div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex flex-col justify-center py-12 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start mb-8 lg:hidden">
              <PencilIcon className="h-8 w-8 text-blue-600 mr-2" />
              <span className="text-2xl font-bold text-gray-900">Crotonn Writers</span>
            </div>
            
            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              Sign In
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Welcome back! Please sign in to your account
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-lg"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-lg"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                  Forgot password?
                </a>
              </div>
            </div>

            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:ring-blue-100 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>

            <div className="text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link
                  href="/auth/signup"
                  className="font-semibold text-blue-600 hover:text-blue-500 transition-colors"
                >
                  Create Account
                </Link>
              </p>
            </div>
          </form>

          <div className="mt-8 text-center text-sm text-gray-500">
            <p>By signing in, you agree to our</p>
            <div className="space-x-4 mt-1">
              <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>
              <span>&</span>
              <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
