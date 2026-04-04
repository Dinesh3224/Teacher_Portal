import { ChevronLeft, ChevronRight } from "lucide-react";

export default function RightPanel({ isOpen }) {
  return (
    <aside className={`bg-white border-l border-gray-100 flex flex-col overflow-y-auto transition-all duration-300 ease-in-out ${isOpen ? 'w-80 opacity-100' : 'w-0 opacity-0 overflow-hidden border-l-0'}`}>
      <div className="p-6 w-80">
        <h3 className="font-bold text-gray-800 mb-6 flex items-center justify-between">
          <span>September 17</span>
          <span className="text-gray-400 font-medium">Sunday</span>
          <div className="flex space-x-2 text-gray-400">
             <ChevronLeft size={16} className="cursor-pointer hover:text-gray-800" />
             <ChevronRight size={16} className="cursor-pointer hover:text-gray-800" />
          </div>
        </h3>
        
        {/* Placeholder Calendar Grid */}
        <div className="grid grid-cols-7 gap-2 mb-8 text-center text-xs">
          <div className="font-medium text-orange-400 mb-2">S</div>
          <div className="font-medium text-gray-400 mb-2">M</div>
          <div className="font-medium text-gray-400 mb-2">T</div>
          <div className="font-medium text-gray-400 mb-2">W</div>
          <div className="font-medium text-gray-400 mb-2">T</div>
          <div className="font-medium text-gray-400 mb-2">F</div>
          <div className="font-medium text-orange-400 mb-2">S</div>
          
          <div className="text-gray-300"></div><div className="text-gray-300"></div><div className="text-gray-300"></div><div className="text-gray-300"></div>
          <div className="text-gray-800">1</div><div className="text-gray-800">2</div><div className="text-gray-800">3</div>
          <div className="text-gray-800">4</div><div className="text-gray-800">5</div><div className="text-gray-800">6</div>
          <div className="text-gray-800">7</div><div className="text-gray-800">8</div><div className="text-gray-800">9</div>
          <div className="text-gray-800">10</div><div className="text-gray-800">11</div><div className="text-gray-800">12</div>
          <div className="text-gray-800">13</div><div className="text-gray-800">14</div><div className="text-gray-800">15</div>
          <div className="text-gray-800">16</div>
          <div className="bg-orange-500 text-white rounded-full font-bold flex items-center justify-center w-6 h-6 mx-auto shadow-sm shadow-orange-300">17</div>
          <div className="text-gray-800 relative">18<div className="w-1 h-1 bg-orange-500 rounded-full absolute bottom-[-4px] left-1/2 -translate-x-1/2"></div></div>
          <div className="text-gray-800">19</div><div className="text-gray-800">20</div><div className="text-gray-800">21</div><div className="text-gray-800">22</div><div className="text-gray-800">23</div>
        </div>

        <h4 className="text-sm font-bold text-gray-800 mb-4">Today's Schedule</h4>
        <div className="space-y-4">
           {/* Schedule Item Placeholder */}
           <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl relative overflow-hidden">
               <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500 rounded-l-xl"></div>
               <p className="text-xs text-orange-500 font-medium mb-1">09:00 AM - 10:30 AM</p>
               <h5 className="text-sm font-bold text-gray-800">Advanced Algorithms</h5>
               <p className="text-xs text-gray-500 mt-1">Room 304 • CS Dept</p>
               <div className="flex -space-x-2 mt-3">
                  <img src="https://ui-avatars.com/api/?name=A&background=random" className="w-6 h-6 rounded-full border border-white" />
                  <img src="https://ui-avatars.com/api/?name=B&background=random" className="w-6 h-6 rounded-full border border-white" />
                  <img src="https://ui-avatars.com/api/?name=C&background=random" className="w-6 h-6 rounded-full border border-white" />
                  <div className="w-6 h-6 rounded-full bg-gray-200 border border-white flex items-center justify-center text-[10px] font-medium text-gray-600">+35</div>
               </div>
           </div>

           <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl relative overflow-hidden">
               <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-l-xl"></div>
               <p className="text-xs text-blue-500 font-medium mb-1">11:00 AM - 12:30 PM</p>
               <h5 className="text-sm font-bold text-gray-800">Data Structures</h5>
               <p className="text-xs text-gray-500 mt-1">Lab B • CS Dept</p>
           </div>
        </div>
      </div>
    </aside>
  );
}
