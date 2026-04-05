import { X, Calendar as CalendarIcon, Clock, Edit3 } from "lucide-react";
import { useState } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, addMonths, subMonths } from "date-fns";
import { Link } from "react-router-dom";

export default function RightPanel({ isOpen, onClose }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [quickNote, setQuickNote] = useState("");

  const days = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate)
  });

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const upcomingDeadlines = [
    { title: "Array Operations", course: "Data Structures", date: "Tomorrow" },
    { title: "SQL Lab Report", course: "Database Systems", date: "Oct 24" }
  ];

  return (
    <>
      {/* Mobile Backdrop — only when explicitly opened */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 xl:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Panel — hidden by default, slides in when toggled */}
      <aside
        className={`fixed right-0 top-0 h-screen w-[320px] border-l flex flex-col z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
      >
        {/* Panel Header */}
        <div
          className="flex items-center justify-between px-5 h-16 shrink-0 sticky top-0 z-10 border-b"
          style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
        >
          <h2 className="font-extrabold border-l-4 border-orange-500 pl-3" style={{ color: 'var(--text-primary)' }}>
            Command Center
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg transition-colors cursor-pointer hover:bg-orange-50"
            style={{ color: 'var(--text-muted)' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-5 pb-6 pt-3 space-y-5">

          {/* Calendar Card */}
          <div
            className="rounded-2xl p-4 shadow-sm border"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <CalendarIcon size={16} className="text-orange-500" /> {format(currentDate, "MMMM yyyy")}
              </h3>
              <div className="flex gap-1">
                <button onClick={prevMonth} className="px-1.5 hover:text-orange-600 cursor-pointer text-xs font-bold" style={{ color: 'var(--text-muted)' }}>&lt;</button>
                <button onClick={nextMonth} className="px-1.5 hover:text-orange-600 cursor-pointer text-xs font-bold" style={{ color: 'var(--text-muted)' }}>&gt;</button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center mb-2">
              {['Mo','Tu','We','Th','Fr','Sa','Su'].map(d => (
                <div key={d} className="text-[10px] font-bold" style={{ color: 'var(--text-muted)' }}>{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {days.map((day, idx) => (
                <div
                  key={idx}
                  className={`aspect-square flex items-center justify-center text-xs rounded-full font-medium transition-colors ${
                    !isSameMonth(day, currentDate) ? 'opacity-30' :
                    isToday(day) ? 'bg-orange-500 text-white font-bold shadow-md shadow-orange-500/20' :
                    'hover:bg-orange-50 cursor-pointer'
                  }`}
                  style={!isToday(day) && isSameMonth(day, currentDate) ? { color: 'var(--text-primary)' } : undefined}
                >
                  {format(day, "d")}
                </div>
              ))}
            </div>
          </div>

          {/* Today's Schedule Card */}
          <div
            className="rounded-2xl p-4 shadow-sm border"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
          >
            <h3 className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
              <Clock size={14} className="text-blue-500" /> Today's Schedule
            </h3>
            <div className="flex items-start gap-3 border-l-2 border-dashed border-orange-500 pl-3 relative mb-4">
              <div className="absolute -left-[5px] top-1 w-2 h-2 bg-orange-500 rounded-full"></div>
              <div>
                <p className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>10:00 AM - Data Structures</p>
                <p className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>Block A - Room 102</p>
              </div>
            </div>
            <div className="flex items-start gap-3 border-l-2 border-dashed pl-3 relative" style={{ borderColor: 'var(--border-strong)' }}>
              <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--border-strong)' }}></div>
              <div>
                <p className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>01:00 PM - Database Sys</p>
                <p className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>Block B - Lab 3</p>
              </div>
            </div>
          </div>

          {/* Quick Scratchpad Card */}
          <div
            className="rounded-2xl p-4 shadow-sm border relative group"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
          >
            <h3 className="text-xs font-bold text-orange-600 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Edit3 size={14} /> Quick Scratchpad
            </h3>
            <textarea
              value={quickNote}
              onChange={(e) => setQuickNote(e.target.value)}
              placeholder="Jot down quick ideas..."
              className="w-full bg-transparent border-0 focus:ring-0 resize-none text-sm min-h-[60px] outline-none"
              style={{ color: 'var(--text-primary)' }}
            />
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded shadow-sm"
                style={{ backgroundColor: 'var(--bg-input)', color: 'var(--text-muted)' }}
              >
                Auto-saving
              </span>
            </div>
          </div>

          {/* Upcoming Deadlines */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider mb-3 px-1" style={{ color: 'var(--text-secondary)' }}>
              Upcoming Deadlines
            </h3>
            <div className="space-y-2">
              {upcomingDeadlines.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col p-3 rounded-xl border shadow-sm relative overflow-hidden"
                  style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-400 rounded-l-xl"></div>
                  <div className="flex justify-between items-start pl-2">
                    <div>
                      <p className="text-[11px] font-bold truncate pr-2 max-w-[150px]" style={{ color: 'var(--text-primary)' }}>{item.title}</p>
                      <p className="text-[9px] truncate" style={{ color: 'var(--text-muted)' }}>{item.course}</p>
                    </div>
                    <span className="text-[9px] font-bold bg-red-50 text-red-600 px-1.5 py-0.5 rounded shrink-0">{item.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
