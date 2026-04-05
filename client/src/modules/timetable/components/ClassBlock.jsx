import { useState } from "react";
import { Link } from "react-router-dom";
import { Users, MapPin, ExternalLink, ClipboardList } from "lucide-react";

export default function ClassBlock({ classData }) {
  // Use React state to handle the structural styling
  const [isAttendanceTaken] = useState(classData.attendanceTaken || false);

  const getThemeClasses = () => {
     if (isAttendanceTaken) return "bg-green-100 border-green-400";
     return "bg-red-100 border-red-400";
  }

  const getSidebarColor = () => {
     if (isAttendanceTaken) return "bg-green-500";
     return "bg-red-500";
  }

  const getBadgeColor = () => {
     if (isAttendanceTaken) return "text-green-600";
     return "text-red-600";
  }

  return (
    <div className={`border rounded-lg p-3 flex flex-col flex-1 hover:shadow-sm hover:-translate-y-[1px] shadow-sm shadow-gray-200/50 transition-all duration-200 group relative overflow-hidden ${getThemeClasses()}`}>
      <div className={`absolute top-0 left-0 bottom-0 w-1 ${getSidebarColor()}`}></div>   
      <div className="flex justify-between items-start mb-3">
         <div className={`bg-white px-2 py-1 rounded font-bold text-[10px] shadow-sm uppercase tracking-wider ${getBadgeColor()}`}>
            {classData.code}
         </div>
      </div>
      <h3 className="font-bold text-gray-800 text-sm leading-tight mb-1">{classData.course}</h3>
      <p className="text-xs text-gray-500 mb-3">{classData.department}</p>
      
      <div className="mt-auto space-y-1.5 mb-4">
         <div className="flex items-center gap-1.5 text-xs text-gray-600 font-medium">
            <MapPin size={14} className="text-gray-400" /> Room {classData.room}
         </div>
      </div>
      
      {/* Quick Action Buttons revealed on hover */}
      <div className="grid grid-cols-2 gap-2 opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-sm p-1.5 rounded-xl border border-gray-100 shadow-sm">
         <Link to={`/classes/${classData.code}`} className="bg-gray-50 border text-center border-gray-200 text-gray-700 text-[10px] uppercase tracking-wide font-bold py-2 rounded-lg flex items-center justify-center gap-1 hover:bg-gray-100 transition-colors">
            <ExternalLink size={12}/> Open
         </Link>
         {/* Future API: Marking attendance here might trigger setIsAttendanceTaken natively */}
         <Link to={`/classes/${classData.code}/attendance`} className="bg-orange-500 text-white text-[10px] uppercase tracking-wide font-bold py-2 text-center rounded-lg flex items-center justify-center gap-1 hover:bg-orange-600 transition-colors shadow-sm shadow-orange-500/30">
            <ClipboardList size={12}/> Attnd
         </Link>
      </div>
    </div>
  );
}
