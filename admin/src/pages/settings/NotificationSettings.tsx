import { useState, useEffect } from 'react';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import settingsData from '../../data/settings.json';

export const NotificationSettings = () => {
  const [config, setConfig] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setConfig(settingsData.notificationSettings);
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
            <h1 className="text-2xl font-bold text-gray-900">Notification Settings</h1>
            <p className="text-sm text-gray-500 mt-1">Manage which events trigger automatic emails or SMS.</p>
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
              <h2 className="text-base font-semibold text-gray-900">Email Notifications</h2>
              <p className="text-sm text-gray-500 mt-1">Configure automated emails sent to customers.</p>
            </div>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Order Confirmation</h3>
                  <p className="text-sm text-gray-500 mt-0.5">Send immediately after a successful checkout.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={config.orderConfirmationEmail}
                    onChange={(e) => setConfig({ ...config, orderConfirmationEmail: e.target.checked })}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Order Shipped</h3>
                  <p className="text-sm text-gray-500 mt-0.5">Send when the order status changes to shipped.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={config.orderShippedEmail}
                    onChange={(e) => setConfig({ ...config, orderShippedEmail: e.target.checked })}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Order Delivered</h3>
                  <p className="text-sm text-gray-500 mt-0.5">Send when the order is marked as completed.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={config.orderDeliveredEmail}
                    onChange={(e) => setConfig({ ...config, orderDeliveredEmail: e.target.checked })}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>

          <hr className="border-gray-100" />

          <div className="grid grid-cols-[1fr_2fr] gap-12">
            <div>
              <h2 className="text-base font-semibold text-gray-900">SMS Notifications</h2>
              <p className="text-sm text-gray-500 mt-1">Configure automated SMS alerts.</p>
            </div>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">SMS Order Updates</h3>
                  <p className="text-sm text-gray-500 mt-0.5">Send critical updates to the customer's phone number.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={config.smsOrderUpdates}
                    onChange={(e) => setConfig({ ...config, smsOrderUpdates: e.target.checked })}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
