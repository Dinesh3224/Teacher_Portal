import { useState } from "react";
import { Edit2, Save, X, User } from "lucide-react";

export default function PersonalInfo({ data, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    gender: data.gender || "",
    dob: data.dob || "",
    nationality: data.nationality || "",
    maritalStatus: data.maritalStatus || "",
  });

  const handleSave = () => {
    Object.entries(formData).forEach(([key, value]) => {
      onUpdate(key, value);
    });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setFormData({
      gender: data.gender || "",
      dob: data.dob || "",
      nationality: data.nationality || "",
      maritalStatus: data.maritalStatus || "",
    });
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <User className="text-orange-500" size={20} />
          Personal Information
        </h3>
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
          >
            <Edit2 size={16} />
          </button>
        )}
      </div>

      {!isEditing ? (
        <div className="space-y-4 text-sm">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="block text-gray-400 mb-1 text-xs font-semibold uppercase">Gender</span>
              <span className="font-medium text-gray-800">{data.gender || "-"}</span>
            </div>
            <div>
              <span className="block text-gray-400 mb-1 text-xs font-semibold uppercase">Date of Birth</span>
              <span className="font-medium text-gray-800">{data.dob || "-"}</span>
            </div>
            <div>
              <span className="block text-gray-400 mb-1 text-xs font-semibold uppercase">Nationality</span>
              <span className="font-medium text-gray-800">{data.nationality || "-"}</span>
            </div>
            <div>
              <span className="block text-gray-400 mb-1 text-xs font-semibold uppercase">Marital Status</span>
              <span className="font-medium text-gray-800">{data.maritalStatus || "-"}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Gender</label>
              <select 
                name="gender" value={formData.gender} onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm font-medium"
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Date of Birth</label>
              <input 
                type="date" name="dob" value={formData.dob} onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm font-medium"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Nationality</label>
              <input 
                type="text" name="nationality" value={formData.nationality} onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm font-medium"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Marital Status</label>
              <select 
                name="maritalStatus" value={formData.maritalStatus} onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm font-medium"
              >
                <option value="">Select</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
                <option value="Widowed">Widowed</option>
              </select>
            </div>
          </div>
          <div className="flex items-center gap-3 pt-2">
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
        </div>
      )}
    </div>
  );
}
