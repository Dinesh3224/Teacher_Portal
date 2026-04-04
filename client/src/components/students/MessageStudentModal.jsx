import { useState } from 'react';
import { useStudents } from '../../context/StudentContext';
import { X, Send } from 'lucide-react';

export default function MessageStudentModal({ student, onClose }) {
  const { sendStudentMessage } = useStudents();
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const handleSend = () => {
    if (!subject || !body) {
      alert('Please fill out all fields.');
      return;
    }
    sendStudentMessage(student.id, subject, body);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate__animated animate__fadeIn animate__faster">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50 shrink-0">
          <div>
            <h2 className="font-bold text-gray-900">Message Student</h2>
            <p className="text-xs text-gray-500 mt-0.5">To: {student.name} ({student.rollNumber})</p>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-900 bg-white rounded-lg border border-gray-200 shadow-sm transition-colors">
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <div className="space-y-1.5">
             <label className="text-sm font-semibold text-gray-700">Subject</label>
             <input 
               type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="e.g. Missing Assignment"
               className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500"
             />
          </div>
          <div className="space-y-1.5 flex-1">
             <label className="text-sm font-semibold text-gray-700">Message</label>
             <textarea 
               value={body} onChange={(e) => setBody(e.target.value)} rows="5" placeholder="Type your message here..."
               className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 resize-none"
             ></textarea>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 hover:bg-gray-100 rounded-xl transition-colors">
            Cancel
          </button>
          <button onClick={handleSend} className="px-6 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition-colors flex items-center gap-2">
            <Send size={16} /> Send Message
          </button>
        </div>
      </div>
    </div>
  );
}
