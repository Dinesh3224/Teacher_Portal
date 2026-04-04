import Card from "../components/ui/Card";
import Section from "../components/ui/Section";
import { ArrowRight, MoreHorizontal, BookOpen, Clock, Users, CalendarCheck } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="space-y-8 pb-10 animate__animated animate__fadeIn">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl p-8 text-white shadow-md shadow-blue-500/20 flex flex-col md:flex-row justify-between items-center relative overflow-hidden">
        <div className="relative z-10 w-full md:w-2/3">
           <h1 className="text-3xl md:text-4xl font-bold mb-3">Welcome back,<br/>Professor John</h1>
           <p className="text-blue-100 mb-6 max-w-md">You have 2 classes today and 15 pending assignments to grade. Have a great day ahead!</p>
           <button className="flex items-center space-x-2 text-sm font-semibold bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-sm px-5 py-2.5 rounded-xl">
             <span>View Schedule</span>
             <ArrowRight size={16} />
           </button>
        </div>
        {/* Abstract shapes/illustrations placeholder */}
        <div className="absolute right-0 bottom-0 opacity-20 pointer-events-none hidden md:block">
          <svg width="300" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#ffffff" d="M45,-75C58.3,-67.2,69.1,-53.4,75.4,-38.3C81.8,-23.1,83.7,-6.6,80.7,9.1C77.8,24.8,69.9,39.6,58.3,50.1C46.8,60.6,31.6,66.8,15.7,71.5C-0.3,76.2,-17,79.5,-32.1,74.5C-47.3,69.5,-60.9,56.3,-71.4,41.2C-81.8,26.1,-89.1,9.2,-87.3,-6.9C-85.5,-23.1,-74.6,-38.4,-61.8,-49.2C-49,-60,-34.3,-66.2,-19.9,-69.1C-5.5,-72,8.6,-71.6,23.1,-75.4C37.6,-79.1,52.5,-85,45,-75Z" transform="translate(100 100)" />
          </svg>
        </div>
      </div>

      {/* Stats Cards Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         <Card className="flex items-center p-6 gap-4">
            <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-500">
               <CalendarCheck size={28} />
            </div>
            <div>
               <p className="text-gray-500 text-sm font-medium mb-1">Today's Classes</p>
               <h3 className="text-2xl font-bold text-gray-800">4</h3>
            </div>
         </Card>
         <Card className="flex items-center p-6 gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-500">
               <BookOpen size={28} />
            </div>
            <div>
               <p className="text-gray-500 text-sm font-medium mb-1">Pending Assignments</p>
               <h3 className="text-2xl font-bold text-gray-800">23</h3>
            </div>
         </Card>
         <Card className="flex items-center p-6 gap-4">
            <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center text-green-500">
               <Users size={28} />
            </div>
            <div>
               <p className="text-gray-500 text-sm font-medium mb-1">Attendance Rate</p>
               <h3 className="text-2xl font-bold text-gray-800">92%</h3>
            </div>
         </Card>
         <Card className="flex items-center p-6 gap-4">
            <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center text-red-500">
               <Clock size={28} />
            </div>
            <div>
               <p className="text-gray-500 text-sm font-medium mb-1">Upcoming Deadlines</p>
               <h3 className="text-2xl font-bold text-gray-800">3</h3>
            </div>
         </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Course Progress Section */}
        <div className="lg:col-span-2">
           <Section title="Active Courses Overview" action={<button className="text-orange-500 text-sm font-semibold hover:text-orange-600">View all</button>}>
              <Card className="p-0 overflow-hidden border-0">
                 <table className="w-full text-left border-collapse">
                    <thead>
                       <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider font-semibold border-b border-gray-100">
                          <th className="px-6 py-4 rounded-tl-2xl">Course Name</th>
                          <th className="px-6 py-4">Total Students</th>
                          <th className="px-6 py-4 rounded-tr-2xl">Progress Tracker</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                       <tr className="hover:bg-gray-50 transition-colors group">
                          <td className="px-6 py-4">
                             <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center text-orange-500 font-bold">CS</div>
                                <div>
                                   <p className="font-bold text-gray-800">Computer Science 101</p>
                                   <p className="text-xs text-gray-500">First Year</p>
                                </div>
                             </div>
                          </td>
                          <td className="px-6 py-4 font-medium text-gray-600">120</td>
                          <td className="px-6 py-4">
                             <div className="w-full bg-gray-100 rounded-full h-2 mb-1">
                                <div className="bg-orange-500 h-2 rounded-full" style={{width: '65%'}}></div>
                             </div>
                             <p className="text-xs text-gray-500 text-right">65% Completed</p>
                          </td>
                       </tr>
                       <tr className="hover:bg-gray-50 transition-colors group">
                          <td className="px-6 py-4">
                             <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-500 font-bold">AL</div>
                                <div>
                                   <p className="font-bold text-gray-800">Advanced Algorithms</p>
                                   <p className="text-xs text-gray-500">Third Year</p>
                                </div>
                             </div>
                          </td>
                          <td className="px-6 py-4 font-medium text-gray-600">45</td>
                          <td className="px-6 py-4">
                             <div className="w-full bg-gray-100 rounded-full h-2 mb-1">
                                <div className="bg-blue-500 h-2 rounded-full" style={{width: '38%'}}></div>
                             </div>
                             <p className="text-xs text-gray-500 text-right">38% Completed</p>
                          </td>
                       </tr>
                       <tr className="hover:bg-gray-50 transition-colors group">
                          <td className="px-6 py-4">
                             <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center text-green-500 font-bold">DS</div>
                                <div>
                                   <p className="font-bold text-gray-800">Data Structures</p>
                                   <p className="text-xs text-gray-500">Second Year</p>
                                </div>
                             </div>
                          </td>
                          <td className="px-6 py-4 font-medium text-gray-600">85</td>
                          <td className="px-6 py-4">
                             <div className="w-full bg-gray-100 rounded-full h-2 mb-1">
                                <div className="bg-green-500 h-2 rounded-full" style={{width: '80%'}}></div>
                             </div>
                             <p className="text-xs text-gray-500 text-right">80% Completed</p>
                          </td>
                       </tr>
                    </tbody>
                 </table>
              </Card>
           </Section>

           <Section title="Recent Assignments Activity">
             <Card>
               <div className="space-y-4">
                  <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                     <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500 border border-gray-100">
                           <BookOpen size={20} />
                        </div>
                        <div>
                           <h4 className="font-bold text-gray-800 text-sm">Sorting Algorithms Essay</h4>
                           <p className="text-xs text-gray-500 mt-0.5">Advanced Algorithms • Due in 2 days</p>
                        </div>
                     </div>
                     <div className="text-right">
                        <p className="text-sm font-bold text-gray-800">12 / 45</p>
                        <p className="text-xs text-gray-500">Submitted</p>
                     </div>
                  </div>
                  <div className="flex items-center justify-between pb-2">
                     <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500 border border-gray-100">
                           <BookOpen size={20} />
                        </div>
                        <div>
                           <h4 className="font-bold text-gray-800 text-sm">Graph Theory Project</h4>
                           <p className="text-xs text-gray-500 mt-0.5">Data Structures • Due tomorrow</p>
                        </div>
                     </div>
                     <div className="text-right">
                        <p className="text-sm font-bold text-gray-800">82 / 85</p>
                        <p className="text-xs text-gray-500">Submitted</p>
                     </div>
                  </div>
               </div>
             </Card>
           </Section>
        </div>

        {/* Right column of main dashboard area */}
        <div>
           <Section title="Media for lessons">
              <Card className="flex flex-col gap-4">
                 <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-500 flex items-center justify-center font-bold">PDF</div>
                       <div>
                          <p className="text-sm font-bold text-gray-800">Sorting Types</p>
                          <p className="text-xs text-gray-500">2.3 MB</p>
                       </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal size={20} /></button>
                 </div>
                 <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-500 flex items-center justify-center font-bold">PPT</div>
                       <div>
                          <p className="text-sm font-bold text-gray-800">Graph Theory</p>
                          <p className="text-xs text-gray-500">5.9 MB</p>
                       </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal size={20} /></button>
                 </div>
                 <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-lg bg-red-100 text-red-500 flex items-center justify-center font-bold">MP4</div>
                       <div>
                          <p className="text-sm font-bold text-gray-800">Lecture 04 Recording</p>
                          <p className="text-xs text-gray-500">128 MB</p>
                       </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal size={20} /></button>
                 </div>
              </Card>
           </Section>

           <Section title="Recent Announcements">
             <Card>
               <div className="p-3 bg-orange-50 border border-orange-100 text-orange-800 rounded-xl mb-3">
                 <p className="text-xs font-bold mb-1">Faculty Meeting</p>
                 <p className="text-xs opacity-90 text-orange-700">All faculty members are requested to join the general meeting tomorrow at 4 PM in the main auditorium.</p>
               </div>
               <div className="p-3 bg-gray-50 border border-gray-100 text-gray-700 rounded-xl">
                 <p className="text-xs font-bold mb-1">Semester End Dates</p>
                 <p className="text-xs text-gray-500">Please submit all final grades by the 25th of this month. Portal closes at midnight.</p>
               </div>
             </Card>
           </Section>
        </div>
      </div>
    </div>
  );
}
