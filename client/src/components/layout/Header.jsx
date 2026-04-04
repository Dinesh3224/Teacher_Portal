import { Search, Bell, Settings, CircleHelp } from "lucide-react";

export default function Header() {
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
          <button className="hover:text-gray-900 transition-colors"><CircleHelp size={20} /></button>
          <button className="relative hover:text-gray-900 transition-colors">
            <Bell size={20} />
            <span className="absolute 0 right-0 w-2 h-2 bg-orange-500 rounded-full border-2 border-white"></span>
          </button>
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
