import { format } from "date-fns";
import { Check, CheckCheck, FileText, Download } from "lucide-react";

export default function MessageBubble({ message, isOwn, participants }) {
  const sender = participants.find(p => p.id === message.senderId) || { name: "Unknown" };

  const StatusIcon = () => {
    if (!isOwn) return null;
    if (message.status === "read") return <CheckCheck size={14} className="text-blue-500" />;
    if (message.status === "delivered") return <CheckCheck size={14} className="text-gray-400" />;
    return <Check size={14} className="text-gray-400" />;
  };

  return (
    <div className={`flex w-full mb-4 ${isOwn ? "justify-end" : "justify-start"}`}>
      <div className={`flex max-w-[75%] lg:max-w-[65%] ${isOwn ? "flex-row-reverse" : "flex-row"} gap-2 items-end`}>
        {/* Avatar */}
        {!isOwn && (
          <img 
            src={sender.avatar || `https://ui-avatars.com/api/?name=${sender.name}&background=e2e8f0&color=475569`} 
            alt={sender.name} 
            className="w-6 h-6 rounded-full shrink-0 mb-5"
          />
        )}

        <div className={`flex flex-col ${isOwn ? "items-end" : "items-start"}`}>
          {/* Name label for group chats */}
          {!isOwn && (
            <span className="text-[10px] text-gray-500 font-medium mb-1 ml-1">{sender.name}</span>
          )}

          {/* Bubble content */}
          <div className={`relative px-4 py-2.5 rounded-2xl text-[14px] leading-relaxed shadow-sm ${
            isOwn 
              ? "bg-orange-500 text-white rounded-br-sm" 
              : "bg-white border border-gray-100 text-gray-800 rounded-bl-sm"
          }`}>
            {message.attachments && message.attachments.length > 0 && (
              <div className="space-y-2 mb-2">
                {message.attachments.map(att => (
                  <div key={att.id} className={`flex items-center gap-2 p-2 rounded-xl border ${isOwn ? "bg-orange-600/30 border-orange-400/30" : "bg-gray-50 border-gray-200"}`}>
                    <FileText size={20} className={isOwn ? "text-orange-100" : "text-gray-400"} />
                    <div className="flex-1 min-w-0 pr-4">
                      <p className={`text-xs font-bold truncate ${isOwn ? "text-white" : "text-gray-800"}`}>{att.name}</p>
                      <p className={`text-[10px] ${isOwn ? "text-orange-200" : "text-gray-500"}`}>{att.size}</p>
                    </div>
                    <button className={`p-1.5 rounded-lg transition-colors ${isOwn ? "hover:bg-orange-500 text-white" : "hover:bg-gray-200 text-gray-600"}`}>
                       <Download size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            <p className="whitespace-pre-wrap">{message.text}</p>
          </div>

          {/* Meta data */}
          <div className="flex items-center gap-1 mt-1 px-1">
            <span className="text-[10px] text-gray-400">
              {format(new Date(message.timestamp), "hh:mm a")}
            </span>
            <StatusIcon />
          </div>
        </div>
      </div>
    </div>
  );
}
