import { format, isToday, isYesterday } from "date-fns";
import { Check, CheckCheck, Users } from "lucide-react";

export default function ConversationList({ 
  conversations, 
  activeId, 
  onSelect,
  searchQuery,
  setSearchQuery 
}) {

  const formatTime = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    if (isToday(date)) return format(date, "hh:mm a");
    if (isYesterday(date)) return "Yesterday";
    return format(date, "dd/MM/yy");
  };

  const filtered = conversations.filter(c => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    const name = c.courseName || c.participants.find(p => p.role !== 'teacher')?.name || "";
    return name.toLowerCase().includes(q) || c.lastMessage.toLowerCase().includes(q);
  });

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-100 w-full md:w-[320px] lg:w-[380px] shrink-0">
      {/* Search Header */}
      <div className="p-4 border-b border-gray-100">
        <input 
          type="text" 
          placeholder="Search messages..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-gray-50 border border-gray-100 rounded-xl py-2 px-4 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400 text-sm transition-all text-gray-700"
        />
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto w-full">
        {filtered.length > 0 ? (
          filtered.map((conv) => {
            const isGroup = conv.type === "group";
            const targetUser = conv.participants.find(p => p.role !== 'teacher');
            const name = conv.courseName || targetUser?.name || "Unknown";
            const avatar = isGroup 
              ? `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=DBEAFE&color=1D4ED8` 
              : targetUser?.avatar;

            return (
              <button
                key={conv.id}
                onClick={() => onSelect(conv)}
                className={`w-full text-left p-4 border-b border-gray-50 transition-colors flex items-start gap-4 ${
                  activeId === conv.id ? "bg-orange-50/50" : "hover:bg-gray-50"
                }`}
              >
                {/* Avatar */}
                <div className="relative shrink-0">
                  <img src={avatar} alt={name} className="w-12 h-12 rounded-full object-cover shadow-sm bg-white" />
                  {isGroup && (
                    <div className="absolute -bottom-1 -right-1 bg-blue-100 text-blue-600 rounded-full p-1 border-2 border-white">
                      <Users size={10} />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 pr-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className={`text-sm truncate pr-2 ${conv.unreadCount > 0 ? "font-bold text-gray-900" : "font-semibold text-gray-800"}`}>
                      {name}
                    </h4>
                    <span className={`text-[10px] shrink-0 ${conv.unreadCount > 0 ? "font-bold text-orange-600" : "text-gray-400"}`}>
                      {formatTime(conv.timestamp)}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className={`text-xs truncate ${conv.unreadCount > 0 ? "font-bold text-gray-800" : "text-gray-500"}`}>
                      {conv.lastMessage}
                    </p>
                    {conv.unreadCount > 0 && (
                      <span className="shrink-0 ml-2 w-5 h-5 bg-orange-500 text-white rounded-full flex items-center justify-center text-[10px] font-bold">
                        {conv.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            )
          })
        ) : (
          <div className="p-8 text-center text-gray-400 text-sm">
            {searchQuery ? "No conversations found" : "No messages yet"}
          </div>
        )}
      </div>
    </div>
  );
}
