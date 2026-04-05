import { useState } from "react";
import { X, Send, Save, Paperclip, AlertCircle, AlertTriangle, Info } from "lucide-react";

export default function CreateAnnouncementModal({ onClose, onSave, editData, courses }) {
  const isEditing = !!editData;

  const [form, setForm] = useState({
    title: editData?.title || "",
    message: editData?.message || "",
    courseId: editData?.courseId || "all",
    priority: editData?.priority || "normal",
    visibility: editData?.visibility || "all",
    attachmentName: editData?.attachments?.[0]?.name || "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.message.trim()) newErrors.message = "Message cannot be empty";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePost = () => {
    if (!validate()) return;
    const courseName = courses.find((c) => c.id === form.courseId)?.name || "All Courses";
    const announcement = {
      id: editData?.id || `ann-${Date.now()}`,
      title: form.title,
      message: form.message,
      course: courseName,
      courseId: form.courseId,
      teacher: "Professor John",
      priority: form.priority,
      visibility: form.visibility,
      pinned: editData?.pinned || false,
      createdAt: editData?.createdAt || new Date().toISOString(),
      editedAt: isEditing ? new Date().toISOString() : null,
      attachments: form.attachmentName
        ? [{ id: `att-${Date.now()}`, name: form.attachmentName, type: "pdf", size: "— KB" }]
        : editData?.attachments || [],
      comments: editData?.comments || [],
    };
    // TODO: API call — POST /api/announcements (create) or PUT /api/announcements/:id (edit)
    onSave(announcement, isEditing);
    onClose();
  };

  const handleDraft = () => {
    if (!form.title.trim()) {
      setErrors({ title: "Title is required to save a draft" });
      return;
    }
    const courseName = courses.find((c) => c.id === form.courseId)?.name || "All Courses";
    const draft = {
      id: editData?.id || `ann-${Date.now()}`,
      title: `[DRAFT] ${form.title}`,
      message: form.message || "(No content yet)",
      course: courseName,
      courseId: form.courseId,
      teacher: "Professor John",
      priority: "normal",
      visibility: "draft",
      pinned: false,
      createdAt: new Date().toISOString(),
      editedAt: null,
      attachments: [],
      comments: [],
    };
    // TODO: API call — POST /api/announcements/draft
    onSave(draft, false);
    onClose();
  };

  const handleFileSelect = () => {
    // Simulate a file picker — in production, use <input type="file">
    const fakeName = prompt("Enter filename to attach (e.g. notes.pdf):");
    if (fakeName) handleChange("attachmentName", fakeName);
  };

  const inputClass = (field) =>
    `w-full px-4 py-3 rounded-xl border ${errors[field] ? "border-red-300 bg-red-50/30" : "border-gray-200 bg-gray-50/50"} text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400 transition-all duration-200 placeholder:text-gray-400`;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto animate__animated animate__fadeInUp animate__faster">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800">
            {isEditing ? "Edit Announcement" : "Create Announcement"}
          </h2>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <div className="px-6 py-5 space-y-5">
          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Announcement Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className={inputClass("title")}
              placeholder="e.g. Mid-Semester Exam Schedule Released"
            />
            {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Message Content</label>
            <textarea
              rows={5}
              value={form.message}
              onChange={(e) => handleChange("message", e.target.value)}
              className={`${inputClass("message")} resize-none`}
              placeholder="Write detailed announcement content here..."
            />
            {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Course */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Course</label>
              <select value={form.courseId} onChange={(e) => handleChange("courseId", e.target.value)} className={inputClass("courseId")}>
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Priority */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Priority</label>
              <select value={form.priority} onChange={(e) => handleChange("priority", e.target.value)} className={inputClass("priority")}>
                <option value="normal">Normal</option>
                <option value="important">Important</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            {/* Visibility */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Visibility</label>
              <select value={form.visibility} onChange={(e) => handleChange("visibility", e.target.value)} className={inputClass("visibility")}>
                <option value="all">All Students</option>
                <option value="class">Specific Class</option>
                <option value="draft">Save as Draft</option>
              </select>
            </div>
          </div>

          {/* Attachment */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Attachment (Optional)</label>
            <div className="flex items-center gap-3">
              <button
                onClick={handleFileSelect}
                className="px-4 py-2.5 border border-dashed border-gray-300 rounded-xl text-sm text-gray-500 hover:border-orange-300 hover:text-orange-600 hover:bg-orange-50/30 transition-all flex items-center gap-2"
              >
                <Paperclip size={16} /> Attach File
              </button>
              {form.attachmentName && (
                <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200">
                  <span className="text-xs font-medium text-blue-700">{form.attachmentName}</span>
                  <button onClick={() => handleChange("attachmentName", "")} className="text-blue-400 hover:text-red-500 transition-colors">
                    <X size={12} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50/50 rounded-b-2xl">
          <button onClick={onClose} className="px-5 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button onClick={handleDraft} className="px-5 py-2.5 text-sm font-bold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2">
            <Save size={14} /> Save Draft
          </button>
          <button onClick={handlePost} className="px-5 py-2.5 text-sm font-bold text-white bg-orange-500 hover:bg-orange-600 rounded-xl transition-all shadow-sm shadow-orange-200 flex items-center gap-2 active:scale-[0.97]">
            <Send size={14} /> {isEditing ? "Update" : "Post Announcement"}
          </button>
        </div>
      </div>
    </div>
  );
}
