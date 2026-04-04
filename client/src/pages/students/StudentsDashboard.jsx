import { useStudents } from '../../context/StudentContext';
import { Link } from 'react-router-dom';
import { Users, BookOpen, AlertTriangle, Activity, UserSearch } from 'lucide-react';

export default function StudentsDashboard() {
  const { students } = useStudents();

  // Basic KPI logic
  const totalStudents = students.length;
  // Unique courses assigned to teacher (deduplicate strings)
  const coursesAssigned = [...new Set(students.map(s => s.course))].length;
  // Calculate average attendance
  const sums = students.reduce((acc, s) => acc + s.attendancePercentage, 0);
  const avgAttendance = totalStudents > 0 ? Math.round(sums / totalStudents) : 0;
  // Low attendance counts
  const lowAttendanceCount = students.filter(s => s.attendancePercentage < 75).length;

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate__animated animate__fadeIn pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h1 className="text-2xl font-bold text-gray-900">Students Dashboard</h1>
           <p className="text-gray-500 text-sm mt-1">Overview of student enrollment and academic signals.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link 
            to="/students/list"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-600 text-white text-sm font-medium rounded-xl hover:bg-orange-700 hover:shadow-lg hover:-translate-y-0.5 transition-all w-fit"
          >
            <UserSearch size={18} />
            Search Roster
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center justify-between group hover:border-blue-200 transition-colors">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Total Enrolled</p>
            <p className="text-2xl font-black text-gray-900">{totalStudents}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Users size={24} />
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center justify-between group hover:border-green-200 transition-colors">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Courses Assigned</p>
            <p className="text-2xl font-black text-gray-900">{coursesAssigned}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
            <BookOpen size={24} />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center justify-between hover:border-orange-200 transition-colors">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Avg Rating</p>
            <p className="text-2xl font-black text-gray-900">{avgAttendance}%</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
            <Activity size={24} />
          </div>
        </div>

        <div className={`bg-white rounded-2xl shadow-sm border p-5 flex items-center justify-between transition-colors ${lowAttendanceCount > 0 ? 'border-red-200 bg-red-50/10 hover:border-red-300' : 'border-gray-100'}`}>
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">At Risk (&lt;75%)</p>
            <p className={`text-2xl font-black ${lowAttendanceCount > 0 ? 'text-red-600' : 'text-gray-900'}`}>{lowAttendanceCount}</p>
          </div>
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${lowAttendanceCount > 0 ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-400'}`}>
            <AlertTriangle size={24} />
          </div>
        </div>
      </div>

      {/* Recent Activity Mock Widget */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mt-8">
         <div className="px-6 py-5 border-b border-gray-100">
            <h2 className="font-bold text-gray-900 text-lg">Recent Student Activity</h2>
         </div>
         <div className="divide-y divide-gray-50">
            {/* Mock Rows */}
            <div className="p-4 px-6 flex items-start gap-4 hover:bg-gray-50 transition-colors">
               <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <Activity size={18} />
               </div>
               <div>
                  <p className="text-sm text-gray-800"><span className="font-bold">Alice Johnson</span> submitted assignment <span className="font-medium">BST Implementation</span>.</p>
                  <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
               </div>
            </div>
            <div className="p-4 px-6 flex items-start gap-4 hover:bg-gray-50 transition-colors">
               <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                  <AlertTriangle size={18} />
               </div>
               <div>
                  <p className="text-sm text-gray-800"><span className="font-bold">Bob Smith</span> missed class <span className="font-medium">Data Structures</span>.</p>
                  <p className="text-xs text-gray-500 mt-1">5 hours ago</p>
               </div>
            </div>
            <div className="p-4 px-6 flex items-start gap-4 hover:bg-gray-50 transition-colors">
               <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                  <Activity size={18} />
               </div>
               <div>
                  <p className="text-sm text-gray-800"><span className="font-bold">Charlie Davis</span> attendance updated to <span className="font-medium text-green-600">95%</span>.</p>
                  <p className="text-xs text-gray-500 mt-1">Yesterday</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
