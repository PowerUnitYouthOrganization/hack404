import {
  boolean,
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  serial,
  varchar,
} from "drizzle-orm/pg-core";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import type { AdapterAccountType } from "next-auth/adapters";

const pool = postgres(process.env.DATABASE_URL!, {
  max: 1,
  ssl: "require",
});

export const db = drizzle(pool);

// User info
export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  profileCompleted: boolean("profileCompleted").notNull().default(false),
  firstName: text("firstName"),
  lastName: text("lastName"),
  stream: text("stream", { enum: ["beginner", "normal"] }),
  isadmin: boolean("isadmin").notNull().default(false),
});

// Profile info
export const profiles = pgTable("profile", {
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  firstName: text("firstName").notNull(),
  preferredFirstName: text("preferredFirstName"),
  lastName: text("lastName").notNull(),
  age: integer("age").notNull(),
  gender: text("gender").notNull(),
  ethnicity: text("ethnicity").notNull(),
  institution: text("institution").notNull(),
  year: text("year").notNull(),
  attendedHackathons: integer("attendedHackathons").notNull(),
  shirtSize: text("shirtSize").notNull(),
  dietaryRestrictions: text("dietaryRestrictions"),
  allergies: text("allergies"),
  linkedin: text("linkedin"),
  github: text("github"),
  portfolio: text("portfolio"),
  resume: text("resume"),
});

export const applications = pgTable("application", {
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: text("name"),
  email: text("email"),
  applicationSubmitted: boolean("applicationSubmitted")
    .notNull()
    .default(false),
  applicationReviewed: boolean("applicationReviewed").notNull().default(false),
  stream: text("stream", { enum: ["beginner", "normal"] }).notNull(),
  shortAnswer1: text("shortAnswer1").notNull(),
  shortAnswer2: text("shortAnswer2").notNull(),
  creativeQuestion: text("creativeQuestion").notNull(),
  avatar: text("avatar").array().$type<string[][]>().notNull(),
  avatarUrl: text("avatarUrl").notNull(),
  workshops: text("workshops").array().$type<string[]>().notNull(),
  activity: text("activity").notNull(),
  resumeConsented: boolean("resumeConsented").notNull(),
  overnightConsented: boolean("overnightConsented").notNull(),
  aiUsed: boolean("aiUsed").notNull(),
  createdAt: timestamp("createdAt", { mode: "date" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const announcements = pgTable("announcements", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  authorId: text("authorId").notNull().references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt", { mode: "date" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const pushSubscriptions = pgTable("pushSubscriptions", {
  id: serial("id").primaryKey(),
  endpoint: text("endpoint").notNull(),
  p256dh: text("p256dh").notNull(),
  auth: text("auth").notNull(),
  userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => [
    {
      compoundKey: primaryKey({
        columns: [account.provider, account.providerAccountId],
      }),
    },
  ],
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => [
    {
      compositePk: primaryKey({
        columns: [verificationToken.identifier, verificationToken.token],
      }),
    },
  ],
);

export const authenticators = pgTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
  },
  (authenticator) => [
    {
      compositePK: primaryKey({
        columns: [authenticator.userId, authenticator.credentialID],
      }),
    },
  ],
);
