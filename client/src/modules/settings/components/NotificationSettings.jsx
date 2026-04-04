import { useState } from "react";
import { Save, RotateCcw, Bell } from "lucide-react";

const defaultPrefs = {
  assignmentSubmissions: { inApp: true, email: true },
  studentMessages:      { inApp: true, email: false },
  courseAnnouncements:   { inApp: true, email: true },
  systemUpdates:        { inApp: true, email: false },
  upcomingClasses:      { inApp: true, email: true },
};

const labels = {
  assignmentSubmissions: "Assignment Submission Alerts",
  studentMessages:      "Student Messages",
  courseAnnouncements:   "Course Announcements",
  systemUpdates:        "System Updates",
  upcomingClasses:      "Upcoming Classes Reminder",
};

function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative w-11 h-6 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-orange-200 ${checked ? "bg-orange-500" : "bg-gray-300"}`}
    >
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-300 ${checked ? "translate-x-5" : "translate-x-0"}`} />
    </button>
  );
}

export default function NotificationSettings() {
  const [prefs, setPrefs] = useState(defaultPrefs);
  const [isSaving, setIsSaving] = useState(false);

  const updatePref = (key, channel, value) => {
    setPrefs((prev) => ({
      ...prev,
      [key]: { ...prev[key], [channel]: value },
    }));
  };

  const handleSave = () => {
    setIsSaving(true);
    // TODO: API call — PUT /api/faculty/notification-preferences with prefs object
    setTimeout(() => setIsSaving(false), 1000);
  };

  const handleReset = () => setPrefs(defaultPrefs);

  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-500">Control how and where you receive notifications.</p>

      {/* Table Header */}
      <div className="grid grid-cols-[1fr_80px_80px] gap-4 px-4 pb-2 border-b border-gray-100">
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Notification Type</span>
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider text-center">In-App</span>
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Email</span>
      </div>

      {/* Rows */}
      <div className="space-y-1">
        {Object.entries(prefs).map(([key, val]) => (
          <div key={key} className="grid grid-cols-[1fr_80px_80px] gap-4 items-center px-4 py-4 rounded-xl hover:bg-gray-50/80 transition-colors">
            <div className="flex items-center gap-3">
              <Bell size={16} className="text-orange-400 shrink-0" />
              <span className="text-sm font-medium text-gray-700">{labels[key]}</span>
            </div>
            <div className="flex justify-center">
              <Toggle checked={val.inApp} onChange={(v) => updatePref(key, "inApp", v)} />
            </div>
            <div className="flex justify-center">
              <Toggle checked={val.email} onChange={(v) => updatePref(key, "email", v)} />
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
        <button onClick={handleSave} disabled={isSaving} className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm px-6 py-3 rounded-xl transition-all duration-200 flex items-center gap-2 shadow-sm shadow-orange-200 disabled:opacity-50 active:scale-[0.97]">
          <Save size={16} /> {isSaving ? "Saving..." : "Save Preferences"}
        </button>
        <button onClick={handleReset} className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 font-bold text-sm px-6 py-3 rounded-xl transition-colors flex items-center gap-2">
          <RotateCcw size={16} /> Reset to Default
        </button>
      </div>
    </div>
  );
}
