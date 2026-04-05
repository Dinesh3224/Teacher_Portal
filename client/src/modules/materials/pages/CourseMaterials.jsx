import { useState } from "react";
import { UploadCloud, Search, Library } from "lucide-react";
import { mockCourses, mockMaterials } from "../data/mockMaterials";
import CourseSelector from "../components/CourseSelector";
import WeekFolder from "../components/WeekFolder";

export default function CourseMaterials() {
  const [selectedCourse, setSelectedCourse] = useState(mockCourses[0].id);
  const [searchTerm, setSearchTerm] = useState("");

  const weeks = mockMaterials[selectedCourse] || [];
  const courseName = mockCourses.find((c) => c.id === selectedCourse)?.name || "";

  // Filter materials by search term across all weeks
  const filteredWeeks = searchTerm.trim()
    ? weeks
        .map((week) => ({
          ...week,
          items: week.items.filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
          ),
        }))
        .filter((week) => week.items.length > 0)
    : weeks;

  const totalFiles = weeks.reduce((sum, w) => sum + w.items.length, 0);

  const handleUpload = () => {
    // TODO: API call — POST /api/courses/:courseId/materials — open upload modal/dialog
    alert(`Upload material for ${courseName} — Feature coming soon.`);
  };

  return (
    <div className="min-h-full flex flex-col pb-8 animate__animated animate__fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-[28px] font-bold text-gray-800 tracking-tight">Course Materials</h1>
          <p className="text-sm text-gray-500 mt-1">
            Organize and distribute lecture slides, readings, and lab materials by week.
          </p>
        </div>
        <button
          onClick={handleUpload}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm px-5 py-3 rounded-xl transition-all duration-200 flex items-center gap-2 shadow-sm shadow-orange-200 active:scale-[0.97] w-fit"
        >
          <UploadCloud size={18} /> Upload Material
        </button>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6 items-start">
        {/* Left — Course Selector */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 lg:sticky lg:top-8">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-1">Your Courses</h2>
          <CourseSelector
            courses={mockCourses}
            selectedId={selectedCourse}
            onSelect={setSelectedCourse}
            materialData={mockMaterials}
          />
        </div>

        {/* Right — Week Folders */}
        <div className="space-y-5">
          {/* Search + Stats Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center gap-3">
              <Library size={20} className="text-orange-500" />
              <div>
                <h2 className="text-lg font-bold text-gray-800">{courseName}</h2>
                <p className="text-xs text-gray-400">{weeks.length} weeks • {totalFiles} files uploaded</p>
              </div>
            </div>
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search materials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400 transition-all"
              />
            </div>
          </div>

          {/* Week Folders */}
          {filteredWeeks.length > 0 ? (
            <div className="space-y-3">
              {filteredWeeks.map((week, idx) => (
                <WeekFolder key={week.week} weekData={week} defaultOpen={idx === 0} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
              <Library size={40} className="text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">
                {searchTerm ? "No materials match your search." : "No materials uploaded yet."}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {searchTerm ? "Try a different keyword." : "Click 'Upload Material' to get started."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
