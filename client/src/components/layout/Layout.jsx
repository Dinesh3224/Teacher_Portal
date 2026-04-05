import Sidebar from "./Sidebar";
import Header from "./Header";
import RightPanel from "./RightPanel";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

export default function Layout() {
  const [isQuickPanelOpen, setIsQuickPanelOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { themeClass } = useTheme();

  return (
    <div className={`h-screen overflow-hidden font-sans ${themeClass}`} style={{ backgroundColor: 'var(--bg-main)' }}>
      {/* Dynamic Grid: panel column only exists when open */}
      <div className={`h-screen grid grid-cols-1 md:grid-cols-[260px_1fr] overflow-hidden transition-all duration-300 ease-in-out ${
        isQuickPanelOpen ? "xl:grid-cols-[260px_1fr_320px]" : "md:grid-cols-[260px_1fr]"
      }`}>

        {/* Sidebar spacer — reserves grid column on md+ */}
        <div className="hidden md:block" aria-hidden="true" />
        <Sidebar isOpen={isMobileSidebarOpen} setIsOpen={setIsMobileSidebarOpen} />

        {/* Center Column: Header + Scrollable Main */}
        <div className="flex flex-col overflow-hidden min-w-0">
          <Header
            toggleQuickPanel={() => setIsQuickPanelOpen(prev => !prev)}
            toggleSidebar={() => setIsMobileSidebarOpen(true)}
            isQuickPanelOpen={isQuickPanelOpen}
          />
          <main className="flex-1 overflow-y-auto p-4 md:p-6" style={{ backgroundColor: 'var(--bg-main)' }}>
            <div className="max-w-[1400px] mx-auto w-full">
              <Outlet />
            </div>
          </main>
        </div>

        {/* Quick Panel spacer — only in grid when panel is open on xl+ */}
        {isQuickPanelOpen && (
          <div className="hidden xl:block" aria-hidden="true" />
        )}
        <RightPanel isOpen={isQuickPanelOpen} onClose={() => setIsQuickPanelOpen(false)} />
      </div>
    </div>
  );
}
