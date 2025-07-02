import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { ReactNode } from "react";

interface AgendaEvent {
  name: string;
  startTime: Date;
  endTime: Date;
  roomNumber: string;
}

interface AgendaContainerProps {
  title: string;
  icon?: ReactNode;
  events: AgendaEvent[];
  topOffset?: number;
  className?: string;
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function getTimeUntilEvent(startTime: Date, endTime: Date): string {
  const now = new Date();
  const diffMs = startTime.getTime() - now.getTime();

  if (
    endTime.getTime() > now.getTime() &&
    now.getTime() > startTime.getTime()
  ) {
    return "happening now";
  } else if (diffMs <= 0) {
    return "ended";
  }

  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 0) {
    return `in ${diffDays}d`;
  } else if (diffHours > 0) {
    const remainingMinutes = diffMinutes % 60;
    if (remainingMinutes > 0) {
      return `in ${diffHours}h ${remainingMinutes}m`;
    }
    return `in ${diffHours}h`;
  } else {
    return `in ${diffMinutes}m`;
  }
}

export default function AgendaContainer({
  title,
  icon,
  events,
  topOffset = 218,
  className,
}: AgendaContainerProps) {
  return (
    <div
      className={`flex flex-col flex-1 h-full border-x mobile:border-t mobile:border-b border-[rgba(48,242,242,0.2)] backdrop-blur-[25px] text-white overflow-hidden ${className || ""}`}
    >
      {/* Fixed Header */}
      <div className="flex px-6 py-6 justify-center items-center gap-2.5 self-stretch bg-inherit backdrop-blur-[25px] border-b border-[rgba(48,242,242,0.2)] sticky top-0 z-10 flex-shrink-0">
        <h1 className="flex-1 text-white font-light">{title}</h1>
        {icon && <div className="text-white h-5 w-5">{icon}</div>}
      </div>

      {/* Scrollable Events Container */}
      <div className="flex flex-col items-start flex-1 self-stretch overflow-y-auto hide-scrollbar">
        {events.map((event, index) => {
          // Calculate background opacity based on index
          let bgOpacity;
          if (index === 0) {
            bgOpacity = "bg-[rgba(255,255,255,0.10)]"; // 10% for first
          } else if (index === 1) {
            bgOpacity = "bg-[rgba(255,255,255,0.05)]"; // 5% for second
          } else {
            bgOpacity = "bg-[rgba(255,255,255,0.02)]"; // 2% for subsequent
          }

          return (
            <div
              key={index}
              className={`flex flex-col items-start gap-9 self-stretch p-6 border-b border-[rgba(48,242,242,0.2)] ${bgOpacity} backdrop-blur-[25px] flex-shrink-0`}
            >
              {/* Event Header */}
              <div className="flex justify-between items-start self-stretch">
                <div className="flex flex-col items-start gap-2">
                  <h2 className="font-medium">{event.name}</h2>
                  <p className="font-light text-sm">
                    {getTimeUntilEvent(event.startTime, event.endTime)}
                  </p>
                </div>
              </div>

              {/* Event Details */}
              <div className="flex justify-between items-start self-stretch">
                <p className="font-light">
                  {formatTime(event.startTime)} - {formatTime(event.endTime)}
                </p>
                <p className="font-light">Rm. {event.roomNumber}</p>
              </div>
            </div>
          );
        })}

        {/* No events message */}
        {events.length === 0 && (
          <div className="flex items-center justify-center flex-1 self-stretch">
            <p className="">No upcoming events</p>
          </div>
        )}
      </div>
    </div>
  );
}
