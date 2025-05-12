import { pgTable, varchar, serial } from "drizzle-orm/pg-core"; // Import serial for auto-incrementing ID
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

// Initialize a new database connection for the waitlist schema
const pool = postgres(process.env.DATABASE_URL!, {
    max: 1,
    ssl: "require",
});

export const waitlistDb = drizzle(pool);


export const waitlistEmails = pgTable("waitlist_emails", {
    id: serial("id").primaryKey(), 
    email: varchar("email", { length: 255 }).notNull(), 
});