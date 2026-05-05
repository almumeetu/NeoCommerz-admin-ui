import { useState, useEffect } from 'react';
import { Plus, RefreshCw, Edit, Trash2, Search } from 'lucide-react';
import { Modal } from '../../components/Modal';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import type { Role } from '../../types/types';

export const Roles = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRole, setNewRole] = useState({ name: '', permissions: '', users: 0, status: true });

  useEffect(() => {
    fetch('/src/data/access_management.json')
      .then(res => res.json())
      .then(json => { setRoles(json.roles); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const handleSave = () => {
    if (newRole.name.trim()) {
      setRoles([...roles, { ...newRole, id: Date.now() }]);
      setNewRole({ name: '', permissions: '', users: 0, status: true });
      setIsModalOpen(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  const filtered = roles.filter(r => r.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex-1 bg-gray-50/50 min-h-screen">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Roles & Permissions</h1>
          <p className="text-sm text-gray-500 mt-1">Define what each role can access within the system.</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Role List</h2>
              <p className="text-sm text-gray-500">Displaying {filtered.length} role{filtered.length !== 1 && 's'}</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors"><RefreshCw className="w-5 h-5" /></button>
              <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                <Plus className="w-5 h-5" /> Add Role
              </button>
            </div>
          </div>
          <div className="mb-6 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input type="text" placeholder="Search roles..." className="w-full max-w-md pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="py-4 px-4 text-sm font-semibold text-gray-900">Role Name</th>
                  <th className="py-4 px-4 text-sm font-semibold text-gray-900">Permissions</th>
                  <th className="py-4 px-4 text-sm font-semibold text-gray-900">Users</th>
                  <th className="py-4 px-4 text-sm font-semibold text-gray-900 w-24">Status</th>
                  <th className="py-4 px-4 text-sm font-semibold text-gray-900 w-28">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((role) => (
                  <tr key={role.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-4 text-sm font-semibold text-gray-900">{role.name}</td>
                    <td className="py-4 px-4 text-sm text-gray-600">{role.permissions}</td>
                    <td className="py-4 px-4 text-sm text-gray-600">{role.users}</td>
                    <td className="py-4 px-4">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={role.status} onChange={() => setRoles(roles.map(r => r.id === role.id ? { ...r, status: !r.status } : r))} />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 border border-gray-200 rounded text-gray-500 hover:bg-gray-50 transition-colors"><Edit className="w-4 h-4" /></button>
                        <button className="p-1.5 border border-gray-200 rounded text-red-500 hover:bg-red-50 transition-colors" onClick={() => setRoles(roles.filter(r => r.id !== role.id))}><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Role">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role Name</label>
            <input type="text" placeholder="e.g. Sales Staff" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" value={newRole.name} onChange={(e) => setNewRole({ ...newRole, name: e.target.value })} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Permissions</label>
            <input type="text" placeholder="e.g. Orders, Products" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" value={newRole.permissions} onChange={(e) => setNewRole({ ...newRole, permissions: e.target.value })} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Status (Active)</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={newRole.status} onChange={(e) => setNewRole({ ...newRole, status: e.target.checked })} />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg font-medium border border-gray-200 transition-colors">Cancel</button>
            <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">Save Role</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
