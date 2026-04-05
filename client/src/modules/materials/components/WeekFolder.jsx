import { useState } from "react";
import { ChevronDown, ChevronRight, FolderOpen, Folder } from "lucide-react";
import MaterialItem from "./MaterialItem";

export default function WeekFolder({ weekData, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-200 hover:border-gray-300">
      {/* Folder Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center gap-3 px-5 py-4 text-left transition-colors duration-200 ${
          isOpen ? "bg-orange-50/60" : "bg-white hover:bg-gray-50"
        }`}
      >
        {/* Chevron */}
        <div className="shrink-0 text-gray-400">
          {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
        </div>

        {/* Folder icon */}
        <div className={`shrink-0 ${isOpen ? "text-orange-500" : "text-gray-400"}`}>
          {isOpen ? <FolderOpen size={20} /> : <Folder size={20} />}
        </div>

        {/* Label */}
        <div className="flex-1">
          <span className={`text-sm font-bold ${isOpen ? "text-orange-700" : "text-gray-800"}`}>
            {weekData.label}
          </span>
        </div>

        {/* Item count badge */}
        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0 ${
          isOpen
            ? "bg-orange-100 text-orange-600"
            : "bg-gray-100 text-gray-500"
        }`}>
          {weekData.items.length} {weekData.items.length === 1 ? "file" : "files"}
        </span>
      </button>

      {/* Folder Contents — collapsible */}
      {isOpen && (
        <div className="border-t border-gray-100 bg-white px-5 py-4 space-y-2.5 animate__animated animate__fadeIn animate__faster">
          {weekData.items.map((item) => (
            <MaterialItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
