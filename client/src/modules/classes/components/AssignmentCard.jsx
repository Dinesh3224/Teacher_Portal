import { Calendar, FileText, CheckCircle2, MoreVertical, Edit2, Trash2 } from "lucide-react";
import Card from "../../../components/ui/Card";

export default function AssignmentCard({ assignment }) {
  
  const handleGrade = () => {
    // TODO: Open grading modal or page
    alert("Grading dashboard placeholder endpoint.");
  };

  const handleEdit = () => {
    alert("Edit assignment placeholder.");
  };

  const handleDelete = () => {
    alert("Delete assignment placeholder.");
  };

  return (
    <Card className="flex flex-col h-full border border-gray-100 hover:shadow-md transition-shadow relative group">
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
         <button onClick={handleEdit} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"><Edit2 size={16}/></button>
         <button onClick={handleDelete} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={16}/></button>
      </div>

      <div className="flex items-start space-x-3 mb-4 pr-12">
         <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <FileText size={20} />
         </div>
         <div>
            <h4 className="font-bold text-gray-800 text-base">{assignment.title}</h4>
            <div className="flex items-center text-xs text-red-500 font-medium mt-1 gap-1">
               <Calendar size={14} /> Due {assignment.dueDate}
            </div>
         </div>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-3 mb-4 space-y-2">
         <div className="flex justify-between text-xs">
            <span className="text-gray-500">Max Marks</span>
            <span className="font-bold text-gray-800">{assignment.maxMarks}</span>
         </div>
         <div className="flex justify-between text-xs">
            <span className="text-gray-500">Submissions</span>
            <span className="font-bold text-gray-800">{assignment.submittedCount} received</span>
         </div>
      </div>

      <button onClick={handleGrade} className="mt-auto w-full flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-purple-300 hover:bg-purple-50 hover:text-purple-700 text-gray-700 text-sm font-semibold py-2 px-4 rounded-xl transition-all">
         <CheckCircle2 size={16} /> Grade Submissions
      </button>
    </Card>
  );
}
