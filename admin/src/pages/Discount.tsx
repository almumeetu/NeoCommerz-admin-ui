import { useState } from 'react';
import { PageHeader, SectionHeader } from '../components/PageHeaders';
import { Edit, Trash2 } from 'lucide-react';

export const Discount = () => {
  const [search, setSearch] = useState('');
  return (
    <div className="p-8 max-w-[1600px] mx-auto bg-white min-h-screen">
      <PageHeader title="Discounts & Promotions" subtitle="Manage your product discounts and coupon codes" />
      <SectionHeader 
        title="Active Discounts" 
        count={2} 
        itemName="discounts" 
        onAdd={() => {}} 
        searchPlaceholder="Search discounts..." 
        searchValue={search}
        onSearchChange={setSearch}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-dashed border-emerald-200 rounded-2xl p-6 relative overflow-hidden group hover:border-emerald-400 transition-all cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Active</div>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-1.5 bg-gray-50 rounded-lg text-gray-400 hover:text-emerald-600"><Edit className="w-4 h-4" /></button>
              <button className="p-1.5 bg-gray-50 rounded-lg text-gray-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">Eid Mubarak Special</h3>
          <p className="text-sm text-gray-500 mb-4">Get 20% off on all watches and gadgets.</p>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Coupon Code</p>
              <div className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-lg border border-emerald-100 font-mono font-bold mt-1">EID2026</div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-black text-emerald-600">20%</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase">Discount</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
