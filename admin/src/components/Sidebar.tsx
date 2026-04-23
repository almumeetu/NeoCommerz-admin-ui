import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  Package,
  Store,
  Gift,
  ChevronDown,
  ChevronUp,
  PartyPopper,
  Search,
  Building,
  LogOut,
  PanelLeftClose,
  Wrench,
  Percent,
  Settings2,
  FileText,
  ShieldCheck
} from 'lucide-react';
import clsx from 'clsx';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const menuGroups = [
  {
    title: 'OVERVIEW',
    items: [
      { 
        path: '/dashboard', 
        label: 'Dashboard', 
        icon: LayoutDashboard, 
        hasSubMenu: true, 
        subItems: [
          { path: '/dashboard/e-commerce', label: 'E-Commerce' }
        ]
      }
    ]
  },
  {
    title: 'INVENTORY & PROCUREMENT',
    items: [
      { path: '/suppliers', label: 'Suppliers', icon: Users },
      { 
        path: '/product', 
        label: 'Product', 
        icon: Package, 
        hasSubMenu: true,
        subItems: [
          { path: '/product/tags', label: 'Tags' },
          { path: '/product/brands', label: 'Brands' },
          { path: '/product/categories', label: 'Categories' },
          { path: '/product/specifications', label: 'Specifications' },
          { path: '/product/variant-options', label: 'Variant Options' },
          { path: '/product/units-of-measurement', label: 'Units of Measurement' },
          { path: '/product/products', label: 'Products' },
        ]
      },
      { path: '/stock', label: 'Stock Management', icon: Store, hasSubMenu: true }
    ]
  },
  {
    title: 'SALES & BILLING',
    items: [
      { path: '/warranties', label: 'Warranties', icon: Wrench },
      { path: '/discount', label: 'Discount', icon: Percent },
      { path: '/gift-voucher', label: 'Gift Voucher', icon: Gift }
    ]
  },
  {
    title: 'ONLINE STORE',
    items: [
      { 
        path: '/e-commerce-menu', 
        label: 'E-Commerce', 
        icon: ShoppingCart, 
        hasSubMenu: true,
        subItems: [
          { path: '/e-commerce/new-orders', label: 'New Orders' },
          { path: '/e-commerce/canceled-orders', label: 'Canceled Orders' },
          { path: '/e-commerce/completed-orders', label: 'Completed Orders' },
          { path: '/e-commerce/reviews', label: 'Reviews' },
        ]
      }
    ]
  },
  {
    title: 'FINANCE',
    items: [
      { 
        path: '/report', 
        label: 'Report', 
        icon: FileText, 
        hasSubMenu: true,
        subItems: [
          { path: '/finance/sale-report', label: 'Sale Report' },
          { path: '/finance/inventory-report', label: 'Inventory Report' },
          { path: '/finance/purchase-report', label: 'Purchase Report' },
          { path: '/finance/discount-report', label: 'Discount Report' },
        ]
      }
    ]
  },
  {
    title: 'ADMINISTRATION',
    items: [
      { 
        path: '/access-management', 
        label: 'Access Management', 
        icon: ShieldCheck, 
        hasSubMenu: true,
        subItems: [
          { path: '/access-management/users', label: 'Users' },
          { path: '/access-management/roles', label: 'Roles' },
        ]
      }
    ]
  },
  {
    title: 'SETTINGS',
    items: [
      { 
        path: '/settings-menu', 
        label: 'Settings', 
        icon: Settings2, 
        hasSubMenu: true,
        subItems: [
          { path: '/settings/general', label: 'Settings' },
          { path: '/settings/manage-website', label: 'Manage Website' },
        ]
      }
    ]
  }
];

export const Sidebar = () => {
  const { user, logout } = useAuth();
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
    'Product': false,
    'Dashboard': true,
    'E-Commerce': false,
    'Report': true,
    'Access Management': true,
    'Settings': true
  });

  const toggleMenu = (label: string) => {
    setExpandedMenus(prev => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col h-screen shrink-0 sticky top-0 font-sans">
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <PartyPopper className="w-6 h-6 text-yellow-500" />
          <span className="font-bold text-xl text-gray-800">Neocommerz</span>
        </div>
        <button className="text-gray-400 hover:text-gray-600 border border-gray-200 rounded p-1">
          <PanelLeftClose className="w-4 h-4" />
        </button>
      </div>

      <div className="px-4 pb-2">
        <div className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-md bg-gray-50 text-sm text-gray-600 mb-3">
          <Building className="w-4 h-4 text-gray-400" />
          <span>Main Branch</span>
        </div>
        
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search menus..." 
            className="w-full pl-9 pr-3 py-2 border-b border-gray-100 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-2 px-3 custom-scrollbar">
        {menuGroups.map((group, groupIdx) => (
          <div key={groupIdx} className="mb-6">
            <h4 className="px-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
              {group.title}
            </h4>
            <div className="space-y-0.5">
              {group.items.map((item) => (
                <div key={item.label}>
                  {item.hasSubMenu ? (
                    <div 
                      onClick={() => toggleMenu(item.label)}
                      className={clsx(
                        "flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer",
                        "text-gray-700 hover:bg-gray-50"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="w-4 h-4 text-gray-500" />
                        {item.label}
                      </div>
                      {expandedMenus[item.label] ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                    </div>
                  ) : (
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        clsx(
                          "flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium transition-colors",
                          isActive
                            ? "bg-emerald-50 text-emerald-600"
                            : "text-gray-700 hover:bg-gray-50"
                        )
                      }
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="w-4 h-4 text-gray-500" />
                        {item.label}
                      </div>
                    </NavLink>
                  )}
                  
                  {item.hasSubMenu && expandedMenus[item.label] && item.subItems && (
                    <div className="mt-0.5 ml-[22px] border-l border-gray-100 pl-4 space-y-0.5">
                      {item.subItems.map((subItem) => (
                        <NavLink
                          key={subItem.label}
                          to={subItem.path}
                          className={({ isActive }) =>
                            clsx(
                              "block px-3 py-1.5 rounded-md text-sm transition-colors",
                              isActive
                                ? "text-emerald-600 font-medium border border-emerald-600 rounded-lg"
                                : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                            )
                          }
                        >
                          {subItem.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white text-sm font-medium">
              {user?.name.charAt(0) || 'A'}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-900">{user?.name || 'User'}</span>
              <span className="text-xs text-gray-500">{user?.email || 'user@example.com'}</span>
            </div>
          </div>
          <button 
            onClick={() => { if(confirm('Logout?')) logout(); }}
            className="text-gray-400 hover:text-red-600 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
