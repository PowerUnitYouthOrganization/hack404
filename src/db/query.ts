import { db } from "./schema";
import { waitlistEmails } from "./schema";

async function viewTable() {
	// Fetch all emails from the waitlist
	const emails = await db.select().from(waitlistEmails);
	console.log("Table contents:", emails);
}

viewTable();
