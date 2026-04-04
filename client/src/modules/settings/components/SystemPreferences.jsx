import { useState } from "react";
import { Save, RotateCcw, Settings } from "lucide-react";

export default function SystemPreferences() {
  const [prefs, setPrefs] = useState({
    defaultTimetableView: "week",
    weekStartsOn: "monday",
    dateFormat: "DD-MM-YYYY",
    language: "en",
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (field, value) => {
    setPrefs((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setIsSaving(true);
    // TODO: API call — PUT /api/faculty/preferences/system with prefs object
    setTimeout(() => setIsSaving(false), 1000);
  };

  const handleReset = () => {
    setPrefs({
      defaultTimetableView: "week",
      weekStartsOn: "monday",
      dateFormat: "DD-MM-YYYY",
      language: "en",
    });
  };

  const selectClass = "w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400 transition-all duration-200 appearance-none cursor-pointer";

  return (
    <div className="space-y-8">
      <p className="text-sm text-gray-500">Configure system-level preferences for your portal experience.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
        {/* Default Timetable View */}
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Settings size={12} className="text-orange-400" /> Default Timetable View
          </label>
          <select value={prefs.defaultTimetableView} onChange={(e) => handleChange("defaultTimetableView", e.target.value)} className={selectClass}>
            <option value="week">Weekly View</option>
            <option value="day">Daily View</option>
            <option value="month">Monthly Overview</option>
          </select>
        </div>

        {/* Week Starts On */}
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Settings size={12} className="text-orange-400" /> Week Starts On
          </label>
          <select value={prefs.weekStartsOn} onChange={(e) => handleChange("weekStartsOn", e.target.value)} className={selectClass}>
            <option value="monday">Monday</option>
            <option value="sunday">Sunday</option>
          </select>
        </div>

        {/* Date Format */}
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Settings size={12} className="text-orange-400" /> Date Format
          </label>
          <select value={prefs.dateFormat} onChange={(e) => handleChange("dateFormat", e.target.value)} className={selectClass}>
            <option value="DD-MM-YYYY">DD-MM-YYYY</option>
            <option value="MM-DD-YYYY">MM-DD-YYYY</option>
            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
          </select>
        </div>

        {/* Language */}
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Settings size={12} className="text-orange-400" /> Language
          </label>
          <select value={prefs.language} onChange={(e) => handleChange("language", e.target.value)} className={selectClass}>
            <option value="en">English</option>
            <option value="hi">Hindi (Coming Soon)</option>
            <option value="kn">Kannada (Coming Soon)</option>
          </select>
          {prefs.language !== "en" && (
            <p className="text-xs text-orange-500 mt-1 italic">This language will be available in a future internationalization update.</p>
          )}
        </div>
      </div>

      {/* Date Format Preview */}
      <div className="bg-gray-50/80 rounded-2xl p-5 border border-gray-100 max-w-2xl">
        <h3 className="text-sm font-bold text-gray-700 mb-2">Preview</h3>
        <p className="text-sm text-gray-600">
          Today&apos;s date:{" "}
          <span className="font-bold text-orange-600">
            {prefs.dateFormat === "DD-MM-YYYY"
              ? new Date().toLocaleDateString("en-GB").replace(/\//g, "-")
              : prefs.dateFormat === "MM-DD-YYYY"
              ? new Date().toLocaleDateString("en-US").replace(/\//g, "-")
              : new Date().toISOString().split("T")[0]}
          </span>
        </p>
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
