import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ReactNode } from "react";

interface Announcement {
  title: string;
  content: string;
  announcer: string;
  avatarLink: string;
}

interface AnnouncementContainerProps {
  title: string;
  icon?: ReactNode;
  events: Announcement[];
  topOffset?: number;
}

export default function AnnouncementContainer({
  title,
  icon,
  events,
  topOffset = 218,
}: AnnouncementContainerProps) {
  return (
    <div
      className="flex flex-col max-h-[60vh] flex-1 self-stretch border-x border-b border-[rgba(48,242,242,0.2)] backdrop-blur-[25px] text-white"
      style={{ height: `calc(100dvh - ${topOffset}px)` }}
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
              className={`flex flex-col items-start gap-9 self-stretch p-6 border-b border-[rgba(48,242,242,0.2)] ${bgOpacity} backdrop-blur-[25px] last:border-b-0 flex-shrink-0`}
            >
              {/* Event Header */}
              <div className="flex justify-between items-start self-stretch">
                <div className="flex flex-col items-start gap-2">
                  <h2 className="font-medium">{event.title}</h2>
                  <p className="font-light text-sm">{event.content}</p>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20px"
                  viewBox="0 -960 960 960"
                  width="20px"
                  fill="#e3e3e3"
                >
                  <path d="M200-200v-240h80v160h160v80H200Zm480-320v-160H520v-80h240v240h-80Z" />
                </svg>
              </div>

              {/* Event Details */}
              <div className="flex justify-between items-start self-stretch">
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src={event.avatarLink} alt={event.announcer} />
                    <AvatarFallback>
                      {event.announcer.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <p className="font-light">{`From ${event.announcer}`}</p>
              </div>
            </div>
          );
        })}

        {/* No events message */}
        {events.length === 0 && (
          <div className="flex items-center justify-center flex-1 self-stretch">
            <p className="">No announcements</p>
          </div>
        )}
      </div>
    </div>
  );
}
