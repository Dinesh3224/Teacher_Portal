import { startOfWeek, endOfWeek, addDays, subDays, format } from "date-fns";

/**
 * Given any date, returns the Monday–Sunday range for that week.
 * @param {Date} date - Any date
 * @returns {{ startDate: Date, endDate: Date }}
 */
export function getWeekRange(date) {
  const monday = startOfWeek(date, { weekStartsOn: 1 }); // Monday
  const sunday = endOfWeek(date, { weekStartsOn: 1 });   // Sunday
  return { startDate: monday, endDate: sunday };
}

/**
 * Shift a week range forward or backward by 7 days.
 * @param {Date} currentStart - Current Monday
 * @param {number} direction - +1 for next, -1 for prev
 * @returns {{ startDate: Date, endDate: Date }}
 */
export function shiftWeek(currentStart, direction) {
  const newStart = direction > 0
    ? addDays(currentStart, 7)
    : subDays(currentStart, 7);
  return getWeekRange(newStart);
}

/**
 * Format a date as DD-MMM-YYYY (e.g. 21-Mar-2025)
 * @param {Date} date
 * @returns {string}
 */
export function formatWeekDate(date) {
  return format(date, "dd-MMM-yyyy");
}

/**
 * Get the day name (e.g. "Monday") from a Date object.
 * @param {Date} date
 * @returns {string}
 */
export function getDayName(date) {
  return format(date, "EEEE");
}

/**
 * Generate an array of weekday objects for a given week range.
 * Each object contains { dayName, dateLabel, date }.
 * Only Mon–Sat (6 working days).
 * @param {Date} weekStart - The Monday of the week
 * @returns {Array<{dayName: string, dateLabel: string, date: Date}>}
 */
export function generateWeekDates(weekStart) {
  const days = [];
  for (let i = 0; i < 6; i++) {
    const d = addDays(weekStart, i);
    days.push({
      dayName: format(d, "EEEE"),
      dateLabel: format(d, "dd-MMM-yyyy"),
      date: d,
    });
  }
  return days;
}
