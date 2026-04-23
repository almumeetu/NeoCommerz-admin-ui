import { TrendingUp, TrendingDown, Info } from 'lucide-react';
import clsx from 'clsx';

interface StatCardProps {
  title: string;
  value: string;
  trend: string;
  trendDirection: 'up' | 'down';
  icon: React.ReactNode;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, trend, trendDirection, icon }) => {
  const isPositive = trendDirection === 'up';

  return (
    <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between">
      <div className="flex items-center gap-2 mb-4">
        <div className="text-blue-500 bg-blue-50 p-1.5 rounded-md">
          {icon}
        </div>
        <span className="text-sm font-medium text-gray-600 flex items-center gap-1">
          {title}
          <Info className="w-3.5 h-3.5 text-gray-300" />
        </span>
      </div>
      
      <div className="mb-4">
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
      </div>
      
      <div className="flex items-center gap-2 text-xs">
        <span className="text-gray-500">Compared to yesterday</span>
        <div 
          className={clsx(
            "flex items-center gap-1 px-1.5 py-0.5 rounded-md font-medium text-[10px]",
            isPositive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          )}
        >
          {trend}
          {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
        </div>
      </div>
    </div>
  );
};
