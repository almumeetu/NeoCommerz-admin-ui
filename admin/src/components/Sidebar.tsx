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
    <aside className="w-72 bg-gradient-to-b from-white via-white to-gray-50 border-r border-gray-200 flex flex-col h-screen shrink-0 sticky top-0 font-sans z-50 shadow-sm">
      {/* Brand Logo */}
      <div className="px-6 py-5 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/25 group-hover:scale-105 transition-transform duration-300">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-base text-gray-900 tracking-tight leading-tight">NeoCommerz</span>
            <span className="text-[9px] font-semibold text-emerald-600 uppercase tracking-widest">Admin</span>
          </div>
        </div>
        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-300">
          <PanelLeftClose className="w-4 h-4" />
        </button>
      </div>

      {/* Branch & Search */}
      <div className="px-4 py-4 space-y-3 border-b border-gray-100">
        <div className="flex items-center gap-2.5 px-3.5 py-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-[10px] font-bold text-emerald-700 uppercase tracking-widest">
          <Building className="w-3.5 h-3.5 text-emerald-600" />
          <span>Main Branch</span>
        </div>
        
        <div className="relative group">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-emerald-500 transition-colors duration-300" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:bg-white focus:border-emerald-300 focus:ring-1 focus:ring-emerald-100 outline-none transition-all placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 custom-scrollbar space-y-6">
        {menuGroups.map((group, groupIdx) => (
          <div key={groupIdx}>
            <h4 className="px-4 text-xs font-extrabold text-gray-500 uppercase tracking-widest mb-3 opacity-80">
              {group.title}
            </h4>
            <div className="space-y-0.5">
              {group.items.map((item) => (
                <div key={item.label} className="relative">
                  {item.hasSubMenu ? (
                    <>
                      <div 
                        onClick={() => toggleMenu(item.label)}
                        className={clsx(
                          "flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer group",
                          expandedMenus[item.label] 
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200/50" 
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 border border-transparent hover:border-gray-200/50"
                        )}
                      >
                        <div className="flex items-center gap-3.5">
                          <item.icon className={clsx(
                            "w-4.5 h-4.5 transition-colors duration-200", 
                            expandedMenus[item.label] ? "text-emerald-600" : "text-gray-400 group-hover:text-gray-600"
                          )} />
                          <span>{item.label}</span>
                        </div>
                        <div className="transition-transform duration-300">
                          {expandedMenus[item.label] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                      </div>
                      
                      {expandedMenus[item.label] && item.subItems && (
                        <div className="mt-2 ml-2 pl-3 space-y-1 border-l border-gray-200">
                          {item.subItems.map((subItem) => (
                            <NavLink
                              key={subItem.label}
                              to={subItem.path}
                              end={subItem.path === '/dashboard' || subItem.path === '/report'}
                              className={({ isActive }) =>
                                clsx(
                                  "block px-3.5 py-2 rounded-lg text-xs font-semibold transition-all duration-200",
                                  isActive
                                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                                    : "text-gray-500 hover:text-emerald-600 hover:bg-emerald-50"
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
                          "flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group border",
                          isActive
                            ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20 border-emerald-600"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:border-gray-200/50 border-transparent"
                        )
                      }
                    >
                      <div className="flex items-center gap-3.5">
                        <item.icon className="w-4.5 h-4.5" />
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
      <div className="px-4 py-4 mt-auto border-t border-gray-100">
        <div className="flex items-center justify-between px-3.5 py-3 rounded-xl bg-gradient-to-r from-emerald-50/80 to-blue-50/80 border border-gray-200 hover:border-emerald-200 transition-all duration-300 group">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white text-xs font-bold shadow-md shadow-emerald-500/25 group-hover:scale-105 transition-transform duration-300 shrink-0">
              {user?.name.charAt(0) || 'A'}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-gray-900 truncate leading-tight">{user?.name || 'Admin'}</span>
              <span className="text-[10px] font-semibold text-gray-500 truncate">{user?.email || 'admin@app.com'}</span>
            </div>
          </div>
          <button 
            onClick={() => { if(confirm('Logout?')) logout(); }}
            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-300 group-hover:scale-110 shrink-0"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
