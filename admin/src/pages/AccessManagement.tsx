import { useState } from 'react';
import { PageHeader, SectionHeader } from '../components/PageHeaders';
import { Shield, Edit, Trash2 } from 'lucide-react';

const initialUsers = [
  { id: 1, name: 'Am Saikat', email: 'amsaikat@neocommerz.com', role: 'Super Admin', status: 'active' },
  { id: 2, name: 'Zahir Islam', email: 'zahir@softzino.com', role: 'Manager', status: 'active' },
];

export const AccessManagement = () => {
  const [users] = useState(initialUsers);
  const [search, setSearch] = useState('');

  const filteredUsers = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-8 max-w-[1600px] mx-auto bg-white min-h-screen">
      <PageHeader title="Access Management" subtitle="Manage user roles and system permissions" />
      
      <SectionHeader 
        title="System Users" 
        count={filteredUsers.length} 
        itemName="users" 
        onAdd={() => {}} 
        searchPlaceholder="Search users by name or email..." 
        searchValue={search}
        onSearchChange={setSearch}
      />

      <div className="border border-gray-100 rounded-lg overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 font-semibold text-gray-900">User</th>
              <th className="px-6 py-4 font-semibold text-gray-900">Role</th>
              <th className="px-6 py-4 font-semibold text-gray-900">Status</th>
              <th className="px-6 py-4 font-semibold text-gray-900 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs uppercase">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="flex items-center gap-1.5 text-gray-600 font-medium">
                    <Shield className="w-3.5 h-3.5 text-gray-400" />
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold uppercase">Active</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors"><Edit className="w-4 h-4" /></button>
                    <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
