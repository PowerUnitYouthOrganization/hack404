import { waitlistDb, waitlistEmails } from "./waitlistSchema";

async function viewTable() {
  // Fetch all emails from the waitlist
  const emails = await waitlistDb.select().from(waitlistEmails);
  console.log("Table contents:", emails);
}

void viewTable();
