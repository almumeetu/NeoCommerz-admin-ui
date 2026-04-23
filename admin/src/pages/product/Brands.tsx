import { Edit } from 'lucide-react';
import { PageHeader, SectionHeader } from '../../components/PageHeaders';

const brandsData = [
  { id: 1, name: 'HP IPS', description: '-', createdAt: 'February 26, 2026', status: true },
  { id: 2, name: 'Huawei', description: '-', createdAt: 'February 26, 2026', status: true },
  { id: 3, name: 'Vivo', description: '-', createdAt: 'February 26, 2026', status: true },
  { id: 4, name: 'Oppo', description: '-', createdAt: 'February 26, 2026', status: true },
  { id: 5, name: 'Realme', description: '-', createdAt: 'February 28, 2026', status: true },
  { id: 6, name: 'ASUS', description: '-', createdAt: 'February 26, 2026', status: true },
  { id: 7, name: 'Samsung', description: '-', createdAt: 'February 26, 2026', status: true },
  { id: 8, name: 'Apple', description: '-', createdAt: 'February 26, 2026', status: true },
];

export const Brands = () => {
  return (
    <div className="p-8 max-w-[1600px] mx-auto bg-white min-h-screen">
      <PageHeader 
        title="Brand" 
        subtitle="A list of all of your product brand" 
      />
      
      <SectionHeader 
        title="Brand list" 
        count={8} 
        itemName="active brands" 
        onAdd={() => {}} 
        searchPlaceholder="Search brands" 
      />

      <div className="border border-gray-100 rounded-lg overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 font-semibold text-gray-900 w-1/4">Name</th>
              <th className="px-6 py-4 font-semibold text-gray-900 w-1/4">Description</th>
              <th className="px-6 py-4 font-semibold text-gray-900 w-1/4">Created At</th>
              <th className="px-6 py-4 font-semibold text-gray-900">Status</th>
              <th className="px-6 py-4 font-semibold text-gray-900 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {brandsData.map((brand) => (
              <tr key={brand.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-gray-600">{brand.name}</td>
                <td className="px-6 py-4 text-gray-600">{brand.description}</td>
                <td className="px-6 py-4 text-gray-600">{brand.createdAt}</td>
                <td className="px-6 py-4">
                  <div className={`w-10 h-5 rounded-full relative cursor-pointer ${brand.status ? 'bg-blue-600' : 'bg-gray-200'}`}>
                    <div className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-all ${brand.status ? 'left-[22px]' : 'left-0.5'}`}></div>
                  </div>
                </td>
                <td className="px-6 py-4 text-right flex items-center justify-end">
                  <button className="text-gray-400 hover:text-gray-600">
                    <Edit className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
