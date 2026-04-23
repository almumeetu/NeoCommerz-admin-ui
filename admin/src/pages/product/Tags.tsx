import { Edit } from 'lucide-react';
import { PageHeader, SectionHeader } from '../../components/PageHeaders';

const tagsData = [
  { id: 1, name: 'Tranding', createdOn: 'February 26, 2026', status: true },
  { id: 2, name: 'Top Sell', createdOn: 'February 26, 2026', status: true },
  { id: 3, name: 'Popular', createdOn: 'February 26, 2028', status: true },
];

export const Tags = () => {
  return (
    <div className="p-8 max-w-[1600px] mx-auto bg-white min-h-screen">
      <PageHeader 
        title="Product tag" 
        subtitle="A list of all of your product tag" 
      />
      
      <SectionHeader 
        title="Tag list" 
        count={3} 
        itemName="tags" 
        onAdd={() => {}} 
        searchPlaceholder="Search tags" 
      />

      <div className="border border-gray-100 rounded-lg overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 font-semibold text-gray-900 w-1/3">Name</th>
              <th className="px-6 py-4 font-semibold text-gray-900 w-1/3">Created On</th>
              <th className="px-6 py-4 font-semibold text-gray-900">Status</th>
              <th className="px-6 py-4 font-semibold text-gray-900 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {tagsData.map((tag) => (
              <tr key={tag.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-gray-600">{tag.name}</td>
                <td className="px-6 py-4 text-gray-600">{tag.createdOn}</td>
                <td className="px-6 py-4">
                  <div className={`w-10 h-5 rounded-full relative cursor-pointer ${tag.status ? 'bg-blue-600' : 'bg-gray-200'}`}>
                    <div className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-all ${tag.status ? 'left-[22px]' : 'left-0.5'}`}></div>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
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
