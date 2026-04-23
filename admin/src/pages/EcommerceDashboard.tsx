import { useEffect, useState } from 'react';
import { StatCard } from '../components/StatCard';
import { 
  FileText, 
  ShoppingCart, 
  TrendingUp, 
  DollarSign, 
  Activity, 
  Briefcase,
  ChevronDown,
  Calendar,
  BarChart2,
  List,
  Clock,
  RotateCw,
  Truck,
  CheckCircle,
  AlertCircle,
  LayoutGrid
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
  const [activeRange, setActiveRange] = useState('Today');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    fetch('/src/data/ecommerce_dashboard.json')
      .then(res => res.json())
      .then(json => setData(json))
      .catch(err => console.error('Failed to load dashboard data:', err));
  }, []);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'transaction': return <FileText className="w-4 h-4" />;
      case 'sale': return <ShoppingCart className="w-4 h-4" />;
      case 'sale_daily': return <Activity className="w-4 h-4" />;
      case 'net': return <TrendingUp className="w-4 h-4" />;
      case 'profit': return <Briefcase className="w-4 h-4" />;
      case 'cash': return <DollarSign className="w-4 h-4" />;
      case 'refund': return <FileText className="w-4 h-4" />;
      case 'orders': return <ShoppingCart className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'processing': return <RotateCw className="w-4 h-4" />;
      case 'delivered': return <Truck className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <AlertCircle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const ranges = ['Today', 'Yesterday', 'This Week', 'This Month'];

  // Mock data change on range switch
  const handleRangeChange = (range: string) => {
    setActiveRange(range);
    // In a real app, you'd refetch data here. 
    // For this demo, we'll just simulate a loading state or small data shift
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto bg-[#f8f9fa] min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">E-Commerce Overview</h1>
          <p className="text-sm text-gray-500 font-medium">Monitoring sales performance for <span className="text-emerald-600">{activeRange}</span></p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex bg-white border border-gray-200 rounded-xl p-1 shadow-sm">
            <button 
              onClick={() => setViewMode('grid')}
              className={clsx("p-2 rounded-lg transition-all", viewMode === 'grid' ? "bg-emerald-50 text-emerald-600" : "text-gray-400")}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={clsx("p-2 rounded-lg transition-all", viewMode === 'list' ? "bg-emerald-50 text-emerald-600" : "text-gray-400")}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex bg-white border border-gray-200 rounded-xl overflow-hidden text-sm shadow-sm p-1">
            {ranges.map(range => (
              <button 
                key={range}
                onClick={() => handleRangeChange(range)}
                className={clsx(
                  "px-4 py-1.5 rounded-lg transition-all font-bold text-[13px]",
                  activeRange === range ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" : "text-gray-500 hover:bg-gray-50"
                )}
              >
                {range}
              </button>
            ))}
            <div className="flex items-center gap-2 px-4 py-1.5 text-gray-400 border-l border-gray-100 ml-1">
              <span className="text-xs font-bold uppercase tracking-wider">Select Date</span>
              <Calendar className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Sales Metrics Grid */}
      <div className={clsx("grid gap-4 mb-4", viewMode === 'grid' ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4" : "grid-cols-1")}>
        {data?.salesMetrics?.map((metric: any) => (
          <StatCard
            key={metric.id}
            title={metric.title}
            value={activeRange === 'Yesterday' ? "৳0.00" : metric.value} // Simulate value change
            trend={metric.trend}
            trendDirection={metric.trendDirection}
            icon={getIcon(metric.icon)}
            color={metric.color}
          />
        ))}
      </div>

      {/* Order Metrics Grid */}
      <div className={clsx("grid gap-4 mb-6", viewMode === 'grid' ? "grid-cols-1 md:grid-cols-3 lg:grid-cols-5" : "grid-cols-1")}>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Sales Trend</h3>
              <p className="text-xs text-gray-400 font-medium">Revenue vs Expense analysis</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button className="px-4 py-1 text-xs font-bold text-emerald-600 bg-white rounded-md shadow-sm">Daily</button>
                <button className="px-4 py-1 text-xs font-bold text-gray-400 hover:text-gray-600 transition-colors">Monthly</button>
              </div>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data?.salesTrend || []}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 11, fontWeight: 600}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 11, fontWeight: 600}} dx={-10} domain={[0, 1]} />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                  itemStyle={{color: '#059669', fontWeight: 700}}
                />
                <Area type="monotone" dataKey="sales" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-gray-900">Recent Customers</h3>
            <button className="text-emerald-600 text-[10px] font-bold uppercase tracking-widest hover:underline">View All</button>
          </div>
          <div className="space-y-4">
             {[
               { name: 'John Doe', email: 'john@example.com', spent: '৳12,400' },
               { name: 'Sarah Khan', email: 'sarah@example.com', spent: '৳8,200' },
               { name: 'Am Saikat', email: 'saikat@example.com', spent: '৳45,000' }
             ].map((cust, i) => (
               <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-gray-50 hover:border-emerald-100 transition-all cursor-pointer">
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs">
                     {cust.name.charAt(0)}
                   </div>
                   <div>
                     <p className="text-sm font-bold text-gray-900">{cust.name}</p>
                     <p className="text-[10px] text-gray-400">{cust.email}</p>
                   </div>
                 </div>
                 <p className="text-sm font-black text-emerald-600">{cust.spent}</p>
               </div>
             ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-gray-900">Top 5 Selling Products</h3>
            <BarChart2 className="w-5 h-5 text-gray-300" />
          </div>
          <div className="space-y-4">
             {[
               { name: 'Smart Watch Series 7', sales: 124, growth: '+12%' },
               { name: 'Sony WH-1000XM4', sales: 86, growth: '+8%' },
               { name: 'Logitech G Pro', sales: 64, growth: '-2%' }
             ].map((prod, i) => (
               <div key={i} className="flex items-center justify-between">
                 <div className="flex items-center gap-4">
                    <span className="text-2xl font-black text-gray-100">0{i+1}</span>
                    <p className="text-sm font-bold text-gray-700">{prod.name}</p>
                 </div>
                 <div className="text-right">
                    <p className="text-sm font-black text-gray-900">{prod.sales}</p>
                    <p className={clsx("text-[10px] font-bold", prod.growth.startsWith('+') ? "text-emerald-500" : "text-red-500")}>{prod.growth}</p>
                 </div>
               </div>
             ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-gray-900">Sales by Payment Method</h3>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg text-xs font-bold text-gray-500">
               <span>Today</span>
               <ChevronDown className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-6 pt-4">
             {[
               { method: 'Cash on Delivery', percentage: 65, color: 'bg-emerald-500' },
               { method: 'Online Payment', percentage: 25, color: 'bg-blue-500' },
               { method: 'Gift Voucher', percentage: 10, color: 'bg-orange-500' }
             ].map((pm, i) => (
               <div key={i}>
                 <div className="flex justify-between text-xs font-bold mb-2">
                    <span className="text-gray-500 uppercase tracking-widest">{pm.method}</span>
                    <span className="text-gray-900">{pm.percentage}%</span>
                 </div>
                 <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className={clsx("h-full rounded-full transition-all duration-1000", pm.color)} style={{ width: `${pm.percentage}%` }}></div>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};
