import { useState, useEffect } from 'react';
import { PageHeader, SectionHeader } from '../components/PageHeaders';
import { Gift, Edit, Trash2, Send, Sparkles } from 'lucide-react';
import { LoadingSpinner } from '../components/LoadingSpinner';
import clsx from 'clsx';

export const GiftVoucher = () => {
  const [search, setSearch] = useState('');
  const [vouchers, setVouchers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/src/data/promotions.json')
      .then(res => res.json())
      .then(json => {
        setVouchers(json.giftVouchers);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = vouchers.filter(v => 
    v.code.toLowerCase().includes(search.toLowerCase()) ||
    v.message.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-8 max-w-[1600px] mx-auto bg-white min-h-screen">
      <PageHeader title="Gift Vouchers" subtitle="Create and manage digital gift cards" />
      <SectionHeader 
        title="Voucher List" 
        count={filtered.length} 
        itemName="vouchers" 
        onAdd={() => {}} 
        searchPlaceholder="Search vouchers..." 
        searchValue={search}
        onSearchChange={setSearch}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((voucher) => (
          <div 
            key={voucher.id}
            className={clsx(
              "p-8 rounded-[2rem] text-white shadow-2xl relative overflow-hidden group transition-all duration-500 hover:-translate-y-2",
              voucher.theme === 'emerald' ? "bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-emerald-500/20" :
              voucher.theme === 'purple' ? "bg-gradient-to-br from-purple-500 to-purple-700 shadow-purple-500/20" :
              "bg-gradient-to-br from-blue-500 to-blue-700 shadow-blue-500/20"
            )}
          >
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-24 -mt-24 blur-3xl group-hover:bg-white/20 transition-all duration-700"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full -ml-16 -mb-16 blur-2xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-10">
                <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-md border border-white/10 group-hover:scale-110 transition-transform">
                  <Gift className="w-8 h-8" />
                </div>
                <div className="text-right">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] opacity-80 mb-1">E-Gift Card</p>
                  <p className="font-bold text-xl italic tracking-tighter">NeoCommerz</p>
                </div>
              </div>

              <div className="mb-10">
                <div className="flex items-start gap-1">
                   <span className="text-xl font-bold mt-1">৳</span>
                   <p className="text-5xl font-bold tracking-tighter mb-2">{voucher.amount}</p>
                </div>
                <div className="flex items-center gap-2 text-sm font-bold opacity-90">
                   <Sparkles className="w-4 h-4" />
                   <span>{voucher.message}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-8 border-t border-white/20">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] opacity-70 mb-2">Voucher Code</p>
                  <div className="bg-white/10 px-4 py-2 rounded-xl border border-white/20 backdrop-blur-sm group-hover:bg-white/20 transition-all">
                    <p className="font-mono font-bold tracking-widest text-sm">{voucher.code}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2.5 bg-white text-gray-900 rounded-xl hover:bg-opacity-90 transition-all shadow-lg active:scale-90"><Send className="w-4 h-4" /></button>
                  <button className="p-2.5 bg-white/20 rounded-xl hover:bg-white/30 transition-all border border-white/10 active:scale-90"><Edit className="w-4 h-4" /></button>
                  <button className="p-2.5 bg-red-500/20 rounded-xl hover:bg-red-500/40 transition-all border border-red-500/10 active:scale-90"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
