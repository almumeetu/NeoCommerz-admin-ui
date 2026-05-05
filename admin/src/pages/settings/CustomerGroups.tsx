import { Plus, RefreshCw, Edit, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Modal } from '../../components/Modal';
import { LoadingSpinner } from '../../components/LoadingSpinner';

interface CustomerGroup {
  id: number;
  name: string;
  discount: string;
  members: number;
  status: boolean;
}

export const CustomerGroups = () => {
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groups, setGroups] = useState<CustomerGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [newGroup, setNewGroup] = useState({ name: '', discount: '', status: true });

  useEffect(() => {
    fetch('/src/data/settings.json')
      .then(res => res.json())
      .then(json => {
        setGroups(json.customerGroups);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSave = () => {
    if (newGroup.name.trim()) {
      setGroups([...groups, { ...newGroup, id: Date.now(), members: 0 }]);
      setNewGroup({ name: '', discount: '', status: true });
      setIsModalOpen(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  const filtered = groups.filter(g => g.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex-1 bg-gray-50/50 min-h-screen">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Customer Groups</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and segment your customer base.</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Group List</h2>
              <p className="text-sm text-gray-500">Displaying {filtered.length} group{filtered.length !== 1 && 's'}</p>
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
                Add Group
              </button>
            </div>
          </div>

          <div className="mb-6 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by group name..."
              className="w-full max-w-md pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="py-4 px-4 text-sm font-semibold text-gray-900">Group Name</th>
                  <th className="py-4 px-4 text-sm font-semibold text-gray-900">Discount</th>
                  <th className="py-4 px-4 text-sm font-semibold text-gray-900">Members</th>
                  <th className="py-4 px-4 text-sm font-semibold text-gray-900 w-24">Status</th>
                  <th className="py-4 px-4 text-sm font-semibold text-gray-900 w-24">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((group) => (
                  <tr key={group.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-4 text-sm font-medium text-gray-900">{group.name}</td>
                    <td className="py-4 px-4 text-sm text-gray-600">{group.discount}</td>
                    <td className="py-4 px-4 text-sm text-gray-600">{group.members}</td>
                    <td className="py-4 px-4">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={group.status}
                          onChange={() => {
                            setGroups(groups.map(item => item.id === group.id ? { ...item, status: !item.status } : item));
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
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Customer Group">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Group Name</label>
            <input 
              type="text" 
              placeholder="e.g. VIP Customers" 
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              value={newGroup.name}
              onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Global Discount (%)</label>
            <input 
              type="text" 
              placeholder="e.g. 10%" 
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              value={newGroup.discount}
              onChange={(e) => setNewGroup({ ...newGroup, discount: e.target.value })}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Status</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={newGroup.status}
                onChange={(e) => setNewGroup({ ...newGroup, status: e.target.checked })}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors border border-gray-200">Cancel</button>
            <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">Save Group</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
