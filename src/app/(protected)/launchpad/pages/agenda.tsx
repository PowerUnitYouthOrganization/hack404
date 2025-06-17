"use client";

import CalendarGrid from "@/app/(protected)/launchpad/containers/calendar-grid";
import eventsData from "@/data/events.json";
import AgendaContainer from "../containers/events-container";

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
  // Import events from JSON file and convert date strings to Date objects
  const agendaEvents: AgendaEvent[] = eventsData.map((event) => ({
    ...event,
    startTime: new Date(event.startTime),
    endTime: new Date(event.endTime),
  }));

  return (
    <main className="flex flex-col h-full overflow-hidden">
      <div className="flex px-2 items-start gap-2 flex-1 overflow-hidden border border-[rgba(48,242,242,0.2)]">
        <CalendarGrid title="Event Calendar" events={agendaEvents} />
        <AgendaContainer
          title="Your Events"
          events={agendaEvents}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="#e3e3e3"
            >
              <path d="M228.31-116q-27.01 0-45.66-19Q164-154 164-180.31v-503.38Q164-710 182.65-729q18.65-19 45.66-19h87.38v-100.61h53.54V-748h223.08v-100.61h52V-748h87.38q27.01 0 45.66 19Q796-710 796-683.69v503.38Q796-154 777.35-135q-18.65 19-45.66 19H228.31Zm0-52h503.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-335.38H216v335.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85ZM216-567.69h528v-116q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85H228.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v116Zm0 0V-696v128.31Zm264.21 186.77q-12.9 0-22.25-9.14-9.34-9.13-9.34-22.04 0-12.9 9.13-22.25 9.14-9.34 22.04-9.34 12.9 0 22.25 9.13 9.34 9.14 9.34 22.04 0 12.91-9.13 22.25-9.14 9.35-22.04 9.35Zm-156 0q-12.9 0-22.25-9.14-9.34-9.13-9.34-22.04 0-12.9 9.13-22.25 9.14-9.34 22.04-9.34 12.9 0 22.25 9.13 9.34 9.14 9.34 22.04 0 12.91-9.13 22.25-9.14 9.35-22.04 9.35Zm312 0q-12.9 0-22.25-9.14-9.34-9.13-9.34-22.04 0-12.9 9.13-22.25 9.14-9.34 22.04-9.34 12.9 0 22.25 9.13 9.34 9.14 9.34 22.04 0 12.91-9.13 22.25-9.14 9.35-22.04 9.35ZM480.21-240q-12.9 0-22.25-9.14-9.34-9.13-9.34-22.03 0-12.91 9.13-22.25 9.14-9.35 22.04-9.35 12.9 0 22.25 9.14 9.34 9.13 9.34 22.04 0 12.9-9.13 22.24-9.14 9.35-22.04 9.35Zm-156 0q-12.9 0-22.25-9.14-9.34-9.13-9.34-22.03 0-12.91 9.13-22.25 9.14-9.35 22.04-9.35 12.9 0 22.25 9.14 9.34 9.13 9.34 22.04 0 12.9-9.13 22.24-9.14 9.35-22.04 9.35Zm312 0q-12.9 0-22.25-9.14-9.34-9.13-9.34-22.03 0-12.91 9.13-22.25 9.14-9.35 22.04-9.35 12.9 0 22.25 9.14 9.34 9.13 9.34 22.04 0 12.9-9.13 22.24-9.14 9.35-22.04 9.35Z" />
            </svg>
          }
        />
      </div>
    </main>
  );
}
