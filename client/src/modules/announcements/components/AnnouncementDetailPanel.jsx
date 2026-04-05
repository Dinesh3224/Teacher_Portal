import { X, Pin, Paperclip, Download, Clock, User, MessageSquare, Send } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";

const priorityConfig = {
  normal:    { label: "Normal",    bg: "bg-gray-100",   text: "text-gray-600" },
  important: { label: "Important", bg: "bg-orange-100", text: "text-orange-700" },
  urgent:    { label: "Urgent",    bg: "bg-red-100",    text: "text-red-700" },
};

export default function AnnouncementDetailPanel({ announcement, onClose }) {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(announcement.comments || []);

  if (!announcement) return null;

  const p = priorityConfig[announcement.priority] || priorityConfig.normal;

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const comment = {
      id: `c-${Date.now()}`,
      author: "Professor John",
      role: "teacher",
      text: newComment.trim(),
      timestamp: new Date().toISOString(),
    };
    // TODO: API call — POST /api/announcements/:id/comments
    setComments((prev) => [...prev, comment]);
    setNewComment("");
  };

  const handleDownload = (att) => {
    // TODO: API call — GET /api/attachments/:id/download
    alert(`Downloading: ${att.name}`);
  };

  return (
    <div className="fixed inset-0 z-[60] flex">
      {/* Backdrop */}
      <div className="flex-1 bg-black/30 backdrop-blur-sm" onClick={onClose} />

      {/* Panel — slides in from right */}
      <div className="w-full max-w-lg bg-white shadow-2xl border-l border-gray-100 flex flex-col animate__animated animate__slideInRight animate__faster">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 shrink-0">
          <h2 className="text-lg font-bold text-gray-800 truncate pr-4">Announcement Detail</h2>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors shrink-0">
            <X size={18} />
          </button>
        </div>

        {/* Content — scrollable */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          {/* Badges */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${p.bg} ${p.text}`}>
              {p.label}
            </span>
            <span className="text-[10px] font-medium text-gray-500 bg-gray-50 px-2.5 py-1 rounded-full">
              {announcement.course}
            </span>
            {announcement.pinned && (
              <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full flex items-center gap-1">
                <Pin size={10} /> Pinned
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 leading-snug">{announcement.title}</h3>

          {/* Meta */}
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <span className="flex items-center gap-1"><User size={12} /> {announcement.teacher}</span>
            <span className="flex items-center gap-1"><Clock size={12} /> {format(new Date(announcement.createdAt), "dd MMM yyyy, hh:mm a")}</span>
          </div>
          {announcement.editedAt && (
            <p className="text-[10px] text-gray-400 italic -mt-4">Edited on {format(new Date(announcement.editedAt), "dd MMM yyyy")}</p>
          )}

          {/* Full Message */}
          <div className="bg-gray-50/80 rounded-xl p-5 border border-gray-100">
            <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
              {announcement.message}
            </p>
          </div>

          {/* Attachments */}
          {announcement.attachments.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Paperclip size={12} /> Attachments ({announcement.attachments.length})
              </h4>
              <div className="space-y-2">
                {announcement.attachments.map((att) => (
                  <div key={att.id} className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-xl">
                    <div>
                      <p className="text-sm font-medium text-blue-800">{att.name}</p>
                      <p className="text-[10px] text-blue-500">{att.size}</p>
                    </div>
                    <button
                      onClick={() => handleDownload(att)}
                      className="p-2 rounded-lg bg-white border border-blue-200 text-blue-600 hover:bg-blue-100 transition-colors"
                    >
                      <Download size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Comments */}
          <div>
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <MessageSquare size={12} /> Comments ({comments.length})
            </h4>
            {comments.length > 0 ? (
              <div className="space-y-3">
                {comments.map((c) => (
                  <div key={c.id} className={`p-3 rounded-xl border ${c.role === "teacher" ? "bg-orange-50/50 border-orange-100" : "bg-gray-50 border-gray-100"}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs font-bold ${c.role === "teacher" ? "text-orange-700" : "text-gray-700"}`}>{c.author}</span>
                      <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-full ${c.role === "teacher" ? "bg-orange-100 text-orange-600" : "bg-gray-200 text-gray-500"}`}>
                        {c.role}
                      </span>
                      <span className="text-[10px] text-gray-400 ml-auto">
                        {format(new Date(c.timestamp), "dd MMM, hh:mm a")}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">{c.text}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-400 italic">No comments yet.</p>
            )}
          </div>
        </div>

        {/* Add Comment Input */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 shrink-0">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
              placeholder="Add a reply..."
              className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400 transition-all"
            />
            <button
              onClick={handleAddComment}
              disabled={!newComment.trim()}
              className="p-2.5 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.95]"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
