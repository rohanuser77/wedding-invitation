import type { WeddingEvent } from '../data/weddingConfig';

/**
 * Generate a Google Calendar link for a wedding event
 */
export const createGoogleCalendarUrl = (event: WeddingEvent): string => {
  const title = encodeURIComponent(`Person 1 & Person 2 Wedding: ${event.name}`);
  const details = encodeURIComponent(`${event.description}\n\nDress Code: ${event.dressCode.title} - ${event.dressCode.description}\nVenue: ${event.venue}\n${event.muhurat ? `\nMuhurat: ${event.muhurat}` : ''}`);
  const location = encodeURIComponent(`${event.venue}, ${event.address}`);
  
  // Format date to YYYYMMDDTHHmmssZ
  // Default to 4 hours duration if no specific end
  const startDateStr = event.date.replace(/-/g, '');
  const dates = `${startDateStr}T100000Z/${startDateStr}T140000Z`;

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dates}`;
};

/**
 * Generate and download an .ics file for Apple Calendar / Outlook
 */
export const downloadIcsFile = (event: WeddingEvent) => {
  const startDateStr = event.date.replace(/-/g, '');
  const icsData = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Person 1 and Person 2 Royal Wedding//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `SUMMARY:Person 1 & Person 2 Wedding - ${event.name}`,
    `DESCRIPTION:${event.description.replace(/\n/g, '\\n')}`,
    `LOCATION:${event.venue}, ${event.address}`,
    `DTSTART:${startDateStr}T100000Z`,
    `DTEND:${startDateStr}T140000Z`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', `${event.id}-wedding.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
