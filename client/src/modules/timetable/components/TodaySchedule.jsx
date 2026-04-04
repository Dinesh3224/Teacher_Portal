import { Link } from "react-router-dom";
import { Clock, ExternalLink, ClipboardList } from "lucide-react";
import Card from "../../../components/ui/Card";

export default function TodaySchedule({ todayClasses }) {
  if (!todayClasses || todayClasses.length === 0) {
      return (
         <Card className="h-full flex flex-col justify-center items-center p-8 text-center bg-gray-50/50">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-4">
               <Clock size={32} />
            </div>
            <p className="text-gray-500 font-medium">No classes scheduled for today.</p>
            <p className="text-gray-400 text-sm mt-2">Enjoy your free time!</p>
         </Card>
      );
  }

  return (
     <div className="flex flex-col gap-4">
        {todayClasses.map((cls, idx) => (
           <div key={idx} className="bg-white border border-l-4 border-l-orange-500 border-gray-100 rounded-[16px] p-4 shadow-sm shadow-gray-200/50 hover:shadow hover:-translate-y-[1px] transition-all duration-300 relative overflow-hidden group">
              <div className="flex justify-between items-start mb-2">
                 <div className="flex items-center gap-2 text-[10px] font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full">
                    <Clock size={12} />
                    {cls.startTime} - {cls.endTime}
                 </div>
                 <span className="text-[10px] bg-gray-50 px-2 py-1 rounded text-gray-400 font-bold border border-gray-100 tracking-wider uppercase">Room {cls.room}</span>
              </div>
              <h4 className="font-bold text-gray-800 text-sm">{cls.course}</h4>
              <p className="text-[10px] text-gray-500 mt-0.5">{cls.department}</p>
              
              <div className="flex items-center mt-3 pt-3 border-t border-gray-50 gap-2">
                 <Link to={`/classes/${cls.code}`} className="flex-1 bg-white border border-gray-200 text-gray-600 hover:text-orange-600 hover:bg-orange-50 hover:border-orange-200 text-[10px] uppercase font-bold py-2 rounded-xl flex items-center justify-center gap-1.5 transition-colors">
                    <ExternalLink size={12}/> Open
                 </Link>
                 <Link to={`/classes/${cls.code}/attendance`} className="flex-1 bg-white border border-gray-200 text-gray-600 hover:text-white hover:bg-orange-500 hover:border-orange-500 text-[10px] uppercase font-bold py-2 rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-sm">
                    <ClipboardList size={12}/> Attnd
                 </Link>
              </div>
           </div>
        ))}
     </div>
  );
}
