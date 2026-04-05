import { Link, useNavigate } from "react-router-dom";
import {
  UsersRound, BookOpen, Clock, Megaphone, MessageSquare,
  ChevronRight, UploadCloud, FileText, CheckCircle
} from "lucide-react";
import { format } from "date-fns";

export default function Dashboard() {
  const navigate = useNavigate();
  const currentDate = format(new Date(), "EEEE, MMMM do, yyyy");

  // Mock data for the dashboard features
  const stats = [
    { label: "Classes Today", value: 3, icon: UsersRound, path: "/timetable" },
    { label: "To Grade", value: 12, icon: BookOpen, path: "/assignments" },
    { label: "Unread Messages", value: 4, icon: MessageSquare, path: "/messages" },
    { label: "Active Alerts", value: 2, icon: Megaphone, path: "/announcements" },
  ];

  const todayClasses = [
    { id: "CS301", course: "Data Structures", time: "10:00 AM - 11:30 AM", room: "Block A - Room 102", type: "Lecture" },
    { id: "CS402", course: "Database Systems", time: "01:00 PM - 02:30 PM", room: "Block B - Lab 3", type: "Lab" },
    { id: "CS405", course: "Advanced Algorithms", time: "03:00 PM - 04:00 PM", room: "Block A - Room 105", type: "Lecture" },
  ];

  const pendingGrades = [
    { id: 1, title: "Array Operations", course: "Data Structures", submissions: 45, total: 60 },
    { id: 2, title: "SQL Queries Lab", course: "Database Systems", submissions: 58, total: 60 },
  ];

  const recentAnnouncements = [
    { id: 1, title: "Mid-Semester Exam Schedule", course: "All Courses", date: "2 Hours ago" },
    { id: 2, title: "Guest Lecture on Graph Algorithms", course: "Advanced Algorithms", date: "Yesterday" },
  ];

  const recentMessages = [
    { id: 1, student: "Rahul Sharma", text: "Assignment doubt regarding question 4", time: "10:35 AM" },
    { id: 2, student: "Priya Menon", text: "Could you re-upload the slide deck?", time: "09:12 AM" },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* SECTION 1: Welcome Banner */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-400 rounded-2xl p-5 md:p-7 text-white shadow-md shadow-orange-200/50">
        <h1 className="text-2xl md:text-3xl font-bold mb-1">Welcome back, Professor John!</h1>
        <p className="text-orange-100 text-sm">{currentDate}</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
          {stats.map((stat) => (
            <button
              key={stat.label}
              onClick={() => navigate(stat.path)}
              className="bg-white/15 rounded-xl p-4 backdrop-blur-sm border border-white/20 text-left hover:bg-white/25 transition-all active:scale-[0.97] cursor-pointer"
            >
              <div className="flex items-center gap-2.5 mb-1">
                <stat.icon size={16} className="text-orange-100" />
                <span className="text-2xl font-bold">{stat.value}</span>
              </div>
              <p className="text-[10px] text-orange-100 font-semibold uppercase tracking-wider">{stat.label}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* SECTION 2: Schedule for Today */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-bold text-gray-800 flex items-center gap-2">
                <Clock size={18} className="text-orange-500" /> Schedule for Today
              </h2>
              <Link to="/timetable" className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-0.5">
                View Timetable <ChevronRight size={14} />
              </Link>
            </div>

            <div className="space-y-3">
              {todayClasses.map((cls) => (
                <div
                  key={cls.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-orange-50/30 hover:border-orange-100 transition-colors gap-3"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-1 h-10 bg-orange-400 rounded-full shrink-0 mt-0.5"></div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm">
                        {cls.course}
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-orange-100 text-orange-700 ml-2 align-middle">
                          {cls.type}
                        </span>
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5 font-medium">{cls.time} • {cls.room}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Link
                      to={`/classes/${cls.id}/attendance`}
                      className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 text-xs font-bold rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
                    >
                      Mark Attendance
                    </Link>
                    <Link
                      to={`/classes/${cls.id}`}
                      className="px-3 py-1.5 bg-orange-500 text-white text-xs font-bold rounded-lg hover:bg-orange-600 transition-colors shadow-sm shadow-orange-200 active:scale-[0.97]"
                    >
                      Open Class
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 3: Pending Assignments */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-bold text-gray-800 flex items-center gap-2">
                <CheckCircle size={18} className="text-orange-500" /> Need Grading
              </h2>
              <Link to="/assignments" className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-0.5">
                View All <ChevronRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pendingGrades.map((assign) => (
                <div key={assign.id} className="p-4 border border-gray-100 rounded-xl hover:shadow-md hover:border-orange-100 transition-all">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{assign.course}</span>
                  <h3 className="font-bold text-gray-800 mt-1 mb-3 text-sm">{assign.title}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="w-7 h-7 rounded-full bg-orange-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-orange-600">
                        {assign.submissions}
                      </div>
                      <span className="text-[10px] text-gray-400">/ {assign.total} submitted</span>
                    </div>
                    <Link to={`/assignments/${assign.id}`} className="text-[11px] font-bold text-orange-600 hover:text-orange-700 hover:underline">
                      Grade →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-2.5">
              <Link to="/announcements" className="flex flex-col items-center justify-center p-3.5 rounded-xl border border-gray-100 bg-gray-50 hover:bg-orange-50 hover:border-orange-200 transition-all text-center gap-1.5 group">
                <Megaphone size={18} className="text-orange-500 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-bold text-gray-700">New Alert</span>
              </Link>
              <Link to="/materials" className="flex flex-col items-center justify-center p-3.5 rounded-xl border border-gray-100 bg-gray-50 hover:bg-orange-50 hover:border-orange-200 transition-all text-center gap-1.5 group">
                <UploadCloud size={18} className="text-orange-500 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-bold text-gray-700">Material</span>
              </Link>
              <Link to="/messages" className="flex flex-col items-center justify-center p-3.5 rounded-xl border border-gray-100 bg-gray-50 hover:bg-orange-50 hover:border-orange-200 transition-all text-center gap-1.5 group">
                <MessageSquare size={18} className="text-orange-500 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-bold text-gray-700">Message</span>
              </Link>
              <Link to="/assignments/create" className="flex flex-col items-center justify-center p-3.5 rounded-xl border border-gray-100 bg-gray-50 hover:bg-orange-50 hover:border-orange-200 transition-all text-center gap-1.5 group">
                <FileText size={18} className="text-orange-500 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-bold text-gray-700">Assignment</span>
              </Link>
            </div>
          </div>

          {/* Announcements */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Recent Announcements</h2>
            <div className="space-y-3">
              {recentAnnouncements.map((ann) => (
                <div key={ann.id} className="pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                  <h3 className="text-sm font-bold text-gray-800 line-clamp-1">{ann.title}</h3>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[10px] text-gray-400">{ann.course}</span>
                    <span className="text-[10px] font-medium text-orange-500">{ann.date}</span>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/announcements" className="block w-full text-center py-2 mt-1 text-[11px] font-bold text-gray-400 hover:text-orange-600 transition-colors">
              View All Announcements →
            </Link>
          </div>

          {/* Messages */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Recent Messages</h2>
            <div className="space-y-3">
              {recentMessages.map((msg) => (
                <Link to="/messages" key={msg.id} className="block pb-3 border-b border-gray-50 last:border-0 last:pb-0 hover:bg-gray-50 -mx-1.5 px-1.5 rounded-lg transition-colors">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-xs font-bold text-gray-800">{msg.student}</span>
                    <span className="text-[10px] text-gray-400">{msg.time}</span>
                  </div>
                  <p className="text-[11px] text-gray-500 line-clamp-1">{msg.text}</p>
                </Link>
              ))}
            </div>
            <Link to="/messages" className="block w-full text-center py-2 mt-1 text-[11px] font-bold text-gray-400 hover:text-orange-600 transition-colors">
              Go to Inbox →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
