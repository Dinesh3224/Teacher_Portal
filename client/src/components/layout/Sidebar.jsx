import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, Calendar, BookOpen, Clock, UsersRound, Library, Megaphone, Settings, LogOut, Wallet, Quote } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import logoImg from "../../assets/images/logo.jpg";

export default function Sidebar({ isOpen, setIsOpen }) {
  const location = useLocation();
  const currentPath = location.pathname;
  const { logout } = useAuth();

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: UsersRound, label: "My Classes", path: "/classes" },
    { icon: Calendar, label: "Timetable", path: "/timetable" },
    { icon: BookOpen, label: "Assignments", path: "/assignments" },
    { icon: Clock, label: "Attendance", path: "/attendance" },
    { icon: Users, label: "Students", path: "/students" },
    { icon: Library, label: "Course Materials", path: "/materials" },
    { icon: Wallet, label: "Payroll", path: "/payroll" },
    { icon: Quote, label: "Research Blog", path: "/blog" },
    { icon: Megaphone, label: "Announcements", path: "/announcements" },
    { icon: Settings, label: "Settings", path: "/settings" }
  ];

  const handleNavClick = () => {
    if (isOpen) setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-[260px] border-r flex flex-col z-50 shadow-sm transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
        style={{ backgroundColor: 'var(--sidebar-bg, var(--bg-card))', borderColor: 'var(--border-color)' }}
      >
        {/* Logo — height matches navbar h-16 */}
        <Link
          to="/dashboard"
          onClick={handleNavClick}
          className="flex items-center justify-center h-16 px-6 border-b shrink-0 transition-colors"
          style={{ borderColor: 'var(--border-color)' }}
        >
          <img src={logoImg} alt="S-VYASA Logo" className="max-h-10 w-auto object-contain rounded-md" />
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
                    : "font-medium hover:bg-orange-50/50"
                }`}
                style={!isActive ? { color: 'var(--text-secondary)' } : undefined}
              >
                <item.icon size={20} className={`shrink-0 ${isActive ? "text-orange-500" : ""}`} style={!isActive ? { color: 'var(--text-muted)' } : undefined} />
                <span className="text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t shrink-0" style={{ borderColor: 'var(--border-color)' }}>
          <button
            onClick={() => logout()}
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
