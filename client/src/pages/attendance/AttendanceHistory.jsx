import { useState } from 'react';
import { useAttendance } from '../../context/AttendanceContext';
import { Search, Filter, Eye, X } from 'lucide-react';

export default function AttendanceHistory() {
  const { attendanceLogs, students } = useAttendance();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLog, setSelectedLog] = useState(null);

  const filteredLogs = attendanceLogs.filter(log => 
    log.course.toLowerCase().includes(searchTerm.toLowerCase()) || 
    log.date.includes(searchTerm)
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate__animated animate__fadeIn pb-12">
       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h1 className="text-2xl font-bold text-gray-900">Attendance History</h1>
           <p className="text-gray-500 text-sm mt-1">Review past logs and verify submissions.</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:max-w-xs group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-orange-500 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search by course or date (YYYY-MM-DD)..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm"
          />
        </div>
        <div className="flex w-full sm:w-auto items-center gap-3">
          <button className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors">
            <Filter size={16} className="text-gray-500" />
            More Filters
          </button>
        </div>
      </div>

      {/* History Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {filteredLogs.length === 0 ? (
           <div className="p-12 text-center text-gray-500">No attendance records found.</div>
        ) : (
           <div className="overflow-x-auto">
             <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 font-medium">
                   <tr>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">Course</th>
                      <th className="px-6 py-4">Section / Hour</th>
                      <th className="px-6 py-4 text-center">Present</th>
                      <th className="px-6 py-4 text-center">Absent</th>
                      <th className="px-6 py-4 text-center">Attendance %</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                   {filteredLogs.map((log) => {
                      const presentCount = log.records.filter(r => r.status === 'Present' || r.status === 'Late').length;
                      const absentCount = log.records.filter(r => r.status === 'Absent').length;
                      const total = log.records.length;
                      const percentage = total === 0 ? 0 : Math.round((presentCount / total) * 100);

                      return (
                         <tr key={log.id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-6 py-4 text-gray-900 font-medium">{log.date}</td>
                            <td className="px-6 py-4 font-bold text-gray-900">{log.course}</td>
                            <td className="px-6 py-4 text-gray-600 font-medium">Sec {log.section} • <span className="font-normal text-xs">{log.hour}</span></td>
                            <td className="px-6 py-4 text-center font-bold text-green-600">{presentCount}</td>
                            <td className="px-6 py-4 text-center font-bold text-red-600">{absentCount}</td>
                            <td className="px-6 py-4 text-center">
                               <span className={`inline-flex items-center px-2 py-1 rounded border text-xs font-bold ${percentage < 75 ? 'bg-red-50 text-red-700 border-red-200' : 'bg-green-50 text-green-700 border-green-200'}`}>
                                 {percentage}%
                               </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                               <button 
                                 onClick={() => setSelectedLog(log)}
                                 className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors"
                               >
                                 <Eye size={16} /> Details
                               </button>
                            </td>
                         </tr>
                      )
                   })}
                </tbody>
             </table>
           </div>
        )}
      </div>

      {/* Details Modal */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate__animated animate__fadeIn animate__faster">
           <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
              <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50 shrink-0">
                 <div>
                   <h2 className="font-bold text-gray-900">Attendance Details</h2>
                   <p className="text-xs text-gray-500 mt-0.5">{selectedLog.course} - Sec {selectedLog.section} • {selectedLog.date}</p>
                 </div>
                 <button onClick={() => setSelectedLog(null)} className="p-2 text-gray-400 hover:text-gray-900 bg-white rounded-lg border border-gray-200 shadow-sm transition-colors">
                    <X size={16} />
                 </button>
              </div>
              <div className="overflow-y-auto p-0">
                 <table className="w-full text-left text-sm whitespace-nowrap">
                   <thead className="bg-white sticky top-0 border-b border-gray-100 text-gray-500 font-medium">
                      <tr>
                         <th className="px-6 py-3">Roll No</th>
                         <th className="px-6 py-3">Student Name</th>
                         <th className="px-6 py-3 text-right">Status</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-100">
                      {selectedLog.records.map((record) => {
                         const student = students.find(s => s.id === record.studentId);
                         return (
                            <tr key={record.studentId} className="hover:bg-gray-50/50">
                               <td className="px-6 py-3 font-mono text-gray-500">{student?.rollNumber}</td>
                               <td className="px-6 py-3 font-bold text-gray-900">{student?.name}</td>
                               <td className="px-6 py-3 text-right">
                                  <span className={`inline-flex px-2 py-0.5 rounded text-xs font-bold
                                     ${record.status === 'Present' ? 'bg-green-100 text-green-800' : 
                                       record.status === 'Absent' ? 'bg-red-100 text-red-800' : 
                                       'bg-yellow-100 text-yellow-800'}`
                                     }
                                  >
                                    {record.status}
                                  </span>
                               </td>
                            </tr>
                         )
                      })}
                   </tbody>
                 </table>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
