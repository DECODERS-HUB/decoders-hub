import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface CalendarEvent {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  attendeeEmail: string;
  attendeeName: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { title, description, startDate, endDate, attendeeEmail, attendeeName }: CalendarEvent = await req.json();

    // Google Calendar API configuration
    const googleApiKey = Deno.env.get('GOOGLE_CALENDAR_API_KEY');
    const googleClientId = Deno.env.get('GOOGLE_CLIENT_ID');
    const googleClientSecret = Deno.env.get('GOOGLE_CLIENT_SECRET');
    const googleRefreshToken = Deno.env.get('GOOGLE_REFRESH_TOKEN');

    if (!googleApiKey || !googleClientId || !googleClientSecret || !googleRefreshToken) {
      console.error('Missing Google Calendar API credentials');
      return new Response(
        JSON.stringify({ error: 'Calendar service not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get access token
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: googleClientId,
        client_secret: googleClientSecret,
        refresh_token: googleRefreshToken,
        grant_type: 'refresh_token',
      }),
    });

    const tokenData = await tokenResponse.json();
    
    if (!tokenResponse.ok) {
      console.error('Failed to get access token:', tokenData);
      throw new Error('Failed to authenticate with Google Calendar');
    }

    const accessToken = tokenData.access_token;

    // Create calendar event
    const event = {
      summary: title,
      description: description,
      start: {
        dateTime: startDate,
        timeZone: 'Africa/Lagos',
      },
      end: {
        dateTime: endDate,
        timeZone: 'Africa/Lagos',
      },
      attendees: [
        {
          email: attendeeEmail,
          displayName: attendeeName,
        },
        {
          email: 'hub.decoders@gmail.com',
          displayName: 'DecodersHQ Admin',
        }
      ],
      conferenceData: {
        createRequest: {
          requestId: `appointment-${Date.now()}`,
          conferenceSolutionKey: {
            type: 'hangoutsMeet'
          }
        }
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 }, // 1 day before
          { method: 'popup', minutes: 60 }, // 1 hour before
        ],
      },
    };

    // Add event to Google Calendar
    const calendarResponse = await fetch(
      'https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      }
    );

    const calendarData = await calendarResponse.json();

    if (!calendarResponse.ok) {
      console.error('Failed to create calendar event:', calendarData);
      throw new Error('Failed to create calendar event');
    }

    console.log('Calendar event created successfully:', calendarData.id);

    return new Response(
      JSON.stringify({ 
        success: true, 
        eventId: calendarData.id,
        eventLink: calendarData.htmlLink,
        meetingLink: calendarData.conferenceData?.entryPoints?.[0]?.uri || null
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error: any) {
    console.error('Error in add-to-calendar function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
};

serve(handler);