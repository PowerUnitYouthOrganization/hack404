import Announcements from '@/components/Announcements';
import CreateAnnouncementForm from '@/components/CreateAnnouncementForm';

export default function AnnouncementsTestPage() {
  return (
    <div>
      <h1>Announcements Test Page</h1>
      <CreateAnnouncementForm />
      <hr />
      <Announcements />
    </div>
  );
}
