import { useState, useEffect } from 'react';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import settingsData from '../../data/settings.json';

export const StoreCreditRefund = () => {
  const [config, setConfig] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setConfig(settingsData.storeCreditRefund);
    setLoading(false);
  }, []);

  const handleSave = () => {
    alert('Settings saved successfully!');
  };

  if (loading || !config) return <LoadingSpinner />;

  return (
    <div className="flex-1 bg-gray-50/50 min-h-screen">
      <div className="p-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Store Credit & Refund</h1>
            <p className="text-sm text-gray-500 mt-1">Manage store credit & refund policy.</p>
          </div>
          <button 
            onClick={handleSave}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium shadow-sm hover:bg-blue-700 transition-colors"
          >
            Save
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-12">
          <div className="grid grid-cols-[1fr_2fr] gap-12">
            <div>
              <h2 className="text-base font-semibold text-gray-900">Enable store credit</h2>
              <p className="text-sm text-gray-500 mt-1">Select the channel where store credit & refund will be applicable.</p>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Channel <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select 
                    value={config.refundChannel}
                    onChange={(e) => setConfig({ ...config, refundChannel: e.target.value })}
                    className="w-full appearance-none px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white text-gray-700"
                  >
                    <option value="">Select channel</option>
                    <option value="original">Original Payment Method</option>
                    <option value="store_credit">Store Credit</option>
                    <option value="cash">Cash</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Enable store credit</h3>
                  <p className="text-sm text-gray-500 mt-0.5">With the toggle enabled, store credit will be usable on all branch.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={config.enableStoreCredit}
                    onChange={(e) => setConfig({ ...config, enableStoreCredit: e.target.checked })}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Enable Refund</h3>
                  <p className="text-sm text-gray-500 mt-0.5">Offer customers the flexibility to refund their orders.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={config.enableRefund}
                    onChange={(e) => setConfig({ ...config, enableRefund: e.target.checked })}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>

          <hr className="border-gray-100" />

          <div className="grid grid-cols-[1fr_2fr] gap-12">
            <div>
              <h2 className="text-base font-semibold text-gray-900">Point Conversion</h2>
              <p className="text-sm text-gray-500 mt-1">Points can be converted into store credits, or other.</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Conversion Rate <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={config.storeCreditConversionRate}
                onChange={(e) => setConfig({ ...config, storeCreditConversionRate: Number(e.target.value) })}
                className="w-full max-w-md px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
