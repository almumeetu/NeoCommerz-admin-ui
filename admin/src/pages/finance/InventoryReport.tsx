import { useState } from 'react';
import { Search, Filter, Download, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ChevronDown } from 'lucide-react';
import clsx from 'clsx';

const inventoryData = [
  { name: 'Samsung Galaxy 32GB - 3GB - Black {PHOBLA3GB32G495}', supplier: 'Unknown Supplier Company', inventory: 1000, price: '৳7,890.00', status: 'In-Stock' },
  { name: 'Samsung Galaxy 3GB - 64GB - Black {PHOBLA3GB64GCDF}', supplier: 'Unknown Supplier Company', inventory: 1000, price: '৳7,890.00', status: 'In-Stock' },
  { name: 'Samsung Galaxy 32GB - 4GB - Black {PHOBLA4GB32G233}', supplier: 'Unknown Supplier Company', inventory: 1000, price: '৳7,890.00', status: 'In-Stock' },
  { name: 'Samsung Galaxy 4GB - 64GB - Black {PHOBLA4GB64G1C5}', supplier: 'Unknown Supplier Company', inventory: 1000, price: '৳7,890.00', status: 'In-Stock' },
  { name: 'Samsung Galaxy 32GB - 3GB - Blue {PHOBLU3GB32G0S8}', supplier: 'Unknown Supplier Company', inventory: 1000, price: '৳7,890.00', status: 'In-Stock' },
  { name: 'Samsung Galaxy 3GB - 64GB - Blue {PHOBLU3GB64G587}', supplier: 'Unknown Supplier Company', inventory: 1000, price: '৳7,890.00', status: 'In-Stock' },
  { name: 'Samsung Galaxy 32GB - 4GB - Blue {PHOBLU4GB32GFDE}', supplier: 'Unknown Supplier Company', inventory: 1000, price: '৳7,890.00', status: 'In-Stock' },
  { name: 'Samsung Galaxy 4GB - 64GB - Blue {PHOBLU4GB64G4AB}', supplier: 'Unknown Supplier Company', inventory: 1000, price: '৳7,890.00', status: 'In-Stock' },
  { name: 'iPhone 17 Pro Max 256GB - 8GB - Blue {PHOBLU8GB256E188}', supplier: 'Unknown Supplier Company', inventory: 1000, price: '৳90,000.00', status: 'In-Stock' },
  { name: 'iPhone 17 Pro Max 512GB - 8GB - Blue {PHOBLU8GB512275}', supplier: 'Unknown Supplier Company', inventory: 1000, price: '৳90,000.00', status: 'In-Stock' },
];

export const InventoryReport = () => {
  const [activeTab, setActiveTab] = useState('Out of stock');
  
  const tabs = ['Out of stock', 'Low', 'New', 'Add'];

  return (
    <div className="p-8 max-w-[1600px] mx-auto bg-white min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">Inventory Report</h1>
        <p className="text-sm text-gray-500">Overview of your products and stocks.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Inventory value', value: '৳**************' },
          { label: 'Total Product Stock', value: '47200' },
          { label: 'Low Stock Products', value: '0' },
          { label: 'Out of stock Products', value: '0' },
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-gray-100 p-6 rounded-lg shadow-sm">
            <p className="text-xs font-semibold text-gray-500 mb-2">{stat.label}</p>
            <h3 className={clsx("text-2xl font-bold", stat.value.includes('*') ? "text-gray-900" : "text-gray-800")}>
              {stat.value}
            </h3>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-bold text-gray-900">Inventory Report</h3>
          <span className="text-xs text-gray-400 font-medium">31 Inventory Report</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search" 
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm w-64 focus:outline-none focus:border-emerald-500"
            />
          </div>
          <button className="p-2 border border-gray-200 rounded-lg text-gray-400 hover:text-gray-600 transition-colors">
            <Filter className="w-4 h-4" />
          </button>
          <button className="p-2 border border-gray-200 rounded-lg text-gray-400 hover:text-gray-600 transition-colors">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-6 border-b border-gray-100 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={clsx(
              "pb-4 text-sm font-semibold transition-all relative",
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

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-white border-b border-gray-100">
            <tr>
              <th className="px-4 py-3 font-bold text-gray-900">Product Name</th>
              <th className="px-4 py-3 font-bold text-gray-900">Supplier Name</th>
              <th className="px-4 py-3 font-bold text-gray-900">Inventory</th>
              <th className="px-4 py-3 font-bold text-gray-900">Purchase Price</th>
              <th className="px-4 py-3 font-bold text-gray-900">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {inventoryData.map((item, i) => (
              <tr key={i} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-4 text-gray-700 font-medium">
                  {item.name.split('{')[0]}
                  <span className="text-gray-400 text-[11px] font-normal ml-1">
                    {'{'}{item.name.split('{')[1]}
                  </span>
                </td>
                <td className="px-4 py-4 text-gray-600">{item.supplier}</td>
                <td className="px-4 py-4 text-gray-600">{item.inventory}</td>
                <td className="px-4 py-4 font-bold text-gray-900">{item.price}</td>
                <td className="px-4 py-4">
                  <span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-md text-[11px] font-bold border border-emerald-100">
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center gap-2">
          <select className="border border-gray-200 rounded-lg px-2 py-1.5 text-sm text-gray-600 focus:outline-none">
            <option>25</option>
            <option>50</option>
            <option>100</option>
          </select>
          <ChevronDown className="w-4 h-4 text-gray-400 -ml-7" />
        </div>
        
        <div className="flex items-center gap-1">
          <button className="p-2 text-gray-400 hover:text-gray-600"><ChevronsLeft className="w-4 h-4" /></button>
          <button className="p-2 text-gray-400 hover:text-gray-600"><ChevronLeft className="w-4 h-4" /></button>
          <button className="w-8 h-8 flex items-center justify-center bg-emerald-600 text-white rounded text-sm font-bold">1</button>
          <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded text-sm font-medium">2</button>
          <button className="p-2 text-gray-400 hover:text-gray-600"><ChevronRight className="w-4 h-4" /></button>
          <button className="p-2 text-gray-400 hover:text-gray-600"><ChevronsRight className="w-4 h-4" /></button>
        </div>
      </div>
    </div>
  );
};
