import { Upload, X, Save, Globe, ShoppingCart, Zap, Shield } from 'lucide-react';
import { useState, useRef } from 'react';

export const ManageWebsite = () => {
  const [logoPreview, setLogoPreview] = useState<string | null>('/favicon.svg');
  const [formData, setFormData] = useState({
    shopName: 'NeoCommerz',
    defaultCurrency: 'BDT',
    language: 'Bengali',
    displayTopBar: true,
    topBarSlogan: 'Welcome to our online store!',
    hideOutOfStock: false,
    paymentMethods: ['Bkash', 'Nagad'],
    branch: 'Main Branch',
    shippingChargeDhaka: 0,
    shippingChargeOutside: 0,
    googleTagId: '',
    facebookPixelId: '',
    copyrightYear: new Date().getFullYear(),
    fraudCheckerEnabled: false,
    fraudCheckerApiKey: '',
    courierEnabled: false,
    courierApiKey: '',
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setLogoPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleInputChange = (key: string, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    alert('Website settings saved successfully!');
  };

  const templates = [
    { id: 1, name: 'Classic', image: '📱' },
    { id: 2, name: 'Minimalist', image: '✨' },
    { id: 3, name: 'Modern', image: '🎨' },
    { id: 4, name: 'Fashion', image: '👗' },
  ];

  return (
    <div className="flex-1 bg-gradient-to-br from-gray-50 via-white to-gray-50/50 min-h-screen">
      <div className="p-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <Globe className="w-8 h-8 text-emerald-600" />
            <h1 className="text-4xl font-extrabold text-gray-900">Manage Website</h1>
          </div>
          <p className="text-gray-600 font-medium">Configure and customize your online store settings</p>
        </div>

        {/* Basic Info Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-5 h-5 text-emerald-600" />
            <h2 className="text-xl font-bold text-gray-900">Basic Information</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Shop Name</label>
              <input
                type="text"
                value={formData.shopName}
                onChange={(e) => handleInputChange('shopName', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                placeholder="Enter shop name"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Default Currency</label>
              <select
                value={formData.defaultCurrency}
                onChange={(e) => handleInputChange('defaultCurrency', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
              >
                <option>BDT</option>
                <option>USD</option>
                <option>EUR</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Language</label>
              <select
                value={formData.language}
                onChange={(e) => handleInputChange('language', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
              >
                <option>Bengali</option>
                <option>English</option>
                <option>Arabic</option>
              </select>
            </div>
          </div>
        </div>

        {/* Template Selection */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Choose Template</h2>
          <p className="text-sm text-gray-600 mb-6 font-medium">Select a store template for your shop</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {templates.map((template) => (
              <button
                key={template.id}
                className="p-4 border-2 border-gray-300 rounded-2xl hover:border-emerald-500 hover:shadow-lg transition-all duration-300 text-center group"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{template.image}</div>
                <p className="font-semibold text-gray-900 text-sm">{template.name}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Logo Update */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Update Logo</h2>
          <p className="text-sm text-gray-600 mb-6 font-medium">Add your store logo as instructed to manage your website logos</p>
          <div className="flex gap-8">
            <div className="text-center">
              <p className="text-sm font-semibold text-gray-700 mb-4">Light Mode</p>
              <div className="relative inline-block border-2 border-dashed border-gray-300 rounded-xl p-8 min-w-[180px] min-h-[120px] flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleLogoChange}
                />
                {logoPreview ? (
                  <>
                    <img src={logoPreview} alt="Logo" className="max-w-full max-h-full object-contain" />
                    <button
                      onClick={removeLogo}
                      className="absolute -top-3 -right-3 bg-red-500 rounded-full p-2 text-white hover:bg-red-600 shadow-lg transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="text-center"
                  >
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-xs font-semibold text-gray-500">Click to upload</p>
                  </button>
                )}
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-gray-700 mb-4">Dark Mode</p>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 min-w-[180px] min-h-[120px] flex items-center justify-center bg-gray-900">
                <p className="text-xs font-semibold text-gray-500">Upload Dark Logo</p>
              </div>
            </div>
          </div>
        </div>

        {/* UI Settings */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">UI Settings</h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="font-semibold text-gray-900">Display Top Bar</p>
                <p className="text-sm text-gray-500 mt-1">This will show the text in the corner of the top bar</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.displayTopBar}
                  onChange={(e) => handleInputChange('displayTopBar', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Top Bar Slogan</label>
              <input
                type="text"
                value={formData.topBarSlogan}
                onChange={(e) => handleInputChange('topBarSlogan', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                placeholder="Enter top bar slogan"
              />
            </div>
          </div>
        </div>

        {/* Product Settings */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <ShoppingCart className="w-5 h-5 text-emerald-600" />
            <h2 className="text-xl font-bold text-gray-900">Product Settings</h2>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <p className="font-semibold text-gray-900">Hide Out of Stock Products</p>
              <p className="text-sm text-gray-500 mt-1">Product will not display in website if the products not in stock in inventory</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.hideOutOfStock}
                onChange={(e) => handleInputChange('hideOutOfStock', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
            </label>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Methods</h2>
          <p className="text-sm text-gray-600 mb-6 font-medium">Add your preferred payment methods to choose in the footer</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Bkash', 'Nagad', 'Rocket', 'Credit Card'].map((method) => (
              <div key={method} className="flex items-center justify-center p-4 border border-gray-300 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition-all cursor-pointer">
                <p className="font-semibold text-gray-900">{method}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Branch & Shipping */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Branch & Shipping</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Branch</label>
              <select
                value={formData.branch}
                onChange={(e) => handleInputChange('branch', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
              >
                <option>Main Branch</option>
                <option>Branch 2</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Shipping in Dhaka</label>
              <input
                type="number"
                value={formData.shippingChargeDhaka}
                onChange={(e) => handleInputChange('shippingChargeDhaka', Number(e.target.value))}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Shipping Outside Dhaka</label>
              <input
                type="number"
                value={formData.shippingChargeOutside}
                onChange={(e) => handleInputChange('shippingChargeOutside', Number(e.target.value))}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* Tracking & Analytics */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Tracking & Analytics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Google Tag (GTag ID)</label>
              <input
                type="text"
                value={formData.googleTagId}
                onChange={(e) => handleInputChange('googleTagId', e.target.value)}
                placeholder="e.g. G-1XXX0000"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Facebook Pixel ID</label>
              <input
                type="text"
                value={formData.facebookPixelId}
                onChange={(e) => handleInputChange('facebookPixelId', e.target.value)}
                placeholder="e.g. 1234567890"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* Security & Integration */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-5 h-5 text-emerald-600" />
            <h2 className="text-xl font-bold text-gray-900">Security & Integration</h2>
          </div>

          {/* Fraud Checker */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-semibold text-gray-900">Fraud Checker</p>
                <p className="text-sm text-gray-500 mt-1">Configure settings for the FraudChecker API integration</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.fraudCheckerEnabled}
                  onChange={(e) => handleInputChange('fraudCheckerEnabled', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>
            {formData.fraudCheckerEnabled && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Fraud Checker API Key</label>
                <input
                  type="password"
                  value={formData.fraudCheckerApiKey}
                  onChange={(e) => handleInputChange('fraudCheckerApiKey', e.target.value)}
                  placeholder="Enter valid API key"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            )}
          </div>

          {/* Courier Integration */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-semibold text-gray-900">Courier Integration</p>
                <p className="text-sm text-gray-500 mt-1">Configure Steadfast courier credentials and keep the order page when this provider is enabled and configured</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.courierEnabled}
                  onChange={(e) => handleInputChange('courierEnabled', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>
            {formData.courierEnabled && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">API Key</label>
                <input
                  type="password"
                  value={formData.courierApiKey}
                  onChange={(e) => handleInputChange('courierApiKey', e.target.value)}
                  placeholder="Enter Steadfast API key"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all mb-3"
                />
                <label className="block text-sm font-semibold text-gray-700 mb-2">Secret Key</label>
                <input
                  type="password"
                  placeholder="Enter Steadfast secret key"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            )}
          </div>
        </div>

        {/* Copyright Info */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Copyright Information</h2>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Copyright Year</label>
            <input
              type="number"
              value={formData.copyrightYear}
              onChange={(e) => handleInputChange('copyrightYear', Number(e.target.value))}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
            />
            <p className="text-xs text-gray-500 mt-2">Do you have any parent company name? This will display with the copyright text</p>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end gap-3">
          <button className="px-6 py-3 text-gray-700 font-semibold border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors shadow-lg hover:shadow-xl"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};
