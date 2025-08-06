'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DocumentTextIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

type FormData = {
  title: string;
  description: string;
  subject: string;
  paperType: string;
  academicLevel: string;
  pages: number;
  deadline: string;
  agreeTerms: boolean;
};

export default function NewOrderPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    subject: '',
    paperType: 'Essay',
    academicLevel: 'University',
    pages: 1,
    deadline: '',
    agreeTerms: false,
  });

  const paperTypes = ['Essay', 'Research Paper', 'Case Study', 'Thesis', 'Other'];
  const academicLevels = ['High School', 'College', 'University', 'Masters', 'PhD'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'pages' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step < 3) {
      setStep(step + 1);
      return;
    }
    
    // Submit the form
    try {
      console.log('Submitting order:', formData);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push('/dashboard/client/orders?success=true');
    } catch (error) {
      console.error('Error submitting order:', error);
    }
  };

  const calculatePrice = () => {
    const basePrice = formData.pages * 15;
    const levelMultiplier = {
      'High School': 1,
      'College': 1.2,
      'University': 1.4,
      'Masters': 1.8,
      'PhD': 2.2
    }[formData.academicLevel] || 1;
    
    return (basePrice * levelMultiplier).toFixed(2);
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Order Details</h3>
        <p className="text-sm text-gray-500">Tell us about your paper requirements.</p>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Paper Title *</label>
          <input
            type="text"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            className="w-full rounded border-gray-300"
            placeholder="e.g., The Impact of AI on Education"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Description *</label>
          <textarea
            name="description"
            rows={3}
            required
            value={formData.description}
            onChange={handleChange}
            className="w-full rounded border-gray-300"
            placeholder="Provide a brief description..."
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Subject *</label>
            <input
              type="text"
              name="subject"
              required
              value={formData.subject}
              onChange={handleChange}
              className="w-full rounded border-gray-300"
              placeholder="e.g., Computer Science"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Type of Paper *</label>
            <select
              name="paperType"
              value={formData.paperType}
              onChange={handleChange}
              className="w-full rounded border-gray-300"
            >
              {paperTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Academic Level *</label>
            <select
              name="academicLevel"
              value={formData.academicLevel}
              onChange={handleChange}
              className="w-full rounded border-gray-300"
            >
              {academicLevels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Number of Pages *</label>
            <input
              type="number"
              name="pages"
              min="1"
              required
              value={formData.pages}
              onChange={handleChange}
              className="w-full rounded border-gray-300"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => {
    const today = new Date();
    const minDate = new Date(today);
    minDate.setDate(today.getDate() + 1);
    const minDateStr = minDate.toISOString().split('T')[0];
    
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Deadline</h3>
          <p className="text-sm text-gray-500">When do you need this by?</p>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Deadline *</label>
            <input
              type="date"
              name="deadline"
              required
              min={minDateStr}
              value={formData.deadline}
              onChange={handleChange}
              className="w-full rounded border-gray-300"
            />
            <p className="mt-1 text-xs text-gray-500">Minimum 24 hours from now</p>
          </div>
          
          <div className="bg-blue-50 p-4 rounded">
            <h4 className="font-medium text-blue-800 text-sm">
              Need it sooner?
            </h4>
            <p className="text-blue-700 text-sm mt-1">
              Contact support for urgent orders (less than 24 hours).
            </p>
          </div>
        </div>
      </div>
    );
  };

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Review & Submit</h3>
        <p className="text-sm text-gray-500">Please review your order details.</p>
      </div>
      
      <div className="border rounded-lg p-4">
        <h4 className="font-medium">{formData.title || 'Your Order'}</h4>
        <p className="text-sm text-gray-500">
          {formData.paperType} • {formData.academicLevel} • {formData.pages} page{formData.pages !== 1 ? 's' : ''}
        </p>
        
        <div className="mt-4 space-y-2 text-sm">
          <p><span className="text-gray-500">Subject:</span> {formData.subject}</p>
          <p><span className="text-gray-500">Deadline:</span> {formData.deadline ? new Date(formData.deadline).toLocaleDateString() : 'Not set'}</p>
          <p className="mt-4 font-medium">Estimated Price: ${calculatePrice()}</p>
        </div>
      </div>
      
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id="agreeTerms"
            name="agreeTerms"
            type="checkbox"
            required
            checked={formData.agreeTerms}
            onChange={(e) => setFormData(prev => ({ ...prev, agreeTerms: e.target.checked }))}
            className="h-4 w-4 rounded border-gray-300 text-blue-600"
          />
        </div>
        <label htmlFor="agreeTerms" className="ml-3 text-sm">
          I agree to the <a href="#" className="text-blue-600">Terms of Service</a>
        </label>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">New Order</h1>
        <p className="text-sm text-gray-500">
          Fill out the form to place a new order.
        </p>
      </div>
      
      {/* Progress Steps */}
      <div className="flex justify-between max-w-md mx-auto">
        {[1, 2, 3].map((stepNum) => (
          <div key={stepNum} className="flex flex-col items-center">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
              step >= stepNum ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              {step > stepNum ? <CheckCircleIcon className="h-5 w-5" /> : stepNum}
            </div>
            <span className="text-xs mt-1">
              {['Details', 'Deadline', 'Review'][stepNum - 1]}
            </span>
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        
        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={() => step > 1 && setStep(step - 1)}
            disabled={step === 1}
            className={`px-4 py-2 rounded ${step === 1 ? 'bg-gray-100 text-gray-400' : 'bg-white border hover:bg-gray-50'}`}
          >
            Previous
          </button>
          
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {step === 3 ? 'Place Order' : 'Next'}
          </button>
        </div>
      </form>
    </div>
  );
}
