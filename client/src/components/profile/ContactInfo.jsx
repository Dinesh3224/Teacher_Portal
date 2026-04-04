import { useState } from "react";
import { Edit2, Save, X, Phone } from "lucide-react";

export default function ContactInfo({ data, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    email: data.email || "",
    phone: data.phone || "",
    alternatePhone: data.alternatePhone || "",
    officeLocation: data.officeLocation || "",
    address: data.address || "",
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
      email: data.email || "",
      phone: data.phone || "",
      alternatePhone: data.alternatePhone || "",
      officeLocation: data.officeLocation || "",
      address: data.address || "",
    });
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Phone className="text-orange-500" size={20} />
          Contact Information
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
              <span className="block text-gray-400 mb-1 text-xs font-semibold uppercase">Email Address</span>
              <span className="font-medium text-gray-800 break-all">{data.email || "-"}</span>
            </div>
            <div>
              <span className="block text-gray-400 mb-1 text-xs font-semibold uppercase">Phone Number</span>
              <span className="font-medium text-gray-800">{data.phone || "-"}</span>
            </div>
            <div>
              <span className="block text-gray-400 mb-1 text-xs font-semibold uppercase">Alternate Phone</span>
              <span className="font-medium text-gray-800">{data.alternatePhone || "-"}</span>
            </div>
            <div>
              <span className="block text-gray-400 mb-1 text-xs font-semibold uppercase">Office Location</span>
              <span className="font-medium text-gray-800">{data.officeLocation || "-"}</span>
            </div>
            <div className="sm:col-span-2">
              <span className="block text-gray-400 mb-1 text-xs font-semibold uppercase">Address</span>
              <span className="font-medium text-gray-800">{data.address || "-"}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Email Address</label>
              <input 
                type="email" name="email" value={formData.email} onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm font-medium"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Phone Number</label>
              <input 
                type="text" name="phone" value={formData.phone} onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm font-medium"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Alternate Phone</label>
              <input 
                type="text" name="alternatePhone" value={formData.alternatePhone} onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm font-medium"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Office Location</label>
              <input 
                type="text" name="officeLocation" value={formData.officeLocation} onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm font-medium"
              />
            </div>
            <div className="sm:col-span-2 space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Address</label>
              <textarea 
                name="address" value={formData.address} onChange={handleChange} rows="2"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm font-medium resize-none"
              ></textarea>
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
