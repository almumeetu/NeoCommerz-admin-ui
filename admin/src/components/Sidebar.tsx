import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Users, 
  Package, 
  Store, 
  CreditCard,
  Tags,
  Gift,
  FileText,
  ShieldAlert,
  Settings,
  Globe,
  LogOut,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import clsx from 'clsx';

const menuItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard, hasSubMenu: true, isExpanded: true, subItems: [
    { path: '/', label: 'POS' },
    { path: '/e-commerce', label: 'E-Commerce' }
  ]},
  { path: '/suppliers', label: 'Suppliers', icon: Users },
  { path: '/product', label: 'Product', icon: Package, hasSubMenu: true },
  { path: '/stock', label: 'Stock Management', icon: Store, hasSubMenu: true },
  { path: '/pos-menu', label: 'POS', icon: CreditCard, hasSubMenu: true },
  { path: '/discount', label: 'Discount', icon: Tags },
  { path: '/gift-voucher', label: 'Gift Voucher', icon: Gift },
  { path: '/e-commerce-menu', label: 'E-Commerce', icon: ShoppingCart, hasSubMenu: true },
  { path: '/report', label: 'Report', icon: FileText, hasSubMenu: true },
  { path: '/access-management', label: 'Access Management', icon: ShieldAlert, hasSubMenu: true },
];

export const Sidebar = () => {
  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col h-screen shrink-0 sticky top-0">
      <div className="p-4 flex items-center gap-2">
        <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold">H</div>
        <span className="font-bold text-xl text-gray-800">Hishabi</span>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {menuItems.map((item) => (
          <div key={item.label}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                clsx(
                  "flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                  isActive && !item.hasSubMenu
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-50"
                )
              }
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5 text-gray-500" />
                {item.label}
              </div>
              {item.hasSubMenu && (
                item.isExpanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />
              )}
            </NavLink>
            
            {item.hasSubMenu && item.isExpanded && item.subItems && (
              <div className="mt-1 ml-9 space-y-1">
                {item.subItems.map((subItem) => (
                  <NavLink
                    key={subItem.label}
                    to={subItem.path}
                    className={({ isActive }) =>
                      clsx(
                        "block px-3 py-2 rounded-md text-sm font-medium transition-colors",
                        isActive
                          ? "bg-blue-50 text-blue-600 font-semibold"
                          : "text-gray-600 hover:bg-gray-50"
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
      </nav>

      <div className="p-4 border-t border-gray-100 space-y-1">
        <button className="flex w-full items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
          <Settings className="w-5 h-5 text-gray-500" />
          Settings
        </button>
        <button className="flex w-full items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
          <Globe className="w-5 h-5 text-gray-500" />
          Manage Website
        </button>
        
        <div className="mt-4 flex items-center justify-between px-3 py-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium">
              A
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-900">Admin</span>
              <span className="text-xs text-gray-500">admin@softzino.com</span>
            </div>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
