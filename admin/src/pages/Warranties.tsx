import { Plus, RefreshCw, Edit, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Modal } from '../components/Modal';
import { LoadingSpinner } from '../components/LoadingSpinner';

interface Warranty {
  id: number;
  name: string;
  duration: string;
  type: string;
  status: boolean;
}

export const Warranties = () => {
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [warranties, setWarranties] = useState<Warranty[]>([]);
  const [loading, setLoading] = useState(true);
  const [newWarranty, setNewWarranty] = useState({ name: '', duration: '', type: 'Replacement', status: true });

  useEffect(() => {
    fetch('/src/data/settings.json')
      .then(res => res.json())
      .then(json => {
        setWarranties(json.warrantyPolicies);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSave = () => {
    if (newWarranty.name.trim()) {
      setWarranties([...warranties, { ...newWarranty, id: Date.now() }]);
      setNewWarranty({ name: '', duration: '', type: 'Replacement', status: true });
      setIsModalOpen(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  const filtered = warranties.filter(w => w.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex-1 bg-gray-50/50 min-h-screen">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Warranties</h1>
          <p className="text-sm text-gray-500 mt-1">Manage product warranties and service agreements.</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Warranty List</h2>
              <p className="text-sm text-gray-500">Displaying {filtered.length} polic{filtered.length !== 1 ? 'ies' : 'y'}</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors">
                <RefreshCw className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                <Plus className="w-5 h-5" />
                Add Warranty
              </button>
            </div>
          </div>

          <div className="mb-6 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by warranty name..."
              className="w-full max-w-md pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="py-4 px-4 text-sm font-semibold text-gray-900">Policy Name</th>
                  <th className="py-4 px-4 text-sm font-semibold text-gray-900">Duration</th>
                  <th className="py-4 px-4 text-sm font-semibold text-gray-900">Type</th>
                  <th className="py-4 px-4 text-sm font-semibold text-gray-900 w-24">Status</th>
                  <th className="py-4 px-4 text-sm font-semibold text-gray-900 w-24">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((warranty) => (
                  <tr key={warranty.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-4 text-sm font-medium text-gray-900">{warranty.name}</td>
                    <td className="py-4 px-4 text-sm text-gray-600">{warranty.duration}</td>
                    <td className="py-4 px-4 text-sm text-gray-600">
                      <span className="px-2 py-1 bg-gray-100 rounded text-xs">{warranty.type}</span>
                    </td>
                    <td className="py-4 px-4">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={warranty.status}
                          onChange={() => {
                            setWarranties(warranties.map(item => item.id === warranty.id ? { ...item, status: !item.status } : item));
                          }}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </td>
                    <td className="py-4 px-4">
                      <button className="p-1.5 border border-gray-200 rounded text-gray-500 hover:bg-gray-50 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Warranty Policy">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Policy Name</label>
            <input 
              type="text" 
              placeholder="e.g. 1 Year Standard" 
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              value={newWarranty.name}
              onChange={(e) => setNewWarranty({ ...newWarranty, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
            <input 
              type="text" 
              placeholder="e.g. 12 Months" 
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              value={newWarranty.duration}
              onChange={(e) => setNewWarranty({ ...newWarranty, duration: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select 
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
              value={newWarranty.type}
              onChange={(e) => setNewWarranty({ ...newWarranty, type: e.target.value })}
            >
              <option value="Replacement">Replacement</option>
              <option value="Service">Service</option>
              <option value="Parts">Parts Only</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Status</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={newWarranty.status}
                onChange={(e) => setNewWarranty({ ...newWarranty, status: e.target.checked })}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors border border-gray-200">Cancel</button>
            <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">Save Warranty</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
