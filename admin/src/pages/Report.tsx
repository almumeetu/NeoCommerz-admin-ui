import { PageHeader } from '../components/PageHeaders';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Calendar, Download, TrendingUp } from 'lucide-react';

const data = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 2000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
];

export const Report = () => {
  return (
    <div className="p-8 max-w-[1600px] mx-auto bg-white min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <PageHeader title="Business Reports" subtitle="Detailed analytics and performance metrics" />
        <button className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-all font-medium text-sm">
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Revenue', value: '৳4,50,000', growth: '+12.5%' },
          { label: 'Total Orders', value: '1,240', growth: '+8.2%' },
          { label: 'Avg Order Value', value: '৳3,620', growth: '+2.4%' },
          { label: 'Customer Growth', value: '15%', growth: '+5.1%' },
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm">
            <p className="text-gray-500 text-sm mb-1">{stat.label}</p>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</h3>
            <div className="flex items-center gap-1 text-emerald-600 text-xs font-bold">
              <TrendingUp className="w-3 h-3" />
              {stat.growth}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-gray-100 p-8 rounded-2xl shadow-sm mb-8">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-lg font-bold text-gray-900">Revenue Analysis</h3>
          <div className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-md text-sm text-gray-600">
             <span>Last 6 Months</span>
             <Calendar className="w-4 h-4 text-gray-400" />
          </div>
        </div>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dx={-10} />
              <Tooltip cursor={{fill: '#f8fafc'}} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={40}>
                {data.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === data.length - 1 ? '#10b981' : '#e2e8f0'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
