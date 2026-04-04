import { useParams, Link } from 'react-router-dom';
import { useStudents } from '../../context/StudentContext';
import { ArrowLeft, Clock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

export default function StudentAttendance() {
  const { id } = useParams();
  const { getStudentById, getAttendanceById } = useStudents();
  
  const student = getStudentById(id);
  const attendanceHistory = getAttendanceById(id);

  if (!student) return <div className="p-12 text-center text-gray-500">Student not found.</div>;

  const totalClasses = attendanceHistory.length;
  const classesAttended = attendanceHistory.filter(a => a.status === 'Present' || a.status === 'Late').length;
  const classesMissed = attendanceHistory.filter(a => a.status === 'Absent').length;
  const calculatedPercentage = totalClasses > 0 ? Math.round((classesAttended / totalClasses) * 100) : 0;
  
  const isRisk = calculatedPercentage < 75;

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate__animated animate__fadeIn pb-12">
      <div className="flex items-center gap-4">
        <Link to={`/students/${id}`} className="p-2 text-gray-400 hover:text-gray-900 bg-white rounded-xl border border-gray-100 shadow-sm transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Attendance Profile</h1>
          <p className="text-gray-500 text-sm mt-1">{student.name} • {student.rollNumber}</p>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 group hover:border-gray-300 transition-colors">
            <p className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-2"><Clock size={16} /> Total Configured</p>
            <p className="text-2xl font-black text-gray-900">{totalClasses}</p>
         </div>
         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 group hover:border-green-300 transition-colors">
            <p className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> Present / Late</p>
            <p className="text-2xl font-black text-green-600">{classesAttended}</p>
         </div>
         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 group hover:border-red-300 transition-colors">
            <p className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-2"><XCircle size={16} className="text-red-500" /> Classes Missed</p>
            <p className="text-2xl font-black text-red-600">{classesMissed}</p>
         </div>
         <div className={`rounded-2xl border p-5 ${isRisk ? 'bg-red-50 border-red-200' : 'bg-white border-gray-100 shadow-sm hover:border-blue-300'} transition-colors`}>
            <p className={`text-sm font-medium mb-1 flex items-center gap-2 ${isRisk ? 'text-red-700' : 'text-gray-500'}`}>
              {isRisk && <AlertTriangle size={16} />}
              Aggregate Ratio
            </p>
            <p className={`text-2xl font-black ${isRisk ? 'text-red-700' : 'text-blue-600'}`}>{calculatedPercentage}%</p>
         </div>
      </div>

      {/* History Grid */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mt-8">
         <div className="p-6 border-b border-gray-100">
            <h2 className="font-bold text-gray-900 text-lg">Individual Roll Call Logs</h2>
         </div>
         <div className="overflow-x-auto">
            {attendanceHistory.length === 0 ? (
               <div className="p-12 text-center text-gray-500 text-sm">No historical attendance data saved.</div>
            ) : (
              <table className="w-full text-left text-sm whitespace-nowrap">
                 <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 font-medium">
                    <tr>
                       <th className="px-6 py-4">Logged Date</th>
                       <th className="px-6 py-4">Course Slot</th>
                       <th className="px-6 py-4 text-right">Captured Status</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-100">
                    {attendanceHistory.map((log, i) => (
                       <tr key={i} className={`hover:bg-gray-50 transition-colors ${log.status === 'Absent' ? 'bg-red-50/10' : ''}`}>
                          <td className="px-6 py-4 font-mono text-gray-600">{log.date}</td>
                          <td className="px-6 py-4 font-bold text-gray-900">{log.course}</td>
                          <td className="px-6 py-4 text-right">
                             <span className={`inline-flex px-2 py-1 rounded text-xs font-bold 
                                ${log.status === 'Present' ? 'bg-green-100 text-green-800' : 
                                  log.status === 'Absent' ? 'bg-red-100 text-red-800' : 
                                  'bg-yellow-100 text-yellow-800'}`}>
                                {log.status}
                             </span>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
            )}
         </div>
      </div>
    </div>
  );
}
