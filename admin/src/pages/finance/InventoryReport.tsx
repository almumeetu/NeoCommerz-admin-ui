import { useState, useEffect } from 'react';
import { Search, Filter, Download, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ChevronDown } from 'lucide-react';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import clsx from 'clsx';

export const InventoryReport = () => {
  const [activeTab, setActiveTab] = useState('Out of stock');
  const [data, setData] = useState<any[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  const tabs = ['Out of stock', 'Low', 'New', 'Add'];

  useEffect(() => {
    fetch('/src/data/finance.json')
      .then(res => res.json())
      .then(json => {
        setData(json.inventoryReport.rows);
        setSummary(json.inventoryReport.summary);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredData = data.filter(item => 
    item.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-8 max-w-[1600px] mx-auto bg-white min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">Inventory Report</h1>
        <p className="text-sm text-gray-500 font-medium">Overview of your products and stocks.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Products', value: summary?.totalProducts },
          { label: 'In Stock', value: summary?.inStock },
          { label: 'Low Stock Products', value: summary?.lowStock },
          { label: 'Out of stock Products', value: summary?.outOfStock },
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:border-emerald-100 transition-all group">
            <p className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">{stat.label}</p>
            <h3 className="text-2xl font-black text-gray-900 group-hover:text-emerald-600 transition-colors">
              {stat.value}
            </h3>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-bold text-gray-900">Stock Summary</h3>
          <span className="text-xs text-gray-400 font-bold bg-gray-50 px-2 py-0.5 rounded-full border border-gray-100">{filteredData.length} Items</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search by product or SKU..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm w-64 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all"
            />
          </div>
          <button className="p-2 border border-gray-200 rounded-xl text-gray-400 hover:text-emerald-600 hover:border-emerald-100 transition-all"><Filter className="w-4 h-4" /></button>
          <button className="p-2 border border-gray-200 rounded-xl text-gray-400 hover:text-emerald-600 hover:border-emerald-100 transition-all"><Download className="w-4 h-4" /></button>
        </div>
      </div>

      <div className="flex items-center gap-6 border-b border-gray-100 mb-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={clsx(
              "pb-4 text-sm font-bold transition-all relative whitespace-nowrap",
              tab === 'Add' ? "text-emerald-600 flex items-center gap-1" : 
              activeTab === tab ? "text-emerald-600" : "text-gray-400 hover:text-gray-600"
            )}
          >
            {tab === 'Add' && <span className="text-lg">+</span>}
            {tab}
            {activeTab === tab && tab !== 'Add' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600"></div>
            )}
          </button>
        ))}
      </div>

      <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 font-bold text-gray-900">Product</th>
              <th className="px-6 py-4 font-bold text-gray-900">Opening</th>
              <th className="px-6 py-4 font-bold text-gray-900">Sold</th>
              <th className="px-6 py-4 font-bold text-gray-900">Closing</th>
              <th className="px-6 py-4 font-bold text-gray-900">Stock Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors group">
                <td className="px-6 py-4">
                  <p className="text-gray-900 font-bold group-hover:text-emerald-600 transition-colors">{item.product}</p>
                  <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider font-mono">{item.sku}</p>
                </td>
                <td className="px-6 py-4 text-gray-600 font-medium">{item.openingStock}</td>
                <td className="px-6 py-4 text-gray-600 font-medium">{item.sold}</td>
                <td className="px-6 py-4">
                   <span className={clsx("font-black", item.closingStock <= 5 ? "text-red-500" : "text-gray-900")}>
                     {item.closingStock}
                   </span>
                </td>
                <td className="px-6 py-4 font-black text-gray-900">{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-6 px-2">
        <div className="flex items-center gap-2">
           <span className="text-xs font-bold text-gray-400">Items per page:</span>
           <select className="border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-bold text-gray-600 focus:outline-none appearance-none pr-8 relative bg-white">
             <option>25</option>
             <option>50</option>
             <option>100</option>
           </select>
           <ChevronDown className="w-3 h-3 text-gray-400 -ml-7 z-10 pointer-events-none" />
        </div>
        
        <div className="flex items-center gap-1">
          <button className="p-2 text-gray-400 hover:text-emerald-600 transition-colors"><ChevronsLeft className="w-4 h-4" /></button>
          <button className="p-2 text-gray-400 hover:text-emerald-600 transition-colors"><ChevronLeft className="w-4 h-4" /></button>
          <button className="w-8 h-8 flex items-center justify-center bg-emerald-600 text-white rounded-lg text-xs font-bold shadow-lg shadow-emerald-600/20">1</button>
          <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:bg-gray-100 rounded-lg text-xs font-bold transition-all">2</button>
          <button className="p-2 text-gray-400 hover:text-emerald-600 transition-colors"><ChevronRight className="w-4 h-4" /></button>
          <button className="p-2 text-gray-400 hover:text-emerald-600 transition-colors"><ChevronsRight className="w-4 h-4" /></button>
        </div>
      </div>
    </div>
  );
};
