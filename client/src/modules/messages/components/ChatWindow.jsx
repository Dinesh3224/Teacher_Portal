import { useEffect, useRef } from "react";
import { MessageSquare, MoreVertical, Phone, Video } from "lucide-react";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";

export default function ChatWindow({ conversation, onSendMessage }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation?.messages]);

  if (!conversation) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-[#F8F9FC] w-full h-full text-center p-8">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
          <MessageSquare size={32} className="text-gray-300" />
        </div>
        <h3 className="text-xl font-bold text-gray-800">Your Messages</h3>
        <p className="text-sm text-gray-500 mt-2 max-w-sm leading-relaxed">
          Select a conversation from the sidebar or start a new one to chat with your students, classes, or department staff.
        </p>
      </div>
    );
  }

  const targetName = conversation.courseName || conversation.participants.find(p => p.role !== 'teacher')?.name;

  return (
    <div className="flex-1 flex flex-col h-full bg-[#F8F9FC] w-full min-w-0">
      {/* Header */}
      <div className="h-[72px] px-6 bg-white border-b border-gray-100 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3 pr-2">
           <div>
             <h3 className="font-bold text-gray-900 text-lg line-clamp-1">{targetName}</h3>
             <p className="text-xs text-green-500 font-medium tracking-wide">Online</p>
           </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
           <button className="p-2 text-gray-400 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors hidden sm:block">
             <Phone size={18} />
           </button>
           <button className="p-2 text-gray-400 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors hidden sm:block">
             <Video size={18} />
           </button>
           <button className="p-2 text-gray-400 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
             <MoreVertical size={18} />
           </button>
        </div>
      </div>

      {/* Messages Area - this div must take remaining height and scroll */}
      <div className="flex-1 overflow-y-auto w-full p-6 space-y-6">
        <div className="text-center my-6">
           <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100">
              Start of Conversation
           </span>
        </div>
        
        {conversation.messages.map((msg) => (
          <MessageBubble 
            key={msg.id} 
            message={msg} 
            isOwn={msg.senderId === "teach-1"} 
            participants={conversation.participants}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <MessageInput onSend={(text, attachments) => onSendMessage(conversation.id, text, attachments)} />
    </div>
  );
}
