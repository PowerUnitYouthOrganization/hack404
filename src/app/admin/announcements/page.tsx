import CreateAnnouncementForm from "@/components/CreateAnnouncementForm";

export default function AnnouncementsPage() {
  return (
    <div className="w-full px-2 sm:px-4 md:px-6 py-4 sm:py-8 max-w-none">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-normal font-['FH_Lecturis_Rounded'] text-white mb-2">
          Manage Announcements
        </h1>
        <p className="text-white/60 text-sm sm:text-base font-light">
          Create and manage announcements for the Hack404 platform
        </p>
      </div>

      <div className="w-full max-w-2xl">
        <CreateAnnouncementForm />
      </div>
    </div>
  );
}
