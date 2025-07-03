import { clsx, type ClassValue } from "clsx";
import { signOut } from "next-auth/react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleSignOut = async () => {
  try {
    console.log("handleSignOut called");
    await signOut({ redirectTo: "/" });
    console.log("signOut completed");
  } catch (error) {
    console.error("Error during signOut:", error);
  }
};
