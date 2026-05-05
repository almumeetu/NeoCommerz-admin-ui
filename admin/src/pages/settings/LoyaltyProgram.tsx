import { useState, useEffect } from 'react';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import settingsData from '../../data/settings.json';

export const LoyaltyProgram = () => {
  const [config, setConfig] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setConfig(settingsData.loyaltyProgram);
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
            <h1 className="text-2xl font-bold text-gray-900">Loyalty Program</h1>
            <p className="text-sm text-gray-500 mt-1">Configure your customer loyalty and rewards program.</p>
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
              <h2 className="text-base font-semibold text-gray-900">Enable Loyalty Program</h2>
              <p className="text-sm text-gray-500 mt-1">Allow customers to earn points on their purchases.</p>
            </div>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Enable Program</h3>
                  <p className="text-sm text-gray-500 mt-0.5">Toggle to activate the loyalty program globally.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={config.status}
                    onChange={(e) => setConfig({ ...config, status: e.target.checked })}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>

          <hr className="border-gray-100" />

          <div className="grid grid-cols-[1fr_2fr] gap-12">
            <div>
              <h2 className="text-base font-semibold text-gray-900">Points Configuration</h2>
              <p className="text-sm text-gray-500 mt-1">Set how points are earned and redeemed.</p>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Points Earned per 1 Currency <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={config.pointsPerCurrency}
                  onChange={(e) => setConfig({ ...config, pointsPerCurrency: Number(e.target.value) })}
                  className="w-full max-w-md px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Points to Redeem <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={config.minimumPointsToRedeem}
                  onChange={(e) => setConfig({ ...config, minimumPointsToRedeem: Number(e.target.value) })}
                  className="w-full max-w-md px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
