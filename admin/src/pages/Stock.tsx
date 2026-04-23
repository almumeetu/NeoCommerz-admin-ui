import { useState } from 'react';
import { PageHeader, SectionHeader } from '../components/PageHeaders';
import { Package, TrendingUp, TrendingDown } from 'lucide-react';

const initialStock = [
  { id: 1, name: 'Smart Watch Series 7', category: 'Watch', currentStock: 12, minStock: 5, unit: 'pcs' },
  { id: 2, name: 'Logitech G Pro Keyboard', category: 'Computer Accessories', currentStock: 8, minStock: 10, unit: 'pcs' },
  { id: 3, name: 'Sony WH-1000XM4', category: 'Gadgets', currentStock: 5, minStock: 2, unit: 'pcs' },
];

export const Stock = () => {
  const [stock] = useState(initialStock);
  const [search, setSearch] = useState('');

  const filteredStock = stock.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-8 max-w-[1600px] mx-auto bg-white min-h-screen">
      <PageHeader title="Stock Management" subtitle="Monitor and manage your inventory levels" />
      <SectionHeader 
        title="Stock List" 
        count={filteredStock.length} 
        itemName="items" 
        onAdd={() => {}} 
        searchPlaceholder="Search items..." 
        searchValue={search}
        onSearchChange={setSearch}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
          <div className="flex items-center gap-4">
            <div className="bg-emerald-500 p-3 rounded-lg text-white">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <p className="text-emerald-600 text-sm font-medium">Total Items</p>
              <h3 className="text-2xl font-bold text-gray-900">{stock.length}</h3>
            </div>
          </div>
        </div>
        <div className="bg-orange-50 p-6 rounded-xl border border-orange-100">
          <div className="flex items-center gap-4">
            <div className="bg-orange-500 p-3 rounded-lg text-white">
              <TrendingDown className="w-6 h-6" />
            </div>
            <div>
              <p className="text-orange-600 text-sm font-medium">Low Stock</p>
              <h3 className="text-2xl font-bold text-gray-900">{stock.filter(s => s.currentStock <= s.minStock).length}</h3>
            </div>
          </div>
        </div>
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
          <div className="flex items-center gap-4">
            <div className="bg-blue-500 p-3 rounded-lg text-white">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-blue-600 text-sm font-medium">In Stock</p>
              <h3 className="text-2xl font-bold text-gray-900">{stock.filter(s => s.currentStock > s.minStock).length}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="border border-gray-100 rounded-lg overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 font-semibold text-gray-900">Item Name</th>
              <th className="px-6 py-4 font-semibold text-gray-900">Category</th>
              <th className="px-6 py-4 font-semibold text-gray-900">Current Stock</th>
              <th className="px-6 py-4 font-semibold text-gray-900">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredStock.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                <td className="px-6 py-4 text-gray-600">{item.category}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900">{item.currentStock}</span>
                    <span className="text-gray-400 text-xs uppercase font-bold">{item.unit}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {item.currentStock <= item.minStock ? (
                    <span className="px-2 py-1 bg-red-50 text-red-600 rounded-full text-[10px] font-bold uppercase tracking-wider">Low Stock</span>
                  ) : (
                    <span className="px-2 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold uppercase tracking-wider">Healthy</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
