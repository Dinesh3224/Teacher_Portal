import { useState } from "react";
import { Plus } from "lucide-react";
import { useMessages } from "../../../context/MessageContext";
import ConversationList from "../components/ConversationList";
import ChatWindow from "../components/ChatWindow";
import ChatDetailsPanel from "../components/ChatDetailsPanel";
import NewMessageModal from "../components/NewMessageModal";

export default function MessagesPage() {
  const { conversations, sendMessage, markAsRead, createNewConversation } = useMessages();
  const [activeConvId, setActiveConvId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const activeConversation = conversations.find(c => c.id === activeConvId);

  // Automatically mark as read when selecting
  const handleSelectConversation = (conv) => {
    setActiveConvId(conv.id);
    if (conv.unreadCount > 0) {
      markAsRead(conv.id);
    }
  };

  const handleSendMessage = (convId, text, attachments) => {
    sendMessage(convId, text, attachments);
  };

  const handleCreateNew = (newConv) => {
    createNewConversation(newConv);
    setActiveConvId(newConv.id);
  };

  // Adjust height using standard classes layout relative to the header layout.
  return (
    <div className="flex flex-col h-[calc(100vh-140px)] animate__animated animate__fadeIn">
      {/* Header Bar */}
      <div className="flex items-center justify-between mb-4 shrink-0">
        <div>
          <h1 className="text-[28px] font-bold text-gray-800 tracking-tight">Messages</h1>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-all duration-200 flex items-center gap-2 shadow-sm shadow-orange-200 active:scale-[0.97]"
        >
          <Plus size={18} /> New Message
        </button>
      </div>

      {/* Main App Container */}
      <div className="flex-1 overflow-hidden bg-white rounded-2xl shadow-sm border border-gray-100 flex min-h-0 w-full">
        {/* Left sidebar: Conversations */}
        <ConversationList 
          conversations={conversations}
          activeId={activeConvId}
          onSelect={handleSelectConversation}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        
        {/* Center: Chat Window */}
        <ChatWindow 
          conversation={activeConversation}
          onSendMessage={handleSendMessage}
        />

        {/* Right sidebar: Details */}
        <ChatDetailsPanel 
          conversation={activeConversation}
        />
      </div>

      {isModalOpen && (
        <NewMessageModal 
          onClose={() => setIsModalOpen(false)}
          onSend={handleCreateNew}
        />
      )}
    </div>
  );
}
