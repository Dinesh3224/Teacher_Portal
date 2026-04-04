import { useState } from "react";
import { Edit2, Save, X, Briefcase } from "lucide-react";

export default function ProfessionalInfo({ data, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    employeeId: data.employeeId || "",
    department: data.department || "",
    designation: data.designation || "",
    dateJoined: data.dateJoined || "",
    employmentType: data.employmentType || "",
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
      employeeId: data.employeeId || "",
      department: data.department || "",
      designation: data.designation || "",
      dateJoined: data.dateJoined || "",
      employmentType: data.employmentType || "",
    });
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Briefcase className="text-orange-500" size={20} />
          Professional Information
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className="block text-gray-400 mb-1 text-xs font-semibold uppercase">Employee ID</span>
              <span className="font-medium text-gray-800">{data.employeeId || "-"}</span>
            </div>
            <div>
              <span className="block text-gray-400 mb-1 text-xs font-semibold uppercase">Department</span>
              <span className="font-medium text-gray-800">{data.department || "-"}</span>
            </div>
            <div>
              <span className="block text-gray-400 mb-1 text-xs font-semibold uppercase">Designation</span>
              <span className="font-medium text-gray-800">{data.designation || "-"}</span>
            </div>
            <div>
              <span className="block text-gray-400 mb-1 text-xs font-semibold uppercase">Date Joined</span>
              <span className="font-medium text-gray-800">{data.dateJoined || "-"}</span>
            </div>
            <div>
              <span className="block text-gray-400 mb-1 text-xs font-semibold uppercase">Employment Type</span>
              <span className="font-medium text-gray-800">{data.employmentType || "-"}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Employee ID</label>
              <input 
                type="text" name="employeeId" value={formData.employeeId} onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm font-medium"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Department</label>
              <input 
                type="text" name="department" value={formData.department} onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm font-medium"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Designation</label>
              <input 
                type="text" name="designation" value={formData.designation} onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm font-medium"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Date Joined</label>
              <input 
                type="date" name="dateJoined" value={formData.dateJoined} onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm font-medium"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Employment Type</label>
              <select 
                name="employmentType" value={formData.employmentType} onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm font-medium"
              >
                <option value="">Select</option>
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Visiting Faculty">Visiting Faculty</option>
                <option value="Contract">Contract</option>
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
