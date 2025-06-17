"use client";

import CalendarGrid from "@/app/(protected)/launchpad/containers/calendar-grid";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import eventsData from "@/data/events.json";

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
  const firstName = session?.user?.name?.split(" ")[0] || "Hacker";

  // Import events from JSON file and convert date strings to Date objects
  const agendaEvents: AgendaEvent[] = eventsData.map((event) => ({
    ...event,
    startTime: new Date(event.startTime),
    endTime: new Date(event.endTime),
  }));

  return (
    <main className="flex flex-col gap-9 w-full">
      <div className="flex px-9 justify-between items-end self-stretch">
        <div className="flex flex-col justify-center items-start">
          <h1 className="text-[40px] leading-normal font-(family-name:--font-heading)">
            Event Schedule
          </h1>
          <sub className="text-wcyan font-light text-sm">
            Stay updated with all activities
          </sub>
        </div>
      </div>

      <div className="flex px-2 items-start gap-2 flex-1 self-stretch border border-[rgba(48,242,242,0.2)]">
        <CalendarGrid
          title="Event Calendar"
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
          events={agendaEvents}
          topOffset={218}
        />

        <div className="flex flex-col flex-1 gap-2 self-stretch border-x border-b border-[rgba(48,242,242,0.2)] backdrop-blur-[25px] text-white">
          <div className="flex flex-col items-start self-stretch border-b border-[rgba(48,242,242,0.2)]">
            <div className="flex px-6 py-6 justify-center items-center gap-2.5 self-stretch bg-inherit backdrop-blur-[25px] border-b border-[rgba(48,242,242,0.2)] sticky top-0 z-10 flex-shrink-0">
              <h1 className="flex-1 text-white font-light">Quick Actions</h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20px"
                viewBox="0 -960 960 960"
                width="20px"
                fill="#e3e3e3"
              >
                <path d="M480-200v-360H120v-80h440v440h-80Zm200-200v-360H320v-80h440v440h-80Z" />
              </svg>
            </div>

            <div className="flex flex-col items-start justify-between self-stretch p-6 border-b border-[rgba(48, 242, 242, 0.20)] bg-[rgba(48, 242, 242, 0.10)] backdrop-blur-[25px] cursor-pointer hover:bg-[rgba(48, 242, 242, 0.15)] transition-colors">
              <div className="flex justify-between items-start self-stretch">
                <div className="flex flex-col items-start gap-2">
                  <h2 className="font-medium">Add to Calendar</h2>
                  <p className="font-light text-sm">
                    Export schedule to your calendar app
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-start justify-between self-stretch p-6 border-b border-[rgba(48, 242, 242, 0.20)] bg-[rgba(48, 242, 242, 0.05)] backdrop-blur-[25px] cursor-pointer hover:bg-[rgba(48, 242, 242, 0.10)] transition-colors">
              <div className="flex justify-between items-start self-stretch">
                <div className="flex flex-col items-start gap-2">
                  <h2 className="font-medium">Set Reminders</h2>
                  <p className="font-light text-sm">
                    Get notified before important events
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-start justify-between self-stretch p-6 bg-[rgba(48, 242, 242, 0.02)] backdrop-blur-[25px] cursor-pointer hover:bg-[rgba(48, 242, 242, 0.07)] transition-colors">
              <div className="flex justify-between items-start self-stretch">
                <div className="flex flex-col items-start gap-2">
                  <h2 className="font-medium">View Map</h2>
                  <p className="font-light text-sm">
                    Find room locations and directions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
