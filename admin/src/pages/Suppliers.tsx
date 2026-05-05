import { useState, useEffect } from 'react';
import { Edit, Eye, Trash2 } from 'lucide-react';
import { PageHeader, SectionHeader } from '../components/PageHeaders';
import { Modal } from '../components/Modal';
import { LoadingSpinner } from '../components/LoadingSpinner';
import type { SupplierItem } from '../types/types';

export const Suppliers = () => {
  const [suppliers, setSuppliers] = useState<SupplierItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<SupplierItem | null>(null);
  const [formData, setFormData] = useState({ companyName: '', businessPhone: '', address: '' });

  useEffect(() => {
    fetch('/src/data/suppliers.json')
      .then(res => res.json())
      .then(json => {
        setSuppliers(json);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredSuppliers = suppliers.filter(s => s.companyName.toLowerCase().includes(search.toLowerCase()));

  const handleOpenModal = (supplier?: SupplierItem) => {
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

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-8 max-w-[1600px] mx-auto bg-white min-h-screen">
      <PageHeader title="Suppliers" subtitle="A list of all suppliers" />
      <SectionHeader title="Supplier list" count={filteredSuppliers.length} itemName="supplier" onAdd={() => handleOpenModal()} searchPlaceholder="Search suppliers..." searchValue={search} onSearchChange={setSearch} />
      <div className="border border-gray-100 rounded-lg overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 font-semibold text-gray-900">Company Name</th>
              <th className="px-6 py-4 font-semibold text-gray-900">Phone</th>
              <th className="px-6 py-4 font-semibold text-gray-900">Status</th>
              <th className="px-6 py-4 font-semibold text-gray-900 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredSuppliers.map((s) => (
              <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">{s.companyName}</td>
                <td className="px-6 py-4 text-gray-600">{s.businessPhone}</td>
                <td className="px-6 py-4">
                  <button onClick={() => setSuppliers(suppliers.map(it => it.id === s.id ? { ...it, status: !it.status } : it))} className={`w-10 h-5 rounded-full relative transition-colors duration-200 ${s.status ? 'bg-emerald-600' : 'bg-gray-200'}`}>
                    <div className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-all duration-200 ${s.status ? 'left-[22px]' : 'left-0.5'}`}></div>
                  </button>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors"><Eye className="w-4 h-4" /></button>
                    <button onClick={() => handleOpenModal(s)} className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors"><Edit className="w-4 h-4" /></button>
                    <button onClick={() => setSuppliers(suppliers.filter(it => it.id !== s.id))} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingSupplier ? "Edit Supplier" : "Add Supplier"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
             <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
               <input type="text" placeholder="e.g. Global Tech Solutions" value={formData.companyName} onChange={e => setFormData({ ...formData, companyName: e.target.value })} className="w-full px-4 py-2 border rounded-lg focus:border-emerald-500 outline-none transition-all" required />
             </div>
             <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Business Phone</label>
               <input type="text" placeholder="+880 1XXX-XXXXXX" value={formData.businessPhone} onChange={e => setFormData({ ...formData, businessPhone: e.target.value })} className="w-full px-4 py-2 border rounded-lg focus:border-emerald-500 outline-none transition-all" />
             </div>
             <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
               <textarea placeholder="Full business address" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} className="w-full px-4 py-2 border rounded-lg focus:border-emerald-500 outline-none transition-all h-24 resize-none" />
             </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700">Cancel</button>
            <button type="submit" className="px-6 py-2 bg-emerald-600 text-white rounded-lg font-bold shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition-all active:scale-95">Save Supplier</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
