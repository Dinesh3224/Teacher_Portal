import { Link, useNavigate } from "react-router-dom";
import {
  UsersRound, BookOpen, Clock, Megaphone, ClipboardCheck,
  ChevronRight, UploadCloud, FileText, CheckCircle, Wallet, CalendarDays, BookMarked
} from "lucide-react";
import { format } from "date-fns";

import AttendanceChart from "../components/charts/AttendanceChart";
import TeachingHoursChart from "../components/charts/TeachingHoursChart";
import EngagementChart from "../components/charts/EngagementChart";
import PayrollChart from "../components/charts/PayrollChart";

export default function Dashboard() {
  const navigate = useNavigate();
  const currentDate = format(new Date(), "EEEE, MMMM do, yyyy");

  // Mock data for the dashboard features
  const stats = [
    { label: "Classes Today", value: 3, icon: UsersRound, path: "/timetable" },
    { label: "To Grade", value: 12, icon: BookOpen, path: "/assignments" },
    { label: "Pending Reviews", value: 5, icon: ClipboardCheck, path: "/assignments" },
    { label: "Active Alerts", value: 2, icon: Megaphone, path: "/announcements" },
  ];

  const todayClasses = [
    { id: "CS301", course: "Data Structures", time: "10:00 AM - 11:30 AM", room: "Block A - Room 102", type: "Lecture" },
    { id: "CS402", course: "Database Systems", time: "01:00 PM - 02:30 PM", room: "Block B - Lab 3", type: "Lab" },
  ];

  const recentAnnouncements = [
    { id: 1, title: "Mid-Semester Exam Schedule", course: "All Courses", date: "2 Hrs ago" },
    { id: 2, title: "Guest Lecture on Graph Algorithms", course: "Advanced Algorithms", date: "1 Day ago" },
  ];


  
  const upcomingDeadlines = [
    { id: 1, title: "Array Operations", course: "Data Structures", due: "Tomorrow" },
    { id: 2, title: "SQL Queries Lab", course: "Database Systems", due: "In 3 days" },
  ];
  
  const recentMaterials = [
    { id: 1, title: "Linked Lists - Chapter 4", course: "Data Structures", type: "PDF", size: "2.4 MB" },
    { id: 2, title: "Database Normalization", course: "Database Systems", type: "PPTX", size: "5.1 MB" },
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-full">
      {/* SECTION 1: Welcome Banner & Quick Metics */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-400 rounded-2xl p-5 md:p-7 text-white shadow-md shadow-orange-200/50 relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-bold mb-1">Welcome back, Professor John!</h1>
          <p className="text-orange-100 text-sm">{currentDate}</p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
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
        {/* Decorative Background Icon */}
        <UsersRound size={200} className="absolute -right-10 -bottom-10 text-white/5 pointer-events-none transform -rotate-12" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
        {/* Left Primary Column */}
        <div className="lg:col-span-8 flex flex-col gap-6 min-w-0">
          
          {/* Top Analytics Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {/* SECTION 4: Attendance Overview Chart */}
             <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col">
               <div className="flex items-center justify-between mb-4">
                 <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                   <Clock size={16} className="text-blue-500" /> Attendance Overview
                 </h2>
               </div>
               <div className="flex-1 min-h-[200px]">
                 <AttendanceChart />
               </div>
             </div>
             
             {/* SECTION 5: Teaching Hours Chart */}
             <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col">
               <div className="flex items-center justify-between mb-4">
                 <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                   <CalendarDays size={16} className="text-orange-500" /> Weekly Teaching Hours
                 </h2>
               </div>
               <div className="flex-1 min-h-[200px]">
                 <TeachingHoursChart />
               </div>
             </div>
          </div>

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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {todayClasses.map((cls) => (
                <div key={cls.id} className="flex flex-col p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-orange-50/30 hover:border-orange-100 transition-colors gap-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm">{cls.course}</h3>
                      <p className="text-xs text-gray-500 mt-0.5 font-medium">{cls.time} • {cls.room}</p>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-1 rounded-md bg-orange-100 text-orange-700">{cls.type}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Link to={`/classes/${cls.id}/attendance`} className="flex-1 text-center py-2 bg-white border border-gray-200 text-gray-700 text-xs font-bold rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
                      Attendance
                    </Link>
                    <Link to={`/classes/${cls.id}`} className="flex-1 text-center py-2 bg-orange-500 text-white text-xs font-bold rounded-lg hover:bg-orange-600 transition-colors shadow-sm shadow-orange-200">
                      Open Module
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Analytics Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {/* SECTION 6: Student Engagement Chart */}
             <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col">
               <div className="flex items-center justify-between mb-2">
                 <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                   <UsersRound size={16} className="text-purple-500" /> Student Engagement
                 </h2>
               </div>
               <div className="flex-1 min-h-[220px]">
                 <EngagementChart />
               </div>
             </div>

             {/* SECTION 9: Payroll Snapshot Chart */}
             <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col cursor-pointer hover:border-green-200 transition-colors" onClick={() => navigate('/payroll')}>
               <div className="flex items-center justify-between mb-4">
                 <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                   <Wallet size={16} className="text-green-500" /> Payroll Snapshot
                 </h2>
                 <ChevronRight size={14} className="text-gray-400" />
               </div>
               <div className="flex-1 min-h-[200px]">
                 <PayrollChart />
               </div>
             </div>
          </div>

        </div>

        {/* Right Secondary Column */}
        <div className="lg:col-span-4 flex flex-col gap-6 min-w-0">
          
          {/* SECTION 3: Quick Actions */}
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
              <Link to="/blog" className="flex flex-col items-center justify-center p-3.5 rounded-xl border border-gray-100 bg-gray-50 hover:bg-blue-50 hover:border-blue-200 transition-all text-center gap-1.5 group">
                <BookOpen size={18} className="text-blue-500 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-bold text-gray-700">Write Blog</span>
              </Link>
              <Link to="/assignments/create" className="flex flex-col items-center justify-center p-3.5 rounded-xl border border-gray-100 bg-gray-50 hover:bg-orange-50 hover:border-orange-200 transition-all text-center gap-1.5 group">
                <FileText size={18} className="text-orange-500 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-bold text-gray-700">Assignment</span>
              </Link>
            </div>
          </div>

          {/* SECTION 10: Upcoming Deadlines */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Upcoming Deadlines</h2>
            <div className="space-y-3">
              {upcomingDeadlines.map((d) => (
                <div key={d.id} className="flex justify-between items-start pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                  <div>
                     <h3 className="text-sm font-bold text-gray-800 line-clamp-1">{d.title}</h3>
                     <span className="text-[10px] text-gray-400">{d.course}</span>
                  </div>
                  <span className="text-[10px] font-bold text-orange-500 shrink-0 ml-2 bg-orange-50 px-2 py-0.5 rounded-md">{d.due}</span>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 7 & 8: Recent Announcements & Messages */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
             {/* Tabs internally */}
             <div className="flex items-center gap-6 border-b border-gray-100 mb-4 pb-2">
                <h2 className="text-xs font-bold text-orange-500 uppercase tracking-wider relative">
                   Alerts
                   <div className="absolute -bottom-2.5 left-0 right-0 h-0.5 bg-orange-500 rounded-t-md"></div>
                </h2>
                <Link to="/assignments" className="text-xs font-bold text-gray-400 hover:text-gray-600 uppercase tracking-wider">Assignments</Link>
             </div>
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
              View All Alerts →
            </Link>
          </div>
          
          {/* SECTION 11: Recent Course Materials */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Recent Materials</h2>
            <div className="space-y-3">
              {recentMaterials.map((m) => (
                <div key={m.id} className="flex items-center gap-3 pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                  <div className="w-8 h-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                     <BookMarked size={14} />
                  </div>
                  <div className="min-w-0 flex-1">
                     <h3 className="text-xs font-bold text-gray-800 truncate">{m.title}</h3>
                     <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] text-gray-400">{m.course}</span>
                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                        <span className="text-[10px] font-medium text-gray-500">{m.size}</span>
                     </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
