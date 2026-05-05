import React from 'react';

interface PlaceholderProps {
  title: string;
  subtitle: string;
}

export const SettingsPlaceholder: React.FC<PlaceholderProps> = ({ title, subtitle }) => {
  return (
    <div className="flex-1 bg-gray-50/50 min-h-screen">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <h2 className="text-lg font-medium text-gray-900 mb-2">{title} Configuration</h2>
            <p className="text-gray-500">This section is currently under construction.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
