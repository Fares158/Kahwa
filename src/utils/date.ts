import { format, parseISO, isAfter, startOfDay } from 'date-fns';

export function formatDate(
  dateString: string,
  formatStr: string = 'PPP'
): string {
  try {
    return format(parseISO(dateString), formatStr);
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
}

export function formatTime(timeString: string): string {
  try {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return format(date, 'h:mm a');
  } catch (error) {
    console.error('Error formatting time:', error);
    return timeString;
  }
}

export function isUpcoming(dateString: string): boolean {
  try {
    const date = parseISO(dateString);
    return isAfter(date, startOfDay(new Date()));
  } catch (error) {
    console.error('Error checking if date is upcoming:', error);
    return false;
  }
}
