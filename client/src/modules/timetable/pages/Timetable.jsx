import { useState } from "react";
import { mockTimetable } from "../data/mockTimetable";
import TimetableGrid from "../components/TimetableGrid";
import TodaySchedule from "../components/TodaySchedule";
import WeekRangeSelector from "../components/WeekRangeSelector";
import Section from "../../../components/ui/Section";
import { getWeekRange, getDayName } from "../utils/weekHelpers";

export default function Timetable() {
  // Initialize to current week (Monday–Sunday)
  const [weekRange, setWeekRange] = useState(() => getWeekRange(new Date()));

  const handleWeekChange = (newRange) => {
    setWeekRange(newRange);
    // Future: fetch timetable data from API using newRange.startDate and newRange.endDate
  };

  // Determine today's day name for the "Today's Schedule" panel
  const todayDayName = getDayName(new Date());
  const todayClasses = mockTimetable
    .filter((c) => c.day === todayDayName)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  return (
    <div className="min-h-full flex flex-col bg-gradient-to-b from-transparent to-gray-50/50 pb-8 relative rounded-2xl">
      {/* HEADER — Title + Week Selector */}
      <div className="flex flex-col items-center justify-center gap-3 mb-8">
        <h1 className="text-[28px] font-bold text-gray-800 tracking-tight">Timetable</h1>
        <WeekRangeSelector weekRange={weekRange} onWeekChange={handleWeekChange} />
      </div>

      {/* CONTENT — Grid layout: Timetable + Today's Schedule */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-6 items-start">
        <div className="overflow-hidden">
          <Section title="Weekly Timetable">
            <TimetableGrid timetableData={mockTimetable} todayDayName={todayDayName} />
          </Section>
        </div>

        <div>
          <Section title="Today's Schedule">
            <TodaySchedule todayClasses={todayClasses} />
          </Section>
        </div>
      </div>
    </div>
  );
}
