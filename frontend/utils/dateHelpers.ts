import {
  format,
  parseISO,
  isBefore,
  isAfter,
  differenceInYears,
  differenceInDays,
  differenceInMinutes,
  isValid,
  formatDistanceToNow,
} from "date-fns";

/**
 * Get age in years from a birth date string (ISO format or Date object)
 */
export function getAge(date: string | Date): number {
  const birthDate = typeof date === "string" ? new Date(date) : date;
  return differenceInYears(new Date(), birthDate);
}

/**
 * Format a date string or object to a human-readable format
 * @example formatDate("1985-05-15", "dd MMM yyyy") → "15 May 1985"
 */
export function formatDate(
  date: string | Date,
  dateFormat = "dd MMM yyyy"
): string {
  const parsed = typeof date === "string" ? parseISO(date) : date;
  return isValid(parsed) ? format(parsed, dateFormat) : "Invalid date";
}

/**
 * Get time since date (e.g., "2 hours ago")
 */
export function timeFromNow(date: string | Date): string {
  const parsed = typeof date === "string" ? new Date(date) : date;
  return formatDistanceToNow(parsed, { addSuffix: true });
}

/**
 * Check if a date is in the past
 */
export function isPastDate(date: string | Date): boolean {
  const parsed = typeof date === "string" ? new Date(date) : date;
  return isBefore(parsed, new Date());
}

/**
 * Check if a date is in the future
 */
export function isFutureDate(date: string | Date): boolean {
  const parsed = typeof date === "string" ? new Date(date) : date;
  return isAfter(parsed, new Date());
}

/**
 * Get number of days between two dates
 */
export function daysBetween(
  date1: string | Date,
  date2: string | Date
): number {
  const d1 = typeof date1 === "string" ? new Date(date1) : date1;
  const d2 = typeof date2 === "string" ? new Date(date2) : date2;
  return differenceInDays(d1, d2);
}

/**
 * Get number of minutes between two dates
 */
export function minutesBetween(
  date1: string | Date,
  date2: string | Date
): number {
  const d1 = typeof date1 === "string" ? new Date(date1) : date1;
  const d2 = typeof date2 === "string" ? new Date(date2) : date2;
  return differenceInMinutes(d1, d2);
}
