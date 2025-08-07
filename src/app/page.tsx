
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import {
  ChevronRightIcon,
  CheckIcon,
  StarIcon,
  AcademicCapIcon,
  ClockIcon,
  ShieldCheckIcon,
  PencilIcon,
  ChartBarIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  UserIcon
} from '@heroicons/react/24/solid';

export default function Home() {
  const { user, loading } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading || !mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <PencilIcon className="h-8 w-8 text-blue-600 mr-2" />
              <span className="text-2xl font-bold text-gray-900">Crotonn Writers</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-gray-600 hover:text-blue-600 transition-colors">Services</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors">How It Works</a>
              <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors">Pricing</a>
              <a href="#testimonials" className="text-gray-600 hover:text-blue-600 transition-colors">Reviews</a>
            </div>

            <div className="flex items-center space-x-4">
              {user ? (
                <Link
                  href="/dashboard"
                  className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition-colors"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 overflow-hidden pt-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              Premium Academic
              <span className="block text-blue-200">Writing Services</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              Expert writers delivering exceptional essays, research papers, and dissertations.
              100% original content with guaranteed on-time delivery and 24/7 support.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Link
                href={user ? "/dashboard/client/orders/new" : "/auth/signup"}
                className="group bg-white text-blue-700 px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-all duration-300 flex items-center shadow-xl"
              >
                Place Your Order Now
                <ChevronRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#how-it-works"
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-700 transition-all duration-300"
              >
                See How It Works
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-blue-100">
              <div className="flex items-center">
                <CheckIcon className="w-5 h-5 mr-2" />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center">
                <CheckIcon className="w-5 h-5 mr-2" />
                <span>100% Plagiarism Free</span>
              </div>
              <div className="flex items-center">
                <CheckIcon className="w-5 h-5 mr-2" />
                <span>On-Time Delivery</span>
              </div>
              <div className="flex items-center">
                <CheckIcon className="w-5 h-5 mr-2" />
                <span>Money Back Guarantee</span>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Bar */}
        <div className="bg-white/10 backdrop-blur-sm border-t border-white/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-white">10,000+</div>
                <div className="text-blue-200">Papers Delivered</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">500+</div>
                <div className="text-blue-200">Expert Writers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">98%</div>
                <div className="text-blue-200">Client Satisfaction</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">4.9/5</div>
                <div className="text-blue-200">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get your academic paper in three simple steps. Our streamlined process ensures quality results every time.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Place Your Order",
                description: "Fill out our detailed order form with your requirements, deadline, academic level, and upload any supporting materials or instructions.",
                icon: DocumentTextIcon
              },
              {
                step: "02",
                title: "Expert Writer Assigned",
                description: "We match your order with our best writer in your subject area based on expertise, qualifications, and availability.",
                icon: UserIcon
              },
              {
                step: "03",
                title: "Receive Quality Work",
                description: "Get your completed work on time, thoroughly reviewed for quality, originality, and adherence to your requirements.",
                icon: CheckIcon
              }
            ].map((step, index) => (
              <div key={index} className="text-center relative group">
                <div className="bg-blue-600 text-white w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 group-hover:bg-blue-700 transition-colors">
                  {step.step}
                </div>
                <step.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
                {index < 2 && (
                  <ChevronRightIcon className="w-8 h-8 text-blue-300 absolute top-8 -right-4 hidden lg:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Writing Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive academic writing solutions across all disciplines and academic levels
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: AcademicCapIcon,
                title: "Essays & Research Papers",
                description: "Custom essays, research papers, and academic assignments across all subjects",
                features: ["APA/MLA/Chicago/Harvard Style", "Any Academic Level", "Original Content", "Proper Citations"],
                popular: true
              },
              {
                icon: ChartBarIcon,
                title: "Dissertations & Thesis",
                description: "Comprehensive research and writing support for graduate and PhD students",
                features: ["Chapter-by-Chapter Support", "Literature Review", "Data Analysis", "Defense Preparation"]
              },
              {
                icon: PencilIcon,
                title: "Editing & Proofreading",
                description: "Professional editing services to perfect your academic writing",
                features: ["Grammar & Style Check", "Structure Enhancement", "Citation Formatting", "Plagiarism Check"]
              },
              {
                icon: DocumentTextIcon,
                title: "Case Studies",
                description: "In-depth case study analysis and writing for business and academic purposes",
                features: ["Industry Analysis", "Problem-Solution Format", "Data Integration", "Professional Formatting"]
              },
              {
                icon: ChartBarIcon,
                title: "Lab Reports",
                description: "Scientific lab reports with proper methodology and analysis",
                features: ["Scientific Writing", "Data Presentation", "Results Analysis", "Technical Accuracy"]
              },
              {
                icon: UserGroupIcon,
                title: "Admission Essays",
                description: "Compelling personal statements and admission essays for college applications",
                features: ["Personal Branding", "Unique Storytelling", "Requirements Matching", "Multiple Drafts"]
              }
            ].map((service, index) => (
              <div key={index} className={`bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 relative ${service.popular ? 'ring-2 ring-blue-500' : ''}`}>
                {service.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <service.icon className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-600">
                      <CheckIcon className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Estimator */}
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Transparent Pricing</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Fair, competitive prices with no hidden fees. Calculate your price instantly.
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 mb-12">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Price Calculator</h3>
              <p className="text-gray-600">Get an instant quote for your project</p>
            </div>

            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Academic Level</label>
                <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>High School</option>
                  <option>Undergraduate</option>
                  <option>Masters</option>
                  <option>PhD</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Deadline</label>
                <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>3 hours</option>
                  <option>6 hours</option>
                  <option>12 hours</option>
                  <option>24 hours</option>
                  <option>2 days</option>
                  <option>3 days</option>
                  <option>7 days</option>
                  <option>14 days</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pages</label>
                <input type="number" min="1" defaultValue="1" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div className="flex items-end">
                <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Calculate Price
                </button>
              </div>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center bg-white rounded-lg px-8 py-4 shadow-lg">
                <CurrencyDollarIcon className="w-8 h-8 text-green-500 mr-3" />
                <div className="text-left">
                  <div className="text-sm text-gray-500">Estimated Price</div>
                  <div className="text-2xl font-bold text-gray-900">$25.99</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Standard Quality",
                price: "$12.99",
                description: "High-quality academic writing",
                features: ["Experienced Writers", "On-time Delivery", "Free Revisions", "24/7 Support"]
              },
              {
                title: "Premium Quality",
                price: "$18.99",
                description: "Top-tier writing with advanced research",
                features: ["Top 10% Writers", "Advanced Research", "Priority Support", "Free Formatting"],
                popular: true
              },
              {
                title: "Platinum Quality",
                price: "$25.99",
                description: "Exceptional quality with PhD writers",
                features: ["PhD Writers Only", "Comprehensive Research", "VIP Support", "Free Bibliography"]
              }
            ].map((plan, index) => (
              <div key={index} className={`rounded-2xl p-8 ${plan.popular ? 'bg-blue-600 text-white relative' : 'bg-white border border-gray-200'}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <div className="text-center">
                  <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>{plan.title}</h3>
                  <div className={`text-4xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-blue-600'}`}>
                    {plan.price}
                    <span className="text-lg font-normal">/page</span>
                  </div>
                  <p className={`mb-6 ${plan.popular ? 'text-blue-100' : 'text-gray-600'}`}>{plan.description}</p>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <CheckIcon className={`w-5 h-5 mr-3 ${plan.popular ? 'text-blue-200' : 'text-green-500'}`} />
                      <span className={plan.popular ? 'text-white' : 'text-gray-600'}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/auth/signup"
                  className={`block text-center py-3 px-6 rounded-lg font-semibold transition-colors ${
                    plan.popular 
                      ? 'bg-white text-blue-600 hover:bg-gray-100' 
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">What Our Clients Say</h2>
            <div className="flex justify-center items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="w-6 h-6 text-yellow-400" />
              ))}
              <span className="text-white ml-3 text-xl font-semibold">4.9/5 from 2,500+ reviews</span>
            </div>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Join thousands of satisfied students who have achieved academic success with our help
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Graduate Student, Harvard",
                content: "Exceptional quality and delivered exactly on time. The research was thorough, the writing was perfect, and the formatting was flawless. Highly recommend!",
                rating: 5
              },
              {
                name: "Michael Chen",
                role: "PhD Candidate, MIT",
                content: "Outstanding dissertation help. The writer understood my requirements perfectly and delivered beyond expectations. The level of research was impressive.",
                rating: 5
              },
              {
                name: "Emma Davis",
                role: "University Student, Stanford",
                content: "Professional, reliable, and high-quality work. The customer service was excellent and they kept me updated throughout. Will definitely use again.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="w-4 h-4 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <UserIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Excel in Your Studies?</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Join thousands of satisfied students who trust us with their academic success. 
            Get expert help with your assignments today and achieve the grades you deserve.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
            <Link
              href={user ? "/dashboard/client/orders/new" : "/auth/signup"}
              className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition-colors shadow-xl"
            >
              Place Your Order Now
              <ChevronRightIcon className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="/auth/login"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300"
            >
              Sign In to Account
            </Link>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-300">
            <div className="flex items-center">
              <ShieldCheckIcon className="w-5 h-5 mr-2 text-green-400" />
              <span>Secure & Confidential</span>
            </div>
            <div className="flex items-center">
              <ClockIcon className="w-5 h-5 mr-2 text-blue-400" />
              <span>Fast Turnaround</span>
            </div>
            <div className="flex items-center">
              <CurrencyDollarIcon className="w-5 h-5 mr-2 text-yellow-400" />
              <span>Money Back Guarantee</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center mb-4">
                <PencilIcon className="h-8 w-8 text-blue-400 mr-2" />
                <span className="text-2xl font-bold">Crotonn Writers</span>
              </div>
              <p className="text-gray-300 mb-4">
                Premium academic writing services with expert writers and guaranteed quality. 
                Helping students achieve academic excellence since 2020.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold">f</span>
                </div>
                <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold">t</span>
                </div>
                <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold">in</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Essay Writing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Research Papers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Dissertations</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Thesis Writing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Editing & Proofreading</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Our Writers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Quality Guarantee</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Reviews</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">24/7 Live Chat</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">&copy; 2025 Crotonn Writers. All rights reserved.</p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <span className="text-gray-400 text-sm">We accept:</span>
              <div className="flex space-x-2">
                <div className="w-8 h-5 bg-blue-600 rounded text-xs flex items-center justify-center">VISA</div>
                <div className="w-8 h-5 bg-red-600 rounded text-xs flex items-center justify-center">MC</div>
                <div className="w-8 h-5 bg-blue-800 rounded text-xs flex items-center justify-center">PP</div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
