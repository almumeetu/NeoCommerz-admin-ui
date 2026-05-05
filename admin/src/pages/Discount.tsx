import { useState, useEffect } from 'react';
import { PageHeader, SectionHeader } from '../components/PageHeaders';
import { Edit, Trash2, Ticket } from 'lucide-react';
import { LoadingSpinner } from '../components/LoadingSpinner';
import clsx from 'clsx';
import promotionsData from '../data/promotions.json';

export const Discount = () => {
  const [search, setSearch] = useState('');
  const [discounts, setDiscounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setDiscounts(promotionsData.discounts || []);
    setLoading(false);
  }, []);

  const filtered = discounts.filter(d => 
    d.title.toLowerCase().includes(search.toLowerCase()) ||
    d.code.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-8 max-w-[1600px] mx-auto bg-white min-h-screen">
      <PageHeader title="Discounts & Promotions" subtitle="Manage your product discounts and coupon codes" />
      <SectionHeader 
        title="Active Discounts" 
        count={filtered.length} 
        itemName="discounts" 
        onAdd={() => {}} 
        searchPlaceholder="Search by title or coupon code..." 
        searchValue={search}
        onSearchChange={setSearch}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((discount) => (
          <div 
            key={discount.id}
            className={clsx(
              "bg-white border border-dashed rounded-3xl p-6 relative overflow-hidden group hover:shadow-xl transition-all cursor-pointer border-gray-200",
              discount.color === 'emerald' ? "hover:border-emerald-400" : 
              discount.color === 'blue' ? "hover:border-blue-400" : "hover:border-orange-400"
            )}
          >
            {/* Status Badge */}
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className={clsx(
                "px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest border",
                discount.status === 'active' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-red-50 text-red-600 border-red-100"
              )}>
                {discount.status}
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 bg-gray-50 rounded-xl text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all"><Edit className="w-4 h-4" /></button>
                <button className="p-2 bg-gray-50 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>

            <div className="flex items-start gap-4 mb-4 relative z-10">
               <div className={clsx(
                 "p-3 rounded-2xl",
                 discount.color === 'emerald' ? "bg-emerald-50 text-emerald-600" :
                 discount.color === 'blue' ? "bg-blue-50 text-blue-600" : "bg-orange-50 text-orange-600"
               )}>
                 <Ticket className="w-6 h-6" />
               </div>
               <div>
                 <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">{discount.title}</h3>
                 <p className="text-sm text-gray-500 font-medium leading-relaxed">{discount.description}</p>
               </div>
            </div>

            <div className="flex items-end justify-between relative z-10 pt-4 border-t border-gray-50">
              <div>
                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mb-1">Coupon Code</p>
                <div className={clsx(
                  "px-4 py-2 rounded-xl border font-mono font-bold text-sm",
                  discount.color === 'emerald' ? "bg-emerald-50/50 text-emerald-600 border-emerald-100" :
                  discount.color === 'blue' ? "bg-blue-50/50 text-blue-600 border-blue-100" : "bg-orange-50/50 text-orange-600 border-orange-100"
                )}>
                  {discount.code}
                </div>
              </div>
              <div className="text-right">
                <p className={clsx(
                  "text-4xl font-bold",
                  discount.color === 'emerald' ? "text-emerald-600" :
                  discount.color === 'blue' ? "text-blue-600" : "text-orange-600"
                )}>{discount.value}</p>
                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">Off</p>
              </div>
            </div>

            {/* Decorative circles */}
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white border border-gray-100 rounded-full z-20"></div>
            <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white border border-gray-100 rounded-full z-20"></div>
          </div>
        ))}
      </div>
    </div>
  );
};
