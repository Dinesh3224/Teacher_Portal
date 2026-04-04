import { useParams, Link } from "react-router-dom";
import { mockClasses } from "../data/mockClasses";
import { ArrowLeft, UploadCloud } from "lucide-react";
import MaterialCard from "../components/MaterialCard";

export default function Materials() {
  const { classId } = useParams();
  const classData = mockClasses.find(c => c.id === classId);

  if (!classData) return <div>Class not found</div>;

  const handleUpload = () => {
     // TODO: Integrate file upload logic/modal
     alert("Upload Material Placeholder");
  }

  return (
    <div className="space-y-6 animate__animated animate__fadeIn">
       <div className="flex items-center justify-between">
         <div className="flex items-center gap-4">
            <Link to={`/classes/${classId}`} className="p-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-500 transition-colors">
               <ArrowLeft size={20} />
            </Link>
            <div>
               <h1 className="text-2xl font-bold text-gray-800">Class Materials <span className="text-gray-400 font-normal">({classData.id})</span></h1>
               <p className="text-gray-500 mt-1">Upload and manage syllabus, slides, and notes.</p>
            </div>
         </div>
         <button onClick={handleUpload} className="bg-orange-500 text-white px-4 py-2 rounded-xl font-semibold shadow-sm hover:bg-orange-600 transition-colors flex items-center gap-2 text-sm">
            <UploadCloud size={18}/> Upload File
         </button>
      </div>

      <div className="flex flex-col gap-4 max-w-4xl">
         {classData.materials.map(m => (
            <MaterialCard key={m.id} material={m} />
         ))}
         {classData.materials.length === 0 && (
            <div className="p-8 text-center bg-white rounded-2xl border border-gray-100 text-gray-500">
               No materials uploaded yet.
            </div>
         )}
      </div>
    </div>
  );
}
