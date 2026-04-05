import { Link } from 'react-router-dom';
import { Eye, Edit, Trash2, Users } from 'lucide-react';
import { useAssignments } from '../../context/AssignmentContext';

export default function AssignmentTable({ assignments }) {
  const { deleteAssignment, getSubmissionsByAssignmentId } = useAssignments();

  const getStatusStyle = (status) => {
    switch(status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Draft': return 'bg-gray-100 text-gray-800';
      case 'Closed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (assignments.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-500 font-medium">No assignments found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm whitespace-nowrap">
        <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 font-medium">
          <tr>
            <th className="px-6 py-4">Assignment Title</th>
            <th className="px-6 py-4">Course</th>
            <th className="px-6 py-4">Due Date</th>
            <th className="px-6 py-4 text-center">Submissions</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {assignments.map((assignment) => {
            const subs = getSubmissionsByAssignmentId(assignment.id);
            return (
              <tr key={assignment.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <p className="font-bold text-gray-900 group-hover:text-orange-600 transition-colors">{assignment.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{assignment.subject}</p>
                </td>
                <td className="px-6 py-4 text-gray-700">{assignment.course}</td>
                <td className="px-6 py-4 text-gray-700">{new Date(assignment.dueDate).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-center">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 rounded-full font-medium text-xs">
                    <Users size={14} />
                    {subs.length}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${getStatusStyle(assignment.status)}`}>
                    {assignment.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link 
                      to={`/assignments/${assignment.id}`}
                      className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <Eye size={18} />
                    </Link>
                    <Link 
                      to={`/assignments/${assignment.id}/submissions`}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="View Submissions"
                    >
                      <Users size={18} />
                    </Link>
                    <button 
                      className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors"
                      title="Edit Placeholder"
                    >
                      <Edit size={18} />
                    </button>
                    <button 
                      onClick={() => {
                        if (window.confirm("Are you sure you want to delete this assignment?")) {
                          deleteAssignment(assignment.id);
                        }
                      }}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
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
