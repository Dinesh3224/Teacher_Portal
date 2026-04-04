import { LayoutDashboard, Users, Calendar, BookOpen, Clock, UsersRound, Library, Megaphone, MessageSquare, Settings } from "lucide-react";

export default function Sidebar() {
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", active: true },
    { icon: UsersRound, label: "My Classes" },
    { icon: Calendar, label: "Timetable" },
    { icon: BookOpen, label: "Assignments" },
    { icon: Clock, label: "Attendance" },
    { icon: Users, label: "Students" },
    { icon: Library, label: "Course Materials" },
    { icon: Megaphone, label: "Announcements" },
    { icon: MessageSquare, label: "Messages" },
    { icon: Settings, label: "Settings" }
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
        {menuItems.map((item, idx) => (
          <a
            key={idx}
            href="#"
            className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors duration-200 ${
              item.active 
                ? "bg-orange-50 text-orange-600 font-medium" 
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <item.icon size={20} className={item.active ? "text-orange-600" : "text-gray-400"} />
            <span>{item.label}</span>
            {item.label === "Messages" && (
              <span className="ml-auto bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">4</span>
            )}
          </a>
        ))}
      </nav>

      <div className="p-6">
        <div className="p-4 bg-orange-50 rounded-2xl flex flex-col items-center text-center">
           <div className="w-12 h-12 bg-white rounded-xl shadow-sm mb-3 flex items-center justify-center">
             <LayoutDashboard className="text-orange-500" size={24} />
           </div>
           <h3 className="font-semibold text-gray-800 text-sm mb-1">Download Mobile App</h3>
           <p className="text-xs text-gray-500 mb-3">Install our app to manage easily.</p>
           <button className="bg-orange-500 text-white text-xs font-medium px-4 py-2 rounded-lg shadow-sm shadow-orange-200 w-full hover:bg-orange-600 transition-colors">
              Install
           </button>
        </div>
      </div>
    </aside>
  );
}
