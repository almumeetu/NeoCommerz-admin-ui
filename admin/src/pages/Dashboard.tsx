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
  List
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export const Dashboard = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    // In a real app, this would be a fetch call to an API or local JSON
    fetch('/src/data/dashboard.json')
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
      case 'refund': return <FileText className="w-4 h-4 text-red-500" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Dashboard</h1>
          <p className="text-sm text-gray-500">Your current sales summary and activity.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex bg-white border border-gray-200 rounded-md p-1 shadow-sm">
            <button className="p-1.5 bg-blue-50 text-blue-600 rounded">
              <BarChart2 className="w-4 h-4" />
            </button>
            <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded">
              <List className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex bg-white border border-gray-200 rounded-md overflow-hidden text-sm shadow-sm">
            <button className="px-4 py-2 bg-blue-500 text-white font-medium">Today</button>
            <button className="px-4 py-2 text-gray-600 hover:bg-gray-50 border-l border-gray-200">Yesterday</button>
            <button className="px-4 py-2 text-gray-600 hover:bg-gray-50 border-l border-gray-200 font-medium border-b-2 border-b-blue-500 bg-blue-50/50">This Week</button>
            <button className="px-4 py-2 text-gray-600 hover:bg-gray-50 border-l border-gray-200">This Month</button>
            <button className="px-4 py-2 text-gray-600 hover:bg-gray-50 border-l border-gray-200">Custom</button>
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
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">Sales Trend</h3>
            <div className="flex items-center gap-3">
              <div className="flex bg-gray-50 rounded-md p-1">
                <button className="px-3 py-1 text-sm font-medium text-blue-600 bg-white rounded shadow-sm">Daily</button>
                <button className="px-3 py-1 text-sm font-medium text-gray-500 hover:text-gray-700">Monthly</button>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-md text-sm text-gray-600">
                <span>01/04/26 - 22/04/26</span>
                <Calendar className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data?.salesTrend || []}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dx={-10} domain={[0, 1]} />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">Customer</h3>
            <div className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-md text-sm text-gray-400">
              <span>Select a date</span>
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-center justify-center h-[250px] text-sm text-gray-400 italic">
            No customer found yet
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">Top 5 Selling Product</h3>
            <div className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-md text-sm text-gray-400">
              <span>Select a date</span>
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-center justify-center h-[200px] text-sm text-gray-400 italic">
            No top selling product yet
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">Sales by Payment Method</h3>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-md text-sm text-gray-700">
                <span>Today</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-md text-sm text-gray-400">
                <span>Select a date</span>
                <Calendar className="w-4 h-4" />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center h-[200px] text-sm text-gray-400 italic">
            No sales by payment method yet
          </div>
        </div>
      </div>
    </div>
  );
};
