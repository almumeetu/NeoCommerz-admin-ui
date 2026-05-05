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
  ChevronDown,
  Calendar,
  BarChart2,
  List,
  User,
  Package,
  ArrowUpRight,
  PieChart as PieChartIcon
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import clsx from 'clsx';

export const Dashboard = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/src/data/dashboard.json')
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
      default: return <FileText className="w-4 h-4" />;
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-8 max-w-[1600px] mx-auto bg-gray-50/30 min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Dashboard</h1>
          <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">Business Intelligence Overview</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex bg-white border border-gray-200 rounded-xl p-1 shadow-sm">
            <button className="p-2 bg-emerald-50 text-emerald-600 rounded-lg shadow-sm">
              <BarChart2 className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors">
              <List className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex bg-white border border-gray-200 rounded-xl overflow-hidden text-[11px] font-bold uppercase tracking-widest shadow-sm p-1">
            <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg shadow-lg shadow-emerald-500/20">Today</button>
            <button className="px-4 py-2 text-gray-400 hover:text-gray-600 rounded-lg transition-all">Week</button>
            <button className="px-4 py-2 text-gray-400 hover:text-gray-600 rounded-lg transition-all">Month</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {data?.metrics?.map((metric: any) => (
          <StatCard
            key={metric.id}
            title={metric.title}
            value={metric.value}
            trend={metric.trend}
            trendDirection={metric.trendDirection}
            icon={getIcon(metric.icon)}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 hover:shadow-xl transition-all duration-500">
          <div className="flex items-center justify-between mb-8">
            <div>
               <h3 className="text-xl font-bold text-gray-900">Revenue Analytics</h3>
               <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Growth over time</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer border border-gray-100 uppercase tracking-wider">
                <span>May 2026</span>
                <Calendar className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data?.salesTrend || []}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 10, fontWeight: 700}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 10, fontWeight: 700}} dx={-10} />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '12px'}}
                  itemStyle={{fontWeight: 700, color: '#10b981'}}
                  labelStyle={{fontWeight: 700, marginBottom: '4px', color: '#111827'}}
                />
                <Line type="monotone" dataKey="sales" stroke="#10b981" strokeWidth={4} dot={{r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#fff'}} activeDot={{ r: 8, strokeWidth: 0, fill: '#10b981' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-gray-900">Recent Activity</h3>
            <Activity className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="space-y-6 flex-1">
            {data?.recentActivity?.map((activity: any) => (
              <div key={activity.id} className="flex gap-4 group cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <User className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <p className="text-sm font-bold text-gray-900 truncate">{activity.user}</p>
                    <span className="text-[11px] font-bold text-gray-400 whitespace-nowrap uppercase">{activity.time}</span>
                  </div>
                  <p className="text-xs text-gray-500 font-medium">{activity.action}</p>
                  {activity.amount && (
                    <p className="text-xs font-bold text-emerald-600 mt-1">{activity.amount}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 bg-gray-50 rounded-2xl text-xs font-bold text-gray-400 uppercase tracking-widest hover:bg-emerald-50 hover:text-emerald-600 transition-all">View All Activity</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 hover:shadow-xl transition-all duration-500">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-gray-900">Top Products</h3>
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl text-[11px] font-bold text-gray-400 uppercase tracking-widest cursor-pointer hover:bg-emerald-50 hover:text-emerald-600 transition-all border border-gray-100">
              <span>Performance</span>
              <TrendingUp className="w-3 h-3" />
            </div>
          </div>
          <div className="space-y-4">
            {data?.topProducts?.map((product: any) => (
              <div key={product.id} className="flex items-center justify-between p-4 rounded-2xl border border-gray-50 hover:border-emerald-100 hover:bg-emerald-50/30 transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-white transition-colors">
                    <Package className="w-6 h-6 text-gray-300 group-hover:text-emerald-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">{product.name}</h4>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">{product.sales} Sales</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-emerald-600">{product.revenue}</p>
                  <div className="flex items-center justify-end gap-1 text-[11px] font-bold text-emerald-500 uppercase">
                    <span>Active</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 hover:shadow-xl transition-all duration-500">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-gray-900">Revenue Channels</h3>
            <PieChartIcon className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="h-[250px] w-full md:w-1/2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data?.revenueChannels || []}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {data?.revenueChannels?.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontWeight: 700}}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full md:w-1/2 space-y-4">
              {data?.revenueChannels?.map((channel: any, index: number) => (
                <div key={index} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: channel.color }}></div>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest group-hover:text-gray-900 transition-colors">{channel.name}</span>
                  </div>
                  <span className="text-sm font-bold text-gray-900">{channel.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
