import CreateAnnouncementForm from "@/components/CreateAnnouncementForm";

export default function AnnouncementsPage() {
  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-normal font-['FH_Lecturis_Rounded'] text-white mb-2">
          Manage Announcements
        </h1>
        <p className="text-white/60 text-base font-light">
          Create and manage announcements for the Hack404 platform
        </p>
      </div>
      
      <div className="max-w-2xl">
        <CreateAnnouncementForm />
      </div>
    </div>
  );
}
