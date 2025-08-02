import React from 'react';
import { Button } from './button';
import { Calendar, Plus, Download } from 'lucide-react';
import { format } from 'date-fns';

interface AddToCalendarProps {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location?: string;
}

export const AddToCalendar: React.FC<AddToCalendarProps> = ({
  title,
  description,
  startDate,
  endDate,
  location = 'DecodersHQ Office, Kwara State, Nigeria'
}) => {
  // Format dates for different calendar services
  const formatDateForCalendar = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const startFormatted = formatDateForCalendar(startDate);
  const endFormatted = formatDateForCalendar(endDate);

  // Google Calendar URL
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startFormatted}/${endFormatted}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}`;

  // Outlook Calendar URL
  const outlookCalendarUrl = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(title)}&startdt=${startDate.toISOString()}&enddt=${endDate.toISOString()}&body=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}`;

  // Yahoo Calendar URL
  const yahooCalendarUrl = `https://calendar.yahoo.com/?v=60&view=d&type=20&title=${encodeURIComponent(title)}&st=${startFormatted}&dur=0100&desc=${encodeURIComponent(description)}&in_loc=${encodeURIComponent(location)}`;

  // ICS file generation for native calendar apps
  const generateICSFile = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//DecodersHQ//Appointment//EN
BEGIN:VEVENT
UID:${Date.now()}@decodershq.com
DTSTAMP:${formatDateForCalendar(new Date())}
DTSTART:${startFormatted}
DTEND:${endFormatted}
SUMMARY:${title}
DESCRIPTION:${description}
LOCATION:${location}
STATUS:CONFIRMED
SEQUENCE:0
BEGIN:VALARM
TRIGGER:-PT1H
DESCRIPTION:Reminder
ACTION:DISPLAY
END:VALARM
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_appointment.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
        <Calendar className="h-5 w-5" />
        Add to Calendar
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.open(googleCalendarUrl, '_blank')}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Google Calendar
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.open(outlookCalendarUrl, '_blank')}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Outlook
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.open(yahooCalendarUrl, '_blank')}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Yahoo Calendar
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={generateICSFile}
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Download (.ics)
        </Button>
      </div>
      
      <p className="text-sm text-muted-foreground">
        Choose your preferred calendar service to add this appointment.
      </p>
    </div>
  );
};