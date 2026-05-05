import { useState, useEffect } from 'react';
import { CreditCard, CheckCircle2 } from 'lucide-react';
import { LoadingSpinner } from '../../components/LoadingSpinner';

export const BillingSubscription = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Standardizing on settings.json for now, but in a real app this would be its own endpoint
    fetch('/src/data/settings.json')
      .then(res => res.json())
      .then(json => {
        // Mocking billing data for now based on settings.json or hardcoded if not found
        setData({
          planName: 'Professional Plan',
          status: 'ACTIVE',
          expiryDate: 'December 31, 2026',
          price: '৳4,999',
          features: [
            'Unlimited Products',
            'Advanced Reporting',
            'Multiple Branches (Up to 5)',
            'Priority Support',
            'Custom Domain',
            'API Access'
          ]
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading || !data) return <LoadingSpinner />;

  return (
    <div className="flex-1 bg-gray-50/50 min-h-screen">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Billing & Subscription</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your active plans, payment methods, and billing history.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Current Plan</h2>
              <div className="flex flex-col md:flex-row md:items-center justify-between p-6 border border-blue-100 bg-blue-50/50 rounded-xl">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold text-blue-900">{data.planName}</h3>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">{data.status}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4 md:mb-0">Your plan renews on <span className="font-semibold">{data.expiryDate}</span></p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-900 mb-1">{data.price}<span className="text-lg text-gray-500 font-normal">/mo</span></div>
                  <button className="text-sm font-medium text-blue-600 hover:text-blue-700">Cancel Subscription</button>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors">
                  Upgrade Plan
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-gray-900">Payment Methods</h2>
                <button className="text-blue-600 text-sm font-medium hover:text-blue-700">Add New</button>
              </div>
              <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-gray-500" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">•••• •••• •••• 4242</p>
                    <p className="text-xs text-gray-500">Expires 12/28</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded">Default</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 h-fit">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Plan Features</h2>
            <ul className="space-y-4">
              {data.features.map((feature: string, i: number) => (
                <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
