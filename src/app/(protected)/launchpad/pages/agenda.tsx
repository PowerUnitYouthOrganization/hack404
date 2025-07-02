"use client";

import CalendarGrid from "@/app/(protected)/launchpad/containers/calendar-grid";
import eventsData from "@/data/events.json";
import beginnerEventsData from "@/data/beginner-events.json";
import openEventsData from "@/data/normal-events.json";
import AgendaContainer from "../containers/events-container";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { CalendarDays } from "lucide-react";

// could probably be moved to json or something
interface AgendaEvent {
  name: string;
  startTime: Date;
  endTime: Date;
  roomNumber: string;
  day: number;
}

/**
 * This component serves as the agenda page for the launchpad.
 * @returns Agenda component
 */
export default function Agenda() {
  const { data: session } = useSession();
  const [userStream, setUserStream] = useState<string | null>(null);

  // Fetch user stream from API
  useEffect(() => {
    const fetchUserStream = async () => {
      if (!session?.user?.email) return;

      try {
        const response = await fetch("/api/get-user-stream");
        if (response.ok) {
          const data = await response.json();
          setUserStream(data.stream);
        }
      } catch (error) {
        console.error("Error fetching user stream:", error);
      }
    };

    fetchUserStream();
  }, [session?.user?.email]);

  // Select appropriate events based on user stream
  const getEventsForUser = () => {
    if (userStream === "beginner") {
      return beginnerEventsData;
    } else if (userStream === "normal") {
      return openEventsData;
    }
    // Default to general events if no stream or unknown stream
    return eventsData;
  };

  // Combine general events with user-specific events for calendar
  const userEvents = getEventsForUser();
  const combinedEventsData = [...eventsData, ...userEvents];
  const calendarEvents: AgendaEvent[] = combinedEventsData.map((event) => ({
    ...event,
    startTime: new Date(event.startTime),
    endTime: new Date(event.endTime),
  }));

  // Import events from appropriate JSON file for agenda container based on user stream
  const agendaEvents: AgendaEvent[] = getEventsForUser().map((event) => ({
    ...event,
    startTime: new Date(event.startTime),
    endTime: new Date(event.endTime),
  }));

  return (
    <main className="flex flex-col h-full overflow-hidden">
      <div className="flex px-2 items-start gap-2 flex-1 overflow-hidden border border-[rgba(48,242,242,0.2)]">
        <CalendarGrid title="Event Calendar" events={calendarEvents} />
        <AgendaContainer
          title="Your Events"
          events={window.innerWidth < 768 ? calendarEvents : agendaEvents}
          icon={<CalendarDays />}
        />
      </div>
    </main>
  );
}
