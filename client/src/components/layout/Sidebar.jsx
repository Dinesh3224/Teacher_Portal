import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, Calendar, BookOpen, Clock, UsersRound, Library, Megaphone, MessageSquare, Settings, LogOut } from "lucide-react";
import { useMessages } from "../../context/MessageContext";
import { useAuth } from "../../context/AuthContext";
import logoImg from "../../assets/images/logo.jpg";

export default function Sidebar({ isOpen, setIsOpen }) {
  const location = useLocation();
  const currentPath = location.pathname;
  const { unreadCount } = useMessages();
  const { logout } = useAuth();

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

  const handleNavClick = () => {
    if (isOpen) setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Panel */}
      <aside className={`fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-100 flex flex-col z-50 shadow-sm transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      }`}>
        {/* Logo Branding */}
        <Link 
          to="/dashboard" 
          onClick={handleNavClick} 
          className="flex items-center justify-center px-6 py-4 border-b border-gray-100 shrink-0 hover:bg-gray-50 transition-colors"
        >
          <img src={logoImg} alt="S-VYASA Logo" className="h-12 w-auto object-contain rounded-md" />
        </Link>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto no-scrollbar space-y-1">
          {menuItems.map((item, idx) => {
            const isActive = item.path === "/dashboard" 
              ? currentPath === "/dashboard" 
              : currentPath.startsWith(item.path);
            return (
              <Link
                key={idx}
                to={item.path}
                onClick={handleNavClick}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-orange-50 text-orange-600 font-bold shadow-sm"
                    : "text-gray-600 hover:bg-orange-50/50 hover:text-gray-900 font-medium"
                }`}
              >
                <item.icon size={20} className={`shrink-0 ${isActive ? "text-orange-500" : "text-gray-400"}`} />
                <span className="text-sm">{item.label}</span>
                {item.label === "Messages" && unreadCount > 0 && (
                  <span className="ml-auto bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Logout Area */}
        <div className="p-3 border-t border-gray-100 shrink-0">
          <button
            onClick={() => logout()} /* Using standard logout that modifies AuthContext locally forcing re-render catching routing fallbacks */
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-red-500 hover:bg-red-50 hover:text-red-700 font-semibold transition-all duration-200 group"
          >
            <LogOut size={20} className="shrink-0 transition-transform group-hover:-translate-x-1" />
            <span className="text-sm">Log out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
