import { useParams, Link } from "react-router-dom";
import { mockClasses } from "../data/mockClasses";
import { ArrowLeft } from "lucide-react";
import StudentTable from "../components/StudentTable";

export default function Students() {
  const { classId } = useParams();
  const classData = mockClasses.find(c => c.id === classId);

  if (!classData) return <div>Class not found</div>;

  return (
    <div className="space-y-6 animate__animated animate__fadeIn">
       <div className="flex items-center gap-4">
         <Link to={`/classes/${classId}`} className="p-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-500 transition-colors">
            <ArrowLeft size={20} />
         </Link>
         <div>
           <h1 className="text-2xl font-bold text-gray-800">Students <span className="text-gray-400 font-normal">({classData.id})</span></h1>
           <p className="text-gray-500 mt-1">Manage enrolled students and track individual performance.</p>
         </div>
      </div>

      <StudentTable students={classData.students} />
    </div>
  );
}
