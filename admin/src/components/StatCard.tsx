import { TrendingUp, TrendingDown, Info } from 'lucide-react';
import clsx from 'clsx';

interface StatCardProps {
  title: string;
  value: string;
  trend: string;
  trendDirection: 'up' | 'down';
  icon: React.ReactNode;
  color?: 'emerald' | 'red' | 'orange' | 'cyan' | 'purple';
}

export const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  trend, 
  trendDirection, 
  icon,
  color = 'emerald'
}) => {
  const isPositive = trendDirection === 'up';

  const colorClasses = {
    emerald: "text-emerald-500 bg-emerald-50",
    red: "text-red-500 bg-red-50",
    orange: "text-orange-500 bg-orange-50",
    cyan: "text-cyan-500 bg-cyan-50",
    purple: "text-purple-500 bg-purple-50",
  };

  return (
    <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between h-full">
      <div className="flex items-center gap-2 mb-4">
        <div className={clsx("p-1.5 rounded-md", colorClasses[color as keyof typeof colorClasses])}>
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
        <span className="text-gray-500 whitespace-nowrap">Compared to yesterday</span>
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
