"use client";

/**
 * This component displays a message to users whose application has been rejected and waitlisted.
 * @returns Rejected component
 */
export default function Rejected() {
  return (
    <main className="flex flex-col h-full overflow-hidden gap-6">
      <div className="flex h-full w-full items-center justify-center p-4 text-center text-white">
        <div className="flex max-w-xl flex-col items-center gap-4 rounded-lg  bg-wcyan/20 border border-wcyan/30 backdrop-blur-[25px] p-6">
          <h1 className="font-(family-name:--font-heading) text-3xl font-bold">
            Thank You for Your Application
          </h1>
          <p className="text-md text-gray-300">
            We received an overwhelming number of applications from many
            talented hackers this year, and the selection process was incredibly
            competitive. Unfortunately, we can&apos;t offer you a spot at this
            time.
          </p>
          <p className="text-md text-gray-300">
            You&apos;ve been placed on our waitlist. If a spot opens up,
            we&apos;ll let you know immediately. Don&apos;t be discouraged, and
            we hope to see you at our future events. Keep building!
          </p>
        </div>
      </div>
    </main>
  );
}
