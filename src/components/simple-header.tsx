import Image from "next/image";
import Link from "next/link";

export default function SimpleHeader() {
  return (
    <header className="grid w-full h-24 p-6 gap-x-2.5 gap-y-2.5 grid-rows-1 grid-cols-[1fr_700px_1fr]">
      <div className="flex px-3 items-center gap-5 flex-1 self-stretch row-start-1 row-span-1 col-start-1 col-span-1">
        <Link href="/">
          <Image
            src="/clearlogo.png"
            alt="Hack404 Logo"
            width={26}
            height={19}
            className="cursor-pointer hover:opacity-80"
          />
        </Link>
        <h1
          className="flex flex-col justify-end text-white text-2xl font-normal tracking-[-0.72px]"
          style={{ fontFamily: '"FH Lecturis Rounded"' }}
        >
          launchpad
        </h1>
      </div>
      <div className="flex justify-end items-center gap-1 flex-1 self-stretch row-start-1 row-span-1 col-start-3 col-span-1">
        <Image src="/whitetext.png" alt="hack404" width={89} height={20} />
      </div>
    </header>
  );
}
