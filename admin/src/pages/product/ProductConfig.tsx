import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PageHeader, SectionHeader } from '../../components/PageHeaders';
import { Modal } from '../../components/Modal';
import { Edit, Trash2, Settings } from 'lucide-react';

export const ProductConfig = () => {
  const location = useLocation();
  const path = location.pathname;
  
  let title = "Product Configuration";
  let itemName = "item";
  
  if (path.includes('specifications')) { title = "Specifications"; itemName = "specifications"; }
  else if (path.includes('variant-options')) { title = "Variant Options"; itemName = "options"; }
  else if (path.includes('units-of-measurement')) { title = "Units of Measurement"; itemName = "units"; }

  const [items, setItems] = useState([
    { id: 1, name: 'Sample ' + title, status: true },
  ]);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState('');

  const filteredItems = items.filter(i => i.name.toLowerCase().includes(search.toLowerCase()));

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    setItems([{ id: Date.now(), name: newName, status: true }, ...items]);
    setNewName('');
    setIsModalOpen(false);
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto bg-white min-h-screen">
      <PageHeader title={title} subtitle={`Configure your product ${title.toLowerCase()} settings`} />
      <SectionHeader 
        title={`${title} List`} 
        count={filteredItems.length} 
        itemName={itemName} 
        onAdd={() => setIsModalOpen(true)} 
        searchPlaceholder={`Search ${title.toLowerCase()}...`} 
        searchValue={search}
        onSearchChange={setSearch}
      />

      <div className="border border-gray-100 rounded-lg overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 font-semibold text-gray-900">Name</th>
              <th className="px-6 py-4 font-semibold text-gray-900">Status</th>
              <th className="px-6 py-4 font-semibold text-gray-900 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredItems.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">
                  <div className="flex items-center gap-3">
                    <Settings className="w-4 h-4 text-gray-300" />
                    {item.name}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold uppercase">Active</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors"><Edit className="w-4 h-4" /></button>
                    <button 
                      onClick={() => setItems(items.filter(i => i.id !== item.id))}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`Add New ${title}`}>
        <form onSubmit={handleAddItem}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input 
              type="text" 
              required
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20 outline-none"
            />
          </div>
          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm text-gray-500">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg">Save</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
