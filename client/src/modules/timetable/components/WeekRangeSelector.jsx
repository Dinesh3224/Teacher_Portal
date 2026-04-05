import { ChevronLeft, ChevronRight } from "lucide-react";
import { getWeekRange, shiftWeek, formatWeekDate } from "../utils/weekHelpers";

export default function WeekRangeSelector({ weekRange, onWeekChange }) {
  const handlePrevWeek = () => {
    const currentWeekRange = getWeekRange(new Date());
    if (weekRange.startDate.getTime() <= currentWeekRange.startDate.getTime()) return;
    const newRange = shiftWeek(weekRange.startDate, -1);
    onWeekChange(newRange);
  };

  const handleNextWeek = () => {
    const newRange = shiftWeek(weekRange.startDate, 1);
    onWeekChange(newRange);
  };

  const currentWeekRange = getWeekRange(new Date());
  const isPrevDisabled = weekRange.startDate.getTime() <= currentWeekRange.startDate.getTime();

  const rangeLabel = `${formatWeekDate(weekRange.startDate)}  to  ${formatWeekDate(weekRange.endDate)}`;

  return (
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

      {/* Date Range Label */}
      <div className="px-4 py-2 font-semibold text-gray-700 text-sm flex items-center gap-2.5 min-w-[280px] justify-center">
        <span className="tracking-wide">{rangeLabel}</span>
      </div>

      {/* Next Week */}
      <button
        onClick={handleNextWeek}
        className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-200 text-gray-500 hover:text-gray-800 active:scale-95 flex items-center justify-center"
        title="Next week"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
