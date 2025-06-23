import "@/components/CreateAnnouncementForm"
import CreateAnnouncementForm from "@/components/CreateAnnouncementForm"


export default function AnnouncementsPage() {
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Manage Announcements</h1>
            <CreateAnnouncementForm />
        </div>
    )
}
