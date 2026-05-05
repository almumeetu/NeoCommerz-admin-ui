import { useState } from 'react';
import { 
  Building2, MonitorSmartphone, Globe, 
  CircleDollarSign, Star, Gift, Users, Tag, CreditCard,
  Box, ShoppingCart,
  Bell, MessageSquare
} from 'lucide-react';
import { Branches } from './settings/Branches';
import { SiteSettings } from './settings/SiteSettings';
import { StoreCreditRefund } from './settings/StoreCreditRefund';
import { Registers } from './settings/Registers';
import { LoyaltyProgram } from './settings/LoyaltyProgram';
import { GiftVoucher } from './settings/GiftVoucher';
import { CustomerGroups } from './settings/CustomerGroups';
import { DiscountSettings } from './settings/DiscountSettings';
import { BillingSubscription } from './settings/BillingSubscription';
import { InventorySettings } from './settings/InventorySettings';
import { PosSettings } from './settings/PosSettings';
import { NotificationSettings } from './settings/NotificationSettings';
import { MessageSettings } from './settings/MessageSettings';
import { SettingsPlaceholder } from './settings/SettingsPlaceholder';
import clsx from 'clsx';

export const Settings = () => {
  const [activeTab, setActiveTab] = useState('Branches');

  const groups = [
    {
      title: 'GENERAL',
      items: [
        { id: 'Branches', label: 'Branches', icon: Building2 },
        { id: 'Registers', label: 'Registers', icon: MonitorSmartphone },
        { id: 'Site Settings', label: 'Site Settings', icon: Globe },
      ]
    },
    {
      title: 'FINANCE',
      items: [
        { id: 'Store Credit & Refund', label: 'Store Credit & Refund', icon: CircleDollarSign },
        { id: 'Loyalty Program', label: 'Loyalty Program', icon: Star },
        { id: 'Gift Voucher', label: 'Gift Voucher', icon: Gift },
        { id: 'Customer Groups', label: 'Customer Groups', icon: Users },
        { id: 'Discount', label: 'Discount', icon: Tag },
        { id: 'Billing & Subscription', label: 'Billing & Subscription', icon: CreditCard },
      ]
    },
    {
      title: 'OPERATIONS',
      items: [
        { id: 'Inventory Settings', label: 'Inventory Settings', icon: Box },
        { id: 'POS Settings', label: 'POS Settings', icon: ShoppingCart },
      ]
    },
    {
      title: 'COMMUNICATION',
      items: [
        { id: 'Notification Settings', label: 'Notification Settings', icon: Bell },
        { id: 'Message', label: 'Message', icon: MessageSquare },
      ]
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'Branches':
        return <Branches />;
      case 'Registers':
        return <Registers />;
      case 'Site Settings':
        return <SiteSettings />;
      case 'Store Credit & Refund':
        return <StoreCreditRefund />;
      case 'Loyalty Program':
        return <LoyaltyProgram />;
      case 'Gift Voucher':
        return <GiftVoucher />;
      case 'Customer Groups':
        return <CustomerGroups />;
      case 'Discount':
        return <DiscountSettings />;
      case 'Billing & Subscription':
        return <BillingSubscription />;
      case 'Inventory Settings':
        return <InventorySettings />;
      case 'POS Settings':
        return <PosSettings />;
      case 'Notification Settings':
        return <NotificationSettings />;
      case 'Message':
        return <MessageSettings />;
      default:
        return (
          <SettingsPlaceholder 
            title={activeTab} 
            subtitle={`Manage your ${activeTab.toLowerCase()} settings and preferences`} 
          />
        );
    }
  };

  return (
    <div className="flex min-h-full">
      {/* Secondary Sidebar */}
      <div className="w-64 shrink-0 bg-white border-r border-gray-100 py-6 font-sans">
        {groups.map((group, idx) => (
          <div key={idx} className="mb-6">
            <h4 className="px-6 text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2">
              {group.title}
            </h4>
            <div className="space-y-0.5 px-3">
              {group.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={clsx(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    activeTab === item.id
                      ? "text-blue-600 font-medium border border-blue-600 bg-white"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      {renderContent()}
    </div>
  );
};
