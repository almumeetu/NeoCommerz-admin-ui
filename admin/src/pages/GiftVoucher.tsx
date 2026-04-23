import { useState } from 'react';
import { PageHeader, SectionHeader } from '../components/PageHeaders';
import { Gift, Edit, Trash2 } from 'lucide-react';

export const GiftVoucher = () => {
  const [search, setSearch] = useState('');
  return (
    <div className="p-8 max-w-[1600px] mx-auto bg-white min-h-screen">
      <PageHeader title="Gift Vouchers" subtitle="Create and manage digital gift cards" />
      <SectionHeader 
        title="Voucher List" 
        count={1} 
        itemName="vouchers" 
        onAdd={() => {}} 
        searchPlaceholder="Search vouchers..." 
        searchValue={search}
        onSearchChange={setSearch}
      />
      <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 p-8 rounded-3xl text-white max-w-md shadow-xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-white/20 transition-all"></div>
        <div className="flex items-center justify-between mb-8">
          <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
            <Gift className="w-8 h-8" />
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">Gift Card</p>
            <p className="font-bold">NeoCommerz</p>
          </div>
        </div>
        <div className="mb-8">
          <p className="text-3xl font-black mb-1">৳ 5,000</p>
          <p className="text-sm opacity-90">Happy Shopping!</p>
        </div>
        <div className="flex items-center justify-between pt-6 border-t border-white/20">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-70">Voucher Code</p>
            <p className="font-mono font-bold tracking-wider">GIFT-2026-NEO</p>
          </div>
          <div className="flex gap-2">
            <button className="p-2 bg-white/20 rounded-xl hover:bg-white/30 transition-all"><Edit className="w-4 h-4" /></button>
            <button className="p-2 bg-white/20 rounded-xl hover:bg-red-500/30 transition-all"><Trash2 className="w-4 h-4" /></button>
          </div>
        </div>
      </div>
    </div>
  );
};
