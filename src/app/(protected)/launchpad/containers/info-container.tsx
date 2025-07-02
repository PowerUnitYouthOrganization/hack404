import { PiDiscordLogo, PiNotionLogo } from "react-icons/pi";

import RoundedButton from "@/components/ui/roundedbutton";
import React from "react";

export default function InfoContainer() {
  return (
    <div className="hidden tablet:flex flex-col tablet:flex-1 overflow-hidden border-x border-b border-[rgba(48,242,242,0.2)] backdrop-blur-[25px] text-white">
      <div className="flex flex-col items-start self-stretch border-b border-[rgba(48,242,242,0.2)]">
        <div className="flex px-6 py-6 justify-center items-center gap-2.5 self-stretch bg-inherit backdrop-blur-[25px] border-b border-[rgba(48,242,242,0.2)] sticky top-0 z-10 flex-shrink-0">
          <h1 className="flex-1 text-white font-light">Project Submission</h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20px"
            viewBox="http://www.w3.org/2000/svg"
            width="20px"
            fill="#e3e3e3"
          >
            <path d="M480-200v-360H120v-80h440v440h-80Zm200-200v-360H320v-80h440v440h-80Z" />
          </svg>
        </div>
        <div
          className={`flex flex-col items-start justify-between self-stretch p-6 border-b border-[rgba(48, 242, 242, 0.20)] bg-[rgba(48, 242, 242, 0.10)] backdrop-blur-[25px] last:border-b-0 flex-shrink-0`}
        >
          {/* <div className="flex justify-between items-start self-stretch font-extralight">
                  Due 7:00AM Saturday
                </div>
                <div className="flex justify-between items-end self-stretch">
                  <RoundedButton
                    color={"var(--color-wcyan)"}
                    className="text-black w-full"
                    onClick={() => {
                      window.open("https://devpost.com/hack404", "_blank"); // Link to an external Devpost page
                    }}
                  >
                    <p>Submit on Devpost</p>
                    <ExternalLink className="w-5 h-5" />
                  </RoundedButton>
                </div> */}
          Coming soon!
        </div>
      </div>
      <div className="flex flex-col items-start self-stretch border-b border-[rgba(48,242,242,0.2)]">
        <div className="flex px-6 py-6 justify-center items-center gap-2.5 self-stretch bg-inherit backdrop-blur-[25px] border-b border-[rgba(48,242,242,0.2)] sticky top-0 z-10 flex-shrink-0">
          <h1 className="flex-1 text-white font-light">Hackathon Info</h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20px"
            viewBox="http://www.w3.org/2000/svg"
            width="20px"
            fill="#e3e3e3"
          >
            <path d="M480-200v-360H120v-80h440v440h-80Zm200-200v-360H320v-80h440v440h-80Z" />
          </svg>
        </div>
        <div
          className={`flex flex-col items-start justify-between self-stretch p-6 border-b border-[rgba(48, 242, 242, 0.20)] bg-[rgba(48, 242, 242, 0.10)] backdrop-blur-[25px] last:border-b-0 flex-shrink-0`}
        >
          {/* Event Header */}
          <div className="flex justify-between items-start self-stretch">
            <RoundedButton
              color={"var(--color-wcyan)"}
              className="text-black w-full"
              gap="3"
              onClick={() => {
                window.open("https://discord.gg/sZeMPtgKQ2", "_blank"); // Link to an external Devpost page
              }}
            >
              <p>Discord Server</p>
              <PiDiscordLogo className="w-6 h-6" />
            </RoundedButton>
            <RoundedButton
              color={"var(--color-wlime)"}
              className="text-black w-full"
              gap="2"
              onClick={() => {
                window.open(
                  "https://shiny-heliotrope-909.notion.site/Hack404-Hacker-Handbook-221892007b0a809ba0eacd66541648fd",
                  "_blank",
                ); // Link to an external Devpost page
              }}
            >
              <p>Hacker Package</p>
              <PiNotionLogo className="w-6 h-6" />
            </RoundedButton>
          </div>
          {/* Event Details */}
          <div className="flex justify-between items-end self-stretch"></div>
        </div>
      </div>
    </div>
  );
}
