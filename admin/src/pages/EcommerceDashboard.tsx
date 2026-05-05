import { useEffect, useState } from 'react';
import { StatCard } from '../components/StatCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { 
  FileText, 
  ShoppingCart, 
  TrendingUp, 
  DollarSign, 
  Activity, 
  Briefcase,
  List,
  Clock,
  RotateCw,
  Truck,
  CheckCircle,
  AlertCircle,
  LayoutGrid,
  Search,
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import clsx from 'clsx';

export const EcommerceDashboard = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeRange, setActiveRange] = useState('Today');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    fetch('/src/data/ecommerce_dashboard.json')
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load dashboard data:', err);
        setLoading(false);
      });
  }, []);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'transaction': return <FileText className="w-4 h-4" />;
      case 'sale': return <ShoppingCart className="w-4 h-4" />;
      case 'sale_daily': return <Activity className="w-4 h-4" />;
      case 'net': return <TrendingUp className="w-4 h-4" />;
      case 'profit': return <Briefcase className="w-4 h-4" />;
      case 'cash': return <DollarSign className="w-4 h-4" />;
      case 'refund': return <RotateCw className="w-4 h-4" />;
      case 'orders': return <ShoppingCart className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'processing': return <Activity className="w-4 h-4" />;
      case 'delivered': return <Truck className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <AlertCircle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const ranges = ['Today', 'Yesterday', 'This Week', 'This Month'];

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-8 max-w-[1600px] mx-auto bg-[#f8f9fa] min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">E-Commerce Overview</h1>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">Real-time Performance Metrics</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex bg-white border border-gray-200 rounded-2xl p-1 shadow-sm">
            <button 
              onClick={() => setViewMode('grid')}
              className={clsx("p-2.5 rounded-xl transition-all", viewMode === 'grid' ? "bg-emerald-50 text-emerald-600 shadow-sm" : "text-gray-400")}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={clsx("p-2.5 rounded-xl transition-all", viewMode === 'list' ? "bg-emerald-50 text-emerald-600 shadow-sm" : "text-gray-400")}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex bg-white border border-gray-200 rounded-2xl overflow-hidden text-[11px] font-bold uppercase tracking-widest shadow-sm p-1">
            {ranges.map(range => (
              <button 
                key={range}
                onClick={() => setActiveRange(range)}
                className={clsx(
                  "px-4 py-2.5 rounded-xl transition-all duration-300",
                  activeRange === range ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" : "text-gray-400 hover:text-gray-600"
                )}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className={clsx("grid gap-4 mb-4", viewMode === 'grid' ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4" : "grid-cols-1")}>
        {data?.salesMetrics?.map((metric: any) => (
          <StatCard
            key={metric.id}
            title={metric.title}
            value={activeRange === 'Yesterday' ? "৳0.00" : metric.value}
            trend={metric.trend}
            trendDirection={metric.trendDirection}
            icon={getIcon(metric.icon)}
            color={metric.color}
          />
        ))}
      </div>

      {/* Order Stats Grid */}
      <div className={clsx("grid gap-4 mb-10", viewMode === 'grid' ? "grid-cols-1 md:grid-cols-3 lg:grid-cols-6" : "grid-cols-1")}>
        {data?.orderMetrics?.map((metric: any) => (
          <StatCard
            key={metric.id}
            title={metric.title}
            value={activeRange === 'Yesterday' ? "0" : metric.value}
            trend={metric.trend}
            trendDirection={metric.trendDirection}
            icon={getIcon(metric.icon)}
            color={metric.color}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Sales Trend Chart */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 hover:shadow-2xl transition-all duration-500">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Revenue Analysis</h3>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Growth vs Projection</p>
            </div>
            <div className="flex bg-gray-50 rounded-2xl p-1 border border-gray-100">
              <button className="px-5 py-2 text-[11px] font-bold uppercase tracking-widest text-emerald-600 bg-white rounded-xl shadow-sm">Daily</button>
              <button className="px-5 py-2 text-[11px] font-bold uppercase tracking-widest text-gray-400 hover:text-gray-600 transition-colors">Monthly</button>
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data?.salesTrend || []}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 10, fontWeight: 900}} dy={15} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 10, fontWeight: 900}} dx={-15} />
                <Tooltip 
                  contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.1)', padding: '16px'}}
                  itemStyle={{color: '#059669', fontWeight: 900}}
                  labelStyle={{fontWeight: 900, marginBottom: '6px', color: '#111827'}}
                />
                <Area type="monotone" dataKey="sales" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Recent Customers */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 hover:shadow-2xl transition-all duration-500 flex flex-col">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-xl font-bold text-gray-900">Recent Customers</h3>
            <button className="p-2 hover:bg-gray-50 rounded-xl transition-colors"><MoreVertical className="w-5 h-5 text-gray-400" /></button>
          </div>
          <div className="space-y-6 flex-1">
             {data?.recentCustomers?.map((cust: any, i: number) => (
               <div key={i} className="flex items-center justify-between group cursor-pointer hover:bg-gray-50 p-2 rounded-2xl transition-all">
                 <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                     {cust.name.charAt(0)}
                   </div>
                   <div className="min-w-0">
                     <p className="text-sm font-bold text-gray-900 truncate">{cust.name}</p>
                     <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{cust.email}</p>
                   </div>
                 </div>
                 <div className="text-right">
                    <p className="text-sm font-bold text-emerald-600">{cust.spent}</p>
                    <p className="text-[11px] font-bold text-gray-300 uppercase">Spent</p>
                 </div>
               </div>
             ))}
          </div>
          <button className="w-full mt-8 py-4 bg-emerald-600 text-white text-[11px] font-bold uppercase tracking-[0.2em] rounded-2xl shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition-all active:scale-95">View Customers</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Selling Products */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 hover:shadow-2xl transition-all duration-500">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-xl font-bold text-gray-900">Best Sellers</h3>
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-[11px] font-bold uppercase tracking-widest">
              <TrendingUp className="w-3 h-3" />
              <span>Hot Products</span>
            </div>
          </div>
          <div className="space-y-6">
             {data?.topProducts?.map((prod: any, i: number) => (
               <div key={i} className="flex items-center justify-between p-4 rounded-2xl border border-gray-50 hover:border-emerald-100 hover:bg-emerald-50/20 transition-all group">
                 <div className="flex items-center gap-6">
                    <span className="text-3xl font-bold text-gray-100 group-hover:text-emerald-100 transition-colors">0{i+1}</span>
                    <div>
                      <p className="text-sm font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">{prod.name}</p>
                      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">{prod.sales} Units Sold</p>
                    </div>
                 </div>
                 <div className="text-right">
                    <div className={clsx(
                      "flex items-center justify-end gap-1 text-[11px] font-bold uppercase",
                      prod.growth.startsWith('+') ? "text-emerald-500" : "text-red-500"
                    )}>
                      {prod.growth.startsWith('+') ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                      <span>{prod.growth}</span>
                    </div>
                    <p className="text-[11px] font-bold text-gray-300 uppercase mt-0.5">This Month</p>
                 </div>
               </div>
             ))}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 hover:shadow-xl transition-all duration-500">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-xl font-bold text-gray-900">Payment Breakdown</h3>
            <div className="relative">
               <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
               <input type="text" placeholder="Search..." className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-[11px] font-bold outline-none focus:border-emerald-500 w-32" />
            </div>
          </div>
          <div className="space-y-8 pt-4">
             {data?.paymentMethods?.map((pm: any, i: number) => (
               <div key={i} className="group cursor-pointer">
                 <div className="flex justify-between items-center mb-3">
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.1em] group-hover:text-gray-900 transition-colors">{pm.method}</span>
                    <span className="text-sm font-bold text-gray-900">{pm.percentage}%</span>
                 </div>
                 <div className="w-full h-3 bg-gray-50 rounded-full overflow-hidden border border-gray-100">
                    <div className={clsx("h-full rounded-full transition-all duration-1000 group-hover:brightness-110", pm.color)} style={{ width: `${pm.percentage}%` }}></div>
                 </div>
               </div>
             ))}
          </div>
          <div className="mt-12 p-6 bg-emerald-50 rounded-[2rem] border border-emerald-100">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                   <Activity className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                   <p className="text-xs font-bold text-emerald-700 uppercase tracking-widest">System Health</p>
                   <p className="text-sm font-bold text-emerald-600/70 mt-0.5">Payment gateway is operating normally.</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
