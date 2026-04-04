import { FileDown, MoreHorizontal, FileText, MonitorPlay, FileArchive, Edit, Trash } from "lucide-react";
import Card from "../../../components/ui/Card";

export default function MaterialCard({ material }) {
  const getIconAndColor = (type) => {
     switch(type) {
        case 'PDF': return { icon: FileText, bg: 'bg-red-100', text: 'text-red-500' };
        case 'PPT': return { icon: MonitorPlay, bg: 'bg-orange-100', text: 'text-orange-500' };
        case 'ZIP': return { icon: FileArchive, bg: 'bg-blue-100', text: 'text-blue-500' };
        default: return { icon: FileText, bg: 'bg-gray-100', text: 'text-gray-500' };
     }
  };

  const { icon: IconMarker, bg, text } = getIconAndColor(material.type);

  const handleDownload = () => {
    // TODO: Trigger file download logic
    alert(`Downloading ${material.title} (${material.type})`);
  };

  const handleDelete = () => {
     alert(`Placeholder to delete ${material.id}`);
  }

  return (
    <Card className="flex items-center justify-between p-4 group">
      <div className="flex items-center gap-4">
         <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xs ${bg} ${text}`}>
            {material.type}
         </div>
         <div>
            <h4 className="font-bold text-gray-800 text-sm mb-0.5 group-hover:text-orange-600 transition-colors cursor-pointer" onClick={handleDownload}>{material.title}</h4>
            <div className="flex items-center gap-2 text-xs text-gray-500">
               <span>{material.size}</span>
               <span>•</span>
               <span>Uploaded {material.date}</span>
            </div>
         </div>
      </div>
      <div className="flex items-center gap-2">
         <button onClick={handleDownload} className="p-2 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors" title="Download">
            <FileDown size={18} />
         </button>
         <div className="relative group/menu">
            <button className="p-2 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
               <MoreHorizontal size={18} />
            </button>
            <div className="absolute right-0 mt-1 w-32 bg-white border border-gray-100 rounded-xl shadow-lg opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all z-10 py-1">
               <button className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm flex items-center gap-2 text-gray-700">
                  <Edit size={14}/> Edit
               </button>
               <button onClick={handleDelete} className="w-full text-left px-4 py-2 hover:bg-red-50 hover:text-red-600 text-sm flex items-center gap-2 text-gray-700">
                  <Trash size={14}/> Delete
               </button>
            </div>
         </div>
      </div>
    </Card>
  );
}
