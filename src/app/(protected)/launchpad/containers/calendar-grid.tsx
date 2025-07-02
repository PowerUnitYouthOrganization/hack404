import React, { ReactNode, useState } from "react";

interface AgendaEvent {
  name: string;
  startTime: Date;
  endTime: Date;
  roomNumber: string;
  day: number; // 1, 2, or 3
}

interface EventPosition {
  event: AgendaEvent;
  track: number;
  totalTracks: number;
  quarterSpan: number;
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

function doEventsOverlap(event1: AgendaEvent, event2: AgendaEvent): boolean {
  if (event1.day !== event2.day) return false;

  const start1 = event1.startTime.getTime();
  const end1 = event1.endTime.getTime();
  const start2 = event2.startTime.getTime();
  const end2 = event2.endTime.getTime();

  return start1 < end2 && start2 < end1;
}

function assignEventTracks(events: AgendaEvent[]): EventPosition[] {
  if (events.length === 0) return [];

  // Sort events by start time
  const sortedEvents = [...events].sort(
    (a, b) => a.startTime.getTime() - b.startTime.getTime(),
  );

  const eventPositions: EventPosition[] = [];
  const tracks: AgendaEvent[][] = [];

  for (const event of sortedEvents) {
    // Find the first track where this event doesn't overlap with the last event
    let assignedTrack = -1;

    for (let i = 0; i < tracks.length; i++) {
      const lastEventInTrack = tracks[i][tracks[i].length - 1];
      if (!doEventsOverlap(event, lastEventInTrack)) {
        assignedTrack = i;
        break;
      }
    }

    // If no suitable track found, create a new one
    if (assignedTrack === -1) {
      assignedTrack = tracks.length;
      tracks.push([]);
    }

    tracks[assignedTrack].push(event);
  }

  // Calculate quarter spans and create positions
  for (let trackIndex = 0; trackIndex < tracks.length; trackIndex++) {
    for (const event of tracks[trackIndex]) {
      const eventStartHour = event.startTime.getHours();
      const eventStartMinute = event.startTime.getMinutes();
      const eventStartQuarter = Math.floor(eventStartMinute / 15);

      const quarterSpan = getEventQuarterSpan(
        event,
        eventStartHour,
        eventStartQuarter,
      );

      eventPositions.push({
        event,
        track: trackIndex,
        totalTracks: tracks.length,
        quarterSpan,
      });
    }
  }

  return eventPositions;
}

function getMaxTracksForDay(events: AgendaEvent[], day: number): number {
  const dayEvents = events.filter((event) => event.day === day);
  if (dayEvents.length === 0) return 1;

  const eventPositions = assignEventTracks(dayEvents);
  return Math.max(...eventPositions.map((pos) => pos.totalTracks), 1);
}

function getEventPositionsForTimeSlot(
  events: AgendaEvent[],
  hour: number,
  quarter: number,
  day: number,
): EventPosition[] {
  const dayEvents = events.filter((event) => event.day === day);
  const allEventPositions = assignEventTracks(dayEvents);

  // Filter to only events that start in this time slot
  return allEventPositions.filter((position) => {
    const event = position.event;
    const eventStartHour = event.startTime.getHours();
    const eventStartMinute = event.startTime.getMinutes();
    const eventStartQuarter = Math.floor(eventStartMinute / 15);

    return eventStartHour === hour && eventStartQuarter === quarter;
  });
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
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const hours = Array.from({ length: 16 }, (_, i) => i + 8); // 8am to midnight
  const days = [
    { number: 1, label: "Day 1", sublabel: "Friday" },
    { number: 2, label: "Day 2", sublabel: "Saturday" },
    { number: 3, label: "Day 3", sublabel: "Sunday" },
  ];

  const maxTracks = getMaxTracksForDay(events, selectedDay);
  const gridColumns = `6rem ${Array(maxTracks).fill("1fr").join(" ")}`;

  return (
    <div className="hidden tablet:flex flex-col flex-1 h-full min-w-[66vw] border-x border-b border-[rgba(48,242,242,0.2)] backdrop-blur-[25px] text-white overflow-hidden">
      {/* Fixed Header */}
      <div className="flex px-6 py-6 justify-between items-center gap-2.5 self-stretch bg-inherit backdrop-blur-[25px] border-b border-[rgba(48,242,242,0.2)] sticky top-0 z-10 flex-shrink-0">
        <div className="flex items-center gap-6">
          <h1 className="text-white font-light">{title}</h1>
          <div className="flex gap-1">
            {days.map((day) => (
              <button
                key={day.number}
                onClick={() => setSelectedDay(day.number)}
                className={`px-4 py-2 rounded-lg transition-all font-medium text-sm ${
                  selectedDay === day.number
                    ? "bg-[rgba(48,242,242,0.3)] text-white border border-[rgba(48,242,242,0.5)]"
                    : "bg-[rgba(48,242,242,0.1)] text-gray-300 hover:bg-[rgba(48,242,242,0.2)] hover:text-white border border-transparent"
                }`}
              >
                <div className="flex flex-col items-center">
                  <span className="text-sm">{day.label}</span>
                  <span className="text-xs font-light opacity-75">
                    {day.sublabel}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <p className="font-light text-wcyan">
            Hacking lasts from Friday 9:00PM to Sunday 9:00AM
          </p>
          {icon && <div className="text-white h-5 w-5">{icon}</div>}
        </div>
      </div>

      {/* Calendar Grid Container */}
      <div className="flex flex-col flex-1 overflow-y-auto hide-scrollbar">
        {/* Column Headers */}
        <div
          className="grid gap-0 border-b border-[rgba(48,242,242,0.2)] bg-[rgba(48,242,242,0.05)] backdrop-blur-[25px] sticky top-0 z-5"
          style={{ gridTemplateColumns: gridColumns }}
        >
          <div className="p-3 border-r border-[rgba(48,242,242,0.2)] font-medium text-center w-24"></div>
          <div
            className="p-6 font-medium text-center flex justify-between"
            style={{ gridColumn: `2 / ${maxTracks + 2}` }}
          >
            <span>{days.find((d) => d.number === selectedDay)?.label}</span>
            <span className="font-extralight">
              {days.find((d) => d.number === selectedDay)?.sublabel}
            </span>
          </div>
        </div>

        {/* Calendar Grid */}
        <div
          className="grid gap-0"
          style={{ gridTemplateColumns: gridColumns }}
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

              {/* 15-minute subdivisions for each track */}
              {[0, 1, 2, 3].map((quarter) => (
                <React.Fragment key={`${hour}-${quarter}`}>
                  {Array.from({ length: maxTracks }, (_, trackIndex) => {
                    const eventPositions = getEventPositionsForTimeSlot(
                      events,
                      hour,
                      quarter,
                      selectedDay,
                    );

                    const eventInThisTrack = eventPositions.find(
                      (pos) => pos.track === trackIndex,
                    );

                    if (eventInThisTrack) {
                      return (
                        <div
                          key={`${hour}-${quarter}-${trackIndex}`}
                          className={`relative min-h-[30px] border-b border-[rgba(48,242,242,0.05)] bg-[rgba(48,242,242,0.15)] hover:bg-[rgba(48,242,242,0.25)] transition-colors cursor-pointer p-1 ${
                            trackIndex < maxTracks - 1
                              ? "border-r border-[rgba(48,242,242,0.2)]"
                              : ""
                          } ${quarter === 3 ? "border-b-[rgba(48,242,242,0.2)]" : ""}`}
                          style={{
                            gridRow:
                              eventInThisTrack.quarterSpan > 1
                                ? `span ${eventInThisTrack.quarterSpan}`
                                : "span 1",
                          }}
                        >
                          <div className="flex flex-col h-full">
                            <div className="font-medium text-white text-xs mb-1 line-clamp-1">
                              {eventInThisTrack.event.name}
                            </div>
                            <div className="text-xs text-gray-300 mb-1">
                              {eventInThisTrack.event.startTime.toLocaleTimeString(
                                "en-US",
                                {
                                  hour: "numeric",
                                  minute: "2-digit",
                                  hour12: true,
                                },
                              )}{" "}
                              -{" "}
                              {eventInThisTrack.event.endTime.toLocaleTimeString(
                                "en-US",
                                {
                                  hour: "numeric",
                                  minute: "2-digit",
                                  hour12: true,
                                },
                              )}
                            </div>
                            <div className="text-xs text-gray-400 mt-auto">
                              Rm. {eventInThisTrack.event.roomNumber}
                            </div>
                          </div>
                        </div>
                      );
                    }

                    // Check if this cell is part of a multi-quarter event (skip rendering)
                    const eventsInSlot = getEventsForTimeSlot(
                      events,
                      hour,
                      quarter,
                      selectedDay,
                    );
                    const dayEvents = events.filter(
                      (event) => event.day === selectedDay,
                    );
                    const allEventPositions = assignEventTracks(dayEvents);

                    const isPartOfEvent = allEventPositions.some((position) => {
                      if (position.track !== trackIndex) return false;

                      const event = position.event;
                      const eventStartHour = event.startTime.getHours();
                      const eventStartMinute = event.startTime.getMinutes();
                      const eventStartQuarter = Math.floor(
                        eventStartMinute / 15,
                      );
                      const eventStartQuarterTotal =
                        eventStartHour * 4 + eventStartQuarter;
                      const currentQuarterTotal = hour * 4 + quarter;

                      return (
                        eventStartQuarterTotal < currentQuarterTotal &&
                        eventsInSlot.some((e) => e.name === event.name)
                      );
                    });

                    if (isPartOfEvent) {
                      return null; // This cell is covered by the rowspan above
                    }

                    // Empty cell
                    return (
                      <div
                        key={`${hour}-${quarter}-${trackIndex}`}
                        className={`relative min-h-[30px] border-b border-[rgba(48,242,242,0.05)] hover:bg-[rgba(48,242,242,0.05)] transition-colors ${
                          trackIndex < maxTracks - 1
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
        {events.filter((event) => event.day === selectedDay).length === 0 && (
          <div className="flex items-center justify-center py-8">
            <p className="text-gray-400">No events scheduled for this day</p>
          </div>
        )}
      </div>
    </div>
  );
}
