import { useRef, useEffect } from "react";

export default function Header() {
  return (
    <header>
      <nav className="flex h-[64px] w-full flex-shrink-0 items-start gap-[24px] px-[64px]">
        <a
          href="/launchpad"
          className="flex flex-1 flex-col items-start justify-center gap-[10px] self-stretch text-white"
        >
          Agenda
        </a>
        <a
          href="/sponsors"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 flex-col items-start justify-center gap-[10px] self-stretch text-white"
        >
          Sponsors
        </a>
        <a
          href="#faq"
          className="flex flex-1 flex-col items-start justify-center gap-[10px] self-stretch text-white"
        >
          FAQ
        </a>
        <a
          href=""
          className="flex flex-1 flex-col items-end justify-center gap-[10px] self-stretch"
        ></a>
        <a
          href="/login"
          className="flex flex-1 flex-col items-end justify-center gap-[10px] self-stretch"
        >
          Log In
        </a>
      </nav>
    </header>
  );
}
