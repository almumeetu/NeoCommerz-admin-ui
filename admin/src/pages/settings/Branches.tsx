import { useState, useEffect } from 'react';
import { Plus, RefreshCw, Edit, Trash2, Search } from 'lucide-react';
import { Modal } from '../../components/Modal';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import type { Branch } from '../../types/types';

export const Branches = () => {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBranch, setNewBranch] = useState({ name: '', location: '', phone: '', manager: '', status: true });

  useEffect(() => {
    fetch('/src/data/settings.json')
      .then(res => res.json())
      .then(json => { setBranches(json.branches); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const handleSave = () => {
    if (newBranch.name.trim()) {
      setBranches([...branches, { ...newBranch, id: Date.now() }]);
      setNewBranch({ name: '', location: '', phone: '', manager: '', status: true });
      setIsModalOpen(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  const filtered = branches.filter(b => b.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex-1 bg-gray-50/50 min-h-screen">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Branches</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your physical store and warehouse locations.</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Branch List</h2>
              <p className="text-sm text-gray-500">Displaying {filtered.length} branch{filtered.length !== 1 && 'es'}</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors"><RefreshCw className="w-5 h-5" /></button>
              <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                <Plus className="w-5 h-5" /> Add Branch
              </button>
            </div>
          </div>
          <div className="mb-6 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input type="text" placeholder="Search branches..." className="w-full max-w-md pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="py-4 px-4 text-sm font-semibold text-gray-900">Branch Name</th>
                  <th className="py-4 px-4 text-sm font-semibold text-gray-900">Location</th>
                  <th className="py-4 px-4 text-sm font-semibold text-gray-900">Phone</th>
                  <th className="py-4 px-4 text-sm font-semibold text-gray-900">Manager</th>
                  <th className="py-4 px-4 text-sm font-semibold text-gray-900 w-24">Status</th>
                  <th className="py-4 px-4 text-sm font-semibold text-gray-900 w-28">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((branch) => (
                  <tr key={branch.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-4 text-sm font-semibold text-gray-900">{branch.name}</td>
                    <td className="py-4 px-4 text-sm text-gray-600">{branch.location}</td>
                    <td className="py-4 px-4 text-sm text-gray-600">{branch.phone}</td>
                    <td className="py-4 px-4 text-sm text-gray-600">{branch.manager}</td>
                    <td className="py-4 px-4">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={branch.status} onChange={() => setBranches(branches.map(b => b.id === branch.id ? { ...b, status: !b.status } : b))} />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 border border-gray-200 rounded text-gray-500 hover:bg-gray-50 transition-colors"><Edit className="w-4 h-4" /></button>
                        <button className="p-1.5 border border-gray-200 rounded text-red-500 hover:bg-red-50 transition-colors" onClick={() => setBranches(branches.filter(b => b.id !== branch.id))}><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Branch">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Branch Name</label>
            <input type="text" placeholder="e.g. Sylhet Branch" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" value={newBranch.name} onChange={(e) => setNewBranch({ ...newBranch, name: e.target.value })} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input type="text" placeholder="e.g. Sylhet, Bangladesh" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" value={newBranch.location} onChange={(e) => setNewBranch({ ...newBranch, location: e.target.value })} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input type="text" placeholder="e.g. +880 1700-000004" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" value={newBranch.phone} onChange={(e) => setNewBranch({ ...newBranch, phone: e.target.value })} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Manager</label>
            <input type="text" placeholder="e.g. John Doe" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" value={newBranch.manager} onChange={(e) => setNewBranch({ ...newBranch, manager: e.target.value })} />
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg font-medium border border-gray-200 transition-colors">Cancel</button>
            <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">Save Branch</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
