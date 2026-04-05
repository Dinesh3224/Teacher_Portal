import { useState, useRef, useEffect } from "react";
import { Calendar as CalIcon } from "lucide-react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { mockTimetable } from "../data/mockTimetable";
import TimetableGrid from "../components/TimetableGrid";
import WeekRangeSelector from "../components/WeekRangeSelector";
import { getWeekRange, getDayName, generateWeekDates } from "../utils/weekHelpers";

export default function Timetable() {
  const [weekRange, setWeekRange] = useState(() => getWeekRange(new Date()));
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const calendarRef = useRef(null);

  const handleWeekChange = (newRange) => {
    setWeekRange(newRange);
    // TODO: fetch timetable data from API using newRange.startDate and newRange.endDate
  };

  // Close calendar on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (calendarRef.current && !calendarRef.current.contains(e.target)) {
        setIsCalendarOpen(false);
      }
    }
    if (isCalendarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isCalendarOpen]);

  const handleDaySelect = (day) => {
    if (!day) return;
    const newRange = getWeekRange(day);
    handleWeekChange(newRange);
    setIsCalendarOpen(false);
  };

  // Generate day+date rows for the current week
  const weekDates = generateWeekDates(weekRange.startDate);
  const todayDayName = getDayName(new Date());

  return (
    <div className="min-h-full flex flex-col pb-8">
      {/* HEADER — Title + Week Selector centered */}
      <div className="flex flex-col items-center justify-center gap-3 mb-6">
        <h1 className="text-[28px] font-bold text-gray-800 tracking-tight">Timetable</h1>
        <WeekRangeSelector weekRange={weekRange} onWeekChange={handleWeekChange} />
      </div>

      {/* TIMETABLE — Full width with calendar icon on heading row */}
      <div className="max-w-[1400px] mx-auto w-full">
        {/* Section heading with calendar icon aligned right */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Weekly Timetable</h2>
          <div className="relative" ref={calendarRef}>
            <button
              onClick={() => setIsCalendarOpen(!isCalendarOpen)}
              className={`p-2.5 rounded-xl border transition-all duration-200 flex items-center gap-2 text-sm font-medium ${
                isCalendarOpen
                  ? "bg-orange-50 border-orange-300 text-orange-600"
                  : "bg-white border-gray-200 text-gray-500 hover:bg-orange-50/60 hover:text-orange-600 hover:border-orange-200"
              }`}
              title="Pick a date to jump to that week"
            >
              <CalIcon size={18} />
            </button>

            {/* Calendar Dropdown — anchored below the icon */}
            {isCalendarOpen && (
              <div className="absolute top-full mt-2 right-0 z-50 bg-white rounded-2xl shadow-xl shadow-gray-200/80 border border-gray-100 p-4 animate-in">
                <DayPicker
                  mode="single"
                  selected={weekRange.startDate}
                  onSelect={handleDaySelect}
                  modifiers={{
                    selectedWeek: {
                      from: weekRange.startDate,
                      to: weekRange.endDate,
                    },
                  }}
                  modifiersStyles={{
                    selectedWeek: {
                      backgroundColor: "#fff7ed",
                      borderRadius: "0",
                    },
                  }}
                  classNames={{
                    today: "font-bold text-orange-600",
                    selected: "!bg-orange-500 !text-white !rounded-xl",
                    root: "rdp-custom",
                  }}
                />
                <div className="mt-2 pt-3 border-t border-gray-100 text-center">
                  <p className="text-xs text-gray-400">Click any date to jump to that week (Mon–Sun)</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Grid — full width */}
        <TimetableGrid
          timetableData={mockTimetable}
          todayDayName={todayDayName}
          weekDates={weekDates}
        />
      </div>
    </div>
  );
}
