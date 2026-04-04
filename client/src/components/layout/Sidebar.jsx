import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, Calendar, BookOpen, Clock, UsersRound, Library, Megaphone, MessageSquare, Settings, GraduationCap } from "lucide-react";

export default function Sidebar() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [expanded, setExpanded] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: UsersRound, label: "My Classes", path: "/classes" },
    { icon: Calendar, label: "Timetable", path: "/timetable" },
    { icon: BookOpen, label: "Assignments", path: "/assignments" },
    { icon: Clock, label: "Attendance", path: "/attendance" },
    { icon: Users, label: "Students", path: "/students" },
    { icon: Library, label: "Course Materials", path: "/materials" },
    { icon: Megaphone, label: "Announcements", path: "/announcements" },
    { icon: MessageSquare, label: "Messages", path: "/messages" },
    { icon: Settings, label: "Settings", path: "/settings" }
  ];

  return (
    <aside
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      className={`fixed left-0 top-0 h-screen ${expanded ? "w-56" : "w-16"} transition-all duration-300 ease-in-out overflow-hidden bg-white border-r border-gray-100 hidden md:flex flex-col z-50 shadow-sm`}
    >
      {/* Logo */}
      <div className="flex items-center px-4 py-6 shrink-0 border-b border-gray-50 mb-2">
        <GraduationCap className="text-orange-500 min-w-[24px] shrink-0" size={24} />
        <span
          className={`ml-3 font-bold text-xl text-gray-800 whitespace-nowrap transition-opacity duration-300 ${expanded ? "opacity-100" : "opacity-0"}`}
        >
          S-VYASA
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2 overflow-y-auto overflow-x-hidden no-scrollbar space-y-1">
        {menuItems.map((item, idx) => {
          const isActive = currentPath.startsWith(item.path);
          return (
            <Link
              key={idx}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-3 rounded-2xl transition-colors duration-200 ${
                isActive
                  ? "bg-orange-50 text-orange-600 font-bold"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900 font-medium"
              }`}
            >
              <item.icon size={20} className={`min-w-[20px] shrink-0 ${isActive ? "text-orange-600" : "text-gray-400"}`} />
              <span
                className={`whitespace-nowrap transition-opacity duration-300 ${expanded ? "opacity-100" : "opacity-0"}`}
              >
                {item.label}
              </span>
              {item.label === "Messages" && (
                <span
                  className={`ml-auto bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 transition-opacity duration-300 ${expanded ? "opacity-100" : "opacity-0"}`}
                >
                  4
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
