import { useState, useEffect } from 'react';
import { PageHeader, SectionHeader } from '../components/PageHeaders';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Package, TrendingUp, TrendingDown } from 'lucide-react';

export const Stock = () => {
  const [stock, setStock] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/src/data/products.json')
      .then(res => res.json())
      .then(json => {
        setStock(json.stock || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredStock = stock.filter(s => s.product.toLowerCase().includes(search.toLowerCase()) || s.sku.toLowerCase().includes(search.toLowerCase()));

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-8 max-w-[1600px] mx-auto bg-white min-h-screen">
      <PageHeader title="Stock Management" subtitle="Monitor and manage your inventory levels across branches" />
      <SectionHeader 
        title="Stock List" 
        count={filteredStock.length} 
        itemName="items" 
        onAdd={() => {}} 
        searchPlaceholder="Search by product name or SKU..." 
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
              <h3 className="text-2xl font-bold text-gray-900">{stock.filter(s => s.quantity <= 10 && s.quantity > 0).length}</h3>
            </div>
          </div>
        </div>
        <div className="bg-red-50 p-6 rounded-xl border border-red-100">
          <div className="flex items-center gap-4">
            <div className="bg-red-500 p-3 rounded-lg text-white">
              <TrendingDown className="w-6 h-6" />
            </div>
            <div>
              <p className="text-red-600 text-sm font-medium">Out of Stock</p>
              <h3 className="text-2xl font-bold text-gray-900">{stock.filter(s => s.quantity === 0).length}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="border border-gray-100 rounded-lg overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 font-semibold text-gray-900">Product</th>
              <th className="px-6 py-4 font-semibold text-gray-900">SKU</th>
              <th className="px-6 py-4 font-semibold text-gray-900">Branch</th>
              <th className="px-6 py-4 font-semibold text-gray-900">Quantity</th>
              <th className="px-6 py-4 font-semibold text-gray-900">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredStock.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">{item.product}</td>
                <td className="px-6 py-4 text-gray-400 font-mono text-xs uppercase tracking-wider">{item.sku}</td>
                <td className="px-6 py-4 text-gray-600">{item.branch}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900">{item.quantity}</span>
                    <span className="text-gray-400 text-xs uppercase font-bold">pcs</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    item.status === 'In Stock' ? 'bg-emerald-50 text-emerald-600' : 
                    item.status === 'Low Stock' ? 'bg-orange-50 text-orange-600' : 'bg-red-50 text-red-600'
                  }`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
