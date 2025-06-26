import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ReactNode } from "react";

interface Announcement {
  id: number;
  title: string;
  content: string;
  author: string;
  authorId: string;
  createdAt: string; // This will be a string in JSON format
  authorImage: string;
}

interface AnnouncementContainerProps {
  title: string;
  icon?: ReactNode;
  events: Announcement[];
}

export default function AnnouncementContainer({
  title,
  icon,
  events,
}: AnnouncementContainerProps) {
  return (
    <div className="flex flex-col flex-1 h-full border-x border-b border-[rgba(48,242,242,0.2)] backdrop-blur-[25px] text-white overflow-hidden">
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
            bgOpacity = "bg-[rgba(195,247,58,0.10)]"; // 10% for first
          } else if (index === 1) {
            bgOpacity = "bg-[rgba(195,247,58,0.05)]"; // 5% for second
          } else {
            bgOpacity = "bg-[rgba(195,247,58,0.02)]"; // 2% for subsequent
          }

          return (
            <div
              key={index}
              className={`flex flex-col items-start gap-7 self-stretch p-6 border-b border-[rgba(48,242,242,0.2)] ${bgOpacity} backdrop-blur-[25px] last:border-b-0 flex-shrink-0`}
            >
              {/* Event Header */}
              <div className="flex justify-between items-start self-stretch">
                <div className="flex flex-col items-start gap-2">
                  <h2 className="font-medium">{event.title}</h2>
                  <p className="font-light text-sm">{event.content}</p>
                </div>
              </div>

              {/* Event Details */}
              <div className="flex justify-between items-start self-stretch">
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src={event.authorImage} alt={event.author} />
                    <AvatarFallback>
                      {event.author.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <p className="font-light">{`From ${event.author}`}</p>
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
