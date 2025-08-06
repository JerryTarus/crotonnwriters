import Link from 'next/link';
import { PlusIcon, DocumentTextIcon, ClockIcon, CheckCircleIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import { getCurrentUser } from '@/lib/utils/auth';
import { createClient } from '@/lib/supabase/server';

export default async function ClientDashboard() {
  const user = await getCurrentUser();
  const supabase = createClient();
  
  // In a real app, you would fetch this data from your database
  // For now, we'll use mock data
  const stats = [
    { name: 'Total Orders', value: '12', icon: DocumentTextIcon },
    { name: 'In Progress', value: '3', icon: ClockIcon, color: 'text-yellow-500' },
    { name: 'Completed', value: '8', icon: CheckCircleIcon, color: 'text-green-500' },
    { name: 'Messages', value: '5', icon: ChatBubbleLeftRightIcon, color: 'text-blue-500' },
  ];

  const recentOrders = [
    { id: 1, title: 'Research Paper on AI Ethics', status: 'In Progress', dueDate: '2023-12-15', price: '$120' },
    { id: 2, title: 'Case Study Analysis', status: 'Completed', dueDate: '2023-11-30', price: '$85' },
    { id: 3, title: 'Literature Review', status: 'In Progress', dueDate: '2023-12-20', price: '$150' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.user_metadata?.full_name?.split(' ')[0] || 'Client'}!</h1>
        <p className="mt-1 text-sm text-gray-500">Here's what's happening with your orders.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className={`flex-shrink-0 rounded-md p-3 ${stat.color ? stat.color : 'bg-gray-500 text-white'}`}>
                  <stat.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Quick Actions</h3>
          <div className="mt-5 flex flex-col sm:flex-row gap-3">
            <Link
              href="/dashboard/client/orders/new"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              New Order
            </Link>
            <Link
              href="/dashboard/client/orders"
              className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <DocumentTextIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
              View All Orders
            </Link>
            <Link
              href="/dashboard/client/messages"
              className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <ChatBubbleLeftRightIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
              Messages
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Orders</h3>
          <Link href="/dashboard/client/orders" className="text-sm font-medium text-blue-600 hover:text-blue-500">
            View all
          </Link>
        </div>
        <div className="border-t border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Action</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{order.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${order.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(order.dueDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link href={`/dashboard/client/orders/${order.id}`} className="text-blue-600 hover:text-blue-900">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
