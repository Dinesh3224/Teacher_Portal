import { useState } from "react";
import { Palette, Type, Sun, Moon, Save } from "lucide-react";

const accentColors = [
  { name: "Orange", value: "orange", class: "bg-orange-500" },
  { name: "Blue",   value: "blue",   class: "bg-blue-500" },
  { name: "Green",  value: "green",  class: "bg-green-500" },
];

const fontSizes = [
  { label: "Small",  value: "small" },
  { label: "Medium", value: "medium" },
  { label: "Large",  value: "large" },
];

export default function AppearanceSettings() {
  const [theme, setTheme] = useState("light");
  const [accent, setAccent] = useState("orange");
  const [fontSize, setFontSize] = useState("medium");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    // TODO: API call — PUT /api/faculty/preferences/appearance { theme, accent, fontSize }
    // TODO: Apply theme/accent/fontSize globally via context or CSS variables
    setTimeout(() => setIsSaving(false), 1000);
  };

  return (
    <div className="space-y-8">
      {/* Theme Mode */}
      <div>
        <h3 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
          <Palette size={16} className="text-orange-500" /> Theme Mode
        </h3>
        <div className="grid grid-cols-2 gap-4 max-w-sm">
          <button
            onClick={() => setTheme("light")}
            className={`flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all duration-300 ${
              theme === "light"
                ? "border-orange-400 bg-orange-50/50 shadow-sm"
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            <Sun size={28} className={theme === "light" ? "text-orange-500" : "text-gray-400"} />
            <span className={`text-sm font-bold ${theme === "light" ? "text-orange-600" : "text-gray-500"}`}>Light</span>
          </button>
          <button
            onClick={() => setTheme("dark")}
            className={`flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all duration-300 ${
              theme === "dark"
                ? "border-orange-400 bg-orange-50/50 shadow-sm"
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            <Moon size={28} className={theme === "dark" ? "text-orange-500" : "text-gray-400"} />
            <span className={`text-sm font-bold ${theme === "dark" ? "text-orange-600" : "text-gray-500"}`}>Dark</span>
          </button>
        </div>
        {theme === "dark" && (
          <p className="text-xs text-gray-400 mt-3 italic">Dark mode will be available in a future update.</p>
        )}
      </div>

      {/* Accent Color */}
      <div>
        <h3 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
          <Palette size={16} className="text-orange-500" /> Accent Color
        </h3>
        <div className="flex gap-4">
          {accentColors.map((color) => (
            <button
              key={color.value}
              onClick={() => setAccent(color.value)}
              className={`flex items-center gap-3 px-5 py-3 rounded-2xl border-2 transition-all duration-300 ${
                accent === color.value
                  ? "border-orange-400 bg-orange-50/50 shadow-sm"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <span className={`w-5 h-5 rounded-full ${color.class} shadow-sm`} />
              <span className={`text-sm font-bold ${accent === color.value ? "text-gray-800" : "text-gray-500"}`}>{color.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Font Size */}
      <div>
        <h3 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
          <Type size={16} className="text-orange-500" /> Font Size
        </h3>
        <div className="flex gap-3">
          {fontSizes.map((fs) => (
            <button
              key={fs.value}
              onClick={() => setFontSize(fs.value)}
              className={`px-6 py-3 rounded-2xl border-2 text-sm font-bold transition-all duration-300 ${
                fontSize === fs.value
                  ? "border-orange-400 bg-orange-50/50 text-orange-600 shadow-sm"
                  : "border-gray-200 bg-white text-gray-500 hover:border-gray-300"
              }`}
            >
              {fs.label}
            </button>
          ))}
        </div>
      </div>

      {/* Preview */}
      <div className="bg-gray-50/80 rounded-2xl p-5 border border-gray-100">
        <h3 className="text-sm font-bold text-gray-700 mb-2">Preview</h3>
        <p className={`text-gray-600 ${fontSize === "small" ? "text-xs" : fontSize === "large" ? "text-base" : "text-sm"} transition-all duration-300`}>
          This is how your content will look with the selected font size. The accent color and theme will apply globally once saved.
        </p>
      </div>

      {/* Save */}
      <div className="pt-4 border-t border-gray-100">
        <button onClick={handleSave} disabled={isSaving} className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm px-6 py-3 rounded-xl transition-all duration-200 flex items-center gap-2 shadow-sm shadow-orange-200 disabled:opacity-50 active:scale-[0.97]">
          <Save size={16} /> {isSaving ? "Applying..." : "Save Appearance"}
        </button>
      </div>
    </div>
  );
}
