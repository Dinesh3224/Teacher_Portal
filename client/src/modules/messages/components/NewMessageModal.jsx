import { useState } from "react";
import { X, Send } from "lucide-react";
import { mockCourses, mockStudents } from "../data/mockMessages";

export default function NewMessageModal({ onClose, onSend }) {
  const [targetType, setTargetType] = useState("student"); // student, class, staff
  const [selectedEntity, setSelectedEntity] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!selectedEntity || !message.trim()) return;
    
    // Build new mock conversation
    const newConv = {
      id: `conv-new-${Date.now()}`,
      type: targetType === "class" ? "group" : "individual",
      courseId: targetType === "class" ? selectedEntity : null,
      courseName: targetType === "class" ? mockCourses.find(c => c.id === selectedEntity)?.name : null,
      participants: [
        { id: "teach-1", name: "Professor John", role: "teacher", avatar: "https://ui-avatars.com/api/?name=Professor+John&background=f97316&color=fff" }
      ],
      lastMessage: message,
      timestamp: new Date().toISOString(),
      unreadCount: 0,
      messages: [
        { id: `m-${Date.now()}`, senderId: "teach-1", text: message, timestamp: new Date().toISOString(), status: "sent", attachments: [] }
      ]
    };

    if (targetType === "student") {
      const stu = mockStudents.find(s => s.id === selectedEntity);
      newConv.participants.push({ 
        id: stu.id, 
        name: stu.name, 
        role: "student", 
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(stu.name)}&background=e2e8f0&color=475569` 
      });
    } else if (targetType === "class") {
      const course = mockCourses.find(c => c.id === selectedEntity);
      newConv.participants.push({ 
        id: `group-${course.id}`, 
        name: course.name, 
        role: "class", 
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(course.name)}&background=DBEAFE&color=1D4ED8` 
      });
    } else if (targetType === "staff") {
      newConv.courseName = "Department Staff";
      newConv.participants.push({ 
        id: "staff-2", 
        name: "Dept Office", 
        role: "staff", 
        avatar: "https://ui-avatars.com/api/?name=Dept+Office&background=D1FAE5&color=065F46" 
      });
    }

    onSend(newConv);
    onClose();
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400 transition-all";

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 flex flex-col animate__animated animate__zoomIn animate__faster">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800">New Message</h2>
          <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Send To</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" checked={targetType === "student"} onChange={() => {setTargetType("student"); setSelectedEntity("")}} className="text-orange-500 focus:ring-orange-200" />
                <span className="text-sm font-medium text-gray-700">Student</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" checked={targetType === "class"} onChange={() => {setTargetType("class"); setSelectedEntity("")}} className="text-orange-500 focus:ring-orange-200" />
                <span className="text-sm font-medium text-gray-700">Entire Class</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" checked={targetType === "staff"} onChange={() => {setTargetType("staff"); setSelectedEntity("staff-1")}} className="text-orange-500 focus:ring-orange-200" />
                <span className="text-sm font-medium text-gray-700">Office Staff</span>
              </label>
            </div>
          </div>

          {targetType === "student" && (
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Select Student</label>
              <select className={inputClass} value={selectedEntity} onChange={(e) => setSelectedEntity(e.target.value)}>
                <option value="">-- Choose Student --</option>
                {mockStudents.map(s => <option key={s.id} value={s.id}>{s.name} ({s.course})</option>)}
              </select>
            </div>
          )}

          {targetType === "class" && (
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Select Class</label>
              <select className={inputClass} value={selectedEntity} onChange={(e) => setSelectedEntity(e.target.value)}>
                <option value="">-- Choose Course --</option>
                {mockCourses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Message</label>
            <textarea 
              className={`${inputClass} resize-none`} 
              rows={4} 
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50 rounded-b-2xl">
          <button onClick={onClose} className="px-4 py-2 font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50">Cancel</button>
          <button 
            disabled={!selectedEntity || !message.trim()}
            onClick={handleSend} 
            className="px-5 py-2 font-bold text-white bg-orange-500 rounded-xl hover:bg-orange-600 flex items-center gap-2 disabled:opacity-50 transition-colors"
          >
            <Send size={16} /> Send Message
          </button>
        </div>
      </div>
    </div>
  );
}
