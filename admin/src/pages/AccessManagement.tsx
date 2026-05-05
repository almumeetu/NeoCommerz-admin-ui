import { useState, useEffect } from 'react';
import { Shield, Edit, Trash2, Plus, Search, RefreshCw } from 'lucide-react';
import { Modal } from '../components/Modal';
import { LoadingSpinner } from '../components/LoadingSpinner';

interface SystemUser {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

export const AccessManagement = () => {
  const [users, setUsers] = useState<SystemUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Manager', status: 'active' });

  useEffect(() => {
    fetch('/src/data/access_management.json')
      .then(res => res.json())
      .then(json => { setUsers(json.users); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = () => {
    if (newUser.name.trim() && newUser.email.trim()) {
      setUsers([...users, { ...newUser, id: Date.now() }]);
      setNewUser({ name: '', email: '', role: 'Manager', status: 'active' });
      setIsModalOpen(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="flex-1 bg-gray-50/50 min-h-screen">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Access Management</h1>
          <p className="text-sm text-gray-500 mt-1">Manage user roles and system permissions</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900">System Users</h2>
              <p className="text-sm text-gray-500">Displaying {filteredUsers.length} user{filteredUsers.length !== 1 && 's'}</p>
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
                Add User
              </button>
            </div>
          </div>

          <div className="mb-6 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search users by name or email..."
              className="w-full max-w-md pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="py-4 px-4 text-sm font-semibold text-gray-900">User</th>
                  <th className="py-4 px-4 text-sm font-semibold text-gray-900">Role</th>
                  <th className="py-4 px-4 text-sm font-semibold text-gray-900 w-28">Status</th>
                  <th className="py-4 px-4 text-sm font-semibold text-gray-900 w-28">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs uppercase">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="flex items-center gap-1.5 text-gray-600 font-medium text-sm">
                        <Shield className="w-3.5 h-3.5 text-gray-400" />
                        {user.role}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${user.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-500'}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 border border-gray-200 rounded text-gray-500 hover:bg-gray-50 transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          className="p-1.5 border border-gray-200 rounded text-red-500 hover:bg-red-50 transition-colors"
                          onClick={() => setUsers(users.filter(u => u.id !== user.id))}
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
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add System User">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input type="text" placeholder="e.g. John Doe" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input type="email" placeholder="e.g. john@example.com" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white" value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}>
              <option value="Manager">Manager</option>
              <option value="Super Admin">Super Admin</option>
              <option value="Administrator">Administrator</option>
              <option value="Sales Staff">Sales Staff</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Status (Active)</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={newUser.status === 'active'} onChange={(e) => setNewUser({ ...newUser, status: e.target.checked ? 'active' : 'inactive' })} />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors border border-gray-200">Cancel</button>
            <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">Save User</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
