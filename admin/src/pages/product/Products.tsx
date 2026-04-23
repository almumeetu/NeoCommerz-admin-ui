import { useState } from 'react';
import { Edit, Eye, Trash2, Package, LayoutGrid, List as ListIcon } from 'lucide-react';
import { PageHeader, SectionHeader } from '../../components/PageHeaders';
import { Modal } from '../../components/Modal';
import clsx from 'clsx';

interface Product {
  id: number;
  name: string;
  category: string;
  brand: string;
  price: string;
  stock: number;
  status: boolean;
  description?: string;
  image?: string;
}

const initialProducts: Product[] = [
  { id: 1, name: 'Smart Watch Series 7', category: 'Watch', brand: 'Apple', price: '45000', stock: 12, status: true, description: 'Advanced fitness tracking and health monitoring.' },
  { id: 2, name: 'Logitech G Pro Keyboard', category: 'Computer Accessories', brand: 'Logitech', price: '12500', stock: 8, status: true, description: 'Mechanical gaming keyboard with RGB.' },
  { id: 3, name: 'Sony WH-1000XM4', category: 'Gadgets', brand: 'Sony', price: '32000', stock: 5, status: true, description: 'Industry-leading noise canceling headphones.' },
];

export const Products = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({ 
    name: '', 
    category: '', 
    brand: '', 
    price: '', 
    stock: 0, 
    description: '',
    status: true
  });

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase()) ||
    p.brand.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({ 
        name: product.name, 
        category: product.category, 
        brand: product.brand, 
        price: product.price, 
        stock: product.stock,
        description: product.description || '',
        status: product.status
      });
    } else {
      setEditingProduct(null);
      setFormData({ name: '', category: '', brand: '', price: '', stock: 0, description: '', status: true });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    
    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? { ...p, ...formData } : p));
    } else {
      const product: Product = {
        id: Date.now(),
        ...formData,
      };
      setProducts([product, ...products]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto bg-white min-h-screen">
      <div className="flex items-center justify-between mb-2">
        <PageHeader title="Products" subtitle="Manage your inventory and product listings" />
        <div className="flex bg-gray-100 p-1 rounded-lg">
          <button 
            onClick={() => setViewMode('list')}
            className={clsx("p-2 rounded-md transition-all", viewMode === 'list' ? "bg-white text-emerald-600 shadow-sm" : "text-gray-400 hover:text-gray-600")}
          >
            <ListIcon className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setViewMode('grid')}
            className={clsx("p-2 rounded-md transition-all", viewMode === 'grid' ? "bg-white text-emerald-600 shadow-sm" : "text-gray-400 hover:text-gray-600")}
          >
            <LayoutGrid className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <SectionHeader 
        title="Product list" 
        count={filteredProducts.length} 
        itemName="products" 
        onAdd={() => handleOpenModal()} 
        searchPlaceholder="Search products by name, category, brand..." 
        searchValue={search}
        onSearchChange={setSearch}
      />

      {viewMode === 'list' ? (
        <div className="border border-gray-100 rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-semibold text-gray-900">Product</th>
                <th className="px-6 py-4 font-semibold text-gray-900">Category</th>
                <th className="px-6 py-4 font-semibold text-gray-900">Brand</th>
                <th className="px-6 py-4 font-semibold text-gray-900">Price</th>
                <th className="px-6 py-4 font-semibold text-gray-900">Stock</th>
                <th className="px-6 py-4 font-semibold text-gray-900">Status</th>
                <th className="px-6 py-4 font-semibold text-gray-900 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-emerald-50/30 transition-colors group">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-100 group-hover:border-emerald-200">
                        <Package className="w-5 h-5 text-gray-400 group-hover:text-emerald-500" />
                      </div>
                      <div className="flex flex-col">
                         <span>{product.name}</span>
                         <span className="text-[10px] text-gray-400 font-normal truncate max-w-[150px]">{product.description}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{product.category}</td>
                  <td className="px-6 py-4 text-gray-600">{product.brand}</td>
                  <td className="px-6 py-4 text-emerald-600 font-bold">৳{product.price}</td>
                  <td className="px-6 py-4">
                    <span className={clsx("px-2 py-1 rounded-full text-[10px] font-bold uppercase", product.stock > 5 ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600")}>
                      {product.stock} in stock
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => setProducts(products.map(p => p.id === product.id ? { ...p, status: !p.status } : p))}
                      className={clsx("w-10 h-5 rounded-full relative transition-all duration-200", product.status ? "bg-emerald-600" : "bg-gray-200")}
                    >
                      <div className={clsx("w-4 h-4 rounded-full bg-white absolute top-0.5 transition-all duration-200", product.status ? "left-[22px]" : "left-0.5")}></div>
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors"><Eye className="w-4 h-4" /></button>
                      <button onClick={() => handleOpenModal(product)} className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors"><Edit className="w-4 h-4" /></button>
                      <button 
                        onClick={() => { if(confirm('Delete?')) setProducts(products.filter(p => p.id !== product.id)) }}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:border-emerald-200 hover:shadow-md transition-all group">
              <div className="relative aspect-square bg-gray-50 rounded-xl mb-4 flex items-center justify-center overflow-hidden border border-gray-100 group-hover:border-emerald-100">
                <Package className="w-12 h-12 text-gray-200 group-hover:text-emerald-200 transition-colors" />
                <div className="absolute top-2 right-2">
                   <span className={clsx("px-2 py-1 rounded-lg text-[10px] font-bold uppercase", product.status ? "bg-emerald-500 text-white" : "bg-gray-400 text-white")}>
                     {product.status ? 'Active' : 'Inactive'}
                   </span>
                </div>
              </div>
              <div className="mb-4">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">{product.category} • {product.brand}</p>
                <h3 className="font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">{product.name}</h3>
                <p className="text-xs text-gray-500 line-clamp-2 mt-1">{product.description}</p>
              </div>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">Price</p>
                  <p className="text-lg font-black text-emerald-600">৳{product.price}</p>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => handleOpenModal(product)} className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"><Edit className="w-4 h-4" /></button>
                  <button onClick={() => { if(confirm('Delete?')) setProducts(products.filter(p => p.id !== product.id)) }} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingProduct ? "Update Product Details" : "Add New Product"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Product Name</label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter product name"
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Category</label>
                <input 
                  type="text" 
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="e.g. Watch"
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Brand</label>
                <input 
                  type="text" 
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  placeholder="e.g. Apple"
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Price (৳)</label>
                <input 
                  type="text" 
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="0.00"
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Initial Stock</label>
                <input 
                  type="number" 
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Product Description</label>
              <textarea 
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Briefly describe the product features..."
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all h-24 resize-none"
              />
            </div>
            <div className="flex items-center gap-3 py-2">
              <button 
                type="button"
                onClick={() => setFormData({ ...formData, status: !formData.status })}
                className={clsx("w-10 h-5 rounded-full relative transition-all duration-200", formData.status ? "bg-emerald-600" : "bg-gray-200")}
              >
                <div className={clsx("w-4 h-4 rounded-full bg-white absolute top-0.5 transition-all duration-200", formData.status ? "left-[22px]" : "left-0.5")}></div>
              </button>
              <span className="text-sm font-medium text-gray-700">Set as Active Product</span>
            </div>
          </div>
          
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-50">
            <button 
              type="button" 
              onClick={() => setIsModalOpen(false)} 
              className="px-6 py-2.5 text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors"
            >
              Discard
            </button>
            <button 
              type="submit" 
              className="px-8 py-2.5 bg-emerald-600 text-white text-sm font-bold rounded-xl hover:bg-emerald-700 shadow-lg shadow-emerald-600/20 transition-all active:scale-95"
            >
              {editingProduct ? "Apply Changes" : "Create Product"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
