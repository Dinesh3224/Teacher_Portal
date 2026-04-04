import Sidebar from "./Sidebar";
import Header from "./Header";
import RightPanel from "./RightPanel";
import { Outlet } from "react-router-dom";
import { useState } from "react";

export default function Layout() {
  const [isQuickPanelOpen, setIsQuickPanelOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#F8F9FC] overflow-hidden font-sans md:pl-16">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <Header toggleQuickPanel={() => setIsQuickPanelOpen(!isQuickPanelOpen)} />
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
             <Outlet />
          </div>
        </main>
      </div>

      <RightPanel isOpen={isQuickPanelOpen} />
    </div>
  );
}
