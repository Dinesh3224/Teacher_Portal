import { Link } from 'react-router-dom';
import { Eye, Clock, CheckSquare, MessageSquare } from 'lucide-react';

export default function StudentTable({ students }) {
  if (students.length === 0) {
    return <div className="p-12 text-center text-gray-500">No students match the criteria.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm whitespace-nowrap">
        <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 font-medium">
          <tr>
            <th className="px-6 py-4">Roll Number</th>
            <th className="px-6 py-4">Student Name</th>
            <th className="px-6 py-4">Course & Sec</th>
            <th className="px-6 py-4 text-center">Attendance</th>
            <th className="px-6 py-4 text-right">Academic Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {students.map((student) => {
            const isRisk = student.attendancePercentage < 75;
            return (
              <tr key={student.id} className={`hover:bg-gray-50/50 transition-colors ${isRisk ? 'bg-red-50/20' : ''}`}>
                <td className="px-6 py-4 font-mono text-gray-500">{student.rollNumber}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src={student.avatarUrl} alt={student.name} className="w-8 h-8 rounded-full border border-gray-200" />
                    <p className={`font-bold ${isRisk ? 'text-red-700' : 'text-gray-900'}`}>{student.name}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-700">
                  {student.course} <span className="text-gray-400 font-mono text-xs ml-1">[{student.section}]</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`inline-flex px-2 py-1 rounded text-xs font-bold ${isRisk ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                    {student.attendancePercentage}%
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link to={`/students/${student.id}`} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View Profile">
                      <Eye size={16} />
                    </Link>
                    <Link to={`/students/${student.id}/attendance`} className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors" title="View Attendance">
                      <Clock size={16} />
                    </Link>
                    <Link to={`/students/${student.id}/assignments`} className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors" title="View Assignments">
                      <CheckSquare size={16} />
                    </Link>
                    {/* Messaging will be handled via a generic modal on profile, or link to profile -> message */}
                    <Link to={`/students/${student.id}`} state={{ openMessage: true }} className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Message">
                      <MessageSquare size={16} />
                    </Link>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
