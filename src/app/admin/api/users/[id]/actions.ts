import { db, users, applications } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export class UserActionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UserActionError";
  }
}

async function makeAdmin(userId: string) {
  console.log(`Making user ${userId} an admin`);
  const result = await db
    .update(users)
    .set({ isadmin: true })
    .where(eq(users.id, userId));
}

async function removeAdmin(userId: string) {
  await db.update(users).set({ isadmin: false }).where(eq(users.id, userId));
}

async function checkinUser(userId: string) {
  const [userStatus] = await db
    .select({
      rsvp: users.rsvp,
    })
    .from(users)
    .where(eq(users.id, userId));

  // Only tick the checkin box if RSVP is true
  if (userStatus && userStatus.rsvp) {
    await db.update(users).set({ checkedin: true }).where(eq(users.id, userId));
  } else {
    // Return without error - this will be handled as a notification in the response
    return { notification: "User has not RSVPed and cannot be checked in" };
  }
}

async function checkoutUser(userId: string) {
  await db.update(users).set({ checkedin: false }).where(eq(users.id, userId));
}

async function recordMeal(userId: string) {
  await db.update(users).set({ meal: true }).where(eq(users.id, userId));
}

async function recordMicrohack(userId: string) {
  await db
    .update(users)
    .set({ microhackscomplete: sql`${users.microhackscomplete} + 1` })
    .where(eq(users.id, userId));
}

export const UserActions = {
  makeAdmin,
  removeAdmin,
  checkin: checkinUser,
  checkout: checkoutUser,
  meal: recordMeal,
  microhack: recordMicrohack, // Renamed from workshop
} as const;

export type UserAction = keyof typeof UserActions;
