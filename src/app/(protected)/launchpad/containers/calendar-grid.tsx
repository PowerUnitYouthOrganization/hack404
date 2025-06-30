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
}

function formatTime(hour: number): string {
  if (hour === 0) return "12 AM";
  if (hour === 12) return "12 PM";
  if (hour < 12) return `${hour} AM`;
  if (hour === 24) return "12 AM";
  return `${hour - 12} PM`;
}

function getEventsForTimeSlot(
  events: AgendaEvent[],
  hour: number,
  quarter: number,
  day: number,
) {
  return events.filter((event) => {
    const eventStartHour = event.startTime.getHours();
    const eventStartMinute = event.startTime.getMinutes();
    const eventEndHour = event.endTime.getHours();
    const eventEndMinute = event.endTime.getMinutes();

    const eventStartQuarter = Math.floor(eventStartMinute / 15);
    const currentQuarter = hour * 4 + quarter;
    const eventStartQuarterTotal = eventStartHour * 4 + eventStartQuarter;

    // Handle events that cross day boundaries (end at midnight of next day)
    let eventEndQuarter;
    if (eventEndHour === 0 && eventStartHour > 0 && event.day === day) {
      // Event ends at midnight of next day, extend to end of current day's grid
      eventEndQuarter = 24 * 4; // 24:00 = 96 quarters from midnight
    } else {
      eventEndQuarter = eventEndHour * 4 + Math.ceil(eventEndMinute / 15);
    }

    return (
      event.day === day &&
      eventStartQuarterTotal <= currentQuarter &&
      currentQuarter < eventEndQuarter
    );
  });
}

function getEventQuarterSpan(
  event: AgendaEvent,
  currentHour: number,
  currentQuarter: number,
): number {
  const eventStartHour = event.startTime.getHours();
  const eventStartMinute = event.startTime.getMinutes();
  const eventEndHour = event.endTime.getHours();
  const eventEndMinute = event.endTime.getMinutes();

  const eventStartQuarter = Math.floor(eventStartMinute / 15);
  const eventStartQuarterTotal = eventStartHour * 4 + eventStartQuarter;
  const currentQuarterTotal = currentHour * 4 + currentQuarter;

  // Handle events that cross day boundaries (end at midnight of next day)
  let eventEndQuarter;
  if (eventEndHour === 0 && eventStartHour > 0) {
    // Event ends at midnight of next day, calculate span to end of current day's grid
    const maxVisibleHour = 24; // Grid shows up to midnight
    eventEndQuarter = maxVisibleHour * 4;
  } else {
    eventEndQuarter = eventEndHour * 4 + Math.ceil(eventEndMinute / 15);
  }

  // If this is the starting quarter for the event, calculate full span
  if (currentQuarterTotal === eventStartQuarterTotal) {
    return eventEndQuarter - eventStartQuarterTotal;
  }

  // If we're in the middle of an event, don't render (will be handled by rowspan)
  return 0;
}

function getQuarterMinutes(quarter: number): string {
  switch (quarter) {
    case 0:
      return ":00";
    case 1:
      return ":15";
    case 2:
      return ":30";
    case 3:
      return ":45";
    default:
      return ":00";
  }
}

export default function CalendarGrid({
  title,
  icon,
  events,
}: CalendarGridProps) {
  const hours = Array.from({ length: 16 }, (_, i) => i + 8); // 8am to midnight
  const days = ["Day 1 - Friday", "Day 2 - Saturday", "Day 3 - Sunday"];

  return (
    <div className="flex flex-col flex-1 h-full min-w-[66vw] border-x border-b border-[rgba(48,242,242,0.2)] backdrop-blur-[25px] text-white overflow-hidden">
      {/* Fixed Header */}
      <div className="flex px-6 py-6 justify-center items-center gap-2.5 self-stretch bg-inherit backdrop-blur-[25px] border-b border-[rgba(48,242,242,0.2)] sticky top-0 z-10 flex-shrink-0">
        <h1 className="flex-1 text-white font-light">{title}</h1>
        <p className="font-light text-wcyan"></p>
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
              {/* Time label - spans all 4 quarters */}
              <div
                className="relative border-r border-[rgba(48,242,242,0.2)] text-sm font-light min-h-[120px] w-24"
                style={{ gridRow: "span 4" }}
              >
                <div className="absolute top-2 right-3 font-medium">
                  {formatTime(hour)}
                </div>
              </div>

              {/* 15-minute subdivisions for each day */}
              {[0, 1, 2, 3].map((quarter) => (
                <React.Fragment key={`${hour}-${quarter}`}>
                  {[1, 2, 3].map((day, dayIndex) => {
                    const eventsInSlot = getEventsForTimeSlot(
                      events,
                      hour,
                      quarter,
                      day,
                    );
                    const eventToRender = eventsInSlot.find((event) => {
                      const eventStartHour = event.startTime.getHours();
                      const eventStartMinute = event.startTime.getMinutes();
                      const eventStartQuarter = Math.floor(
                        eventStartMinute / 15,
                      );

                      // Debug logging for midnight events
                      if (
                        event.name.includes("Last to Remain") ||
                        event.name.includes("Karaoke")
                      ) {
                        console.log(`Debug ${event.name}:`, {
                          day: event.day,
                          currentDay: day,
                          hour,
                          quarter,
                          eventStartHour,
                          eventStartQuarter,
                          eventsInSlot: eventsInSlot.length,
                          startTime: event.startTime.toISOString(),
                          endTime: event.endTime.toISOString(),
                        });
                      }

                      return (
                        eventStartHour === hour && eventStartQuarter === quarter
                      );
                    });

                    if (eventToRender) {
                      const quarterSpan = getEventQuarterSpan(
                        eventToRender,
                        hour,
                        quarter,
                      );

                      return (
                        <div
                          key={`${hour}-${quarter}-${day}`}
                          className={`relative min-h-[30px] border-b border-[rgba(48,242,242,0.05)] bg-[rgba(48,242,242,0.15)] hover:bg-[rgba(48,242,242,0.25)] transition-colors cursor-pointer p-1 ${
                            dayIndex < 2
                              ? "border-r border-[rgba(48,242,242,0.2)]"
                              : ""
                          } ${quarter === 3 ? "border-b-[rgba(48,242,242,0.2)]" : ""}`}
                          style={{
                            gridRow:
                              quarterSpan > 1
                                ? `span ${quarterSpan}`
                                : "span 1",
                          }}
                        >
                          <div className="flex flex-col h-full">
                            <div className="font-medium text-white text-xs mb-1 line-clamp-1">
                              {eventToRender.name}
                            </div>
                            <div className="text-xs text-gray-300 mb-1">
                              {eventToRender.startTime.toLocaleTimeString(
                                "en-US",
                                {
                                  hour: "numeric",
                                  minute: "2-digit",
                                  hour12: true,
                                },
                              )}{" "}
                              -{" "}
                              {eventToRender.endTime.toLocaleTimeString(
                                "en-US",
                                {
                                  hour: "numeric",
                                  minute: "2-digit",
                                  hour12: true,
                                },
                              )}
                            </div>
                            <div className="text-xs text-gray-400 mt-auto">
                              Rm. {eventToRender.roomNumber}
                            </div>
                          </div>
                        </div>
                      );
                    }

                    // Check if this cell is part of a multi-quarter event (skip rendering)
                    const isPartOfEvent = eventsInSlot.some((event) => {
                      const eventStartHour = event.startTime.getHours();
                      const eventStartMinute = event.startTime.getMinutes();
                      const eventStartQuarter = Math.floor(
                        eventStartMinute / 15,
                      );
                      const eventStartQuarterTotal =
                        eventStartHour * 4 + eventStartQuarter;
                      const currentQuarterTotal = hour * 4 + quarter;

                      return eventStartQuarterTotal < currentQuarterTotal;
                    });

                    if (isPartOfEvent) {
                      return null; // This cell is covered by the rowspan above
                    }

                    // Empty cell
                    return (
                      <div
                        key={`${hour}-${quarter}-${day}`}
                        className={`relative min-h-[30px] border-b border-[rgba(48,242,242,0.05)] hover:bg-[rgba(48,242,242,0.05)] transition-colors ${
                          dayIndex < 2
                            ? "border-r border-[rgba(48,242,242,0.2)]"
                            : ""
                        } ${quarter === 3 ? "border-b-[rgba(48,242,242,0.2)]" : ""}`}
                      >
                        {/* Quarter time marker for debugging */}
                        <div className="absolute top-0 left-1 text-xs text-gray-500 opacity-30">
                          {getQuarterMinutes(quarter)}
                        </div>
                      </div>
                    );
                  })}
                </React.Fragment>
              ))}
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
