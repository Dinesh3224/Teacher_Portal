import { createContext, useContext, useState } from "react";
import { mockConversations } from "../modules/messages/data/mockMessages";

const MessageContext = createContext();

export function MessageProvider({ children }) {
  const [conversations, setConversations] = useState(mockConversations);
  
  // Computed values
  const unreadCount = conversations.reduce((sum, conv) => sum + (conv.unreadCount || 0), 0);
  
  // Sort conversations so that ones with unread messages are first, then newest
  const sortedConversations = [...conversations].sort((a, b) => {
    if (a.unreadCount > 0 && b.unreadCount === 0) return -1;
    if (b.unreadCount > 0 && a.unreadCount === 0) return 1;
    return new Date(b.timestamp) - new Date(a.timestamp);
  });

  const getConversationById = (id) => conversations.find(c => c.id === id);

  const sendMessage = (conversationId, text, attachments = []) => {
    setConversations(prev => prev.map(conv => {
      if (conv.id === conversationId) {
        const newMessage = {
          id: `m-${Date.now()}`,
          senderId: "teach-1", // Current user
          text,
          timestamp: new Date().toISOString(),
          status: "sent",
          attachments
        };
        return {
          ...conv,
          lastMessage: text || (attachments.length > 0 ? "Sent an attachment" : ""),
          timestamp: newMessage.timestamp,
          messages: [...conv.messages, newMessage]
        };
      }
      return conv;
    }));
  };

  const markAsRead = (conversationId) => {
    setConversations(prev => prev.map(conv => 
      conv.id === conversationId ? { ...conv, unreadCount: 0 } : conv
    ));
  };
  
  const createNewConversation = (newConv) => {
    setConversations([newConv, ...conversations]);
  };

  // Mock API call simulation for notifications
  const markAllRead = () => {
    setConversations(prev => prev.map(conv => ({ ...conv, unreadCount: 0 })));
  };

  return (
    <MessageContext.Provider value={{
      conversations: sortedConversations,
      unreadCount,
      getConversationById,
      sendMessage,
      markAsRead,
      markAllRead,
      createNewConversation
    }}>
      {children}
    </MessageContext.Provider>
  );
}

export function useMessages() {
  return useContext(MessageContext);
}
