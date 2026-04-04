import { useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { useStudents } from '../../context/StudentContext';
import { ArrowLeft, User, BookOpen, Lock, ShieldAlert } from 'lucide-react';
import StudentHeader from '../../components/students/StudentHeader';
import MessageStudentModal from '../../components/students/MessageStudentModal';

export default function StudentProfile() {
  const { id } = useParams();
  const location = useLocation();
  const { getStudentById } = useStudents();
  
  // Accept prop payload from navigation link
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(location.state?.openMessage || false);
  
  const student = getStudentById(id);

  if (!student) {
    return <div className="p-12 text-center text-gray-500 font-medium">Student profile not found.</div>;
  }

  const ReadOnlyField = ({ label, value }) => (
    <div className="space-y-1.5 w-full">
      <div className="flex items-center justify-between">
         <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{label}</label>
         <Lock size={12} className="text-gray-300" />
      </div>
      <input 
        type="text" 
        value={value} 
        disabled 
        className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 text-gray-500 font-medium rounded-xl cursor-not-allowed"
      />
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate__animated animate__fadeIn pb-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/students/list" className="p-2 text-gray-400 hover:text-gray-900 bg-white rounded-xl border border-gray-100 shadow-sm transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Student Profile</h1>
            <p className="text-gray-500 text-sm mt-1">Comprehensive view of institutional records.</p>
          </div>
        </div>
      </div>

      <StudentHeader student={student} onOpenMessage={() => setIsMessageModalOpen(true)} />

      {/* Security Notice */}
      <div className="bg-orange-50 border border-orange-100 p-4 rounded-xl flex items-start gap-3">
         <ShieldAlert size={20} className="text-orange-500 shrink-0 mt-0.5" />
         <div>
            <p className="font-bold text-orange-900 text-sm">Read-Only View Enabled</p>
            <p className="text-xs text-orange-700 mt-1">As a faculty member, you do not have permissions to modify core identity or registry data for this student. Please contact the Administration Office if records contain errors.</p>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         
         {/* Personal Information */}
         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-6">
            <div className="flex items-center gap-2 border-b border-gray-100 pb-4">
               <User size={20} className="text-blue-500" />
               <h2 className="font-bold text-gray-900 text-lg">Personal Information</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
               <div className="sm:col-span-2"><ReadOnlyField label="Full Name" value={student.name} /></div>
               <ReadOnlyField label="Gender" value={student.gender} />
               <ReadOnlyField label="Date of Birth" value={student.dob} />
               <div className="sm:col-span-2"><ReadOnlyField label="Registered Email" value={student.email} /></div>
               <div className="sm:col-span-2"><ReadOnlyField label="Primary Phone" value={student.phone} /></div>
            </div>
         </div>

         <div className="space-y-6 flex flex-col h-full">
            {/* Academic Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-6">
               <div className="flex items-center gap-2 border-b border-gray-100 pb-4">
                  <BookOpen size={20} className="text-green-500" />
                  <h2 className="font-bold text-gray-900 text-lg">Registry Setup</h2>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                  <ReadOnlyField label="Department" value={student.department} />
                  <ReadOnlyField label="Course" value={student.course} />
                  <ReadOnlyField label="Semester" value={student.semester} />
                  <ReadOnlyField label="Enrollment Year" value={student.enrollmentYear} />
               </div>
            </div>

            {/* Quick Navigation Cards */}
            <div className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl p-6 flex flex-col justify-center space-y-4">
                <p className="text-sm font-bold text-gray-500 uppercase tracking-widest text-center">Academic Tracking</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   <Link to={`/students/${student.id}/attendance`} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:border-purple-300 hover:shadow-md transition-all text-center group">
                      <p className="font-bold text-gray-900 group-hover:text-purple-700 transition-colors">Attendance Profile</p>
                      <p className="text-xs text-gray-500 mt-1">Review missed classes</p>
                   </Link>
                   <Link to={`/students/${student.id}/assignments`} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:border-orange-300 hover:shadow-md transition-all text-center group">
                      <p className="font-bold text-gray-900 group-hover:text-orange-700 transition-colors">Assignment Ledger</p>
                      <p className="text-xs text-gray-500 mt-1">Review grade patterns</p>
                   </Link>
                </div>
            </div>
         </div>

      </div>

      {/* Enrolled Courses Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
         <div className="p-6 border-b border-gray-100">
            <h2 className="font-bold text-gray-900 text-lg">Active Course Enrollment</h2>
            <p className="text-sm text-gray-500">The courses this student is registered to participate in the current semester.</p>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
               <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 font-medium">
                  <tr>
                     <th className="px-6 py-4">Course Name</th>
                     <th className="px-6 py-4">Lead Instructor</th>
                     <th className="px-6 py-4 text-center">Credits</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-100">
                  {student.enrolledCourses.map((c, i) => (
                     <tr key={i} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-bold text-gray-900">{c.name}</td>
                        <td className="px-6 py-4 text-gray-700">{c.instructor}</td>
                        <td className="px-6 py-4 text-center text-gray-600 font-mono">{c.credits}</td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      {isMessageModalOpen && <MessageStudentModal student={student} onClose={() => setIsMessageModalOpen(false)} />}
    </div>
  );
}
