import ClassBlock from "./ClassBlock";

export default function TimetableGrid({ timetableData, todayDayName }) {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const timeSlots = [
    { label: "09:00 - 10:30", start: "09:00" },
    { label: "11:00 - 12:30", start: "11:00" },
    { label: "01:30 - 03:00", start: "13:30" },
    { label: "03:30 - 05:00", start: "15:30" },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm shadow-gray-200/50 border border-gray-100 overflow-hidden w-full">
      <div className="overflow-x-auto no-scrollbar">
         <table className="w-full text-left border-collapse min-w-[900px] table-fixed">
           <thead>
             <tr className="bg-gray-50 border-b border-gray-100">
               <th className="p-4 w-32 border-r border-gray-100 text-gray-500 font-bold text-xs text-center">Day / Time</th>
               {timeSlots.map((slot, idx) => (
                 <th key={idx} className="p-4 text-center font-bold text-gray-800 border-r border-gray-100 last:border-r-0 text-sm">
                   {slot.label}
                 </th>
               ))}
             </tr>
           </thead>
           <tbody>
             {days.map((day) => {
               const isToday = day === todayDayName;
               return (
                 <tr key={day} className={`border-b border-gray-100 last:border-b-0 group ${isToday ? "bg-orange-50/40" : ""}`}>
                   <td className={`p-4 border-r border-gray-100 text-sm font-bold text-center align-middle transition-colors ${
                     isToday
                       ? "bg-orange-50 text-orange-600"
                       : "bg-gray-50 text-gray-500 group-hover:bg-gray-100"
                   }`}>
                     <div className="flex flex-col items-center gap-1">
                       {day}
                       {isToday && (
                         <span className="text-[9px] bg-orange-500 text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Today</span>
                       )}
                     </div>
                   </td>
                   {timeSlots.map((slot, sIdx) => {
                      const classesForSlot = timetableData.filter(c => c.day === day && c.startTime === slot.start);
                      return (
                         <td key={`${day}-${slot.start}`} className={`p-3 border-r border-gray-100 last:border-r-0 align-top transition-colors ${sIdx % 2 !== 0 ? 'bg-gray-50/10' : ''} group-hover:bg-gray-50/30`}>
                            <div className="flex flex-col gap-3 min-h-[130px] h-full">
                              {classesForSlot.length > 0 ? (
                                 classesForSlot.map((cls, idx) => (
                                    <ClassBlock key={idx} classData={cls} />
                                 ))
                              ) : (
                                 <div className="h-full flex-1 flex items-center justify-center border-2 border-dashed border-gray-100 rounded-2xl transition-colors opacity-40 hover:border-orange-200 hover:bg-orange-50/20">
                                 </div>
                              )}
                            </div>
                         </td>
                      );
                   })}
                 </tr>
               );
             })}
           </tbody>
         </table>
      </div>
    </div>
  );
}
