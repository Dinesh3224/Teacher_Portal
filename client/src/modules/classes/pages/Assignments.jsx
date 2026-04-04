import { useParams, Link } from "react-router-dom";
import { mockClasses } from "../data/mockClasses";
import { ArrowLeft, Plus } from "lucide-react";
import AssignmentCard from "../components/AssignmentCard";

export default function Assignments() {
  const { classId } = useParams();
  const classData = mockClasses.find(c => c.id === classId);

  if (!classData) return <div>Class not found</div>;

  const handleCreate = () => {
     // TODO: Open modal for creating assignment
     alert("Create Assignment Modal Placeholder");
  }

  return (
    <div className="space-y-6 animate__animated animate__fadeIn">
       <div className="flex items-center justify-between">
         <div className="flex items-center gap-4">
            <Link to={`/classes/${classId}`} className="p-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-500 transition-colors">
               <ArrowLeft size={20} />
            </Link>
            <div>
               <h1 className="text-2xl font-bold text-gray-800">Assignments <span className="text-gray-400 font-normal">({classData.id})</span></h1>
               <p className="text-gray-500 mt-1">Create and grade course assignments.</p>
            </div>
         </div>
         <button onClick={handleCreate} className="bg-orange-500 text-white px-4 py-2 rounded-xl font-semibold shadow-sm hover:bg-orange-600 transition-colors flex items-center gap-2 text-sm">
            <Plus size={18}/> New Assignment
         </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {classData.assignments.map(a => (
            <AssignmentCard key={a.id} assignment={a} />
         ))}
         {classData.assignments.length === 0 && (
            <div className="col-span-full p-8 text-center bg-white rounded-2xl border border-gray-100 text-gray-500">
               No assignments created yet.
            </div>
         )}
      </div>
    </div>
  );
}
