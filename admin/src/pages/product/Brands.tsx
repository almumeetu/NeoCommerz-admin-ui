import { useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { PageHeader, SectionHeader } from '../../components/PageHeaders';
import { Modal } from '../../components/Modal';

interface Brand {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  status: boolean;
}

const initialBrands: Brand[] = [
  { id: 1, name: 'HP IPS', description: '-', createdAt: 'February 26, 2026', status: true },
  { id: 2, name: 'Huawei', description: '-', createdAt: 'February 26, 2026', status: true },
  { id: 3, name: 'Vivo', description: '-', createdAt: 'February 26, 2026', status: true },
  { id: 4, name: 'Oppo', description: '-', createdAt: 'February 26, 2026', status: true },
  { id: 5, name: 'Realme', description: '-', createdAt: 'February 28, 2026', status: true },
];

export const Brands = () => {
  const [brands, setBrands] = useState<Brand[]>(initialBrands);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const [formData, setFormData] = useState({ name: '', description: '' });

  const filteredBrands = brands.filter(brand => 
    brand.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenModal = (brand?: Brand) => {
    if (brand) {
      setEditingBrand(brand);
      setFormData({ name: brand.name, description: brand.description });
    } else {
      setEditingBrand(null);
      setFormData({ name: '', description: '' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    
    if (editingBrand) {
      setBrands(brands.map(b => b.id === editingBrand.id ? { ...b, ...formData } : b));
    } else {
      const brand: Brand = {
        id: Date.now(),
        ...formData,
        createdAt: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        status: true
      };
      setBrands([brand, ...brands]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto bg-white min-h-screen">
      <PageHeader title="Brand" subtitle="A list of all of your product brand" />
      <SectionHeader 
        title="Brand list" 
        count={filteredBrands.length} 
        itemName="brands" 
        onAdd={() => handleOpenModal()} 
        searchPlaceholder="Search brands" 
        searchValue={search}
        onSearchChange={setSearch}
      />

      <div className="border border-gray-100 rounded-lg overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 font-semibold text-gray-900">Name</th>
              <th className="px-6 py-4 font-semibold text-gray-900">Description</th>
              <th className="px-6 py-4 font-semibold text-gray-900">Created At</th>
              <th className="px-6 py-4 font-semibold text-gray-900">Status</th>
              <th className="px-6 py-4 font-semibold text-gray-900 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredBrands.map((brand) => (
              <tr key={brand.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-gray-600 font-medium">{brand.name}</td>
                <td className="px-6 py-4 text-gray-600">{brand.description}</td>
                <td className="px-6 py-4 text-gray-600">{brand.createdAt}</td>
                <td className="px-6 py-4">
                  <button 
                    onClick={() => setBrands(brands.map(b => b.id === brand.id ? { ...b, status: !b.status } : b))}
                    className={`w-10 h-5 rounded-full relative transition-colors ${brand.status ? 'bg-emerald-600' : 'bg-gray-200'}`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-all ${brand.status ? 'left-[22px]' : 'left-0.5'}`}></div>
                  </button>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => handleOpenModal(brand)} className="p-1.5 text-gray-400 hover:text-emerald-600"><Edit className="w-4 h-4" /></button>
                    <button onClick={() => setBrands(brands.filter(b => b.id !== brand.id))} className="p-1.5 text-gray-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingBrand ? "Edit Brand" : "Add Brand"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Brand Name</label>
            <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2 border rounded-lg outline-none focus:border-emerald-500" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full px-4 py-2 border rounded-lg outline-none focus:border-emerald-500 h-24" />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm text-gray-500">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium">{editingBrand ? "Update" : "Save"}</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
