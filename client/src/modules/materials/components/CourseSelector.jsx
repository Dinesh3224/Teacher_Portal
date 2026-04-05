import { BookOpen, FileText, FlaskConical, ClipboardList, Link2 } from "lucide-react";

const colorMap = {
  blue:   { bg: "bg-blue-50",   border: "border-blue-200",   text: "text-blue-700",   accent: "bg-blue-500" },
  purple: { bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-700", accent: "bg-purple-500" },
  green:  { bg: "bg-green-50",  border: "border-green-200",  text: "text-green-700",  accent: "bg-green-500" },
  orange: { bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-700", accent: "bg-orange-500" },
};

export default function CourseSelector({ courses, selectedId, onSelect, materialData }) {
  return (
    <div className="space-y-3">
      {courses.map((course) => {
        const isActive = selectedId === course.id;
        const colors = colorMap[course.color] || colorMap.blue;
        const weeks = materialData[course.id] || [];
        const totalFiles = weeks.reduce((sum, w) => sum + w.items.length, 0);

        return (
          <button
            key={course.id}
            onClick={() => onSelect(course.id)}
            className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
              isActive
                ? `${colors.bg} ${colors.border} shadow-sm`
                : "bg-white border-gray-100 hover:border-gray-200 hover:shadow-sm"
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${colors.accent}`} />
              <div className="flex-1">
                <p className={`text-sm font-bold ${isActive ? colors.text : "text-gray-800"}`}>
                  {course.name}
                </p>
                <p className="text-[10px] text-gray-400 font-medium mt-0.5">
                  {course.id} • {course.semester}
                </p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-[10px] text-gray-400 font-medium">
                    {weeks.length} weeks • {totalFiles} files
                  </span>
                </div>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
