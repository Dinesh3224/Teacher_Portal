import { Search, Bell, Settings, PanelRight, Menu, ChevronRight, Home, LogOut } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState, useRef, useEffect } from "react";

export default function Header({ toggleQuickPanel, toggleSidebar, isQuickPanelOpen }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const bellRef = useRef(null);
  const searchRef = useRef(null);

  // Static notification items (announcements-based, no message dependency)
  const notifications = [
    { id: 1, title: "Mid-Semester Exam Schedule published", time: "2 hrs ago" },
    { id: 2, title: "Faculty meeting rescheduled to Friday", time: "5 hrs ago" },
  ];

  useEffect(() => {
    const handler = (e) => {
      if (bellRef.current && !bellRef.current.contains(e.target)) setShowNotifications(false);
      if (searchRef.current && !searchRef.current.contains(e.target)) setSearchQuery("");
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const pathnames = location.pathname.split("/").filter((x) => x);
  const formatText = (text) => {
    if (text.length > 20) return "Details";
    return text.charAt(0).toUpperCase() + text.slice(1).replace(/-/g, " ");
  };

  const handleSearchNav = (path) => {
    navigate(path);
    setSearchQuery("");
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header
      className="sticky top-0 z-20 shrink-0 border-b"
      style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
    >
      {/* Main Header Row */}
      <div className="flex items-center gap-3 px-4 md:px-6 h-16">

        {/* Mobile Sidebar Toggle */}
        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 rounded-xl transition-colors shrink-0"
          style={{ color: 'var(--text-secondary)' }}
        >
          <Menu size={22} />
        </button>

        {/* Breadcrumbs — FIRST */}
        {pathnames.length > 0 && (
          <nav
            className="hidden sm:flex items-center gap-1 text-xs px-3 py-1.5 rounded-full border shrink-0 max-w-[300px] overflow-hidden whitespace-nowrap shadow-sm"
            style={{ backgroundColor: 'var(--bg-input)', borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
          >
            <Link to="/dashboard" className="hover:text-orange-600 transition-colors flex items-center shrink-0">
              <Home size={14} />
            </Link>
            {pathnames.map((value, index) => {
              const last = index === pathnames.length - 1;
              const to = `/${pathnames.slice(0, index + 1).join("/")}`;
              return (
                <div key={to} className="flex items-center shrink-0">
                  <ChevronRight size={14} className="mx-1 opacity-40" />
                  {last ? (
                    <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{formatText(value)}</span>
                  ) : (
                    <Link to={to} className="hover:text-orange-600 transition-colors font-medium">
                      {formatText(value)}
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>
        )}

        {/* Search Bar — SECOND, fills remaining space */}
        <div ref={searchRef} className="relative flex-1 min-w-0 max-w-2xl">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" size={16} style={{ color: 'var(--text-muted)' }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search resources..."
            className="w-full rounded-xl py-2 pl-10 pr-4 text-sm border focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all"
            style={{ backgroundColor: 'var(--bg-input)', borderColor: 'var(--border-strong)', color: 'var(--text-primary)' }}
          />
          {searchQuery && (
            <div
              className="absolute top-full left-0 mt-1.5 w-full rounded-xl shadow-xl overflow-hidden z-30 border"
              style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
            >
              <div className="p-1.5 flex flex-col">
                <p className="text-[10px] font-bold uppercase tracking-wider px-3 pt-2 pb-1.5" style={{ color: 'var(--text-muted)' }}>Go to...</p>
                {[
                  { label: "Dashboard", path: "/dashboard" },
                  { label: "Courses & Classes", path: "/classes" },
                  { label: "Payroll", path: "/payroll" },
                  { label: "Research Blog", path: "/blog" },
                  { label: "Announcements", path: "/announcements" },
                  { label: "Settings", path: "/settings" }
                ]
                  .filter(item => item.label.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map(item => (
                    <button
                      key={item.path}
                      onClick={() => handleSearchNav(item.path)}
                      className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-colors"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {item.label}
                    </button>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* Spacer */}
        <div className="w-2 hidden xl:block shrink-0"></div>

        {/* RIGHT SECTION: Action Icons */}
        <div className="flex items-center gap-1.5 lg:gap-2 shrink-0">
          {/* Quick Panel Toggle */}
          <button
            onClick={toggleQuickPanel}
            className={`hidden sm:flex p-2 rounded-xl transition-colors ${isQuickPanelOpen ? 'bg-orange-100 text-orange-600' : 'hover:bg-orange-50'}`}
            style={!isQuickPanelOpen ? { color: 'var(--text-secondary)' } : undefined}
            title={isQuickPanelOpen ? "Close Panel" : "Open Panel"}
          >
            <PanelRight size={19} />
          </button>

          {/* Notification Bell */}
          <div ref={bellRef} className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-xl transition-colors hover:bg-orange-50"
              style={{ color: 'var(--text-secondary)' }}
            >
              <Bell size={19} />
              {notifications.length > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-orange-500 rounded-full border-2 flex items-center justify-center text-[8px] font-bold text-white"
                  style={{ borderColor: 'var(--bg-card)' }}
                >
                  {notifications.length}
                </span>
              )}
            </button>

            {showNotifications && (
              <div
                className="absolute right-0 mt-2 w-80 rounded-2xl shadow-xl z-30 overflow-hidden border animate__animated animate__fadeIn"
                style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
              >
                <div className="px-4 py-3 border-b flex items-center justify-between" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-input)' }}>
                  <span className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>Notifications</span>
                </div>
                <div className="max-h-[320px] overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className="px-4 py-3 border-b transition-colors text-left flex items-start gap-3 hover:bg-orange-50/50 cursor-pointer"
                      style={{ borderColor: 'var(--border-color)' }}
                      onClick={() => { navigate("/announcements"); setShowNotifications(false); }}
                    >
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 shrink-0"></div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{n.title}</p>
                        <p className="text-[10px] mt-0.5" style={{ color: 'var(--text-muted)' }}>{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2.5 border-t text-center" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-input)' }}>
                  <Link
                    to="/announcements"
                    onClick={() => setShowNotifications(false)}
                    className="text-xs font-bold text-orange-600 hover:text-orange-700"
                  >
                    View All Announcements
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Settings */}
          <button
            onClick={() => navigate("/settings")}
            className="hidden sm:flex p-2 rounded-xl transition-colors hover:bg-orange-50"
            style={{ color: 'var(--text-secondary)' }}
          >
            <Settings size={19} />
          </button>

          <div className="h-7 w-px hidden sm:block mx-1" style={{ backgroundColor: 'var(--border-strong)' }}></div>

          {/* User Profile */}
          <div className="relative group/avatar cursor-pointer shrink-0">
            <Link to="/profile" className="flex items-center gap-2.5 pl-1">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold leading-tight group-hover/avatar:text-orange-600 transition-colors" style={{ color: 'var(--text-primary)' }}>
                  {user?.name || "Loading..."}
                </p>
                <p className="text-[11px]" style={{ color: 'var(--text-secondary)' }}>{user?.department || ""}</p>
              </div>
              <img
                src={`https://ui-avatars.com/api/?name=${user?.name || "Teacher"}&background=f97316&color=fff`}
                alt={user?.name || "Profile"}
                className="w-9 h-9 rounded-full object-cover border-2 shadow-sm"
                style={{ borderColor: 'var(--bg-card)' }}
              />
            </Link>

            <div
              className="absolute right-0 top-full mt-2 w-48 rounded-xl shadow-lg opacity-0 invisible group-hover/avatar:opacity-100 group-hover/avatar:visible transition-all z-50 overflow-hidden border"
              style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
            >
              <div className="p-1">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-3 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors cursor-pointer"
                >
                  <LogOut size={16} strokeWidth={2.5} /> Log out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Breadcrumbs */}
      {pathnames.length > 0 && (
        <div className="flex sm:hidden px-4 pb-2 pt-1 border-t overflow-x-auto" style={{ borderColor: 'var(--border-color)' }}>
          <nav className="flex items-center gap-1 text-[11px] w-full" style={{ color: 'var(--text-secondary)' }}>
            <Link to="/dashboard" className="hover:text-orange-600 transition-colors shrink-0">
              <Home size={12} />
            </Link>
            {pathnames.map((value, index) => {
              const last = index === pathnames.length - 1;
              const to = `/${pathnames.slice(0, index + 1).join("/")}`;
              return (
                <div key={to} className="flex items-center shrink-0">
                  <ChevronRight size={12} className="mx-1 opacity-40" />
                  {last ? (
                    <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{formatText(value)}</span>
                  ) : (
                    <Link to={to} className="hover:text-orange-600 font-medium">
                      {formatText(value)}
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
