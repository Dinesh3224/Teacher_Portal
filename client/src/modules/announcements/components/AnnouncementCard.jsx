import { Pin, Eye, Pencil, Trash2, AlertCircle, AlertTriangle, Info } from "lucide-react";
import { format } from "date-fns";

const priorityConfig = {
  normal:    { label: "Normal",    bg: "bg-gray-100",   text: "text-gray-600",   icon: Info },
  important: { label: "Important", bg: "bg-orange-100", text: "text-orange-700", icon: AlertCircle },
  urgent:    { label: "Urgent",    bg: "bg-red-100",    text: "text-red-700",    icon: AlertTriangle },
};

export default function AnnouncementCard({
  announcement,
  isSelected,
  onView,
  onEdit,
  onDelete,
  onPin,
  onSelect,
  selectionMode,
}) {
  const p = priorityConfig[announcement.priority] || priorityConfig.normal;
  const PIcon = p.icon;
  const dateStr = format(new Date(announcement.createdAt), "dd MMM yyyy, hh:mm a");

  return (
    <div
      className={`bg-white rounded-xl border transition-all duration-200 group relative overflow-hidden ${
        isSelected
          ? "border-orange-300 shadow-md ring-2 ring-orange-100"
          : "border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200"
      }`}
    >
      {/* Pinned indicator stripe */}
      {announcement.pinned && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-orange-500" />
      )}

      <div className="p-5">
        <div className="flex items-start gap-4">
          {/* Checkbox for bulk selection */}
          {selectionMode && (
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => onSelect(announcement.id)}
              className="mt-1 w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-200 shrink-0 cursor-pointer"
            />
          )}

          <div className="flex-1 min-w-0">
            {/* Top row: priority + course + pin */}
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${p.bg} ${p.text}`}>
                <PIcon size={10} /> {p.label}
              </span>
              <span className="text-[10px] font-medium text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">
                {announcement.course}
              </span>
              {announcement.pinned && (
                <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Pin size={10} /> Pinned
                </span>
              )}
              {announcement.editedAt && (
                <span className="text-[10px] text-gray-400 italic">
                  Edited {format(new Date(announcement.editedAt), "dd MMM")}
                </span>
              )}
            </div>

            {/* Title */}
            <h3
              className="text-sm font-bold text-gray-800 mb-1 cursor-pointer hover:text-orange-600 transition-colors truncate"
              onClick={() => onView(announcement)}
            >
              {announcement.title}
            </h3>

            {/* Preview */}
            <p className="text-xs text-gray-500 line-clamp-2 mb-3 leading-relaxed">
              {announcement.message}
            </p>

            {/* Footer: meta + actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-[10px] text-gray-400">
                <span>{announcement.teacher}</span>
                <span>•</span>
                <span>{dateStr}</span>
                {announcement.attachments.length > 0 && (
                  <>
                    <span>•</span>
                    <span className="font-medium text-blue-500">{announcement.attachments.length} attachment{announcement.attachments.length > 1 ? "s" : ""}</span>
                  </>
                )}
                {announcement.comments.length > 0 && (
                  <>
                    <span>•</span>
                    <span className="font-medium text-gray-500">{announcement.comments.length} comment{announcement.comments.length > 1 ? "s" : ""}</span>
                  </>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => onView(announcement)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors" title="View">
                  <Eye size={14} />
                </button>
                <button onClick={() => onEdit(announcement)} className="p-1.5 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-colors" title="Edit">
                  <Pencil size={14} />
                </button>
                <button onClick={() => onPin(announcement.id)} className={`p-1.5 rounded-lg transition-colors ${announcement.pinned ? "bg-orange-50 text-orange-500" : "hover:bg-orange-50 text-gray-400 hover:text-orange-500"}`} title={announcement.pinned ? "Unpin" : "Pin"}>
                  <Pin size={14} />
                </button>
                <button onClick={() => onDelete(announcement.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors" title="Delete">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
