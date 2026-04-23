import { useState } from 'react';
import { Edit, Eye, Trash2 } from 'lucide-react';
import { PageHeader, SectionHeader } from '../components/PageHeaders';
import { Modal } from '../components/Modal';

interface Supplier {
  id: number;
  companyName: string;
  businessPhone: string;
  address: string;
  status: boolean;
}

const initialSuppliers: Supplier[] = [
  { id: 1, companyName: 'Unknown Supplier Company', businessPhone: '01700000000', address: 'Dhaka, Bangladesh', status: true }
];

export const Suppliers = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>(initialSuppliers);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [formData, setFormData] = useState({ companyName: '', businessPhone: '', address: '' });

  const filteredSuppliers = suppliers.filter(s => s.companyName.toLowerCase().includes(search.toLowerCase()));

  const handleOpenModal = (supplier?: Supplier) => {
    if (supplier) {
      setEditingSupplier(supplier);
      setFormData({ companyName: supplier.companyName, businessPhone: supplier.businessPhone, address: supplier.address });
    } else {
      setEditingSupplier(null);
      setFormData({ companyName: '', businessPhone: '', address: '' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSupplier) {
      setSuppliers(suppliers.map(s => s.id === editingSupplier.id ? { ...s, ...formData } : s));
    } else {
      setSuppliers([{ id: Date.now(), ...formData, status: true }, ...suppliers]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto bg-white min-h-screen">
      <PageHeader title="Suppliers" subtitle="A list of all suppliers" />
      <SectionHeader title="Supplier list" count={filteredSuppliers.length} itemName="supplier" onAdd={() => handleOpenModal()} searchPlaceholder="Search suppliers..." searchValue={search} onSearchChange={setSearch} />
      <div className="border border-gray-100 rounded-lg overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 font-semibold text-gray-900">Company Name</th>
              <th className="px-6 py-4 font-semibold text-gray-900">Phone</th>
              <th className="px-6 py-4 font-semibold text-gray-900">Status</th>
              <th className="px-6 py-4 font-semibold text-gray-900 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredSuppliers.map((s) => (
              <tr key={s.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{s.companyName}</td>
                <td className="px-6 py-4 text-gray-600">{s.businessPhone}</td>
                <td className="px-6 py-4">
                  <button onClick={() => setSuppliers(suppliers.map(it => it.id === s.id ? { ...it, status: !it.status } : it))} className={`w-10 h-5 rounded-full relative transition-colors ${s.status ? 'bg-emerald-600' : 'bg-gray-200'}`}>
                    <div className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-all ${s.status ? 'left-[22px]' : 'left-0.5'}`}></div>
                  </button>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="p-1.5 text-gray-400 hover:text-emerald-600"><Eye className="w-4 h-4" /></button>
                    <button onClick={() => handleOpenModal(s)} className="p-1.5 text-gray-400 hover:text-emerald-600"><Edit className="w-4 h-4" /></button>
                    <button onClick={() => setSuppliers(suppliers.filter(it => it.id !== s.id))} className="p-1.5 text-gray-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingSupplier ? "Edit Supplier" : "Add Supplier"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Company Name" value={formData.companyName} onChange={e => setFormData({ ...formData, companyName: e.target.value })} className="w-full px-4 py-2 border rounded-lg" required />
          <input type="text" placeholder="Phone Number" value={formData.businessPhone} onChange={e => setFormData({ ...formData, businessPhone: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
          <textarea placeholder="Address" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-500">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded-lg">Save</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
