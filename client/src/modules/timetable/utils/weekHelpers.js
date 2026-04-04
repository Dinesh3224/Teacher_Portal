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


