import { useAttendance } from '../../context/AttendanceContext';
import { BarChart3, AlertTriangle, TrendingUp } from 'lucide-react';

export default function AttendanceReport() {
  const { attendanceLogs, students, todayClasses } = useAttendance();

  // Aggregate Course attendance logic
  const courseStats = {};
  attendanceLogs.forEach(log => {
      const key = `${log.course} - Sec ${log.section}`;
      if (!courseStats[key]) {
          courseStats[key] = { totalClasses: 0, totalPresent: 0, totalRecords: 0 };
      }
      courseStats[key].totalClasses += 1;
      log.records.forEach(r => {
          courseStats[key].totalRecords += 1;
          if (r.status === 'Present' || r.status === 'Late') {
              courseStats[key].totalPresent += 1;
          }
      });
  });

  const courseSummary = Object.entries(courseStats).map(([name, stats]) => ({
      name,
      totalClasses: stats.totalClasses,
      avgAttendance: stats.totalRecords === 0 ? 0 : Math.round((stats.totalPresent / stats.totalRecords) * 100)
  }));

  // Aggregate Student attendance logic
  const studentStats = {};
  students.forEach(s => {
      studentStats[s.id] = { name: s.name, rollNumber: s.rollNumber, classesAttended: 0, totalClasses: 0 };
  });

  attendanceLogs.forEach(log => {
      log.records.forEach(r => {
          if (studentStats[r.studentId]) {
              studentStats[r.studentId].totalClasses += 1;
              if (r.status === 'Present' || r.status === 'Late') {
                  studentStats[r.studentId].classesAttended += 1;
              }
          }
      });
  });

  const studentSummary = Object.values(studentStats).map(stats => {
      const percentage = stats.totalClasses === 0 ? 0 : Math.round((stats.classesAttended / stats.totalClasses) * 100);
      return {
          ...stats,
          percentage
      };
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate__animated animate__fadeIn pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h1 className="text-2xl font-bold text-gray-900">Attendance Reports</h1>
           <p className="text-gray-500 text-sm mt-1">Analyze course health and student participation rates.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
        {/* Course Summary */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
           <div className="p-6 border-b border-gray-100 flex items-center gap-2">
              <TrendingUp size={20} className="text-blue-500" />
              <h2 className="font-bold text-gray-900 text-lg">Course Attendance Summary</h2>
           </div>
           <div className="flex-1 p-0 overflow-x-auto">
              {courseSummary.length === 0 ? (
                 <div className="p-12 text-center text-gray-500 text-sm">No course data available.</div>
              ) : (
                <table className="w-full text-left text-sm whitespace-nowrap">
                   <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 font-medium">
                      <tr>
                         <th className="px-6 py-4">Course</th>
                         <th className="px-6 py-4 text-center">Total Classes</th>
                         <th className="px-6 py-4 text-center">Average Attendance</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-100">
                      {courseSummary.map((c, i) => (
                         <tr key={i} className="hover:bg-gray-50/50">
                            <td className="px-6 py-4 font-bold text-gray-900">{c.name}</td>
                            <td className="px-6 py-4 text-center text-gray-700">{c.totalClasses}</td>
                            <td className="px-6 py-4 text-center">
                               <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-bold ${c.avgAttendance < 75 ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'}`}>
                                 {c.avgAttendance}%
                               </span>
                            </td>
                         </tr>
                      ))}
                   </tbody>
                </table>
              )}
           </div>
        </div>

        {/* Student Summary */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
           <div className="p-6 border-b border-gray-100 flex items-center gap-2">
              <BarChart3 size={20} className="text-orange-500" />
              <h2 className="font-bold text-gray-900 text-lg">Student Attendance Report</h2>
           </div>
           <div className="flex-1 p-0 overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                 <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 font-medium">
                    <tr>
                       <th className="px-6 py-4">Student Name</th>
                       <th className="px-6 py-4 text-center">Classes Attended</th>
                       <th className="px-6 py-4 text-center">Attendance %</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-100">
                    {studentSummary.map((s, i) => (
                       <tr key={i} className={`hover:bg-gray-50/50 ${s.percentage > 0 && s.percentage < 75 ? 'bg-red-50/30' : ''}`}>
                          <td className="px-6 py-4">
                             <p className="font-bold text-gray-900">{s.name}</p>
                             <p className="text-xs text-gray-500 font-mono mt-0.5">{s.rollNumber}</p>
                          </td>
                          <td className="px-6 py-4 text-center text-gray-700">{s.classesAttended} / {s.totalClasses}</td>
                          <td className="px-6 py-4 text-center">
                             <div className="flex items-center justify-center gap-2">
                               {s.percentage > 0 && s.percentage < 75 && <AlertTriangle size={14} className="text-red-500" />}
                               <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-bold ${s.percentage > 0 && s.percentage < 75 ? 'bg-red-100 text-red-800 border border-red-200' : s.percentage === 0 ? 'bg-gray-100 text-gray-500' : 'bg-green-50 text-green-700 border border-green-200'}`}>
                                 {s.percentage}%
                               </span>
                             </div>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>

      </div>
    </div>
  );
}
