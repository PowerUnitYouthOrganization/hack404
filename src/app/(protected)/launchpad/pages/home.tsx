"use client";

import AgendaContainer from "@/app/(protected)/launchpad/containers/events-container";
import AnnouncementContainer from "@/app/(protected)/launchpad/containers/announcements-container";
import InfoContainer from "@/app/(protected)/launchpad/containers/info-container";
import { useSession } from "next-auth/react";
import eventsData from "@/data/events.json";
import { useEffect, useState } from "react";
import { PAGINATION_LIMIT } from "@/lib/config";
import useSWRInfinite from "swr/infinite";
import RoundedButton from "@/components/ui/roundedbutton";
import { ExternalLink } from "lucide-react";

// could probably be moved to json or something
interface AgendaEvent {
  name: string;
  startTime: Date;
  endTime: Date;
  roomNumber: string;
}

interface Announcement {
  id: number;
  title: string;
  content: string;
  author: string;
  authorId: string;
  createdAt: string; // This will be a string in JSON format
  authorImage: string;
}

interface AnnouncementResponse {
  data: Announcement[];
  nextCursor: string | null;
  hasMore: boolean;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const getKey = (
  pageIndex: number,
  previousPageData: AnnouncementResponse | null,
) => {
  // reached the end
  if (previousPageData && !previousPageData.hasMore) return null;

  // first page, we don't have `previousPageData`
  if (pageIndex === 0) return `/api/announcements?limit=${PAGINATION_LIMIT}`;

  // add the cursor to the API endpoint
  if (!previousPageData?.nextCursor) return null;
  return `/api/announcements?limit=${PAGINATION_LIMIT}&cursor=${previousPageData.nextCursor}`;
};

/**
 * This component serves as the main layout for the hacker dashboard page.
 * @returns Launchpad component
 */
export default function Home() {
  const [timeLeft, setTimeLeft] = useState<string>("00d 00h 00m 00s");
  const { data: session } = useSession();
  const firstName = session?.user?.name?.split(" ")[0] || "Hacker";
  const {
    data: announcementPages,
    size,
    setSize,
    isValidating,
  } = useSWRInfinite<AnnouncementResponse>(getKey, fetcher, {
    refreshInterval: 5000, // Refresh every 5 seconds for live-ish updates
    revalidateFirstPage: false,
  });

  const announcementData: Announcement[] = announcementPages
    ? announcementPages.flatMap((page) => page.data)
    : [];
  const isLoadingAnnouncements = isValidating;
  const hasMoreAnnouncements = announcementPages
    ? (announcementPages[announcementPages.length - 1]?.hasMore ?? false)
    : true;

  const loadMoreAnnouncements = () => {
    if (!isLoadingAnnouncements) {
      setSize(size + 1);
    }
  };

  useEffect(() => {
    // time until submission deadline or whatever date
    const targetDate = new Date("2025-07-06T10:00:00");
    const interval = setInterval(() => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();
      if (diff <= 0) {
        setTimeLeft("00d 00h 00m 00s"); // Or "00h 00m 00s" if no days remaining
        clearInterval(interval);
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        let timeLeftString = "";
        if (days > 0) {
          timeLeftString = `${days.toString().padStart(2, "0")}d `;
        }
        timeLeftString += `${hours.toString().padStart(2, "0")}h ${minutes
          .toString()
          .padStart(2, "0")}m ${seconds.toString().padStart(2, "0")}s`;

        setTimeLeft(timeLeftString);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // import agenda events from json
  const agendaEvents: AgendaEvent[] = eventsData.map((event) => ({
    ...event,
    startTime: new Date(event.startTime),
    endTime: new Date(event.endTime),
  }));

  return (
    <main className="flex flex-col h-full overflow-hidden gap-6">
      <div className="tablet:hidden self-stretch p-6 bg-neutral-900/20 border-t border-b border-cyan-400/20 inline-flex justify-between items-center">
        <div className="inline-flex flex-col justify-start items-start">
          <h1 className="text-2xl leading-normal font-(family-name:--font-heading-light)">
            {timeLeft}
          </h1>
          <sub className="text-center justify-start text-cyan-400 text-sm font-light font-['DM_Sans']">
            until submission deadline
          </sub>
        </div>
        <RoundedButton
          color={"var(--color-wcyan)"}
          className="text-black w-full"
          onClick={() => {
            window.open(
              "https://shiny-heliotrope-909.notion.site/Hack404-Hacker-Handbook-221892007b0a809ba0eacd66541648fd",
              "_blank",
            ); // Link to an external Devpost page
          }}
        >
          <p>Details</p>
          <ExternalLink className="w-5 h-5" />
        </RoundedButton>
      </div>
      <div className="flex flex-col tablet:flex-row px-4 tablet:px-9 justify-between items-center tablet:items-end flex-shrink-0 py-4 gap-4">
        <div className="flex flex-col justify-center items-center tablet:items-start">
          <h1 className="text-[40px] leading-normal font-(family-name:--font-heading)">
            Hello {firstName}!
          </h1>
          <sub className="text-wcyan font-light text-sm">
            Welcome to Hack404
          </sub>
        </div>
        <div className="hidden tablet:flex tablet:flex-col tablet:justify-center tablet:items-end">
          <h1 className="text-[40px] leading-normal font-(family-name:--font-heading-light)">
            {timeLeft}
          </h1>
          <sub className="text-wcyan font-light text-sm">
            until submission deadline
          </sub>
        </div>
      </div>

      <div className="flex flex-col tablet:flex-row tablet:px-2 px-0 items-stretch tablet:items-start gap-2 flex-1 overflow-y-auto tablet:overflow-hidden border-t border-b tablet:border-x border-[rgba(48,242,242,0.2)]">
        <AgendaContainer
          title="Agenda"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="http://www.w3.org/2000/svg"
              width="20px"
              fill="#e3e3e3"
            >
              <path d="M228.31-116q-27.01 0-45.66-19Q164-154 164-180.31v-503.38Q164-710 182.65-729q18.65-19 45.66-19h87.38v-100.61h53.54V-748h223.08v-100.61h52V-748h87.38q27.01 0 45.66 19Q796-710 796-683.69v503.38Q796-154 777.35-135q-18.65 19-45.66 19H228.31Zm0-52h503.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-335.38H216v335.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85ZM216-567.69h528v-116q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85H228.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v116Zm0 0V-696v128.31Zm264.21 186.77q-12.9 0-22.25-9.14-9.34-9.13-9.34-22.04 0-12.9 9.13-22.25 9.14-9.34 22.04-9.34 12.9 0 22.25 9.13 9.34 9.14 9.34 22.04 0 12.91-9.13 22.25-9.14 9.35-22.04 9.35Zm-156 0q-12.9 0-22.25-9.14-9.34-9.13-9.34-22.04 0-12.9 9.13-22.25 9.14-9.34 22.04-9.34 12.9 0 22.25 9.13 9.34 9.14 9.34 22.04 0 12.91-9.13 22.25-9.14 9.35-22.04 9.35Zm312 0q-12.9 0-22.25-9.14-9.34-9.13-9.34-22.04 0-12.9 9.13-22.25 9.14-9.34 22.04-9.34 12.9 0 22.25 9.13 9.34 9.14 9.34 22.04 0 12.91-9.13 22.25-9.14 9.35-22.04 9.35ZM480.21-240q-12.9 0-22.25-9.14-9.34-9.13-9.34-22.03 0-12.91 9.13-22.25 9.14-9.35 22.04-9.35 12.9 0 22.25 9.14 9.34 9.13 9.34 22.04 0 12.9-9.13 22.24-9.14 9.35-22.04 9.35Zm-156 0q-12.9 0-22.25-9.14-9.34-9.13-9.34-22.03 0-12.91 9.13-22.25 9.14-9.35 22.04-9.35 12.9 0 22.25 9.14 9.34 9.13 9.34 22.04 0 12.9-9.13 22.24-9.14 9.35-22.04 9.35Zm312 0q-12.9 0-22.25-9.14-9.34-9.13-9.34-22.03 0-12.91 9.13-22.25 9.14-9.35 22.04-9.35 12.9 0 22.25 9.14 9.34 9.13 9.34 22.04 0 12.9-9.13 22.24-9.14 9.35-22.04 9.35Z" />
            </svg>
          }
          events={agendaEvents}
        />
        <AnnouncementContainer
          title="Announcements"
          events={announcementData}
          onLoadMore={loadMoreAnnouncements}
          hasMore={hasMoreAnnouncements}
          isLoading={isLoadingAnnouncements}
        />
        <InfoContainer />
      </div>
    </main>
  );
}
