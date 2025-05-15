import { useRef, useEffect } from "react";

export default function Header({
  onLinkWidth,
}: {
  onLinkWidth?: (w: number) => void;
}) {
  const elementRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const updateWidth = () => {
      if (elementRef.current && onLinkWidth) {
        onLinkWidth(elementRef.current.offsetWidth);
      }
    };

    updateWidth(); // initial call
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [onLinkWidth]);

          
  return (
    <header>
      <nav className="flex h-[64px] w-full flex-shrink-0 items-start gap-[24px] px-[64px]">
        <a
          href="#about-us"
          className="flex flex-1 flex-col items-start justify-center gap-[10px] self-stretch text-white"
          ref={elementRef}
        >
          About Us
        </a>
        <a
          href="https://www.instagram.com/hack404.dev/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 flex-col items-start justify-center gap-[10px] self-stretch text-white"
        >
          Instagram
        </a>
        <a
          href=""
          className="flex flex-1 flex-col items-center justify-center gap-[10px] self-stretch"
        >
          <img
            src="whitefull.png"
            alt="Logo"
            className="flex h-auto w-[109px] items-center justify-center"
          />
        </a>
        <a
          href="/Hack404 Sponsorship Package.pdf"
          className="flex flex-1 flex-col items-end justify-center gap-[10px] self-stretch text-white"
        >
          Sponsor us
        </a>
        <a
          href="https://power-unit.org"
          className="flex flex-1 flex-col items-end justify-center gap-[10px] self-stretch"
        >
          <img
            src="PUYOlogo.png"
            alt="Logo"
            className="flex h-auto w-[49px] items-center justify-center"
          />
        </a>
      </nav>
    </header>
  );
}