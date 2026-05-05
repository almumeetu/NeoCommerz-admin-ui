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
  Search,
  Building,
  LogOut,
  PanelLeftClose,
  Wrench,
  Percent,
  Settings2,
  FileText,
  ShieldCheck,
  Zap
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
          { path: '/dashboard', label: 'Overview' },
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
          { path: '/product/products', label: 'Products' },
          { path: '/product/tags', label: 'Tags' },
          { path: '/product/brands', label: 'Brands' },
          { path: '/product/categories', label: 'Categories' },
          { path: '/product/specifications', label: 'Specifications' },
          { path: '/product/variant-options', label: 'Variant Options' },
          { path: '/product/units-of-measurement', label: 'Units of Measurement' },
        ]
      },
      { path: '/stock', label: 'Stock Management', icon: Store }
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
        label: 'Reports', 
        icon: FileText, 
        hasSubMenu: true,
        subItems: [
          { path: '/report', label: 'Overview' },
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
          { path: '/settings/general', label: 'General Settings' },
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
    'Reports': true,
    'Access Management': true,
    'Settings': true
  });

  const toggleMenu = (label: string) => {
    setExpandedMenus(prev => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col h-screen shrink-0 sticky top-0 font-sans z-50">
      {/* Brand Logo */}
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-600/30 group-hover:rotate-12 transition-transform duration-500">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-xl text-gray-900 tracking-tighter">NeoCommerz</span>
        </div>
        <button className="text-gray-400 hover:text-gray-900 transition-colors">
          <PanelLeftClose className="w-5 h-5" />
        </button>
      </div>

      {/* Branch & Search */}
      <div className="px-6 pb-4">
        <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">
          <Building className="w-4 h-4 text-emerald-500" />
          <span>Main Branch</span>
        </div>
        
        <div className="relative group">
          <Search className="w-4 h-4 text-gray-300 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-emerald-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search dashboard..." 
            className="w-full pl-11 pr-4 py-3 bg-gray-50/50 border border-transparent rounded-2xl text-sm font-medium focus:bg-white focus:border-emerald-200 outline-none transition-all placeholder:text-gray-300"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-2 custom-scrollbar space-y-8">
        {menuGroups.map((group, groupIdx) => (
          <div key={groupIdx}>
            <h4 className="px-4 text-[11px] font-bold text-gray-300 uppercase tracking-[0.2em] mb-4">
              {group.title}
            </h4>
            <div className="space-y-1">
              {group.items.map((item) => (
                <div key={item.label} className="relative">
                  {item.hasSubMenu ? (
                    <>
                      <div 
                        onClick={() => toggleMenu(item.label)}
                        className={clsx(
                          "flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold transition-all duration-300 cursor-pointer group",
                          expandedMenus[item.label] ? "bg-emerald-50/50 text-emerald-600" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                        )}
                      >
                        <div className="flex items-center gap-4">
                          <item.icon className={clsx("w-5 h-5 transition-colors", expandedMenus[item.label] ? "text-emerald-500" : "text-gray-400 group-hover:text-gray-600")} />
                          {item.label}
                        </div>
                        {expandedMenus[item.label] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                      
                      {expandedMenus[item.label] && item.subItems && (
                        <div className="mt-1 space-y-1">
                          {item.subItems.map((subItem) => (
                            <NavLink
                              key={subItem.label}
                              to={subItem.path}
                              end={subItem.path === '/dashboard' || subItem.path === '/report'}
                              className={({ isActive }) =>
                                clsx(
                                  "block px-4 py-2.5 ml-9 rounded-xl text-xs font-bold transition-all duration-300",
                                  isActive
                                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20"
                                    : "text-gray-400 hover:text-emerald-600 hover:bg-emerald-50"
                                )
                              }
                            >
                              {subItem.label}
                            </NavLink>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        clsx(
                          "flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold transition-all duration-300 group",
                          isActive
                            ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20"
                            : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                        )
                      }
                    >
                      <div className="flex items-center gap-4">
                        <item.icon className="w-5 h-5" />
                        {item.label}
                      </div>
                    </NavLink>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* User Footer */}
      <div className="p-6 mt-auto border-t border-gray-50">
        <div className="flex items-center justify-between p-2 rounded-2xl bg-gray-50/50 border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-emerald-600/20">
              {user?.name.charAt(0) || 'A'}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-gray-900 truncate">{user?.name || 'Admin User'}</span>
              <span className="text-[11px] font-bold text-gray-400 truncate tracking-tight">{user?.email || 'admin@neocommerz.com'}</span>
            </div>
          </div>
          <button 
            onClick={() => { if(confirm('Logout?')) logout(); }}
            className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
