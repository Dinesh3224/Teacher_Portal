import { useState } from "react";
import { Camera, Edit2, User, Save, X } from "lucide-react";

export default function ProfileHeader({ data, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: data.name,
    designation: data.designation,
    department: data.department,
    experience: data.experience,
  });

  const handleSave = () => {
    Object.entries(formData).forEach(([key, value]) => {
      onUpdate(key, value);
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: data.name,
      designation: data.designation,
      department: data.department,
      experience: data.experience,
    });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 relative overflow-hidden group">
      {/* Decorative background blur */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-orange-50 rounded-full blur-3xl opacity-50 z-0 pointer-events-none"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
        {/* Avatar Section */}
        <div className="relative">
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl border-4 border-white shadow-md bg-gray-50 flex items-center justify-center overflow-hidden shrink-0">
            {data.avatarUrl ? (
              <img src={data.avatarUrl} alt={data.name} className="w-full h-full object-cover" />
            ) : (
              <User className="w-12 h-12 text-gray-400" />
            )}
          </div>
          <button className="absolute -bottom-3 -right-3 w-10 h-10 bg-white border border-gray-100 shadow-sm rounded-xl flex items-center justify-center text-gray-500 hover:text-orange-600 hover:border-orange-200 transition-all z-10 group/cam">
            <Camera size={18} className="group-hover/cam:scale-110 transition-transform" />
          </button>
        </div>

        {/* Info Section */}
        <div className="flex-1 space-y-2">
          {!isEditing ? (
            <>
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">{data.name}</h2>
                <button 
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <Edit2 size={16} />
                  <span>Edit Profile</span>
                </button>
              </div>
              <div className="text-orange-600 font-medium">{data.designation}</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 text-sm text-gray-600 mt-3">
                <div className="flex items-center gap-2">
                  <span className="w-24 text-gray-400">Department:</span>
                  <span className="font-medium text-gray-800">{data.department}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-24 text-gray-400">Employee ID:</span>
                  <span className="font-medium text-gray-800">{data.employeeId}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-24 text-gray-400">Experience:</span>
                  <span className="font-medium text-gray-800">{data.experience}</span>
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase">Full Name</label>
                  <input 
                    type="text" name="name" value={formData.name} onChange={handleChange}
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
                  <label className="text-xs font-semibold text-gray-500 uppercase">Department</label>
                  <input 
                    type="text" name="department" value={formData.department} onChange={handleChange}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase">Experience</label>
                  <input 
                    type="text" name="experience" value={formData.experience} onChange={handleChange}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm font-medium"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <button 
                  onClick={handleSave}
                  className="px-4 py-2 text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 rounded-lg flex items-center gap-2 transition-colors shadow-sm shadow-orange-500/20"
                >
                  <Save size={16} />
                  <span>Save Changes</span>
                </button>
                <button 
                  onClick={handleCancel}
                  className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 hover:text-gray-900 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <X size={16} />
                  <span>Cancel</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
