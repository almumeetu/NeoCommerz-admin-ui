import { useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { PageHeader, SectionHeader } from '../../components/PageHeaders';
import { Modal } from '../../components/Modal';

interface Tag {
  id: number;
  name: string;
  createdOn: string;
  status: boolean;
}

const initialTags: Tag[] = [
  { id: 1, name: 'Tranding', createdOn: 'February 26, 2026', status: true },
  { id: 2, name: 'Top Sell', createdOn: 'February 26, 2026', status: true },
  { id: 3, name: 'Popular', createdOn: 'February 26, 2028', status: true },
];

export const Tags = () => {
  const [tags, setTags] = useState<Tag[]>(initialTags);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTag, setEditingTag] = useState<Tag | null>(null);
  const [tagName, setTagName] = useState('');

  const filteredTags = tags.filter(tag => 
    tag.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleStatus = (id: number) => {
    setTags(tags.map(tag => 
      tag.id === id ? { ...tag, status: !tag.status } : tag
    ));
  };

  const handleOpenModal = (tag?: Tag) => {
    if (tag) {
      setEditingTag(tag);
      setTagName(tag.name);
    } else {
      setEditingTag(null);
      setTagName('');
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tagName.trim()) return;
    
    if (editingTag) {
      setTags(tags.map(t => t.id === editingTag.id ? { ...t, name: tagName } : t));
    } else {
      const newTag: Tag = {
        id: Date.now(),
        name: tagName,
        createdOn: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        status: true
      };
      setTags([newTag, ...tags]);
    }
    
    setTagName('');
    setEditingTag(null);
    setIsModalOpen(false);
  };

  const deleteTag = (id: number) => {
    if (confirm('Are you sure you want to delete this tag?')) {
      setTags(tags.filter(tag => tag.id !== id));
    }
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto bg-white min-h-screen">
      <PageHeader 
        title="Product tag" 
        subtitle="A list of all of your product tag" 
      />
      
      <SectionHeader 
        title="Tag list" 
        count={filteredTags.length} 
        itemName="tags" 
        onAdd={() => handleOpenModal()} 
        searchPlaceholder="Search tags" 
        searchValue={search}
        onSearchChange={setSearch}
      />

      <div className="border border-gray-100 rounded-lg overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 font-semibold text-gray-900 w-1/3">Name</th>
              <th className="px-6 py-4 font-semibold text-gray-900 w-1/3">Created On</th>
              <th className="px-6 py-4 font-semibold text-gray-900">Status</th>
              <th className="px-6 py-4 font-semibold text-gray-900 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredTags.map((tag) => (
              <tr key={tag.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-gray-600 font-medium">{tag.name}</td>
                <td className="px-6 py-4 text-gray-600">{tag.createdOn}</td>
                <td className="px-6 py-4">
                  <button 
                    onClick={() => toggleStatus(tag.id)}
                    className={`w-10 h-5 rounded-full relative transition-colors duration-200 focus:outline-none ${tag.status ? 'bg-emerald-600' : 'bg-gray-200'}`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-all duration-200 ${tag.status ? 'left-[22px]' : 'left-0.5'}`}></div>
                  </button>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => handleOpenModal(tag)}
                      className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => deleteTag(tag.id)}
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

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingTag ? "Edit Product Tag" : "Add New Product Tag"}
      >
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Tag Name</label>
            <input 
              type="text" 
              value={tagName}
              onChange={(e) => setTagName(e.target.value)}
              placeholder="e.g. New Arrival"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              autoFocus
            />
          </div>
          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm text-gray-500">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg">
              {editingTag ? "Update Tag" : "Save Tag"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
