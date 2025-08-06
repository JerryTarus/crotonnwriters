import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { getCurrentUser } from '@/lib/utils/auth';
import { PaperAirplaneIcon, PaperClipIcon, CheckCircleIcon, ClockIcon, DocumentTextIcon, UserCircleIcon } from '@heroicons/react/24/outline';

// Mock data for order details - in a real app, this would come from your database
const mockOrder = {
  id: '123',
  title: 'Research Paper on AI Ethics',
  description: 'A comprehensive research paper discussing the ethical implications of artificial intelligence in modern society.',
  status: 'In Progress',
  subject: 'Computer Science',
  paperType: 'Research Paper',
  academicLevel: 'University',
  pages: 5,
  format: 'APA',
  spacing: 'double',
  deadline: '2023-12-15',
  price: 120.00,
  writer: {
    id: 'w1',
    name: 'Alex Johnson',
    rating: 4.8,
    completedOrders: 142,
  },
  createdAt: '2023-11-20T10:30:00Z',
  updatedAt: '2023-11-25T14:15:00Z',
  messages: [
    {
      id: 'm1',
      sender: 'client',
      content: 'Hi, I was wondering if you had any questions about the requirements?',
      timestamp: '2023-11-20T11:45:00Z',
    },
    {
      id: 'm2',
      sender: 'writer',
      content: 'Hello! I\'ve reviewed your requirements and just wanted to confirm the deadline is December 15th?',
      timestamp: '2023-11-20T12:15:00Z',
    },
    {
      id: 'm3',
      sender: 'client',
      content: 'Yes, that\'s correct. The deadline is December 15th at 11:59 PM EST.',
      timestamp: '2023-11-20T12:30:00Z',
    },
  ],
  files: [
    { name: 'assignment_instructions.pdf', url: '#', type: 'pdf', size: '2.4 MB' },
    { name: 'reference_material.docx', url: '#', type: 'docx', size: '1.1 MB' },
  ],
  progress: 60,
  progressUpdates: [
    { status: 'Draft', date: '2023-11-22', description: 'Initial draft completed' },
    { status: 'Research', date: '2023-11-20', description: 'Research phase started' },
    { status: 'Assigned', date: '2023-11-18', description: 'Order assigned to writer' },
  ],
};

export default async function OrderDetailPage({ params }: { params: { id: string } }) {
  const user = await getCurrentUser();
  if (!user) {
    return notFound();
  }

  // In a real app, you would fetch the order from your database
  // const { data: order } = await supabase
  //   .from('orders')
  //   .select('*')
  //   .eq('id', params.id)
  //   .single();
  
  // if (!order) {
  //   return notFound();
  // }
  
  // For now, we'll use mock data
  const order = { ...mockOrder, id: params.id };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Order #{order.id}</h1>
          <p className="text-gray-600">{order.title}</p>
        </div>
        <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full">
          {order.status === 'Completed' ? (
            <CheckCircleIcon className="h-5 w-5" />
          ) : (
            <ClockIcon className="h-5 w-5" />
          )}
          <span className="font-medium">{order.status}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Order Details</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Description</h3>
                <p className="mt-1">{order.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Subject</h3>
                  <p>{order.subject}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Type</h3>
                  <p>{order.paperType}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Pages</h3>
                  <p>{order.pages}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Format</h3>
                  <p>{order.format} / {order.spacing} spaced</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Deadline</h3>
                  <p>{formatDate(order.deadline)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Price</h3>
                  <p className="font-semibold">${order.price.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold">Messages</h2>
            </div>
            
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {order.messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex ${message.sender === 'client' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-xs lg:max-w-md rounded-lg p-4 ${
                      message.sender === 'client' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100'
                    }`}
                  >
                    <p>{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'client' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {formatDate(message.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t">
              <form className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                  type="button"
                  className="p-2 text-gray-500 hover:text-gray-700"
                >
                  <PaperClipIcon className="h-5 w-5" />
                </button>
                <button 
                  type="submit"
                  className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <PaperAirplaneIcon className="h-5 w-5" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Writer Info */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Assigned Writer</h2>
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                <UserCircleIcon className="h-8 w-8 text-gray-400" />
              </div>
              <div>
                <h3 className="font-medium">{order.writer.name}</h3>
                <div className="flex items-center text-sm text-yellow-600">
                  <span>★</span>
                  <span>{order.writer.rating}</span>
                  <span className="text-gray-500 ml-1">({order.writer.completedOrders} orders)</span>
                </div>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                Message Writer
              </button>
              <button className="w-full border border-gray-300 py-2 rounded-lg hover:bg-gray-50">
                Request Revision
              </button>
            </div>
          </div>

          {/* Files */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Files</h2>
            <div className="space-y-2">
              {order.files.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                  <div className="flex items-center space-x-2">
                    <DocumentTextIcon className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium">{file.name}</p>
                      <p className="text-xs text-gray-500">{file.size}</p>
                    </div>
                  </div>
                  <a 
                    href={file.url} 
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    download
                  >
                    Download
                  </a>
                </div>
              ))}
              <button className="w-full mt-2 text-center text-sm text-blue-600 hover:text-blue-800 font-medium">
                + Upload Files
              </button>
            </div>
          </div>

          {/* Progress */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Order Progress</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>{order.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${order.progress}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="space-y-4 mt-6">
                {order.progressUpdates.map((update, index) => (
                  <div key={index} className="relative pl-6 pb-4">
                    {index < order.progressUpdates.length - 1 && (
                      <div className="absolute left-2.5 top-2.5 h-full w-0.5 bg-gray-200"></div>
                    )}
                    <div className="absolute left-0 top-0 h-2 w-2 rounded-full bg-blue-600"></div>
                    <div className="text-sm">
                      <p className="font-medium">{update.status}</p>
                      <p className="text-gray-500">{update.description}</p>
                      <p className="text-xs text-gray-400 mt-1">{formatDate(update.date)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
