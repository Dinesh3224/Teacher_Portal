import { useState, useMemo } from "react";
import { Plus, Search, Filter, Pin, Trash2, Archive, CheckSquare, X, Megaphone } from "lucide-react";
import { mockAnnouncements, courseOptions } from "../data/mockAnnouncements";
import AnnouncementCard from "../components/AnnouncementCard";
import CreateAnnouncementModal from "../components/CreateAnnouncementModal";
import AnnouncementDetailPanel from "../components/AnnouncementDetailPanel";

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState(mockAnnouncements);
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [showPinnedOnly, setShowPinnedOnly] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAnn, setEditingAnn] = useState(null);
  const [viewingAnn, setViewingAnn] = useState(null);

  // Bulk selection
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

  // ---- Filtering ----
  const filtered = useMemo(() => {
    let result = [...announcements];

    // Course filter
    if (selectedCourse !== "all") {
      result = result.filter((a) => a.courseId === selectedCourse || a.courseId === "all");
    }

    // Priority filter
    if (priorityFilter !== "all") {
      result = result.filter((a) => a.priority === priorityFilter);
    }

    // Pinned only
    if (showPinnedOnly) {
      result = result.filter((a) => a.pinned);
    }

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.message.toLowerCase().includes(q) ||
          a.course.toLowerCase().includes(q)
      );
    }

    // Sort: pinned first, then by date
    result.sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return result;
  }, [announcements, selectedCourse, searchQuery, priorityFilter, showPinnedOnly]);

  // ---- CRUD Handlers ----
  const handleSave = (announcement, isEdit) => {
    if (isEdit) {
      setAnnouncements((prev) => prev.map((a) => (a.id === announcement.id ? announcement : a)));
    } else {
      setAnnouncements((prev) => [announcement, ...prev]);
    }
  };

  const handleDelete = (id) => {
    if (!confirm("Delete this announcement?")) return;
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
    // TODO: API call — DELETE /api/announcements/:id
  };

  const handlePin = (id) => {
    setAnnouncements((prev) =>
      prev.map((a) => (a.id === id ? { ...a, pinned: !a.pinned } : a))
    );
    // TODO: API call — PATCH /api/announcements/:id/pin
  };

  const handleView = (ann) => setViewingAnn(ann);

  const handleEdit = (ann) => {
    setEditingAnn(ann);
    setIsModalOpen(true);
  };

  // ---- Bulk Actions ----
  const handleSelectToggle = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = () => {
    if (!confirm(`Delete ${selectedIds.length} announcements?`)) return;
    setAnnouncements((prev) => prev.filter((a) => !selectedIds.includes(a.id)));
    setSelectedIds([]);
    setSelectionMode(false);
    // TODO: API call — DELETE /api/announcements/bulk { ids }
  };

  const handleBulkPin = () => {
    setAnnouncements((prev) =>
      prev.map((a) => (selectedIds.includes(a.id) ? { ...a, pinned: true } : a))
    );
    setSelectedIds([]);
    setSelectionMode(false);
    // TODO: API call — PATCH /api/announcements/bulk/pin { ids }
  };

  const handleBulkArchive = () => {
    // Simulated: just remove from view
    setAnnouncements((prev) => prev.filter((a) => !selectedIds.includes(a.id)));
    setSelectedIds([]);
    setSelectionMode(false);
    // TODO: API call — PATCH /api/announcements/bulk/archive { ids }
  };

  const exitSelectionMode = () => {
    setSelectionMode(false);
    setSelectedIds([]);
  };

  return (
    <div className="min-h-full flex flex-col pb-8 animate__animated animate__fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-[28px] font-bold text-gray-800 tracking-tight">Announcements</h1>
          <p className="text-sm text-gray-500 mt-1">
            Create and manage announcements for your courses.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSelectionMode(!selectionMode)}
            className={`px-4 py-2.5 text-sm font-medium rounded-xl border transition-colors flex items-center gap-2 ${
              selectionMode
                ? "bg-orange-50 border-orange-300 text-orange-600"
                : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            <CheckSquare size={16} /> {selectionMode ? "Cancel" : "Select"}
          </button>
          <button
            onClick={() => {
              setEditingAnn(null);
              setIsModalOpen(true);
            }}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-all duration-200 flex items-center gap-2 shadow-sm shadow-orange-200 active:scale-[0.97]"
          >
            <Plus size={18} /> Create Announcement
          </button>
        </div>
      </div>

      {/* Filters + Search Bar */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6 flex flex-col sm:flex-row sm:items-center gap-4">
        {/* Course selector */}
        <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-xl border border-gray-200 w-full sm:w-auto">
          <Filter size={16} className="text-gray-400 shrink-0" />
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="bg-transparent text-sm text-gray-700 outline-none cursor-pointer font-medium"
          >
            {courseOptions.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* Priority filter */}
        <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-xl border border-gray-200 w-full sm:w-auto">
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="bg-transparent text-sm text-gray-700 outline-none cursor-pointer font-medium"
          >
            <option value="all">All Priorities</option>
            <option value="normal">Normal</option>
            <option value="important">Important</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>

        {/* Pinned toggle */}
        <button
          onClick={() => setShowPinnedOnly(!showPinnedOnly)}
          className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-medium transition-colors shrink-0 ${
            showPinnedOnly
              ? "bg-orange-50 border-orange-300 text-orange-600"
              : "bg-gray-50 border-gray-200 text-gray-500 hover:border-gray-300"
          }`}
        >
          <Pin size={14} /> Pinned
        </button>

        {/* Search */}
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search announcements..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400 transition-all"
          />
        </div>
      </div>

      {/* Bulk Action Bar */}
      {selectionMode && selectedIds.length > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 mb-4 flex items-center justify-between animate__animated animate__fadeIn animate__faster">
          <span className="text-sm font-bold text-orange-700">
            {selectedIds.length} selected
          </span>
          <div className="flex items-center gap-2">
            <button onClick={handleBulkPin} className="px-3 py-1.5 text-xs font-bold bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors flex items-center gap-1">
              <Pin size={12} /> Pin All
            </button>
            <button onClick={handleBulkArchive} className="px-3 py-1.5 text-xs font-bold bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-1">
              <Archive size={12} /> Archive
            </button>
            <button onClick={handleBulkDelete} className="px-3 py-1.5 text-xs font-bold bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors flex items-center gap-1">
              <Trash2 size={12} /> Delete
            </button>
            <button onClick={exitSelectionMode} className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors">
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Announcements List */}
      {filtered.length > 0 ? (
        <div className="space-y-3">
          {filtered.map((ann) => (
            <AnnouncementCard
              key={ann.id}
              announcement={ann}
              isSelected={selectedIds.includes(ann.id)}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onPin={handlePin}
              onSelect={handleSelectToggle}
              selectionMode={selectionMode}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
          <Megaphone size={40} className="text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">No announcements found.</p>
          <p className="text-xs text-gray-400 mt-1">
            {searchQuery ? "Try a different search query." : "Click 'Create Announcement' to post one."}
          </p>
        </div>
      )}

      {/* Stats footer */}
      <div className="mt-6 text-xs text-gray-400 text-center">
        Showing {filtered.length} of {announcements.length} announcements
        {announcements.filter((a) => a.pinned).length > 0 &&
          ` • ${announcements.filter((a) => a.pinned).length} pinned`}
      </div>

      {/* Create/Edit Modal */}
      {isModalOpen && (
        <CreateAnnouncementModal
          onClose={() => {
            setIsModalOpen(false);
            setEditingAnn(null);
          }}
          onSave={handleSave}
          editData={editingAnn}
          courses={courseOptions}
        />
      )}

      {/* Detail Panel */}
      {viewingAnn && (
        <AnnouncementDetailPanel
          announcement={viewingAnn}
          onClose={() => setViewingAnn(null)}
        />
      )}
    </div>
  );
}
