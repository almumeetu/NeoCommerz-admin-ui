import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { PageHeader, SectionHeader } from '../components/PageHeaders';
import { Eye, Printer } from 'lucide-react';

const initialOrders = [
  { id: '#ORD-001', customer: 'John Doe', date: '2026-04-20', total: '৳12,000', status: 'new' },
  { id: '#ORD-002', customer: 'Sarah Khan', date: '2026-04-21', total: '৳5,500', status: 'completed' },
  { id: '#ORD-003', customer: 'Imran Hossain', date: '2026-04-22', total: '৳22,300', status: 'canceled' },
];

export const Orders = () => {
  const { status } = useParams();
  const [orders] = useState(initialOrders);
  const [search, setSearch] = useState('');

  const filteredOrders = orders.filter(o => {
    const matchesSearch = o.customer.toLowerCase().includes(search.toLowerCase()) || o.id.includes(search);
    const matchesStatus = status ? o.status === status.replace('-orders', '') : true;
    return matchesSearch && matchesStatus;
  });

  const getStatusStyle = (s: string) => {
    switch(s) {
      case 'new': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'completed': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'canceled': return 'bg-red-50 text-red-600 border-red-100';
      default: return 'bg-gray-50 text-gray-600 border-gray-100';
    }
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto bg-white min-h-screen">
      <PageHeader 
        title={status ? `${status.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')}` : "All Orders"} 
        subtitle="Manage your e-commerce customer orders" 
      />
      <SectionHeader 
        title="Order List" 
        count={filteredOrders.length} 
        itemName="orders" 
        onAdd={() => {}} 
        searchPlaceholder="Search by ID or customer..." 
        searchValue={search}
        onSearchChange={setSearch}
      />

      <div className="border border-gray-100 rounded-lg overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 font-semibold text-gray-900">Order ID</th>
              <th className="px-6 py-4 font-semibold text-gray-900">Customer</th>
              <th className="px-6 py-4 font-semibold text-gray-900">Date</th>
              <th className="px-6 py-4 font-semibold text-gray-900">Total</th>
              <th className="px-6 py-4 font-semibold text-gray-900">Status</th>
              <th className="px-6 py-4 font-semibold text-gray-900 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-bold text-emerald-600">{order.id}</td>
                <td className="px-6 py-4 font-medium text-gray-900">{order.customer}</td>
                <td className="px-6 py-4 text-gray-500">{order.date}</td>
                <td className="px-6 py-4 font-bold text-gray-900">{order.total}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-md border text-[10px] font-bold uppercase tracking-wider ${getStatusStyle(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors"><Eye className="w-4 h-4" /></button>
                    <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"><Printer className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
