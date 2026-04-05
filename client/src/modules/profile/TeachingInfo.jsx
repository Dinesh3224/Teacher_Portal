import { useState } from "react";
import { BookOpen, Edit2, Save, X, Plus, Trash2 } from "lucide-react";

export default function TeachingInfo({ data, onUpdate }) {
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
    setItems([...items, { id: Date.now(), subjectName: "", assignedCourse: "", semester: "", teachingHours: "" }]);
    setIsEditing(true);
  };

  const handleRemove = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <BookOpen className="text-orange-500" size={20} />
          Teaching Information
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

      <div className="space-y-4 text-sm mt-2">
        {items.length === 0 && !isEditing ? (
          <p className="text-gray-500 italic text-center py-4">No subjects assigned yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="text-xs text-gray-400 uppercase bg-gray-50/50 rounded-lg">
                <tr>
                  <th className="px-4 py-3 font-semibold rounded-l-lg">Subject Name</th>
                  <th className="px-4 py-3 font-semibold">Assigned Course</th>
                  <th className="px-4 py-3 font-semibold">Semester</th>
                  <th className="px-4 py-3 font-semibold rounded-r-lg">Hours/Week</th>
                  {isEditing && <th className="px-4 py-3 font-semibold w-10"></th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {items.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                    {!isEditing ? (
                      <>
                        <td className="px-4 py-4 font-bold text-gray-900">{item.subjectName}</td>
                        <td className="px-4 py-4 text-gray-600">{item.assignedCourse}</td>
                        <td className="px-4 py-4 text-gray-600">
                           <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                             {item.semester}
                           </span>
                        </td>
                        <td className="px-4 py-4 text-gray-600 font-medium">{item.teachingHours}</td>
                      </>
                    ) : (
                      <>
                        <td className="px-2 py-2">
                          <input 
                            type="text" value={item.subjectName} onChange={(e) => handleChange(index, 'subjectName', e.target.value)} placeholder="Subject"
                            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm font-medium"
                          />
                        </td>
                        <td className="px-2 py-2">
                          <input 
                            type="text" value={item.assignedCourse} onChange={(e) => handleChange(index, 'assignedCourse', e.target.value)} placeholder="Course"
                            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm font-medium"
                          />
                        </td>
                        <td className="px-2 py-2">
                          <input 
                            type="text" value={item.semester} onChange={(e) => handleChange(index, 'semester', e.target.value)} placeholder="Sem"
                            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm font-medium"
                          />
                        </td>
                        <td className="px-2 py-2">
                          <input 
                            type="number" value={item.teachingHours} onChange={(e) => handleChange(index, 'teachingHours', e.target.value)} placeholder="Hrs"
                            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm font-medium"
                          />
                        </td>
                        <td className="px-2 py-2 text-right">
                          <button 
                            onClick={() => handleRemove(item.id)}
                            className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isEditing && (
        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100">
           <button 
              onClick={handleAdd}
              className="mr-auto px-4 py-2 text-sm font-medium text-orange-600 bg-orange-50 hover:bg-orange-100 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus size={16} /> Add Subject
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
