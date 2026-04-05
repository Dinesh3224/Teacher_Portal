import { Search, Bell, Settings, PanelRight, Menu, ChevronRight, Home, LogOut } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useMessages } from "../../context/MessageContext";
import { useAuth } from "../../context/AuthContext";
import { useState, useRef, useEffect } from "react";

export default function Header({ toggleQuickPanel, toggleSidebar }) {
  const { conversations, unreadCount, markAllRead } = useMessages();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const bellRef = useRef(null);
  const searchRef = useRef(null);

  // Filter recently updated messages for the dropdown
  const recentMessages = conversations
    .filter(c => c.unreadCount > 0)
    .slice(0, 5);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (bellRef.current && !bellRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchQuery("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Breadcrumbs logic
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
    <header className="bg-white border-b border-gray-100 sticky top-0 z-20 shrink-0">
      {/* Top Row */}
      <div className="h-16 flex items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {/* Mobile Sidebar Toggle */}
          <button
            onClick={toggleSidebar}
            className="md:hidden p-2 text-gray-500 hover:text-orange-500 hover:bg-orange-50 rounded-xl transition-colors shrink-0"
          >
            <Menu size={22} />
          </button>

          {/* Global Search */}
          <div ref={searchRef} className="flex-1 max-w-lg relative hidden sm:block">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search courses, announcements, students..."
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 pl-10 pr-4 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all placeholder:text-gray-400"
            />
            {searchQuery && (
              <div className="absolute top-full left-0 mt-1.5 w-full bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden z-30">
                <div className="p-1.5">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-3 pt-2 pb-1.5">Quick Navigation</p>
                  {[
                    { label: "Courses & Classes", path: "/classes" },
                    { label: "Announcements", path: "/announcements" },
                    { label: "Messages", path: "/messages" },
                    { label: "Assignments", path: "/assignments" },
                    { label: "Students", path: "/students" },
                    { label: "Timetable", path: "/timetable" },
                  ]
                    .filter(item => item.label.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map(item => (
                      <button
                        key={item.path}
                        onClick={() => handleSearchNav(item.path)}
                        className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors"
                      >
                        {item.label}
                      </button>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 ml-auto shrink-0">
          {/* Quick Panel Toggle */}
          <button
            onClick={toggleQuickPanel}
            className="hidden sm:flex p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
            title="Toggle Quick Panel"
          >
            <PanelRight size={19} />
          </button>

          {/* Notification Bell */}
          <div ref={bellRef} className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <Bell size={19} />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-orange-500 rounded-full border-2 border-white flex items-center justify-center text-[8px] font-bold text-white">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-100 rounded-2xl shadow-xl z-30 overflow-hidden animate__animated animate__fadeIn animate__faster">
                <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                  <span className="font-bold text-gray-800 text-sm">Notifications</span>
                  {unreadCount > 0 && (
                     <button
                      onClick={() => { markAllRead(); setShowNotifications(false); }}
                      className="text-xs text-orange-500 font-semibold cursor-pointer hover:underline"
                    >
                      Mark all read
                    </button>
                  )}
                </div>
                <div className="max-h-[320px] overflow-y-auto">
                  {recentMessages.length > 0 ? (
                    recentMessages.map((conv) => {
                      const sender = conv.courseName || conv.participants?.find(p => p.role !== "teacher")?.name || "Unknown";
                      return (
                        <button
                          key={conv.id}
                          onClick={() => { navigate("/messages"); setShowNotifications(false); }}
                          className="w-full px-4 py-3 hover:bg-orange-50/50 border-b border-gray-50 cursor-pointer transition-colors text-left flex items-start gap-3"
                        >
                          <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 shrink-0"></div>
                          <div className="min-w-0 flex-1">
                            <div className="flex justify-between items-center mb-0.5">
                              <h5 className="text-sm font-bold text-gray-800 truncate">{sender}</h5>
                              <span className="text-[10px] text-gray-400 shrink-0 ml-2">Now</span>
                            </div>
                            <p className="text-xs text-gray-500 line-clamp-1">{conv.lastMessage}</p>
                          </div>
                        </button>
                      );
                    })
                  ) : (
                    <div className="px-4 py-8 text-center">
                      <Bell size={24} className="text-gray-300 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">No new notifications</p>
                    </div>
                  )}
                </div>
                <div className="px-4 py-2.5 border-t border-gray-100 bg-gray-50/50 text-center">
                  <Link
                    to="/messages"
                    onClick={() => setShowNotifications(false)}
                    className="text-xs font-bold text-orange-600 hover:text-orange-700"
                  >
                    View All Messages
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Settings */}
          <button
            onClick={() => navigate("/settings")}
            className="hidden sm:flex p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
            title="Settings"
          >
            <Settings size={19} />
          </button>

          <div className="h-7 w-px bg-gray-200 hidden sm:block mx-1"></div>

          {/* User Profile */}
          <div className="relative group/avatar cursor-pointer">
            <Link to="/profile" className="flex items-center gap-2.5 pl-1">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-gray-900 leading-tight group-hover/avatar:text-orange-600 transition-colors">
                  {user?.name || "Loading..."}
                </p>
                <p className="text-[11px] text-gray-500">{user?.department || ""}</p>
              </div>
              <img
                src={`https://ui-avatars.com/api/?name=${user?.name || "Teacher"}&background=f97316&color=fff`}
                alt={user?.name || "Profile"}
                className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm"
              />
            </Link>
            
            {/* Hover Header Dropdown */}
            <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-100 rounded-xl shadow-lg opacity-0 invisible group-hover/avatar:opacity-100 group-hover/avatar:visible transition-all z-50 overflow-hidden transform origin-top-right">
              <div className="p-1">
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors cursor-pointer"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumbs Row */}
      {pathnames.length > 0 && (
        <div className="px-4 md:px-6 pb-2.5 pt-0.5">
          <nav className="flex items-center gap-1 text-sm text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg w-fit border border-gray-100">
            <Link to="/dashboard" className="hover:text-orange-600 transition-colors flex items-center">
              <Home size={14} />
            </Link>
            {pathnames.map((value, index) => {
              const last = index === pathnames.length - 1;
              const to = `/${pathnames.slice(0, index + 1).join("/")}`;
              return (
                <div key={to} className="flex items-center">
                  <ChevronRight size={14} className="mx-0.5 text-gray-300" />
                  {last ? (
                    <span className="text-gray-800 font-semibold text-xs">{formatText(value)}</span>
                  ) : (
                    <Link to={to} className="hover:text-orange-600 transition-colors text-xs font-medium">
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
