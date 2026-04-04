import { useParams, Link } from 'react-router-dom';
import { useStudents } from '../../context/StudentContext';
import { ArrowLeft } from 'lucide-react';

export default function StudentAssignments() {
  const { id } = useParams();
  const { getStudentById, getAssignmentsById } = useStudents();
  
  const student = getStudentById(id);
  const assignmentsHistory = getAssignmentsById(id);

  if (!student) return <div className="p-12 text-center text-gray-500">Student not found.</div>;

  const getStatusBadge = (status) => {
    switch(status) {
       case 'Graded': return 'bg-green-100 text-green-800 border-green-200';
       case 'Submitted': return 'bg-blue-100 text-blue-800 border-blue-200';
       case 'Missing': return 'bg-red-100 text-red-800 border-red-200';
       default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate__animated animate__fadeIn pb-12">
      <div className="flex items-center gap-4">
        <Link to={`/students/${id}`} className="p-2 text-gray-400 hover:text-gray-900 bg-white rounded-xl border border-gray-100 shadow-sm transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Assignment Ledger</h1>
          <p className="text-gray-500 text-sm mt-1">{student.name} • {student.rollNumber}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
         <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-bold text-gray-900 text-lg">Performance Logs</h2>
            <div className="px-3 py-1 bg-gray-50 rounded-lg border border-gray-200 text-xs font-semibold text-gray-600">
               Total Instances: {assignmentsHistory.length}
            </div>
         </div>
         <div className="overflow-x-auto">
            {assignmentsHistory.length === 0 ? (
               <div className="p-12 text-center text-gray-500 text-sm">No assignment data available.</div>
            ) : (
              <table className="w-full text-left text-sm whitespace-nowrap">
                 <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 font-medium">
                    <tr>
                       <th className="px-6 py-4">Assignment Title</th>
                       <th className="px-6 py-4">Course Slot</th>
                       <th className="px-6 py-4">Turned-in Date</th>
                       <th className="px-6 py-4 text-center">Marks</th>
                       <th className="px-6 py-4 text-right">Workflow Status</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-100">
                    {assignmentsHistory.map((entry, i) => (
                       <tr key={i} className={`hover:bg-gray-50 transition-colors ${entry.status === 'Missing' ? 'bg-red-50/10' : ''}`}>
                          <td className="px-6 py-4 font-bold text-gray-900">{entry.assignmentTitle}</td>
                          <td className="px-6 py-4 text-gray-700">{entry.course}</td>
                          <td className="px-6 py-4 font-mono text-gray-500">{entry.submissionDate}</td>
                          <td className="px-6 py-4 text-center">
                             <div className="inline-flex w-16justify-center px-2 py-1 font-black text-gray-900 bg-gray-50 rounded border border-gray-200">
                                {entry.marks}
                             </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                             <span className={`inline-flex px-2 py-1 rounded border text-xs font-bold ${getStatusBadge(entry.status)}`}>
                                {entry.status}
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
