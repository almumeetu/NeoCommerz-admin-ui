import { useState } from 'react';
import { PageHeader } from '../components/PageHeaders';
import { Key, Bell, Globe } from 'lucide-react';

export const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: 'General', icon: Globe },
    { id: 'security', label: 'Security', icon: Key },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  return (
    <div className="p-8 max-w-[1200px] mx-auto bg-white min-h-screen">
      <PageHeader title="Settings" subtitle="Manage your application configuration and preferences" />
      
      <div className="flex gap-8 mt-8">
        <div className="w-64 shrink-0">
          <div className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab.id 
                    ? 'bg-emerald-50 text-emerald-600' 
                    : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 bg-gray-50/50 rounded-2xl p-8 border border-gray-100">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-6">General Information</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Branch Name</label>
                    <input type="text" defaultValue="Main Branch" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Currency Symbol</label>
                    <input type="text" defaultValue="৳" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20 outline-none" />
                  </div>
                </div>
              </div>
              <div className="pt-6 border-t border-gray-100">
                 <button className="px-6 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-all">Save Changes</button>
              </div>
            </div>
          )}
          {activeTab !== 'general' && (
            <div className="flex items-center justify-center h-64 text-gray-400 italic">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} settings coming soon.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
