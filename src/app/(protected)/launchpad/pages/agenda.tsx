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

  // Import events from general events.json for calendar
  const calendarEvents: AgendaEvent[] = eventsData.map((event) => ({
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

  const combinedEvents = [...calendarEvents, ...agendaEvents];
  const seenEventKeys = new Set<string>();
  const uniqueFullEvents: AgendaEvent[] = [];

  for (const event of combinedEvents) {
    // Create a unique key for each event to check for duplicates
    // Using a combination of key properties that should uniquely identify an event
    const key = `${event.name}|${event.startTime.getTime()}|${event.endTime.getTime()}|${event.roomNumber}|${event.day}`;

    if (!seenEventKeys.has(key)) {
      seenEventKeys.add(key);
      uniqueFullEvents.push(event);
    }
  }

  const fullEvents: AgendaEvent[] = uniqueFullEvents.sort(
    (a, b) => a.startTime.getTime() - b.startTime.getTime(),
  );

  return (
    <main className="flex flex-col h-full overflow-hidden">
      <div className="flex px-2 items-start gap-2 flex-1 overflow-hidden border border-[rgba(48,242,242,0.2)]">
        <CalendarGrid title="Event Calendar" events={calendarEvents} />
        <AgendaContainer
          title="Your Events"
          events={fullEvents}
          icon={<CalendarDays />}
        />
      </div>
    </main>
  );
}
