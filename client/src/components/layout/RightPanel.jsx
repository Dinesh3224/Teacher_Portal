import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Clock, BookOpen, Megaphone, MessageSquare, CheckCircle, CalendarDays, AlertCircle } from "lucide-react";
import { format, getDate, getDay, getDaysInMonth, startOfMonth } from "date-fns";

export default function RightPanel({ isOpen, onClose }) {
  const today = new Date();
  const currentDay = getDate(today);
  const monthName = format(today, "MMMM");
  const dayName = format(today, "EEEE");
  const year = today.getFullYear();

  // Generate simple calendar grid
  const daysInMonth = getDaysInMonth(today);
  const firstDayOfWeek = getDay(startOfMonth(today));
  const calendarDays = [];
  for (let i = 0; i < firstDayOfWeek; i++) calendarDays.push(null);
  for (let i = 1; i <= daysInMonth; i++) calendarDays.push(i);

  // Mock data
  const scheduleItems = [
    { id: 1, time: "09:00 - 10:30 AM", course: "Advanced Algorithms", room: "Room 304 • CS Dept", color: "orange" },
    { id: 2, time: "11:00 - 12:30 PM", course: "Data Structures", room: "Lab B • CS Dept", color: "blue" },
  ];

  const upcomingDeadlines = [
    { id: 1, title: "Array Operations", course: "Data Structures", due: "Tomorrow" },
    { id: 2, title: "ER Diagram Project", course: "Database Systems", due: "In 3 days" },
  ];

  const recentAnnouncements = [
    { id: 1, title: "Mid-Semester Exam Schedule", time: "2 hrs ago" },
    { id: 2, title: "Campus Event - Tech Fest", time: "Yesterday" },
  ];

  const attendanceStatus = { completed: 2, total: 4 };

  return (
    <aside
      className={`bg-white border-l border-gray-100 flex flex-col overflow-hidden transition-all duration-300 ease-in-out shrink-0 ${
        isOpen ? "w-80 opacity-100" : "w-0 opacity-0 border-l-0"
      }`}
    >
      <div className="w-80 h-full overflow-y-auto p-5 space-y-6">
        {/* Calendar Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-gray-800 text-sm">{monthName} {year}</h3>
              <p className="text-xs text-gray-400">{dayName}</p>
            </div>
            <div className="flex gap-1">
              <button className="p-1 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
                <ChevronLeft size={16} />
              </button>
              <button className="p-1 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-xs">
            {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
              <div key={i} className={`font-semibold py-1 ${i === 0 || i === 6 ? "text-orange-400" : "text-gray-400"}`}>
                {d}
              </div>
            ))}
            {calendarDays.map((day, i) => (
              <div
                key={i}
                className={`py-1 rounded-md text-xs font-medium ${
                  day === currentDay
                    ? "bg-orange-500 text-white font-bold shadow-sm"
                    : day
                    ? "text-gray-700 hover:bg-gray-50 cursor-pointer"
                    : ""
                }`}
              >
                {day}
              </div>
            ))}
          </div>
        </div>

        {/* Today's Schedule */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
              <Clock size={13} /> Today's Schedule
            </h4>
            <Link to="/timetable" className="text-[10px] font-bold text-orange-500 hover:text-orange-600">View All</Link>
          </div>
          <div className="space-y-2.5">
            {scheduleItems.map((item) => (
              <div
                key={item.id}
                className={`p-3 rounded-xl relative overflow-hidden border ${
                  item.color === "orange"
                    ? "bg-orange-50/50 border-orange-100"
                    : "bg-blue-50/50 border-blue-100"
                }`}
              >
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${
                  item.color === "orange" ? "bg-orange-500" : "bg-blue-500"
                }`}></div>
                <p className={`text-[10px] font-semibold mb-0.5 ${
                  item.color === "orange" ? "text-orange-500" : "text-blue-500"
                }`}>{item.time}</p>
                <h5 className="text-sm font-bold text-gray-800">{item.course}</h5>
                <p className="text-[10px] text-gray-500 mt-0.5">{item.room}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Attendance Status */}
        <div className="bg-green-50 border border-green-100 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle size={14} className="text-green-500" />
            <h4 className="text-xs font-bold text-green-700 uppercase tracking-wider">Attendance Today</h4>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-bold text-green-700">{attendanceStatus.completed}</span>
            <span className="text-sm text-green-600 mb-0.5">/ {attendanceStatus.total} Classes</span>
          </div>
          <div className="w-full bg-green-200 rounded-full h-1.5 mt-2">
            <div
              className="bg-green-500 h-1.5 rounded-full transition-all"
              style={{ width: `${(attendanceStatus.completed / attendanceStatus.total) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div>
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <AlertCircle size={13} /> Upcoming Deadlines
          </h4>
          <div className="space-y-2">
            {upcomingDeadlines.map((d) => (
              <Link to="/assignments" key={d.id} className="block p-3 bg-gray-50 border border-gray-100 rounded-xl hover:bg-orange-50/50 hover:border-orange-100 transition-colors">
                <h5 className="text-sm font-semibold text-gray-800">{d.title}</h5>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[10px] text-gray-400">{d.course}</span>
                  <span className="text-[10px] font-bold text-orange-500">{d.due}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Announcements */}
        <div>
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Megaphone size={13} /> Announcements
          </h4>
          <div className="space-y-2">
            {recentAnnouncements.map((a) => (
              <Link to="/announcements" key={a.id} className="block p-3 bg-gray-50 border border-gray-100 rounded-xl hover:bg-orange-50/50 hover:border-orange-100 transition-colors">
                <h5 className="text-xs font-semibold text-gray-800 line-clamp-1">{a.title}</h5>
                <span className="text-[10px] text-gray-400 mt-0.5 block">{a.time}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Message */}
        <Link
          to="/messages"
          className="flex items-center justify-center gap-2 w-full py-2.5 bg-orange-500 text-white text-sm font-bold rounded-xl hover:bg-orange-600 transition-colors shadow-sm shadow-orange-200 active:scale-[0.98]"
        >
          <MessageSquare size={16} /> Send Quick Message
        </Link>
      </div>
    </aside>
  );
}
