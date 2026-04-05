import { Link } from 'react-router-dom';
import { useAttendance } from '../../context/AttendanceContext';
import { Users, CheckCircle, Clock, BarChart3, Plus, Eye } from 'lucide-react';
import AttendanceCard from '../../modules/attendance/AttendanceCard';

export default function AttendanceDashboard() {
  const { todayClasses, attendanceLogs } = useAttendance();

  // Mock calculation out of pure context data
  const attendanceTakenCount = attendanceLogs.filter(log => log.date === new Date().toISOString().split('T')[0]).length;
  const pendingCount = todayClasses.length - attendanceTakenCount;
  
  // Fake calculation for Average Attendance Rate
  const avgRate = "85%"; 

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate__animated animate__fadeIn pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h1 className="text-2xl font-bold text-gray-900">Attendance Dashboard</h1>
           <p className="text-gray-500 text-sm mt-1">Manage and track student attendance effectively.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link 
            to="/attendance/history"
            className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50 transition-all w-fit"
          >
            History
          </Link>
          <Link 
            to="/attendance/mark"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-600 text-white text-sm font-medium rounded-xl hover:bg-orange-700 hover:shadow-lg hover:-translate-y-0.5 transition-all w-fit"
          >
            <Plus size={18} />
            Mark Attendance
          </Link>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
         <AttendanceCard icon={Clock} title="Today's Classes" value={todayClasses.length} color="blue" />
         <AttendanceCard icon={CheckCircle} title="Attendance Taken" value={attendanceTakenCount} color="green" />
         <AttendanceCard icon={Users} title="Pending Attendance" value={pendingCount} color="orange" />
         <AttendanceCard icon={BarChart3} title="Average Rate" value={avgRate} color="purple" />
      </div>

      {/* Today's Schedule Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mt-8">
         <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-bold text-gray-900 text-lg">Today's Scheduled Classes</h2>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
               <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 font-medium">
                  <tr>
                     <th className="px-6 py-4">Course</th>
                     <th className="px-6 py-4">Section</th>
                     <th className="px-6 py-4">Time</th>
                     <th className="px-6 py-4">Room</th>
                     <th className="px-6 py-4">Status</th>
                     <th className="px-6 py-4 text-right">Action</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-100">
                  {todayClasses.map((cls) => {
                     const isTaken = attendanceLogs.some(log => log.course === cls.course && log.section === cls.section && log.hour === cls.time);
                     return (
                        <tr key={cls.id} className="hover:bg-gray-50/50 transition-colors">
                           <td className="px-6 py-4 font-bold text-gray-900">{cls.course}</td>
                           <td className="px-6 py-4 text-gray-700 font-medium">{cls.section}</td>
                           <td className="px-6 py-4 text-gray-600">{cls.time}</td>
                           <td className="px-6 py-4 text-gray-600">{cls.room}</td>
                           <td className="px-6 py-4">
                              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${isTaken ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
                                 {isTaken ? 'Completed' : 'Pending'}
                              </span>
                           </td>
                           <td className="px-6 py-4 text-right">
                              {isTaken ? (
                                <Link to="/attendance/history" className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
                                  <Eye size={16} /> View
                                </Link>
                              ) : (
                                <Link to="/attendance/mark" className="inline-flex items-center gap-1 text-sm font-medium text-orange-600 hover:text-orange-800 transition-colors">
                                  <Plus size={16} /> Mark
                                </Link>
                              )}
                           </td>
                        </tr>
                     )
                  })}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
}
