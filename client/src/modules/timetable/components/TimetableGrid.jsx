import ClassBlock from "./ClassBlock";

export default function TimetableGrid({ timetableData, todayDayName, weekDates }) {
  const timeSlots = [
    { label: "09:00 - 10:30", start: "09:00" },
    { label: "11:00 - 12:30", start: "11:00" },
    { label: "01:30 - 03:00", start: "13:30" },
    { label: "03:30 - 05:00", start: "15:30" },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden w-full shadow-sm">
      <div className="overflow-x-auto no-scrollbar">
        <table className="w-full text-left border-collapse min-w-[900px] table-fixed">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-4 w-44 text-gray-500 font-bold text-xs text-center uppercase tracking-wider border-r border-gray-200">
                Day / Time
              </th>
              {timeSlots.map((slot, idx) => (
                <th
                  key={idx}
                  className="p-4 text-center font-bold text-gray-700 text-sm border-r border-gray-200 last:border-r-0"
                >
                  {slot.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {weekDates.map(({ dayName, dateLabel }) => {
              const isToday = dayName === todayDayName;
              return (
                <tr
                  key={dayName}
                  className={`group ${isToday ? "bg-orange-50/40" : "hover:bg-gray-50/40"}`}
                >
                  {/* Row label: Day name + date */}
                  <td
                    className={`p-4 border-r border-gray-200 text-center align-middle transition-colors ${
                      isToday
                        ? "bg-orange-50 text-orange-600"
                        : "bg-gray-50/70 text-gray-600 group-hover:bg-gray-100/60"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-sm font-bold">{dayName}</span>
                      <span className={`text-[10px] font-medium ${isToday ? "text-orange-500" : "text-gray-400"}`}>
                        ({dateLabel})
                      </span>
                      {isToday && (
                        <span className="text-[9px] bg-orange-500 text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-wider mt-0.5">
                          Today
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Time slot cells */}
                  {timeSlots.map((slot, sIdx) => {
                    const classesForSlot = timetableData.filter(
                      (c) => c.day === dayName && c.startTime === slot.start
                    );
                    return (
                      <td
                        key={`${dayName}-${slot.start}`}
                        className={`p-2.5 border-r border-gray-200 last:border-r-0 align-top transition-colors ${
                          sIdx % 2 !== 0 ? "bg-gray-50/20" : ""
                        }`}
                      >
                        <div className="flex flex-col gap-2 min-h-[110px] h-full">
                          {classesForSlot.length > 0 ? (
                            classesForSlot.map((cls, idx) => (
                              <ClassBlock key={idx} classData={cls} />
                            ))
                          ) : (
                            <div className="h-full flex-1 rounded-lg" />
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
