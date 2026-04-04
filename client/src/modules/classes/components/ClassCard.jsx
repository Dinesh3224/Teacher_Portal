import { Link } from "react-router-dom";
import { Users, Clock, ClipboardList, BookOpen } from "lucide-react";
import Card from "../../../components/ui/Card";

export default function ClassCard({ classData }) {
  return (
    <Card className="flex flex-col h-full border border-gray-100 hover:border-orange-200 transition-colors">
      <div className="flex justify-between items-start mb-4">
         <div>
            <span className="text-xs font-bold text-orange-500 bg-orange-50 px-2 py-1 rounded-md">{classData.id}</span>
            <h3 className="text-xl font-bold text-gray-800 mt-2 line-clamp-1" title={classData.name}>{classData.name}</h3>
            <p className="text-sm text-gray-500">{classData.department}</p>
         </div>
         <div className="bg-blue-50 w-10 h-10 rounded-full flex items-center justify-center text-blue-600 font-bold border border-blue-100">
            {classData.name.substring(0,2).toUpperCase()}
         </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-6 flex-1">
         <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Users size={16} className="text-gray-400" />
            <span>{classData.studentsCount} Students</span>
         </div>
         <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Clock size={16} className="text-gray-400" />
            <span className="line-clamp-1">{classData.nextClass}</span>
         </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-auto">
         <Link to={`/classes/${classData.id}`} className="bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-semibold py-2 px-3 rounded-lg text-center transition-colors flex items-center justify-center gap-1 border border-transparent hover:border-gray-200">
            <BookOpen size={16}/> View Class
         </Link>
         <Link to={`/classes/${classData.id}/attendance`} className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold py-2 px-3 rounded-lg text-center transition-colors shadow-sm shadow-orange-500/30 flex items-center justify-center gap-1">
            <ClipboardList size={16}/> Attendance
         </Link>
      </div>
    </Card>
  );
}
