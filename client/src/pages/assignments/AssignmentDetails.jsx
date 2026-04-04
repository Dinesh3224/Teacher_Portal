import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAssignments } from '../../context/AssignmentContext';
import { ArrowLeft, Edit, Trash2, Users, FileText, Calendar, CheckCircle, Clock } from 'lucide-react';

export default function AssignmentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { assignments, deleteAssignment, getSubmissionsByAssignmentId } = useAssignments();

  const assignment = assignments.find(a => a.id === id);
  const submissions = getSubmissionsByAssignmentId(id);

  if (!assignment) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center h-96">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Assignment Not Found</h2>
        <p className="text-gray-500 mb-6">The assignment you are looking for does not exist or has been deleted.</p>
        <Link to="/assignments" className="px-6 py-2.5 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition">Back to Assignments</Link>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this assignment permanently?")) {
      deleteAssignment(assignment.id);
      navigate('/assignments');
    }
  };

  const getStatusStyle = (status) => {
    switch(status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Draft': return 'bg-gray-100 text-gray-800';
      case 'Closed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate__animated animate__fadeIn pb-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/assignments" className="p-2 text-gray-400 hover:text-gray-900 bg-white rounded-xl border border-gray-100 shadow-sm transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">{assignment.title}</h1>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${getStatusStyle(assignment.status)}`}>
                {assignment.status}
              </span>
            </div>
            <p className="text-gray-500 text-sm mt-1">{assignment.course} • {assignment.subject}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            className="p-2 text-gray-400 hover:text-gray-900 bg-white border border-gray-100 rounded-xl shadow-sm transition-colors group"
            title="Edit"
          >
            <Edit size={18} className="group-hover:scale-110 transition-transform" />
          </button>
          <button 
            onClick={handleDelete}
            className="p-2 text-gray-400 hover:text-red-600 bg-white border border-gray-100 rounded-xl shadow-sm transition-colors group"
            title="Delete"
          >
            <Trash2 size={18} className="group-hover:scale-110 transition-transform" />
          </button>
          <Link 
            to={`/assignments/${assignment.id}/submissions`}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition-colors h-10"
          >
            <Users size={18} />
            View Submissions
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-6">
            <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                <FileText size={16} className="text-orange-500" /> Description
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                {assignment.description || 'No description provided.'}
              </p>
            </div>
            <div className="pt-6 border-t border-gray-100">
               <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                <CheckCircle size={16} className="text-orange-500" /> Instructions
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                {assignment.instructions || 'No special instructions provided.'}
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
             <h3 className="font-bold text-gray-900 mb-4">Assignment Overview</h3>
             <ul className="space-y-4">
               <li className="flex justify-between items-center text-sm">
                 <span className="text-gray-500 flex items-center gap-2"><Calendar size={16} /> Due Date</span>
                 <span className="font-medium text-gray-900">{new Date(assignment.dueDate).toLocaleDateString()}</span>
               </li>
               <li className="flex justify-between items-center text-sm">
                 <span className="text-gray-500 flex items-center gap-2"><FileText size={16} /> Total Marks</span>
                 <span className="font-medium text-gray-900">{assignment.totalMarks}</span>
               </li>
               <li className="flex justify-between items-center text-sm">
                 <span className="text-gray-500 flex items-center gap-2"><Clock size={16} /> Late Submissions</span>
                 <span className="font-medium text-gray-900">{assignment.allowLate ? 'Allowed' : 'Not Allowed'}</span>
               </li>
               <li className="flex justify-between items-center text-sm pt-3 border-t border-gray-50">
                 <span className="text-gray-500">Submission Method</span>
                 <span className="font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded-md text-xs">{assignment.submissionType}</span>
               </li>
             </ul>
          </div>

          {/* Submission summary widget */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 p-6 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-blue-900">Total Submissions</h3>
              <p className="text-blue-700/80 text-sm mt-1">Ready to grade</p>
            </div>
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm border border-blue-100">
               <span className="text-2xl font-black text-blue-600">{submissions.length}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
