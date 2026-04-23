import { RefreshCcw, Search } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
}

export const PageHeader = ({ title, subtitle }: PageHeaderProps) => (
  <div className="mb-8">
    <h1 className="text-2xl font-bold text-gray-900 mb-1">{title}</h1>
    <p className="text-sm text-gray-500">{subtitle}</p>
  </div>
);

interface SectionHeaderProps {
  title: string;
  count: number;
  itemName: string;
  onAdd: () => void;
  searchPlaceholder: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
}

export const SectionHeader = ({ 
  title, 
  count, 
  itemName, 
  onAdd, 
  searchPlaceholder,
  searchValue,
  onSearchChange
}: SectionHeaderProps) => (
  <div className="mb-4">
    <div className="flex items-center justify-between mb-4">
      <div>
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <p className="text-xs text-gray-500 mt-1">Displaying {count} {itemName}</p>
      </div>
      <div className="flex items-center gap-3">
        <button 
          className="p-2 border border-gray-200 rounded-md text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
          onClick={() => window.location.reload()}
        >
          <RefreshCcw className="w-4 h-4" />
        </button>
        <button 
          onClick={onAdd}
          className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-md hover:bg-emerald-700 transition-colors flex items-center gap-2"
        >
          + Add {itemName.replace(/s$/, '').replace(/active /, '')}
        </button>
      </div>
    </div>
    
    <div className="relative max-w-md mb-6">
      <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
      <input 
        type="text" 
        value={searchValue}
        onChange={(e) => onSearchChange?.(e.target.value)}
        placeholder={searchPlaceholder}
        className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
      />
    </div>
  </div>
);
