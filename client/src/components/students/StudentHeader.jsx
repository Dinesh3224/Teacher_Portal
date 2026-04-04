import { MessageSquare, Mail, Phone, Lock } from 'lucide-react';

export default function StudentHeader({ student, onOpenMessage }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 relative overflow-hidden flex flex-col md:flex-row items-center gap-6">
      
      {/* Decorative background blurring specific to student risk */}
      <div className={`absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full blur-3xl opacity-20 z-0 pointer-events-none 
         ${student.attendancePercentage < 75 ? 'bg-red-500' : 'bg-blue-500'}`}>
      </div>
      
      {/* Avatar */}
      <div className="relative z-10 shrink-0">
        <img src={student.avatarUrl} alt={student.name} className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl border-4 border-white shadow-md object-cover bg-gray-50" />
      </div>

      {/* Primary Info */}
      <div className="relative z-10 flex-1 text-center md:text-left space-y-1">
         <h1 className="text-2xl font-black text-gray-900">{student.name}</h1>
         <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-sm text-gray-600 font-medium">
            <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-gray-800">{student.rollNumber}</span>
            <span>•</span>
            <span>{student.course}</span>
            <span>•</span>
            <span>Sec {student.section}</span>
         </div>
         
         {/* Contact Badges */}
         <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-3">
            <div className="flex items-center gap-1.5 text-xs text-gray-500"><Mail size={14} /> {student.email}</div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500"><Phone size={14} /> {student.phone}</div>
         </div>
      </div>

      {/* Actions */}
      <div className="relative z-10 shrink-0 flex flex-col gap-3 w-full md:w-auto">
         <button onClick={onOpenMessage} className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl shadow-sm hover:bg-blue-700 transition-colors">
            <MessageSquare size={18} /> Send Message
         </button>
         <div className="flex items-center justify-center gap-1 text-[10px] text-gray-400 font-medium uppercase tracking-wider">
            <Lock size={10} /> Core profile is strictly read-only
         </div>
      </div>

    </div>
  );
}
