import { useState } from 'react';
import { ChevronDown, ChevronRight, Menu, Plus, Trash2, Edit } from 'lucide-react';
import { PageHeader, SectionHeader } from '../../components/PageHeaders';
import { Modal } from '../../components/Modal';

interface CategoryItem {
  id: string;
  name: string;
  children?: CategoryItem[];
}

const initialCategories: CategoryItem[] = [
  {
    id: '1',
    name: 'Gadgets',
    children: [
      { id: '1-1', name: 'Camera' },
      { id: '1-2', name: 'Earbud' },
    ]
  },
  { id: '2', name: 'Watch', children: [] }
];

export const Categories = () => {
  const [categories, setCategories] = useState<CategoryItem[]>(initialCategories);
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ '1': true, '2': true });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<{ id: string, name: string, isParent: boolean } | null>(null);
  const [newCategory, setNewCategory] = useState({ name: '', parentId: '' });

  const toggleExpand = (id: string) => setExpanded(prev => ({ ...prev, [id]: !prev[id] }));

  const handleOpenEdit = (id: string, name: string, isParent: boolean) => {
    setEditingItem({ id, name, isParent });
    setNewCategory({ name, parentId: '' });
    setIsModalOpen(true);
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.name.trim()) return;

    if (editingItem) {
      if (editingItem.isParent) {
        setCategories(categories.map(c => c.id === editingItem.id ? { ...c, name: newCategory.name } : c));
      } else {
        setCategories(categories.map(c => ({
          ...c,
          children: c.children?.map(ch => ch.id === editingItem.id ? { ...ch, name: newCategory.name } : ch)
        })));
      }
    } else if (newCategory.parentId) {
      setCategories(categories.map(cat => cat.id === newCategory.parentId ? { ...cat, children: [...(cat.children || []), { id: `${cat.id}-${Date.now()}`, name: newCategory.name }] } : cat));
    } else {
      setCategories([...categories, { id: Date.now().toString(), name: newCategory.name, children: [] }]);
    }
    
    setNewCategory({ name: '', parentId: '' });
    setEditingItem(null);
    setIsModalOpen(false);
  };

  const deleteCategory = (id: string, isParent: boolean) => {
    if (!confirm('Delete?')) return;
    if (isParent) setCategories(categories.filter(c => c.id !== id));
    else setCategories(categories.map(c => ({ ...c, children: c.children?.filter(ch => ch.id !== id) })));
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto bg-white min-h-screen">
      <PageHeader title="Category" subtitle="A list of all of your product categories" />
      <SectionHeader title="Categories list" count={categories.length} itemName="categories" onAdd={() => { setEditingItem(null); setIsModalOpen(true); }} searchPlaceholder="Search..." searchValue={search} onSearchChange={setSearch} />

      <div className="space-y-4 mt-4">
        {categories.map((category) => (
          <div key={category.id} className="w-full group">
            <div className="flex items-center gap-2">
              <button onClick={() => toggleExpand(category.id)} className="w-5 h-5 flex items-center justify-center text-gray-400">{expanded[category.id] ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}</button>
              <div className="flex-1 flex items-center justify-between px-4 py-3 border border-gray-200 rounded-lg bg-white shadow-sm hover:border-emerald-200 transition-all">
                <div className="flex items-center gap-3">
                  <Menu className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-semibold text-gray-700">{category.name}</span>
                </div>
                <div className="opacity-0 group-hover:opacity-100 flex items-center gap-2 transition-opacity">
                  <button onClick={() => { setNewCategory({ ...newCategory, parentId: category.id }); setEditingItem(null); setIsModalOpen(true); }} className="p-1 text-gray-400 hover:text-emerald-600"><Plus className="w-4 h-4" /></button>
                  <button onClick={() => handleOpenEdit(category.id, category.name, true)} className="p-1 text-gray-400 hover:text-emerald-600"><Edit className="w-4 h-4" /></button>
                  <button onClick={() => deleteCategory(category.id, true)} className="p-1 text-gray-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
            {expanded[category.id] && category.children && (
              <div className="ml-[10px] pl-[26px] border-l border-emerald-100 mt-2 space-y-2">
                {category.children.map((child) => (
                  <div key={child.id} className="flex items-center justify-between px-4 py-3 border border-gray-100 rounded-lg bg-gray-50/30 shadow-sm relative group/child">
                    <div className="absolute -left-[27px] top-1/2 w-6 border-t border-emerald-100"></div>
                    <span className="text-sm text-gray-600">{child.name}</span>
                    <div className="opacity-0 group-hover/child:opacity-100 flex items-center gap-2">
                      <button onClick={() => handleOpenEdit(child.id, child.name, false)} className="p-1 text-gray-400 hover:text-emerald-600"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => deleteCategory(child.id, false)} className="p-1 text-gray-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setEditingItem(null); }} title={editingItem ? "Edit Category" : (newCategory.parentId ? "Add Sub-category" : "Add Category")}>
        <form onSubmit={handleAddCategory} className="space-y-4">
          <input type="text" value={newCategory.name} onChange={e => setNewCategory({ ...newCategory, name: e.target.value })} className="w-full px-4 py-2 border rounded-lg focus:border-emerald-500 outline-none" required autoFocus />
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm text-gray-500">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded-lg">{editingItem ? "Update" : "Save"}</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
