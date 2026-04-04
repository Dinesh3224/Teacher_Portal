import { useParams, Link } from 'react-router-dom';
import { useAssignments } from '../../context/AssignmentContext';
import { ArrowLeft, Users, Download, Filter } from 'lucide-react';
import SubmissionTable from '../../components/assignments/SubmissionTable';

export default function AssignmentSubmissions() {
  const { id } = useParams();
  const { assignments, getSubmissionsByAssignmentId } = useAssignments();

  const assignment = assignments.find(a => a.id === id);
  const submissions = getSubmissionsByAssignmentId(id);

  if (!assignment) {
    return <div className="p-12 text-center text-gray-500">Assignment not found.</div>;
  }

  const gradedCount = submissions.filter(s => s.status === 'Graded').length;
  const progressPercentage = submissions.length > 0 ? (gradedCount / submissions.length) * 100 : 0;

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate__animated animate__fadeIn pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link to={`/assignments/${id}`} className="p-2 text-gray-400 hover:text-gray-900 bg-white rounded-xl border border-gray-100 shadow-sm transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Student Submissions</h1>
            <p className="text-gray-500 text-sm mt-1">{assignment.title} • {submissions.length} Total Submissions</p>
          </div>
        </div>
        <div className="flex gap-3">
           <button className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl shadow-sm transition-all flex items-center gap-2">
             <Download size={16} /> Export Grades
           </button>
        </div>
      </div>

      {/* Progress Bar & Quick Stats */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-8">
         <div className="flex-1 w-full space-y-2">
            <div className="flex items-center justify-between">
               <span className="text-sm font-semibold text-gray-700">Grading Progress</span>
               <span className="text-sm font-bold text-orange-600">{gradedCount} of {submissions.length} Graded</span>
            </div>
            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
               <div 
                 className="h-full bg-orange-500 rounded-full transition-all duration-1000 ease-out"
                 style={{ width: `${progressPercentage}%` }}
               ></div>
            </div>
         </div>
         <div className="hidden md:block w-px h-12 bg-gray-100"></div>
         <div className="flex min-w-[200px] justify-between gap-6 shrink-0">
            <div>
               <p className="text-sm text-gray-500">Pending</p>
               <p className="text-2xl font-black text-gray-800">{submissions.length - gradedCount}</p>
            </div>
            <div>
               <p className="text-sm text-gray-500">Average Score</p>
               {/* Mock Calculation */}
               <p className="text-2xl font-black text-blue-600">
                 {gradedCount > 0 
                   ? Math.round(submissions.filter(s => s.marks !== null).reduce((acc, curr) => acc + curr.marks, 0) / gradedCount) 
                   : '-'} / {assignment.totalMarks}
               </p>
            </div>
         </div>
      </div>

       {/* Filters */}
       <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-gray-100 shadow-sm">
            <Filter size={16} className="text-gray-500" />
            <select className="bg-transparent text-sm text-gray-700 outline-none cursor-pointer border-none font-medium">
              <option>All Submissions</option>
              <option>Pending Grading</option>
              <option>Graded</option>
              <option>Late Submissions</option>
            </select>
          </div>
       </div>

      {/* Submissions Table */}
      <SubmissionTable submissions={submissions} assignmentId={id} />

    </div>
  );
}
