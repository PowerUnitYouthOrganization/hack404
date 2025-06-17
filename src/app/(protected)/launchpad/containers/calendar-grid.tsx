import React, { ReactNode } from "react";

interface AgendaEvent {
  name: string;
  startTime: Date;
  endTime: Date;
  roomNumber: string;
  day: number; // 1, 2, or 3
}

interface CalendarGridProps {
  title: string;
  icon?: ReactNode;
  events: AgendaEvent[];
  topOffset?: number;
}

function formatTime(hour: number): string {
  if (hour === 12) return "12 PM";
  if (hour < 12) return `${hour} AM`;
  return `${hour - 12} PM`;
}

function getEventsForTimeSlot(
  events: AgendaEvent[],
  hour: number,
  day: number,
) {
  return events.filter((event) => {
    const eventStartHour = event.startTime.getHours();
    const eventEndHour = event.endTime.getHours();
    return event.day === day && eventStartHour <= hour && hour < eventEndHour;
  });
}

function getEventRowSpan(event: AgendaEvent, currentHour: number): number {
  const eventStartHour = event.startTime.getHours();
  const eventEndHour = event.endTime.getHours();

  // If this is the starting hour for the event, calculate full span
  if (currentHour === eventStartHour) {
    return eventEndHour - eventStartHour;
  }

  // If we're in the middle of an event, don't render (will be handled by rowspan)
  return 0;
}

export default function CalendarGrid({
  title,
  icon,
  events,
  topOffset = 218,
}: CalendarGridProps) {
  const hours = Array.from({ length: 13 }, (_, i) => i + 9); // 9am to 9pm
  const days = ["Day 1 - Friday", "Day 2 - Saturday", "Day 3 - Sunday"];

  return (
    <div className="flex flex-col flex-1 h-full min-w-[66vw] border-x border-b border-[rgba(48,242,242,0.2)] backdrop-blur-[25px] text-white overflow-hidden">
      {/* Fixed Header */}
      <div className="flex px-6 py-6 justify-center items-center gap-2.5 self-stretch bg-inherit backdrop-blur-[25px] border-b border-[rgba(48,242,242,0.2)] sticky top-0 z-10 flex-shrink-0">
        <h1 className="flex-1 text-white font-light">{title}</h1>
        {icon && <div className="text-white h-5 w-5">{icon}</div>}
      </div>

      {/* Calendar Grid Container */}
      <div className="flex flex-col flex-1 overflow-y-auto hide-scrollbar">
        {/* Day Headers */}
        <div
          className="grid gap-0 border-b border-[rgba(48,242,242,0.2)] bg-[rgba(48,242,242,0.05)] backdrop-blur-[25px] sticky top-0 z-5"
          style={{ gridTemplateColumns: "6rem 1fr 1fr 1fr" }}
        >
          <div className="p-3 border-r border-[rgba(48,242,242,0.2)] font-medium text-center w-24"></div>
          {days.map((day, index) => (
            <div
              key={day}
              className={`p-6 flex justify-between self-stretch font-medium text-center ${
                index < 2 ? "border-r border-[rgba(48,242,242,0.2)]" : ""
              }`}
            >
              <p>{day.split(" - ")[0]}</p>
              <p className="font-extralight">{day.split(" - ")[1]}</p>
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div
          className="grid gap-0"
          style={{ gridTemplateColumns: "6rem 1fr 1fr 1fr" }}
        >
          {hours.map((hour) => (
            <React.Fragment key={hour}>
              {/* Time label */}
              <div className="p-3 border-r border-[rgba(48,242,242,0.2)] text-sm font-light flex items-center justify-end min-h-[60px] w-24">
                {formatTime(hour)}
              </div>

              {/* Day columns */}
              {[1, 2, 3].map((day, dayIndex) => {
                const eventsInSlot = getEventsForTimeSlot(events, hour, day);
                const eventToRender = eventsInSlot.find(
                  (event) => event.startTime.getHours() === hour,
                );

                if (eventToRender) {
                  const rowSpan = getEventRowSpan(eventToRender, hour);

                  return (
                    <div
                      key={`${hour}-${day}`}
                      className={`relative min-h-[90px] border-b border-[rgba(48,242,242,0.2)] bg-[rgba(48,242,242,0.15)] hover:bg-[rgba(48,242,242,0.25)] transition-colors cursor-pointer p-2 ${
                        dayIndex < 2
                          ? "border-r border-[rgba(48,242,242,0.2)]"
                          : ""
                      }`}
                      style={{
                        gridRow: rowSpan > 1 ? `span ${rowSpan}` : "span 1",
                      }}
                    >
                      <div className="flex flex-col h-full">
                        <div className="font-medium text-white text-sm mb-1 line-clamp-2">
                          {eventToRender.name}
                        </div>
                        <div className="text-xs text-gray-300 mb-1">
                          {eventToRender.startTime.toLocaleTimeString("en-US", {
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                          })}{" "}
                          -{" "}
                          {eventToRender.endTime.toLocaleTimeString("en-US", {
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                          })}
                        </div>
                        <div className="text-xs text-gray-400 mt-auto">
                          Rm. {eventToRender.roomNumber}
                        </div>
                      </div>
                    </div>
                  );
                }

                // Check if this cell is part of a multi-hour event (skip rendering)
                const isPartOfEvent = eventsInSlot.some(
                  (event) =>
                    event.startTime.getHours() < hour &&
                    event.endTime.getHours() > hour,
                );

                if (isPartOfEvent) {
                  return null; // This cell is covered by the rowspan above
                }

                // Empty cell
                return (
                  <div
                    key={`${hour}-${day}`}
                    className={`relative min-h-[90px] border-b border-[rgba(48,242,242,0.2)] hover:bg-[rgba(48,242,242,0.05)] transition-colors ${
                      dayIndex < 2
                        ? "border-r border-[rgba(48,242,242,0.2)]"
                        : ""
                    }`}
                  >
                    {/* Empty cell for potential future events */}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>

        {/* No events message */}
        {events.length === 0 && (
          <div className="flex items-center justify-center py-8">
            <p className="text-gray-400">No events scheduled</p>
          </div>
        )}
      </div>
    </div>
  );
}
