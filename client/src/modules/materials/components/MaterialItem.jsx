import { FileText, BookOpen, FlaskConical, ClipboardList, Link2 } from "lucide-react";

const typeConfig = {
  slides:     { icon: FileText,     label: "Lecture Slides",    bg: "bg-blue-50",    text: "text-blue-600",    border: "border-blue-200" },
  reading:    { icon: BookOpen,     label: "Reading Material",  bg: "bg-green-50",   text: "text-green-600",   border: "border-green-200" },
  lab:        { icon: FlaskConical, label: "Lab Material",      bg: "bg-purple-50",  text: "text-purple-600",  border: "border-purple-200" },
  assignment: { icon: ClipboardList,label: "Assignment",        bg: "bg-orange-50",  text: "text-orange-600",  border: "border-orange-200" },
  reference:  { icon: Link2,       label: "Reference Links",   bg: "bg-gray-50",    text: "text-gray-600",    border: "border-gray-200" },
};

export default function MaterialItem({ item }) {
  const config = typeConfig[item.type] || typeConfig.reference;
  const Icon = config.icon;

  const handleDownload = () => {
    // TODO: API call — GET /api/materials/:id/download — trigger file download
    alert(`Downloading: ${item.name}`);
  };

  return (
    <div className={`flex items-center gap-4 p-3.5 rounded-xl border ${config.border} ${config.bg} hover:shadow-sm transition-all duration-200 group`}>
      {/* Icon */}
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${config.bg}`}>
        <Icon size={18} className={config.text} />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-800 truncate">{item.name}</p>
        <div className="flex items-center gap-3 mt-1">
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${config.bg} ${config.text}`}>
            {config.label}
          </span>
          {item.size !== "—" && (
            <span className="text-[10px] text-gray-400 font-medium">{item.size}</span>
          )}
          <span className="text-[10px] text-gray-400">{item.uploadedAt}</span>
        </div>
      </div>

      {/* Download count + action */}
      <div className="flex items-center gap-3 shrink-0">
        <span className="text-xs text-gray-400 hidden sm:block">{item.downloads} downloads</span>
        <button
          onClick={handleDownload}
          className="px-3 py-1.5 text-xs font-bold text-orange-600 bg-white border border-orange-200 rounded-lg hover:bg-orange-50 transition-colors opacity-0 group-hover:opacity-100"
        >
          Download
        </button>
      </div>
    </div>
  );
}
