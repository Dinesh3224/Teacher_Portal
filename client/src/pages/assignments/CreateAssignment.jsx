import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAssignments } from '../../context/AssignmentContext';
import { ArrowLeft, Save, Send, UploadCloud } from 'lucide-react';

export default function CreateAssignment() {
  const navigate = useNavigate();
  const { addAssignment } = useAssignments();

  const [formData, setFormData] = useState({
    title: '',
    course: 'B.Tech Computer Science',
    subject: '',
    description: '',
    instructions: '',
    totalMarks: '',
    dueDate: '',
    submissionType: 'File Upload',
    allowLate: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = (status) => {
    if (!formData.title || !formData.dueDate) {
      alert("Please fill required fields (Title, Due Date).");
      return;
    }

    addAssignment({
      ...formData,
      status: status
    });
    
    navigate('/assignments');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate__animated animate__fadeIn pb-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/assignments" className="p-2 text-gray-400 hover:text-gray-900 bg-white rounded-xl border border-gray-100 shadow-sm transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Create Assignment</h1>
            <p className="text-gray-500 text-sm mt-1">Design a new assessment for your students.</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-8">
        
        {/* Core Information */}
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">Basic Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-sm font-semibold text-gray-700">Assignment Title <span className="text-red-500">*</span></label>
              <input 
                type="text" name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Midterm Lab Assignment"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Target Course</label>
              <select 
                name="course" value={formData.course} onChange={handleChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm"
              >
                <option value="B.Tech Computer Science">B.Tech Computer Science</option>
                <option value="B.Tech Mechanical">B.Tech Mechanical</option>
                <option value="MCA">MCA</option>
              </select>
            </div>
            <div className="space-y-1.5">
               <label className="text-sm font-semibold text-gray-700">Subject</label>
               <input 
                type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="e.g. Data Structures"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm"
              />
            </div>
          </div>
        </div>

        {/* Configuration */}
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">Grading & Deadlines</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Total Marks</label>
              <input 
                type="number" name="totalMarks" value={formData.totalMarks} onChange={handleChange} placeholder="100"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Due Date <span className="text-red-500">*</span></label>
              <input 
                type="date" name="dueDate" value={formData.dueDate} onChange={handleChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm"
              />
            </div>
             <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Submission Type</label>
              <select 
                name="submissionType" value={formData.submissionType} onChange={handleChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm"
              >
                <option value="File Upload">File Upload</option>
                <option value="Text Answer">Text Answer</option>
                <option value="Both">Both</option>
              </select>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-4">
             <input type="checkbox" id="allowLate" name="allowLate" checked={formData.allowLate} onChange={handleChange} className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500" />
             <label htmlFor="allowLate" className="text-sm text-gray-700 select-none">Allow late submissions (marks may be deducted)</label>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">Content</h2>
          <div className="space-y-4">
            <div className="space-y-1.5">
               <label className="text-sm font-semibold text-gray-700">Description</label>
               <textarea 
                name="description" value={formData.description} onChange={handleChange} rows="3" placeholder="Brief overview of the assignment..."
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm resize-none"
              ></textarea>
            </div>
             <div className="space-y-1.5">
               <label className="text-sm font-semibold text-gray-700">Detailed Instructions</label>
               <textarea 
                name="instructions" value={formData.instructions} onChange={handleChange} rows="5" placeholder="Step by step instructions for students..."
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm resize-none"
              ></textarea>
            </div>
            
            {/* Attachment Mock UI */}
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-2">Attachments (Optional)</label>
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group">
                 <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-400 group-hover:text-orange-500 transition-colors mb-3">
                   <UploadCloud size={24} />
                 </div>
                 <p className="text-sm font-medium text-gray-700">Click to upload or drag files here</p>
                 <p className="text-xs text-gray-500 mt-1">PDF, DOCX, ZIP (Max 50MB)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-100">
           <Link to="/assignments" className="px-6 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
             Cancel
           </Link>
           <button 
             onClick={() => handleSave('Draft')}
             className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl shadow-sm transition-all flex items-center gap-2"
           >
             <Save size={16} /> Save Draft
           </button>
           <button 
             onClick={() => handleSave('Active')}
             className="px-6 py-2.5 text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 rounded-xl shadow-sm hover:shadow-orange-500/20 hover:-translate-y-0.5 transition-all flex items-center gap-2"
           >
             <Send size={16} /> Publish Assignment
           </button>
        </div>

      </div>
    </div>
  );
}
