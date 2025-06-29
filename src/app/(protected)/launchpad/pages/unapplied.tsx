"use client";

/**
 * This component displays a message to users who did not apply before applications closed.
 * @returns Unapplied component
 */
export default function Unapplied() {
  return (
    <main className="flex flex-col h-full overflow-hidden gap-6">
      <div className="flex h-full w-full items-center justify-center p-4 text-center text-white">
        <div className="flex max-w-xl flex-col items-center gap-4 rounded-lg  bg-wcyan/20 border border-wcyan/30 backdrop-blur-[25px] p-6">
          <h1 className="font-(family-name:--font-heading) text-3xl font-bold">
            Applications Closed
          </h1>
          <p className="text-md text-gray-300">
            The application period for Hack404 2024 has passed. Thank you for
            your interest in our event.
          </p>
          <p className="text-md text-gray-300">
            We hope to see you next year. Keep an eye out for future
            announcements!
          </p>
        </div>
      </div>
    </main>
  );
}
