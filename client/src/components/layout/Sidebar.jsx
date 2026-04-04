import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, Calendar, BookOpen, Clock, UsersRound, Library, Megaphone, MessageSquare, Settings } from "lucide-react";

export default function Sidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

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
    <aside className="w-64 flex-shrink-0 bg-white border-r border-gray-100 hidden md:flex flex-col">
      <div className="p-6 flex items-center space-x-3">
        <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white font-bold">
          E
        </div>
        <h1 className="text-xl font-bold text-gray-800">Eduspot</h1>
      </div>
      
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {menuItems.map((item, idx) => {
          const isActive = currentPath.startsWith(item.path);
          return (
            <Link
              key={idx}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors duration-200 ${
                isActive 
                  ? "bg-orange-50 text-orange-600 font-medium" 
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <item.icon size={20} className={isActive ? "text-orange-600" : "text-gray-400"} />
              <span>{item.label}</span>
              {item.label === "Messages" && (
                <span className="ml-auto bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">4</span>
              )}
            </Link>
          );
        })}
      </nav>

    </aside>
  );
}
