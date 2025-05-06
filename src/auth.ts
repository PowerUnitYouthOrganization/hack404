import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { db } from "./db/schema";

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: DrizzleAdapter(db),
	providers: [
		GitHub({
			clientId: process.env.GITHUB_ID!,
			clientSecret: process.env.GITHUB_SECRET!,
		}),
		Google({
			clientId: process.env.GOOGLE_ID!,
			clientSecret: process.env.GOOGLE_SECRET!,
		}),
	],
});
