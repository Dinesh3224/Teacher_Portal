import { useState } from "react";
import { Save, LogOut, Eye, EyeOff, ShieldCheck } from "lucide-react";

export default function AccountSettings() {
  const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" });
  const [showPasswords, setShowPasswords] = useState({ current: false, new: false, confirm: false });
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const getPasswordStrength = (pw) => {
    if (!pw) return { label: "", color: "", width: "0%" };
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    if (pw.length >= 12) score++;

    if (score <= 1) return { label: "Weak", color: "bg-red-500", width: "20%" };
    if (score === 2) return { label: "Fair", color: "bg-orange-400", width: "40%" };
    if (score === 3) return { label: "Good", color: "bg-yellow-400", width: "60%" };
    if (score === 4) return { label: "Strong", color: "bg-green-400", width: "80%" };
    return { label: "Excellent", color: "bg-green-600", width: "100%" };
  };

  const strength = getPasswordStrength(passwords.new);

  const handlePasswordChange = () => {
    const newErrors = {};
    if (!passwords.current) newErrors.current = "Current password is required";
    if (passwords.new.length < 8) newErrors.new = "Minimum 8 characters";
    if (passwords.new !== passwords.confirm) newErrors.confirm = "Passwords do not match";
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setIsSaving(true);
    // TODO: API call — PUT /api/faculty/change-password { currentPassword, newPassword }
    setTimeout(() => {
      setIsSaving(false);
      setPasswords({ current: "", new: "", confirm: "" });
    }, 1200);
  };

  const handleLogoutAll = () => {
    // TODO: API call — POST /api/auth/logout-all-devices
    alert("All other sessions have been logged out.");
  };

  const toggleShow = (field) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const inputClass = (field) =>
    `w-full pl-4 pr-12 py-3 rounded-xl border ${errors[field] ? "border-red-300 bg-red-50/30" : "border-gray-200 bg-gray-50/50"} text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400 transition-all duration-200`;

  return (
    <div className="space-y-8">
      {/* Account Info */}
      <div className="bg-gray-50/80 rounded-2xl p-5 border border-gray-100">
        <h3 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
          <ShieldCheck size={16} className="text-orange-500" /> Account Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Username</label>
            <input type="text" value="john.williams" readOnly className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-100 text-sm text-gray-500 cursor-not-allowed" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Institution Email</label>
            <input type="email" value="john.williams@svyasa.edu.in" readOnly className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-100 text-sm text-gray-500 cursor-not-allowed" />
          </div>
        </div>
      </div>

      {/* Change Password */}
      <div>
        <h3 className="text-sm font-bold text-gray-700 mb-4">Change Password</h3>
        <div className="space-y-4 max-w-md">
          {["current", "new", "confirm"].map((field) => (
            <div key={field}>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                {field === "current" ? "Current Password" : field === "new" ? "New Password" : "Confirm New Password"}
              </label>
              <div className="relative">
                <input
                  type={showPasswords[field] ? "text" : "password"}
                  value={passwords[field]}
                  onChange={(e) => {
                    setPasswords((prev) => ({ ...prev, [field]: e.target.value }));
                    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
                  }}
                  className={inputClass(field)}
                  placeholder={field === "current" ? "Enter current password" : field === "new" ? "Enter new password" : "Re-enter new password"}
                />
                <button
                  type="button"
                  onClick={() => toggleShow(field)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPasswords[field] ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors[field] && <p className="text-xs text-red-500 mt-1">{errors[field]}</p>}
            </div>
          ))}

          {/* Password Strength */}
          {passwords.new && (
            <div className="space-y-1.5">
              <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className={`h-full ${strength.color} rounded-full transition-all duration-500`} style={{ width: strength.width }} />
              </div>
              <p className="text-xs text-gray-500">Strength: <span className="font-bold">{strength.label}</span></p>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-gray-100">
        <button onClick={handlePasswordChange} disabled={isSaving} className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm px-6 py-3 rounded-xl transition-all duration-200 flex items-center gap-2 shadow-sm shadow-orange-200 disabled:opacity-50 active:scale-[0.97]">
          <Save size={16} /> {isSaving ? "Updating..." : "Update Password"}
        </button>
        <button onClick={handleLogoutAll} className="bg-red-50 border border-red-200 hover:bg-red-100 text-red-600 font-bold text-sm px-6 py-3 rounded-xl transition-colors flex items-center gap-2">
          <LogOut size={16} /> Logout from All Devices
        </button>
      </div>
    </div>
  );
}
