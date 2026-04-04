import { MessageSquare, UserCircle } from "lucide-react";

export default function StudentTable({ students }) {
  const handleMessage = (studentName) => {
    // TODO: Integrate with messaging backend API
    alert(`Messaging feature coming soon. Attempted to message: ${studentName}`);
  };

  const handleProfile = (studentId) => {
    // TODO: Hook up student profile modal or page
    alert(`View profile for student ID: ${studentId}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider font-semibold border-b border-gray-100">
              <th className="p-4 pl-6">Student</th>
              <th className="p-4">ID</th>
              <th className="p-4">Attendance</th>
              <th className="p-4">Assignments</th>
              <th className="p-4 pr-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {students.map((student) => (
               <tr key={student.id} className="hover:bg-gray-50 transition-colors">
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
                  <td className="p-4">
                     <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-100 rounded-full h-1.5">
                           <div className={`h-1.5 rounded-full ${student.attendance < 80 ? 'bg-red-500' : 'bg-green-500'}`} style={{width: `${student.attendance}%`}}></div>
                        </div>
                        <span className="text-xs font-bold text-gray-700">{student.attendance}%</span>
                     </div>
                  </td>
                  <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-100 rounded-full h-1.5">
                           <div className="h-1.5 rounded-full bg-orange-500" style={{width: `${student.assignmentCompletion}%`}}></div>
                        </div>
                        <span className="text-xs font-bold text-gray-700">{student.assignmentCompletion}%</span>
                     </div>
                  </td>
                  <td className="p-4 pr-6 text-right space-x-2">
                     <button onClick={() => handleProfile(student.id)} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors inline-block" title="View Profile">
                        <UserCircle size={18} />
                     </button>
                     <button onClick={() => handleMessage(student.name)} className="p-1.5 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors inline-block" title="Message Student">
                        <MessageSquare size={18} />
                     </button>
                  </td>
               </tr>
            ))}
            {students.length === 0 && (
               <tr>
                  <td colSpan="5" className="p-8 text-center text-gray-500 text-sm">No students enrolled yet.</td>
               </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
