import { Search, Bell, Settings, PanelRight } from "lucide-react";

export default function Header({ toggleQuickPanel }) {
  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="flex-1 max-w-xl relative hidden md:block">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input 
          type="text" 
          placeholder="Search for courses, students, announcements..." 
          className="w-full bg-gray-50 border border-gray-100 rounded-full py-2.5 pl-12 pr-4 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
        />
      </div>

      <div className="flex items-center space-x-6 ml-auto">
        <div className="flex items-center space-x-4 text-gray-500 hidden sm:flex">
          <button onClick={toggleQuickPanel} className="hover:text-gray-900 transition-colors"><PanelRight size={20} /></button>
          <div className="relative group/bell">
            <button className="relative hover:text-gray-900 transition-colors">
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-orange-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-100 rounded-2xl shadow-xl opacity-0 invisible group-hover/bell:opacity-100 group-hover/bell:visible transition-all z-20 py-2">
               <div className="px-4 py-2 border-b border-gray-50 flex items-center justify-between">
                  <span className="font-bold text-gray-800 text-sm">Notifications</span>
                  <span className="text-xs text-orange-500 font-medium cursor-pointer">Mark all read</span>
               </div>
               <div className="max-h-[300px] overflow-y-auto w-full text-left">
                  {/* FUTURE: Messages will later have priority weight over regular notifications */}
                  <div className="px-4 py-3 hover:bg-gray-50 border-b border-gray-50 cursor-pointer transition-colors block w-full text-left">
                     <h5 className="text-sm font-bold text-gray-800">Assignment deadline tomorrow</h5>
                     <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">Data Structures - Array Operations</p>
                     <p className="text-[10px] text-gray-400 mt-1">1 hour ago</p>
                  </div>
                  <div className="px-4 py-3 hover:bg-gray-50 border-b border-gray-50 cursor-pointer transition-colors block w-full text-left">
                     <h5 className="text-sm font-bold text-gray-800">New announcement posted</h5>
                     <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">Faculty meeting tomorrow at 4 PM.</p>
                     <p className="text-[10px] text-gray-400 mt-1">3 hours ago</p>
                  </div>
                  <div className="px-4 py-3 hover:bg-gray-50 border-b border-gray-50 cursor-pointer transition-colors block w-full text-left">
                     <h5 className="text-sm font-bold text-gray-800">Attendance reminder</h5>
                     <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">Please submit CS301 attendance.</p>
                     <p className="text-[10px] text-gray-400 mt-1">Yesterday</p>
                  </div>
                  <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors block w-full text-left">
                     <h5 className="text-sm font-bold text-gray-800">System maintenance</h5>
                     <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">Portal will be down on Sunday.</p>
                     <p className="text-[10px] text-gray-400 mt-1">2 days ago</p>
                  </div>
               </div>
            </div>
          </div>
          <button className="hover:text-gray-900 transition-colors"><Settings size={20} /></button>
        </div>
        
        <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>

        <div className="flex items-center space-x-3 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-gray-900 leading-tight group-hover:text-orange-600 transition-colors">Professor John</p>
            <p className="text-xs text-gray-500">Computer Science</p>
          </div>
          <img 
            src="https://ui-avatars.com/api/?name=Professor+John&background=f97316&color=fff" 
            alt="Professor John" 
            className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
          />
        </div>
      </div>
    </header>
  );
}
