import { useState, useEffect } from 'react';
import { PageHeader } from '../../components/PageHeaders';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { Search, Download, Filter, FileText, Calendar, DollarSign, Tag } from 'lucide-react';
import clsx from 'clsx';

interface GenericFinancePageProps {
  title: string;
}

export const GenericFinancePage = ({ title }: GenericFinancePageProps) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const jsonKey = title === 'Sale Report' ? 'saleReport' : 
                  title === 'Purchase Report' ? 'purchaseReport' : 
                  title === 'Discount Report' ? 'discountReport' : '';

  useEffect(() => {
    if (!jsonKey) {
      setLoading(false);
      return;
    }
    fetch('/src/data/finance.json')
      .then(res => res.json())
      .then(json => {
        setData(json[jsonKey]);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [jsonKey]);

  if (loading) return <LoadingSpinner />;

  if (!data) {
    return (
      <div className="p-8">
        <PageHeader title={title} subtitle={`Manage your ${title.toLowerCase()} data.`} />
        <div className="bg-white border border-dashed border-gray-200 rounded-2xl h-64 flex flex-col items-center justify-center text-gray-400">
           <FileText className="w-12 h-12 mb-3 text-gray-200" />
           <p className="italic">{title} Content Coming Soon</p>
        </div>
      </div>
    );
  }

  const filteredRows = data.rows?.filter((row: any) => {
    const searchString = Object.values(row).join(' ').toLowerCase();
    return searchString.includes(searchTerm.toLowerCase());
  }) || [];

  const getStats = () => {
    if (title === 'Sale Report') {
      return [
        { label: 'Total Sales', value: data.summary.totalSales, icon: DollarSign, color: 'emerald' },
        { label: 'Total Orders', value: data.summary.totalOrders, icon: FileText, color: 'blue' },
        { label: 'Avg Order Value', value: data.summary.avgOrderValue, icon: Tag, color: 'purple' },
        { label: 'Refunds', value: data.summary.refunds, icon: Calendar, color: 'red' },
      ];
    }
    if (title === 'Purchase Report') {
      return [
        { label: 'Total Purchases', value: data.summary.totalPurchases, icon: DollarSign, color: 'emerald' },
        { label: 'Total Orders', value: data.summary.totalOrders, icon: FileText, color: 'blue' },
        { label: 'Pending Orders', value: data.summary.pendingOrders, icon: Calendar, color: 'orange' },
        { label: 'Avg Purchase', value: data.summary.avgPurchaseValue, icon: Tag, color: 'purple' },
      ];
    }
    if (title === 'Discount Report') {
      return [
        { label: 'Total Saved', value: data.summary.totalDiscountGiven, icon: DollarSign, color: 'emerald' },
        { label: 'Coupon Orders', value: data.summary.discountOrders, icon: FileText, color: 'blue' },
        { label: 'Avg Discount', value: data.summary.avgDiscount, icon: Tag, color: 'purple' },
        { label: 'Top Coupon', value: data.summary.topCoupon, icon: Calendar, color: 'orange' },
      ];
    }
    return [];
  };

  const getColumns = () => {
    if (title === 'Sale Report') return ['Date', 'Invoice', 'Customer', 'Items', 'Total', 'Status'];
    if (title === 'Purchase Report') return ['Date', 'PO No', 'Supplier', 'Items', 'Total', 'Status'];
    if (title === 'Discount Report') return ['Date', 'Coupon', 'Type', 'Value', 'Used', 'Total Saved'];
    return [];
  };

  const columns = getColumns();
  const stats = getStats();

  return (
    <div className="p-8 max-w-[1600px] mx-auto bg-white min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">{title}</h1>
          <p className="text-sm text-gray-500 font-medium">Detailed insights and records for your business {title.toLowerCase()}.</p>
        </div>
        <button className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-xl hover:bg-emerald-700 transition-all font-bold text-sm shadow-lg shadow-emerald-600/20 active:scale-95">
          <Download className="w-4 h-4" />
          Export Data
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
              <stat.icon className={clsx("w-4 h-4", `text-${stat.color}-500`)} />
            </div>
            <h3 className="text-2xl font-black text-gray-900 group-hover:text-emerald-600 transition-colors">
              {stat.value}
            </h3>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-bold text-gray-900">Records</h3>
          <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-full border border-gray-100">
             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
             <span className="text-[10px] font-black text-gray-500 uppercase tracking-wider">{filteredRows.length} Entries Found</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
           <div className="relative">
             <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
             <input 
               type="text" 
               placeholder="Filter records..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm w-64 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all shadow-sm"
             />
           </div>
           <button className="p-2.5 bg-white border border-gray-200 rounded-xl text-gray-400 hover:text-emerald-600 hover:border-emerald-100 transition-all shadow-sm"><Filter className="w-4 h-4" /></button>
        </div>
      </div>

      <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {columns.map((col, i) => (
                <th key={i} className="px-6 py-4 font-bold text-gray-900">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredRows.map((row: any) => (
              <tr key={row.id} className="hover:bg-gray-50 transition-colors group">
                {title === 'Sale Report' && (
                  <>
                    <td className="px-6 py-4 text-gray-500 font-medium">{row.date}</td>
                    <td className="px-6 py-4 font-bold text-emerald-600">{row.invoiceNo}</td>
                    <td className="px-6 py-4 font-bold text-gray-900">{row.customer}</td>
                    <td className="px-6 py-4 text-gray-600 font-bold">{row.items}</td>
                    <td className="px-6 py-4 font-black text-gray-900">{row.total}</td>
                    <td className="px-6 py-4">
                      <span className={clsx("px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border", 
                        row.status === 'Paid' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-orange-50 text-orange-600 border-orange-100")}>
                        {row.status}
                      </span>
                    </td>
                  </>
                )}
                {title === 'Purchase Report' && (
                  <>
                    <td className="px-6 py-4 text-gray-500 font-medium">{row.date}</td>
                    <td className="px-6 py-4 font-bold text-blue-600">{row.poNo}</td>
                    <td className="px-6 py-4 font-bold text-gray-900">{row.supplier}</td>
                    <td className="px-6 py-4 text-gray-600 font-bold">{row.items}</td>
                    <td className="px-6 py-4 font-black text-gray-900">{row.total}</td>
                    <td className="px-6 py-4">
                      <span className={clsx("px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border", 
                        row.status === 'Received' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-orange-50 text-orange-600 border-orange-100")}>
                        {row.status}
                      </span>
                    </td>
                  </>
                )}
                {title === 'Discount Report' && (
                  <>
                    <td className="px-6 py-4 text-gray-500 font-medium">{row.date}</td>
                    <td className="px-6 py-4 font-bold text-purple-600">{row.coupon}</td>
                    <td className="px-6 py-4 text-gray-600 font-bold">{row.type}</td>
                    <td className="px-6 py-4 font-black text-gray-900">{row.value}</td>
                    <td className="px-6 py-4 font-bold text-gray-600">{row.usedCount}</td>
                    <td className="px-6 py-4 font-black text-emerald-600">{row.totalSaved}</td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {filteredRows.length === 0 && (
          <div className="p-12 text-center text-gray-400 italic">No records found matching your filter.</div>
        )}
      </div>
    </div>
  );
};
