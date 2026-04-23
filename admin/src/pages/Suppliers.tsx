import { Edit, Eye } from 'lucide-react';
import { PageHeader, SectionHeader } from '../components/PageHeaders';

const suppliersData = [
  { 
    id: 1, 
    companyName: 'Unknown Supplier Company', 
    businessPhone: '01700000000', 
    address: 'Unknown Supplier Address', 
    status: true 
  }
];

export const Suppliers = () => {
  return (
    <div className="p-8 max-w-[1600px] mx-auto bg-white min-h-screen">
      <PageHeader 
        title="Suppliers" 
        subtitle="A list of all suppliers" 
      />
      
      <SectionHeader 
        title="Supplier list" 
        count={1} 
        itemName="supplier" 
        onAdd={() => {}} 
        searchPlaceholder="Search suppliers by name, phone etc" 
      />

      <div className="border border-gray-100 rounded-lg overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 font-semibold text-gray-900 w-1/4">Company Name</th>
              <th className="px-6 py-4 font-semibold text-gray-900 w-1/4">Business Phone No.</th>
              <th className="px-6 py-4 font-semibold text-gray-900 w-1/4">Address</th>
              <th className="px-6 py-4 font-semibold text-gray-900">Status</th>
              <th className="px-6 py-4 font-semibold text-gray-900 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {suppliersData.map((supplier) => (
              <tr key={supplier.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-gray-600">{supplier.companyName}</td>
                <td className="px-6 py-4 text-gray-600">{supplier.businessPhone}</td>
                <td className="px-6 py-4 text-gray-600">{supplier.address}</td>
                <td className="px-6 py-4">
                  <div className={`w-10 h-5 rounded-full relative cursor-pointer ${supplier.status ? 'bg-emerald-600' : 'bg-gray-200'}`}>
                    <div className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-all ${supplier.status ? 'left-[22px]' : 'left-0.5'}`}></div>
                  </div>
                </td>
                <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                  <button className="text-gray-400 hover:text-gray-600">
                    <Eye className="w-4 h-4" />
                  </button>
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
