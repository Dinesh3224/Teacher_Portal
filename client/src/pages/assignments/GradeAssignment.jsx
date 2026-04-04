import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAssignments } from '../../context/AssignmentContext';
import { ArrowLeft, Save, FileText, User, Calendar, CheckCircle } from 'lucide-react';

export default function GradeAssignment() {
  const { id, studentId } = useParams();
  const navigate = useNavigate();
  const { assignments, getSubmissionsByAssignmentId, gradeSubmission } = useAssignments();

  const [marks, setMarks] = useState('');
  const [feedback, setFeedback] = useState('');

  const assignment = assignments.find(a => a.id === id);
  const submissions = getSubmissionsByAssignmentId(id);
  const submission = submissions.find(s => s.id === studentId);

  useEffect(() => {
    if (submission) {
      setMarks(submission.marks !== null ? submission.marks : '');
      setFeedback(submission.feedback || '');
    }
  }, [submission]);

  if (!assignment || !submission) {
    return <div className="p-12 text-center text-gray-500">Submission not found.</div>;
  }

  const handleSaveGrade = () => {
    gradeSubmission(submission.id, marks, feedback);
    navigate(`/assignments/${id}/submissions`);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate__animated animate__fadeIn pb-12 h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <Link to={`/assignments/${id}/submissions`} className="p-2 text-gray-400 hover:text-gray-900 bg-white rounded-xl border border-gray-100 shadow-sm transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Grading: {submission.studentName}</h1>
            <p className="text-gray-500 text-sm mt-0.5">{assignment.title} • {assignment.subject}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${submission.status === 'Graded' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
            {submission.status === 'Graded' && <CheckCircle size={14} />}
            {submission.status}
          </span>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
        
        {/* Left Side: Mock Document Viewer */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-100 flex justify-between items-center shrink-0">
             <div className="flex items-center gap-2">
                <FileText size={18} className="text-blue-500" />
                <span className="text-sm font-bold text-gray-700">{submission.fileSubmitted || 'Text Submission'}</span>
             </div>
             <button className="text-xs bg-white border border-gray-200 px-3 py-1.5 rounded-lg font-medium hover:bg-gray-50 transition-colors">Download</button>
          </div>
          <div className="flex-1 bg-gray-100 p-8 flex items-center justify-center overflow-auto relative rounded-b-2xl">
              {/* Fake PDF viewer visual */}
              {submission.fileSubmitted ? (
                 <div className="bg-white w-full max-w-2xl min-h-[600px] shadow-sm p-12 text-gray-300 pointer-events-none flex flex-col items-center justify-center">
                    <FileText size={64} className="mb-4 opacity-50" />
                    <p className="font-medium text-gray-400">File Preview Area</p>
                    <p className="text-sm mt-2 max-w-sm text-center">In a real app, this would render a PDF viewer or code syntax highlighter.</p>
                 </div>
              ) : (
                <div className="bg-white w-full max-w-2xl shadow-sm p-8 rounded border border-gray-200">
                   <p className="text-gray-800 whitespace-pre-wrap">{submission.textAnswer}</p>
                </div>
              )}
          </div>
        </div>

        {/* Right Side: Grading Panel */}
        <div className="w-full lg:w-96 shrink-0 flex flex-col gap-6">
           
           {/* Student Details Card */}
           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-4 shrink-0">
              <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-2">Student Information</h3>
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold">
                    {submission.studentName.charAt(0)}
                 </div>
                 <div>
                    <p className="font-bold text-gray-900 leading-tight">{submission.studentName}</p>
                    <p className="text-xs text-gray-500">{submission.studentId}</p>
                 </div>
              </div>
              <div className="pt-2 flex items-center gap-2 text-xs text-gray-500">
                 <Calendar size={14} />
                 Submitted: {new Date(submission.submissionTime).toLocaleString()}
              </div>
           </div>

           {/* Grading Form */}
           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col h-full flex-1 min-h-[300px]">
              <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-2 mb-4">Evaluation</h3>
              
              <div className="space-y-4 flex-1">
                 <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-1">Marks Obtained</label>
                    <div className="flex items-center gap-2">
                       <input 
                         type="number" 
                         value={marks} 
                         onChange={(e) => setMarks(e.target.value)}
                         className="w-24 text-2xl font-black text-center px-2 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                       />
                       <span className="text-gray-400 font-bold text-xl">/ {assignment.totalMarks}</span>
                    </div>
                 </div>

                 <div className="flex-1 flex flex-col h-full">
                    <label className="text-sm font-semibold text-gray-700 block mb-1">Teacher Feedback</label>
                    <textarea 
                       value={feedback} 
                       onChange={(e) => setFeedback(e.target.value)}
                       placeholder="Provide constructive feedback for the student..."
                       className="w-full flex-1 min-h-[150px] p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm resize-none"
                    ></textarea>
                 </div>
              </div>

              {/* Actions */}
              <div className="pt-4 mt-4 border-t border-gray-100">
                 <button 
                   onClick={handleSaveGrade}
                   className="w-full py-3 text-sm font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-xl shadow-sm hover:shadow-orange-500/20 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                 >
                   <Save size={18} /> {submission.status === 'Graded' ? 'Update Grade' : 'Save Grade'}
                 </button>
              </div>
           </div>

        </div>
      </div>
    </div>
  );
}
