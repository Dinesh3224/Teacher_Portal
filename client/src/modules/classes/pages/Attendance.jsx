import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { mockClasses } from "../data/mockClasses";
import { ArrowLeft, Save, Calendar as CalIcon } from "lucide-react";

export default function Attendance() {
  const { classId } = useParams();
  const classData = mockClasses.find(c => c.id === classId);

  // Local state to track today's attendance dummy data
  const [attendanceState, setAttendanceState] = useState(
     classData?.students.reduce((acc, student) => {
        acc[student.id] = true; // default present
        return acc;
     }, {}) || {}
  );

  if (!classData) return <div>Class not found</div>;

  const toggleStatus = (studentId) => {
     setAttendanceState(prev => ({
        ...prev,
        [studentId]: !prev[studentId]
     }));
  };

  const handleSave = () => {
     // TODO: Send attendanceState payload to backend API
     console.log("Saving attendance:", attendanceState);
     alert("Attendance saved successfully! (Check console for payload)");
  };

  const handleViewHistory = () => {
     alert("View attendance history placeholder");
  }

  const presentCount = Object.values(attendanceState).filter(Boolean).length;
  const todayDate = new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

  return (
    <div className="space-y-6 animate__animated animate__fadeIn">
       <div className="flex items-center justify-between">
         <div className="flex items-center gap-4">
            <Link to={`/classes/${classId}`} className="p-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-500 transition-colors">
               <ArrowLeft size={20} />
            </Link>
            <div>
               <h1 className="text-2xl font-bold text-gray-800">Take Attendance</h1>
               <p className="text-gray-500 mt-1 flex items-center gap-2"><CalIcon size={14}/> Today: {todayDate} • {classData.id}</p>
            </div>
         </div>
         <div className="flex items-center gap-3">
             <button onClick={handleViewHistory} className="bg-white text-gray-700 border border-gray-200 px-4 py-2 rounded-xl font-semibold shadow-sm hover:bg-gray-50 transition-colors text-sm">
               View History
            </button>
            <button onClick={handleSave} className="bg-orange-500 text-white px-5 py-2 rounded-xl font-semibold shadow-sm hover:bg-orange-600 transition-colors flex items-center gap-2 text-sm">
               <Save size={18}/> Save Data
            </button>
         </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
         <div className="bg-gray-50 p-4 border-b border-gray-100 flex justify-between items-center">
            <span className="font-bold text-gray-700">Total Present: <span className="text-green-600">{presentCount}</span> / {classData.students.length}</span>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
            <thead>
               <tr className="bg-white text-gray-500 text-xs uppercase tracking-wider font-semibold border-b border-gray-100">
                  <th className="p-4 pl-6">Student Info</th>
                  <th className="p-4">Roll Number</th>
                  <th className="p-4 pr-6 text-right w-40">Status</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
               {classData.students.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => toggleStatus(student.id)}>
                     <td className="p-4 pl-6">
                        <div className="flex items-center space-x-3">
                           <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                             {student.name.charAt(0)}
                           </div>
                           <div>
                              <p className="font-bold text-gray-800 text-sm">{student.name}</p>
                              <p className="text-xs text-gray-500">{student.email}</p>
                           </div>
                        </div>
                     </td>
                     <td className="p-4 text-sm font-medium text-gray-600">{student.id}</td>
                     <td className="p-4 pr-6 text-right">
                        <button 
                           className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${attendanceState[student.id] ? 'bg-green-100 text-green-700 border-green-200 shadow-sm shadow-green-100' : 'bg-red-50 text-red-500 border-red-100'}`}
                           onClick={(e) => { e.stopPropagation(); toggleStatus(student.id); }}
                        >
                           {attendanceState[student.id] ? "Present" : "Absent"}
                        </button>
                     </td>
                  </tr>
               ))}
            </tbody>
            </table>
         </div>
      </div>
    </div>
  );
}
