import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalIcon } from "lucide-react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { getWeekRange, shiftWeek, formatWeekDate } from "../utils/weekHelpers";

export default function WeekRangeSelector({ weekRange, onWeekChange }) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const calendarRef = useRef(null);

  // Close calendar when clicking outside
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

  const handlePrevWeek = () => {
    const currentWeekRange = getWeekRange(new Date());
    // Don't allow going before the current week
    if (weekRange.startDate.getTime() <= currentWeekRange.startDate.getTime()) return;
    const newRange = shiftWeek(weekRange.startDate, -1);
    onWeekChange(newRange);
  };

  const handleNextWeek = () => {
    const newRange = shiftWeek(weekRange.startDate, 1);
    onWeekChange(newRange);
  };

  const handleDaySelect = (day) => {
    if (!day) return;
    const newRange = getWeekRange(day);
    onWeekChange(newRange);
    setIsCalendarOpen(false);
  };

  // Check if prev button should be disabled
  const currentWeekRange = getWeekRange(new Date());
  const isPrevDisabled = weekRange.startDate.getTime() <= currentWeekRange.startDate.getTime();

  const rangeLabel = `${formatWeekDate(weekRange.startDate)}  to  ${formatWeekDate(weekRange.endDate)}`;

  return (
    <div className="relative inline-flex flex-col items-center">
      <div className="bg-white border border-gray-200 rounded-2xl flex items-center p-1.5 shadow-sm shadow-gray-100 gap-1">
        {/* Prev Week */}
        <button
          onClick={handlePrevWeek}
          disabled={isPrevDisabled}
          className={`p-2 rounded-xl transition-all duration-200 flex items-center justify-center ${
            isPrevDisabled
              ? "opacity-30 cursor-not-allowed text-gray-300"
              : "hover:bg-gray-100 text-gray-500 hover:text-gray-800 active:scale-95"
          }`}
          title="Previous week"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Calendar Toggle + Date Range Label */}
        <button
          onClick={() => setIsCalendarOpen(!isCalendarOpen)}
          className="px-4 py-2 font-semibold text-gray-700 text-sm flex items-center gap-2.5 min-w-[280px] justify-center rounded-xl hover:bg-orange-50/60 transition-colors duration-200"
          title="Open calendar to pick a week"
        >
          <CalIcon size={16} className="text-orange-500 shrink-0" />
          <span className="tracking-wide">{rangeLabel}</span>
        </button>

        {/* Next Week */}
        <button
          onClick={handleNextWeek}
          className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-200 text-gray-500 hover:text-gray-800 active:scale-95 flex items-center justify-center"
          title="Next week"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Floating Calendar Dropdown */}
      {isCalendarOpen && (
        <div
          ref={calendarRef}
          className="absolute top-full mt-3 z-50 bg-white rounded-2xl shadow-xl shadow-gray-200/80 border border-gray-100 p-4 animate-in fade-in slide-in-from-top-2"
        >
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
            styles={{
              caption_label: { fontSize: "0.95rem", fontWeight: "700" },
              day: { borderRadius: "12px", fontSize: "0.85rem" },
              head_cell: { fontSize: "0.75rem", fontWeight: "600", color: "#9ca3af" },
            }}
            classNames={{
              today: "font-bold text-orange-600",
              selected: "!bg-orange-500 !text-white !rounded-xl",
              root: "rdp-custom",
            }}
          />
          <div className="mt-2 pt-3 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-400">Click any date to select that week (Mon–Sun)</p>
          </div>
        </div>
      )}
    </div>
  );
}
