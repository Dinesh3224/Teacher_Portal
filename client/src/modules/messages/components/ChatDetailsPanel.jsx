import { Users, FileText, BellOff, Trash2, LogOut, Info } from "lucide-react";

export default function ChatDetailsPanel({ conversation }) {
  if (!conversation) return <div className="w-[300px] bg-white border-l border-gray-100 hidden xl:flex"></div>;

  const isGroup = conversation.type === "group";
  const targetName = conversation.courseName || conversation.participants.find(p => p.role !== 'teacher')?.name;
  
  const allAttachments = conversation.messages.reduce((acc, msg) => {
    if (msg.attachments) acc.push(...msg.attachments);
    return acc;
  }, []);

  return (
    <div className="w-[300px] flex-col h-full bg-white border-l border-gray-100 hidden xl:flex shrink-0">
      {/* Header Profile */}
      <div className="p-6 flex flex-col items-center border-b border-gray-100 text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full mb-4 flex items-center justify-center overflow-hidden border-4 border-white shadow-sm">
          <img 
            src={isGroup ? `https://ui-avatars.com/api/?name=${encodeURIComponent(targetName)}&background=DBEAFE&color=1D4ED8&size=128` : conversation.participants.find(p => p.role !== 'teacher')?.avatar} 
            alt={targetName} 
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="font-bold text-gray-900 text-lg">{targetName}</h3>
        <p className="text-xs text-gray-500 mt-1 capitalize">{conversation.type} Conversation</p>
      </div>

      <div className="flex-1 overflow-y-auto w-full">
        {/* Participants for Group */}
        {isGroup && (
          <div className="p-6 border-b border-gray-100">
             <div className="flex items-center justify-between mb-4">
               <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                 <Users size={14} /> Participants
               </h4>
               <span className="text-[10px] font-bold bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{conversation.participants.find(p => p.role === 'class')?.size || 1}</span>
             </div>
             <p className="text-sm text-gray-600">Entire {targetName} class is included in this conversation.</p>
          </div>
        )}

        {/* Shared Files */}
        <div className="p-6 border-b border-gray-100">
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
            <FileText size={14} /> Shared Files
          </h4>
          {allAttachments.length > 0 ? (
            <div className="space-y-3">
              {allAttachments.map((att, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
                    <FileText size={14} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{att.name}</p>
                    <p className="text-[10px] text-gray-400">{att.size}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
             <p className="text-sm text-gray-400 italic">No files shared yet.</p>
          )}
        </div>

        {/* Actions */}
        <div className="p-6">
           <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
             <Info size={14} /> Options
           </h4>
           <div className="space-y-1">
             <button className="w-full flex items-center gap-3 p-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-xl transition-colors">
               <BellOff size={16} className="text-gray-400" /> Mute Notifications
             </button>
             <button className="w-full flex items-center gap-3 p-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors">
               <Trash2 size={16} className="text-red-400" /> Clear Chat History
             </button>
             {isGroup && (
                <button className="w-full flex items-center gap-3 p-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors">
                  <LogOut size={16} className="text-red-400" /> Leave Group
                </button>
             )}
           </div>
        </div>
      </div>
    </div>
  );
}
