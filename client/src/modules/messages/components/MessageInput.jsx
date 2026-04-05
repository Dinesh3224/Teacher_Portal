import { Paperclip, Smile, Send } from "lucide-react";
import { useState, useRef } from "react";

export default function MessageInput({ onSend }) {
  const [text, setText] = useState("");
  const fileInputRef = useRef(null);

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text.trim());
    setText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const attachFile = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create mock attachment
      const att = {
        id: `att-${Date.now()}`,
        name: file.name,
        type: "document",
        size: "200 KB"
      };
      // Send immediately as an attachment message
      onSend("", [att]);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="p-4 bg-white border-t border-gray-100 flex items-end gap-3 z-10 shrink-0">
      <input 
        type="file" 
        className="hidden" 
        ref={fileInputRef} 
        onChange={handleFileChange}
      />
      
      <button 
        onClick={attachFile}
        className="p-3 bg-gray-50 text-gray-400 hover:text-gray-600 rounded-xl transition-colors hover:bg-gray-100 shrink-0" 
        title="Attach file"
      >
        <Paperclip size={20} />
      </button>
      
      <div className="flex-1 bg-gray-50 rounded-xl border border-gray-200 focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-200 transition-all flex items-end min-h-[48px]">
        <textarea 
          placeholder="Type your message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 max-h-32 bg-transparent resize-none outline-none py-3 px-4 text-sm text-gray-800 placeholder-gray-400 py-[13px]"
          rows={1}
        />
        <button className="p-3 text-gray-400 hover:text-gray-600 transition-colors shrink-0" title="Add emoji">
          <Smile size={20} />
        </button>
      </div>

      <button 
        onClick={handleSend}
        disabled={!text.trim()}
        className="p-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:bg-gray-300 disabled:text-gray-500 shrink-0 shadow-sm shadow-orange-200 active:scale-[0.97]"
      >
        <Send className="ml-0.5" size={20} />
      </button>
    </div>
  );
}
