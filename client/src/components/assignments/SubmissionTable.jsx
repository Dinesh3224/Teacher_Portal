import { Link } from 'react-router-dom';
import { Eye, Edit3, CheckCircle, FileText } from 'lucide-react';

export default function SubmissionTable({ submissions, assignmentId }) {
  if (submissions.length === 0) {
    return (
      <div className="py-12 text-center bg-white rounded-2xl shadow-sm border border-gray-100">
        <p className="text-gray-500 font-medium">No submissions yet for this assignment.</p>
      </div>
    );
  }

  const getStatusStyle = (status) => {
    switch(status) {
      case 'Graded': return 'bg-green-100 text-green-800';
      case 'Submitted': return 'bg-blue-100 text-blue-800';
      case 'Late': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 font-medium">
            <tr>
              <th className="px-6 py-4">Student</th>
              <th className="px-6 py-4">Submission Time</th>
              <th className="px-6 py-4">File</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Marks</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {submissions.map((sub) => (
              <tr key={sub.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <p className="font-bold text-gray-900">{sub.studentName}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{sub.studentId}</p>
                </td>
                <td className="px-6 py-4 text-gray-700">
                  {new Date(sub.submissionTime).toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  {sub.fileSubmitted ? (
                    <div className="flex items-center gap-2 text-blue-600 hover:text-blue-800 cursor-pointer w-fit">
                      <FileText size={16} />
                      <span className="truncate max-w-[150px]">{sub.fileSubmitted}</span>
                    </div>
                  ) : (
                    <span className="text-gray-400 italic">Text Only</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${getStatusStyle(sub.status)}`}>
                    {sub.status === 'Graded' && <CheckCircle size={12} />}
                    {sub.status}
                  </span>
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">
                  {sub.marks !== null ? sub.marks : '-'}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    {sub.status === 'Graded' ? (
                      <Link 
                        to={`/assignments/${assignmentId}/grade/${sub.id}`}
                        className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 border border-blue-100 hover:bg-blue-100 rounded-lg flex items-center gap-1.5 transition-colors"
                      >
                        <Eye size={14} /> Review
                      </Link>
                    ) : (
                      <Link 
                        to={`/assignments/${assignmentId}/grade/${sub.id}`}
                        className="px-3 py-1.5 text-xs font-medium text-orange-600 bg-orange-50 border border-orange-100 hover:bg-orange-100 rounded-lg flex items-center gap-1.5 transition-colors"
                      >
                        <Edit3 size={14} /> Grade
                      </Link>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
