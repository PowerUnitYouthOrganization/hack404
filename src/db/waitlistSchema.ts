import { pgTable, varchar } from "drizzle-orm/pg-core";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

// Initialize a new database connection for the waitlist schema
const pool = postgres(process.env.DATABASE_URL!, {
    max: 1,
    ssl: "require",
});

export const waitlistDb = drizzle(pool);

// Define the waitlist table with one column for the user's email
export const waitlistEmails = pgTable("waitlist_emails", {
    email: varchar("email", { length: 255 }).primaryKey().notNull(),
});