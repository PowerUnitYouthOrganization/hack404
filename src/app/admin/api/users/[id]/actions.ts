import { db, users } from "@/db/schema";
import { eq } from "drizzle-orm";

async function makeAdmin(userId: string) {
  // Logic to set the user as admin
  // This function should update the user's isadmin field in the database
  console.log(`Making user ${userId} an admin`);
  const result = await db
    .update(users)
    .set({ isadmin: true })
    .where(eq(users.id, userId));
  console.log(`Database update result: "${result}"`);
  console.log(`Successfully made user ${userId} an admin`);
}

async function removeAdmin(userId: string) {
  // Logic to remove admin status from the user
  // This function should update the user's isadmin field in the database
  console.log(`Removing admin status from user ${userId}`);
  await db.update(users).set({ isadmin: false }).where(eq(users.id, userId));
}

export const UserActions = {
  makeAdmin,
  removeAdmin,
} as const;

export type UserAction = keyof typeof UserActions;
