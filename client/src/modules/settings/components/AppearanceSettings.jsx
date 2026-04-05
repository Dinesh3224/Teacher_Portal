import { useTheme } from "../../../context/ThemeContext";
import { Check, Moon, Sun, Monitor, Palette } from "lucide-react";

export default function AppearanceSettings() {
  const { theme, changeTheme, accent, changeAccent } = useTheme();

  const themes = [
    { id: "theme-light", name: "Light Theme", icon: Sun, desc: "Clean and bright default layout." },
    { id: "theme-dark", name: "Dark Theme", icon: Moon, desc: "Easy on the eyes for night time." },
    { id: "theme-orange", name: "Soft Orange", icon: Palette, desc: "Warm and customized." },
    { id: "theme-blue", name: "Blue Academic", icon: Monitor, desc: "Cool standard institutional blue." }
  ];

  const accents = [
    { id: "orange", name: "Default Orange", colorClass: "bg-orange-500" },
    { id: "blue", name: "Academic Blue", colorClass: "bg-blue-500" },
    { id: "green", name: "Success Green", colorClass: "bg-green-500" },
    { id: "purple", name: "Royal Purple", colorClass: "bg-purple-500" }
  ];

  return (
    <div className="space-y-8 animate__animated animate__fadeIn animate__faster">
      <div>
        <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Interface Theme</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => changeTheme(t.id)}
              className={`flex items-start gap-4 p-4 rounded-xl border text-left transition-all ${
                theme === t.id
                  ? "border-orange-500 bg-orange-50/50"
                  : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              <div className={`p-2 rounded-lg shrink-0 ${theme === t.id ? "bg-orange-500 text-white shadow-sm" : "bg-gray-100 text-gray-500"}`}>
                <t.icon size={20} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-gray-900 text-sm">{t.name}</h4>
                  {theme === t.id && <Check size={16} className="text-orange-500" />}
                </div>
                <p className="text-xs text-gray-500 mt-1">{t.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Accent Color</h3>
        <p className="text-xs text-gray-500 mb-4 leading-relaxed">
          Choose a primary color override for buttons, links, and system highlights. Handled globally via Theme Context.
        </p>
        <div className="flex flex-wrap gap-4">
          {accents.map((a) => (
            <button
              key={a.id}
              onClick={() => changeAccent(a.id)}
              className={`flex flex-col items-center gap-2 group cursor-pointer transition-all ${
                accent === a.id ? "scale-105" : "hover:scale-105 opacity-80 hover:opacity-100"
              }`}
            >
              <div className={`w-12 h-12 rounded-full shadow-sm flex items-center justify-center transition-all ${a.colorClass} ${
                accent === a.id ? "ring-4 ring-offset-2 ring-gray-200" : "ring-1 ring-gray-200"
              }`}>
                {accent === a.id && <Check size={20} className="text-white" strokeWidth={3} />}
              </div>
              <span className={`text-[10px] font-bold ${accent === a.id ? "text-gray-900" : "text-gray-500"}`}>
                {a.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
