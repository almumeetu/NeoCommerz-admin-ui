import { useState } from 'react';
import { ChevronDown, ChevronRight, Menu } from 'lucide-react';
import { PageHeader, SectionHeader } from '../../components/PageHeaders';

interface CategoryItem {
  id: string;
  name: string;
  children?: CategoryItem[];
}

const categoriesData: CategoryItem[] = [
  {
    id: '1',
    name: 'Gadgets',
    children: [
      { id: '1-1', name: 'Camera' },
      { id: '1-2', name: 'Earbud' },
      { id: '1-3', name: 'Microphone' }
    ]
  },
  {
    id: '2',
    name: 'Watch',
    children: [
      { id: '2-1', name: 'Smart Watch' },
      { id: '2-2', name: 'Mechanical Watch' }
    ]
  },
  {
    id: '3',
    name: 'Computer Accessories',
    children: [
      { id: '3-1', name: 'Keyboard' },
      { id: '3-2', name: 'WebCam' }
    ]
  }
];

export const Categories = () => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    '1': true,
    '2': true,
    '3': true
  });

  const toggleExpand = (id: string) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto bg-white min-h-screen">
      <PageHeader 
        title="Category" 
        subtitle="A list of all of your product categories" 
      />
      
      <SectionHeader 
        title="Categories list" 
        count={4} 
        itemName="categories" 
        onAdd={() => {}} 
        searchPlaceholder="Search categories" 
      />

      <div className="space-y-2 mt-4">
        {categoriesData.map((category) => (
          <div key={category.id} className="w-full">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => toggleExpand(category.id)}
                className="w-5 h-5 flex items-center justify-center text-gray-400 hover:text-gray-600"
              >
                {expanded[category.id] ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>
              <div className="flex-1 flex items-center gap-3 px-4 py-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors bg-white shadow-sm">
                <Menu className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-700">{category.name}</span>
              </div>
            </div>
            
            {expanded[category.id] && category.children && (
              <div className="ml-[10px] pl-[26px] border-l border-gray-200 mt-2 space-y-2">
                {category.children.map((child) => (
                  <div key={child.id} className="flex items-center gap-3 px-4 py-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors bg-gray-50/50 shadow-sm relative">
                    <div className="absolute -left-[27px] top-1/2 w-6 border-t border-gray-200"></div>
                    <Menu className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{child.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
