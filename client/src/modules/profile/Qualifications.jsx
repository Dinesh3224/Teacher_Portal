import { useState } from "react";
import { GraduationCap, Plus, Trash2, Edit2, Save, X } from "lucide-react";

export default function Qualifications({ data, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [items, setItems] = useState([...data]);

  const handleSave = () => {
    onUpdate(items);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setItems([...data]);
    setIsEditing(false);
  };

  const handleChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const handleAdd = () => {
    setItems([...items, { id: Date.now(), degree: "", specialization: "", university: "", year: "" }]);
    setIsEditing(true);
  };

  const handleRemove = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <GraduationCap className="text-orange-500" size={20} />
          Academic Qualifications
        </h3>
        {!isEditing && (
          <div className="flex gap-2">
            <button 
              onClick={handleAdd}
              className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors flex flex-row items-center space-x-1"
            >
              <Plus size={16} />
              <span className="text-xs font-medium">Add</span>
            </button>
            <button 
              onClick={() => setIsEditing(true)}
              className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
            >
              <Edit2 size={16} />
            </button>
          </div>
        )}
      </div>

      <div className="space-y-4 text-sm">
        {items.length === 0 && !isEditing ? (
          <p className="text-gray-500 italic text-center py-4">No qualifications added yet.</p>
        ) : (
          items.map((item, index) => (
            <div key={item.id} className="p-4 rounded-xl border border-gray-100 bg-gray-50/50 relative group">
              {!isEditing ? (
                <div>
                  <h4 className="font-bold text-gray-900 text-base">{item.degree} <span className="text-gray-400 font-normal">in {item.specialization}</span></h4>
                  <p className="text-gray-600 mt-1 flex items-center gap-2">
                    <span>{item.university}</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span className="font-medium">{item.year}</span>
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase">Degree</label>
                    <input 
                      type="text" value={item.degree} onChange={(e) => handleChange(index, 'degree', e.target.value)} placeholder="e.g. PhD"
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm font-medium"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase">Specialization</label>
                    <input 
                      type="text" value={item.specialization} onChange={(e) => handleChange(index, 'specialization', e.target.value)} placeholder="e.g. Computer Science"
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm font-medium"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase">University / Institute</label>
                    <input 
                      type="text" value={item.university} onChange={(e) => handleChange(index, 'university', e.target.value)} placeholder="e.g. IIT Madras"
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm font-medium"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase">Year Completed</label>
                    <input 
                      type="text" value={item.year} onChange={(e) => handleChange(index, 'year', e.target.value)} placeholder="e.g. 2018"
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm font-medium"
                    />
                  </div>
                  <button 
                    onClick={() => handleRemove(item.id)}
                    className="absolute top-2 right-2 p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Remove Qualification"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {isEditing && (
        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100">
           <button 
              onClick={handleAdd}
              className="mr-auto px-4 py-2 text-sm font-medium text-orange-600 bg-orange-50 hover:bg-orange-100 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus size={16} /> Add Another
            </button>
          <button 
            onClick={handleSave}
            className="px-4 py-2 text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 rounded-lg flex items-center gap-2 transition-colors shadow-sm shadow-orange-500/20"
          >
            <Save size={16} /> Save
          </button>
          <button 
            onClick={handleCancel}
            className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg flex items-center gap-2 transition-colors"
          >
            <X size={16} /> Cancel
          </button>
        </div>
      )}
    </div>
  );
}
