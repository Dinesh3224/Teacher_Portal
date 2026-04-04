import { useState, useRef } from "react";
import { FileText, UploadCloud, Trash2, File, Download } from "lucide-react";

export default function Documents({ data, onUpdate }) {
  const [items, setItems] = useState([...data]);
  const fileInputRef = useRef(null);

  const handleRemove = (id) => {
    const updated = items.filter(item => item.id !== id);
    setItems(updated);
    onUpdate(updated);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Mock upload
      const newItem = {
        id: Date.now(),
        name: file.name,
        type: file.type.includes('pdf') ? 'PDF Document' : 'Document',
      };
      const updated = [...items, newItem];
      setItems(updated);
      onUpdate(updated);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <FileText className="text-orange-500" size={20} />
          Documents
        </h3>
        <button 
          onClick={() => fileInputRef.current.click()}
          className="px-3 py-1.5 text-sm font-medium text-orange-600 bg-orange-50 hover:bg-orange-100 rounded-lg flex items-center gap-2 transition-colors"
        >
          <UploadCloud size={16} />
          Upload
        </button>
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          onChange={handleFileUpload}
          accept=".pdf,.doc,.docx"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.length === 0 ? (
           <p className="text-gray-500 italic py-4 col-span-full">No documents uploaded.</p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-xl hover:border-orange-200 transition-colors group">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="p-2 bg-gray-50 text-gray-400 group-hover:text-orange-500 group-hover:bg-orange-50 rounded-lg transition-colors shrink-0">
                  <File size={20} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate" title={item.name}>{item.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.type}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 text-gray-400 hover:text-blue-500 rounded-lg transition-colors" title="Download">
                  <Download size={16} />
                </button>
                <button 
                  onClick={() => handleRemove(item.id)}
                  className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg transition-colors" 
                  title="Remove"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
