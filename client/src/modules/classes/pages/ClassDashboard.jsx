import { useParams, Link } from "react-router-dom";
import { mockClasses } from "../data/mockClasses";
import { Users, BookOpen, FileText, CheckCircle2 } from "lucide-react";
import Card from "../../../components/ui/Card";
import Section from "../../../components/ui/Section";
import AssignmentCard from "../components/AssignmentCard";
import MaterialCard from "../components/MaterialCard";

export default function ClassDashboard() {
  const { classId } = useParams();
  const classData = mockClasses.find(c => c.id === classId);

  if (!classData) return <div className="p-8 text-center text-gray-500">Class not found</div>;

  return (
    <div className="space-y-8 pb-10 animate__animated animate__fadeIn">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center relative overflow-hidden">
        <div className="relative z-10 w-full md:w-2/3">
           <span className="text-sm font-bold text-orange-500 bg-orange-50 px-3 py-1 rounded-md mb-3 inline-block">{classData.id}</span>
           <h1 className="text-3xl font-bold text-gray-800 mb-2">{classData.name}</h1>
           <p className="text-gray-500">{classData.department}</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
         <Card className="flex items-center p-6 gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-500">
               <Users size={24} />
            </div>
            <div>
               <p className="text-gray-500 text-xs font-medium mb-1 line-clamp-1">Enrolled Students</p>
               <h3 className="text-xl font-bold text-gray-800">{classData.studentsCount}</h3>
            </div>
         </Card>
          <Card className="flex items-center p-6 gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-500">
               <CheckCircle2 size={24} />
            </div>
            <div>
               <p className="text-gray-500 text-xs font-medium mb-1 line-clamp-1">Avg Attendance</p>
               <h3 className="text-xl font-bold text-gray-800">{classData.attendanceRate}%</h3>
            </div>
         </Card>
          <Card className="flex items-center p-6 gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-500">
               <BookOpen size={24} />
            </div>
            <div>
               <p className="text-gray-500 text-xs font-medium mb-1 line-clamp-1">Active Assignments</p>
               <h3 className="text-xl font-bold text-gray-800">{classData.assignmentsCreated}</h3>
            </div>
         </Card>
          <Card className="flex items-center p-6 gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-500">
               <FileText size={24} />
            </div>
            <div>
               <p className="text-gray-500 text-xs font-medium mb-1 line-clamp-1">Materials Up</p>
               <h3 className="text-xl font-bold text-gray-800">{classData.materials.length}</h3>
            </div>
         </Card>
      </div>

      {/* Quick Action Navigation */}
      <div className="flex flex-wrap gap-4">
         <Link to={`/classes/${classId}/attendance`} className="bg-orange-500 text-white px-5 py-2.5 rounded-xl font-semibold shadow-sm hover:bg-orange-600 transition-colors">Take Attendance</Link>
         <Link to={`/classes/${classId}/assignments`} className="bg-white text-gray-700 border border-gray-200 px-5 py-2.5 rounded-xl font-semibold shadow-sm hover:bg-gray-50 transition-colors">Assignments</Link>
         <Link to={`/classes/${classId}/materials`} className="bg-white text-gray-700 border border-gray-200 px-5 py-2.5 rounded-xl font-semibold shadow-sm hover:bg-gray-50 transition-colors">Materials</Link>
         <Link to={`/classes/${classId}/students`} className="bg-white text-gray-700 border border-gray-200 px-5 py-2.5 rounded-xl font-semibold shadow-sm hover:bg-gray-50 transition-colors">Students List</Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
         <Section title="Recent Assignments" action={<Link to={`/classes/${classId}/assignments`} className="text-orange-500 text-sm font-semibold hover:text-orange-600">View all</Link>}>
            <div className="space-y-4">
               {classData.assignments.slice(0, 2).map(a => <AssignmentCard key={a.id} assignment={a} />)}
               {classData.assignments.length === 0 && <p className="text-gray-500 text-sm">No recent assignments.</p>}
            </div>
         </Section>
         
         <Section title="Recent Materials" action={<Link to={`/classes/${classId}/materials`} className="text-orange-500 text-sm font-semibold hover:text-orange-600">View all</Link>}>
            <div className="flex flex-col gap-4">
               {classData.materials.slice(0, 3).map(m => <MaterialCard key={m.id} material={m} />)}
               {classData.materials.length === 0 && <p className="text-gray-500 text-sm">No materials uploaded.</p>}
            </div>
         </Section>
      </div>
    </div>
  );
}
