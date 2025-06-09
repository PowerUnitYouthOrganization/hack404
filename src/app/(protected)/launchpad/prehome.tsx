"use client";

import RoundedButton from "@/components/ui/roundedbutton";
import { useSession } from "next-auth/react";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useApplicationStatus } from "@/hooks/use-application-status";

interface FAQ {
  question: string;
  answer: string;
}

/**
 * This component serves as the main layout for the hacker dashboard page.
 * @returns Launchpad component
 */
export default function Prehome() {
  const [timeLeft, setTimeLeft] = useState<string>("00d 00h 00m 00s");
  const [headerHeight, setHeaderHeight] = useState<number>(200);
  const { data: session } = useSession();
  const firstName = session?.user?.name?.split(" ")[0] || "Hacker";
  const headerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { hasApplication, applicationSubmitted, loading } =
    useApplicationStatus();

  const handleStartApplication = () => {
    if (hasApplication && applicationSubmitted) {
      router.push("/application/thankyou");
    } else {
      router.push("/application");
    }
  };

  useEffect(() => {
    // time until submission deadline or whatever date
    const targetDate = new Date("2025-06-21T00:00:00");
    const interval = setInterval(() => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();
      if (diff <= 0) {
        setTimeLeft("00d 00h 00m 00s");
        clearInterval(interval);
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft(
          `${days.toString().padStart(2, "0")}d ${hours.toString().padStart(2, "0")}h ${minutes.toString().padStart(2, "0")}m ${seconds.toString().padStart(2, "0")}s`,
        );
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight + 36); // Add gap
      }
    };

    updateHeaderHeight();
    window.addEventListener("resize", updateHeaderHeight);

    return () => window.removeEventListener("resize", updateHeaderHeight);
  }, [headerHeight]);

  const faq: FAQ[] = [
    {
      question: "What are the requirements to participate?",
      answer:
        "Participants must be students enrolled in a high-school or post-secondary institution and have a valid email address. We welcome both beginners and experienced hackers - we have dedicated beginner and normal streams to accommodate different experience levels.",
    },
    {
      question: "What are the judging criteria?",
      answer:
        "Judging criteria include creativity, technical difficulty, and impact.",
    },
    {
      question: "What are the submission guidelines?",
      answer:
        "Submissions must be submitted by the deadline and must include a description, a link to the project, and a team name.",
    },
    {
      question: "How many people can be on a team?",
      answer:
        "Teams can have up to 4 members. Beginners must work in teams, while experienced hackers can work solo if they prefer.",
    },
    {
      question: "What are the FAQs?",
      answer:
        "FAQs include information about the hackathon, the team, and the prizes.",
    },
  ];

  return (
    <main className="flex flex-col gap-4 tablet:gap-9 w-full mt-4 tablet:mt-8">
      <div
        ref={headerRef}
        className="flex flex-col tablet:flex-row px-4 tablet:px-9 justify-between items-start tablet:items-end self-stretch gap-4 tablet:gap-0"
      >
        <div className="flex flex-col justify-center items-start">
          <h1 className="text-2xl tablet:text-[40px] leading-normal font-(family-name:--font-heading)">
            Hello {firstName}!
          </h1>
          <sub className="text-wcyan font-light text-xs tablet:text-sm">
            Welcome to Hack404
          </sub>
        </div>
        <div className="flex flex-col justify-center items-start tablet:items-end">
          <h1 className="text-2xl tablet:text-[40px] leading-normal font-(family-name:--font-heading-light)">
            {timeLeft}
          </h1>
          <sub className="text-wcyan font-light text-xs tablet:text-sm">
            until submission deadline
          </sub>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col tablet:flex-row px-2 w-full items-start gap-2 self-stretch border border-[rgba(48,242,242,0.2)]">
        <div className="flex flex-col items-start gap-2 grow self-stretch border-t tablet:border-t-0 border-l border-r border-[rgba(48,242,242,0.20)] w-full">
          <div className="flex flex-col items-start self-stretch w-full">
            <div className="flex p-4 tablet:p-6 justify-center items-center gap-2.5 self-stretch">
              <p className="text-white font-light grow">Hacker Application</p>
            </div>
            <div className="flex p-4 tablet:p-6 flex-col justify-between items-end self-stretch border-t border-b border-[rgba(48,242,242,0.20)] bg-[rgba(48,242,242,0.10)] backdrop-blur-[25px]">
              <div className="flex flex-col items-start self-stretch w-full">
                <RoundedButton
                  color={
                    hasApplication && applicationSubmitted
                      ? "#299b9b"
                      : "#30F2F2"
                  }
                  className="text-black w-full"
                  onClick={handleStartApplication}
                  disabled={loading || (hasApplication && applicationSubmitted)}
                >
                  <p>
                    {loading
                      ? "Checking..."
                      : hasApplication && applicationSubmitted
                        ? "Application Submitted"
                        : "Start Application"}
                  </p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20px"
                    viewBox="0 -960 960 960"
                    width="20px"
                    fill="#000000"
                  >
                    <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-132 77-237.5T360-862v86q-91 37-145.5 117.5T160-480q0 134 93 227t227 93q134 0 227-93t93-227q0-98-54.5-178.5T600-776v-86q126 39 203 144.5T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-240L280-520l56-56 104 103v-407h80v407l104-103 56 56-200 200Z" />
                  </svg>
                </RoundedButton>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start grow self-stretch w-full">
            <div className="flex p-4 tablet:p-6 justify-center items-center gap-2.5 self-stretch border-t border-[rgba(48,242,242,0.20)]">
              <p className="grow">About Hack404</p>
            </div>
            <div className="flex flex-col p-4 tablet:p-6 items-start gap-4 tablet:gap-9 self-stretch border-t border-[rgba(48,242,242,0.20)] tablet:max-h-72 tablet:overflow-y-auto hide-scrollbar">
              <div className="flex justify-between items-start self-stretch text-sm tablet:text-base">
                Hack404 is based on three key values: Innovation, Education, and
                Community. <br /> Innovation: The world of tech is constantly
                changing. We're seeing the emergence of new technologies, from
                AI/ML, to VR/AR, biotechnology, quantum computing, and more. Our
                hackers embrace and build alongside these technologies,
                exploring and expanding the space of what's possible. <br />
                Education: Breaking into the tech industry can be hard. We want
                to make it easier – our workshops will explore both the
                fundamentals, helping beginners write their first lines of code,
                and the frontiers of building and shipping tech. <br />
                Community: We believe that tech has the potential to create
                real, tangible change in the community. We're encouraging
                hackers to think about what their communities need, including
                the diverse needs of different stakeholders.
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start gap-2 grow self-stretch border-t tablet:border-t-0 border-l border-r border-[rgba(48,242,242,0.20)] w-full">
          <div className="flex flex-col items-start self-stretch w-full">
            <div className="flex p-4 tablet:p-6 justify-center items-center gap-2.5 self-stretch border-b border-[rgba(48,242,242,0.20)] flex-shrink-0">
              <p className="grow">FAQ</p>
            </div>

            <div className="flex flex-col items-start self-stretch max-h-120 overflow-y-auto hide-scrollbar">
              {faq.map((FAQ) => {
                return (
                  <div
                    key={FAQ.question}
                    className="flex flex-col p-4 tablet:p-6 items-start gap-4 tablet:gap-9 self-stretch border-b border-[rgba(48,242,242,0.20)]"
                  >
                    <div className="flex justify-between items-start self-stretch">
                      <div className="flex justify-between items-start self-stretch">
                        <div className="flex flex-col items-start gap-2 grow">
                          <h1 className="font-bold text-sm tablet:text-base">
                            {FAQ.question}
                          </h1>
                          <p className="font-sm font-light text-xs tablet:text-sm">
                            {FAQ.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
