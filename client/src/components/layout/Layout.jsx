import Sidebar from "./Sidebar";
import Header from "./Header";
import RightPanel from "./RightPanel";
import { Outlet } from "react-router-dom";
import { useState } from "react";

export default function Layout() {
  const [isQuickPanelOpen, setIsQuickPanelOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#F8F9FC] overflow-hidden font-sans md:pl-64">
      <Sidebar isOpen={isMobileSidebarOpen} setIsOpen={setIsMobileSidebarOpen} />

      <div className="flex-1 flex flex-col overflow-hidden w-full min-w-0">
        <Header
          toggleQuickPanel={() => setIsQuickPanelOpen(!isQuickPanelOpen)}
          toggleSidebar={() => setIsMobileSidebarOpen(true)}
        />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-[1400px] mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>

      <RightPanel isOpen={isQuickPanelOpen} onClose={() => setIsQuickPanelOpen(false)} />
    </div>
  );
}
