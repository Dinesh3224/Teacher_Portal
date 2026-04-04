import { useState } from "react";
import { Camera, Save, RotateCcw, User } from "lucide-react";

export default function ProfileSettings() {
  const [profile, setProfile] = useState({
    fullName: "Dr. John Williams",
    department: "Computer Science",
    designation: "Associate Professor",
    employeeId: "SVYASA-FAC-0042",
    email: "john.williams@svyasa.edu.in",
    phone: "+91 98765 43210",
    officeLocation: "Block A, Room 204",
    bio: "Passionate about teaching Data Structures, Algorithms, and Machine Learning. 12+ years of academic experience.",
  });

  const [errors, setErrors] = useState({});
  const [photoPreview, setPhotoPreview] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!profile.fullName.trim()) newErrors.fullName = "Name is required";
    if (!profile.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) newErrors.email = "Invalid email address";
    if (!profile.phone.match(/^(\+91[\s-]?)?[6-9]\d{4}[\s-]?\d{5}$/)) newErrors.phone = "Invalid phone number";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!validate()) return;
    setIsSaving(true);
    // TODO: API call — PUT /api/faculty/profile with profile data and photo
    setTimeout(() => setIsSaving(false), 1200);
  };

  const handleReset = () => {
    setProfile({
      fullName: "Dr. John Williams",
      department: "Computer Science",
      designation: "Associate Professor",
      employeeId: "SVYASA-FAC-0042",
      email: "john.williams@svyasa.edu.in",
      phone: "+91 98765 43210",
      officeLocation: "Block A, Room 204",
      bio: "Passionate about teaching Data Structures, Algorithms, and Machine Learning. 12+ years of academic experience.",
    });
    setPhotoPreview(null);
    setErrors({});
  };

  const inputClass = (field) =>
    `w-full px-4 py-3 rounded-xl border ${errors[field] ? "border-red-300 bg-red-50/30" : "border-gray-200 bg-gray-50/50"} text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400 transition-all duration-200 placeholder:text-gray-400`;

  return (
    <div className="space-y-8">
      {/* Profile Photo */}
      <div className="flex items-center gap-6">
        <div className="relative group">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-orange-100 to-orange-50 border-2 border-orange-200 flex items-center justify-center overflow-hidden shadow-sm">
            {photoPreview ? (
              <img src={photoPreview} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <User size={36} className="text-orange-400" />
            )}
          </div>
          <label className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
            <Camera size={20} className="text-white" />
            <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
          </label>
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-800">{profile.fullName}</h3>
          <p className="text-sm text-gray-500">{profile.designation} • {profile.department}</p>
          <p className="text-xs text-gray-400 mt-1">Employee ID: {profile.employeeId}</p>
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Full Name</label>
          <input type="text" value={profile.fullName} onChange={(e) => handleChange("fullName", e.target.value)} className={inputClass("fullName")} />
          {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Department</label>
          <select value={profile.department} onChange={(e) => handleChange("department", e.target.value)} className={inputClass("department")}>
            <option>Computer Science</option>
            <option>Electronics</option>
            <option>Mechanical</option>
            <option>Yoga & Consciousness</option>
            <option>Life Sciences</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Designation</label>
          <select value={profile.designation} onChange={(e) => handleChange("designation", e.target.value)} className={inputClass("designation")}>
            <option>Assistant Professor</option>
            <option>Associate Professor</option>
            <option>Professor</option>
            <option>Head of Department</option>
            <option>Visiting Faculty</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Employee ID</label>
          <input type="text" value={profile.employeeId} readOnly className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-100 text-sm text-gray-500 cursor-not-allowed" />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email</label>
          <input type="email" value={profile.email} onChange={(e) => handleChange("email", e.target.value)} className={inputClass("email")} />
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Phone Number</label>
          <input type="tel" value={profile.phone} onChange={(e) => handleChange("phone", e.target.value)} className={inputClass("phone")} placeholder="+91 XXXXX XXXXX" />
          {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Office Location</label>
          <input type="text" value={profile.officeLocation} onChange={(e) => handleChange("officeLocation", e.target.value)} className={inputClass("officeLocation")} />
        </div>
      </div>

      {/* Bio */}
      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Bio / Short Description</label>
        <textarea rows={3} value={profile.bio} onChange={(e) => handleChange("bio", e.target.value)} className={`${inputClass("bio")} resize-none`} placeholder="A brief description about yourself..." />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
        <button onClick={handleSave} disabled={isSaving} className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm px-6 py-3 rounded-xl transition-all duration-200 flex items-center gap-2 shadow-sm shadow-orange-200 disabled:opacity-50 active:scale-[0.97]">
          <Save size={16} /> {isSaving ? "Saving..." : "Save Changes"}
        </button>
        <button onClick={handleReset} className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 font-bold text-sm px-6 py-3 rounded-xl transition-colors flex items-center gap-2">
          <RotateCcw size={16} /> Reset
        </button>
      </div>
    </div>
  );
}
