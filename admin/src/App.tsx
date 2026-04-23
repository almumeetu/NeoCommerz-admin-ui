import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { MainLayout } from './components/MainLayout';
import { Dashboard } from './pages/Dashboard';
import { EcommerceDashboard } from './pages/EcommerceDashboard';
import { Login } from './pages/Login';
import { Suppliers } from './pages/Suppliers';
import { Tags } from './pages/product/Tags';
import { Brands } from './pages/product/Brands';
import { Categories } from './pages/product/Categories';
import { Products } from './pages/product/Products';
import { ProductConfig } from './pages/product/ProductConfig';
import { Stock } from './pages/Stock';
import { Discount } from './pages/Discount';
import { GiftVoucher } from './pages/GiftVoucher';
import { Orders } from './pages/Orders';
import { Report } from './pages/Report';
import { InventoryReport } from './pages/finance/InventoryReport';
import { GenericFinancePage } from './pages/finance/GenericFinancePage';
import { Settings } from './pages/Settings';
import { AccessManagement } from './pages/AccessManagement';
import { AuthProvider, useAuth } from './context/AuthContext';

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

function AppRoutes() {
  const { isAuthenticated } = useAuth();
  
  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} />
      
      <Route path="/" element={
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="dashboard/e-commerce" element={<EcommerceDashboard />} />
        <Route path="suppliers" element={<Suppliers />} />
        <Route path="product/tags" element={<Tags />} />
        <Route path="product/brands" element={<Brands />} />
        <Route path="product/categories" element={<Categories />} />
        <Route path="product/products" element={<Products />} />
        <Route path="product/specifications" element={<ProductConfig />} />
        <Route path="product/variant-options" element={<ProductConfig />} />
        <Route path="product/units-of-measurement" element={<ProductConfig />} />
        <Route path="stock" element={<Stock />} />
        <Route path="discount" element={<Discount />} />
        <Route path="gift-voucher" element={<GiftVoucher />} />
        <Route path="e-commerce/:status" element={<Orders />} />
        <Route path="finance/sale-report" element={<GenericFinancePage title="Sale Report" />} />
        <Route path="finance/inventory-report" element={<InventoryReport />} />
        <Route path="finance/purchase-report" element={<GenericFinancePage title="Purchase Report" />} />
        <Route path="finance/discount-report" element={<GenericFinancePage title="Discount Report" />} />
        <Route path="access-management/users" element={<AccessManagement />} />
        <Route path="access-management/roles" element={<GenericFinancePage title="Roles Management" />} />
        <Route path="settings/general" element={<Settings />} />
        <Route path="settings/manage-website" element={<GenericFinancePage title="Manage Website" />} />
        <Route path="report" element={<Report />} />
        <Route path="*" element={<div className="p-8 text-gray-500">Page under construction</div>} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
