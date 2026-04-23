import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/MainLayout';
import { Dashboard } from './pages/Dashboard';
import { EcommerceDashboard } from './pages/EcommerceDashboard';
import { Login } from './pages/Login';
import { Suppliers } from './pages/Suppliers';
import { Tags } from './pages/product/Tags';
import { Brands } from './pages/product/Brands';
import { Categories } from './pages/product/Categories';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="dashboard/e-commerce" element={<EcommerceDashboard />} />
          <Route path="suppliers" element={<Suppliers />} />
          <Route path="product/tags" element={<Tags />} />
          <Route path="product/brands" element={<Brands />} />
          <Route path="product/categories" element={<Categories />} />
          {/* Add other routes here as needed */}
          <Route path="*" element={<div className="p-8 text-gray-500">Page under construction</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
