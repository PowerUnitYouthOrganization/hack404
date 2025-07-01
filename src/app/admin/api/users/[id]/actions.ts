import { db, users, applications } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

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
      accepted: applications.accepted,
    })
    .from(users)
    .leftJoin(applications, eq(users.id, applications.userId))
    .where(eq(users.id, userId));

  // Only tick the checkin box if both RSVP and application acceptance are true
  if (userStatus && userStatus.rsvp && userStatus.accepted) {
    await db.update(users).set({ checkedin: true }).where(eq(users.id, userId));
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
