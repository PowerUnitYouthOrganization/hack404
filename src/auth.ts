import NextAuth, {type DefaultSession} from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db, accounts, users, sessions, verificationTokens } from "./db/schema";
import Resend from "next-auth/providers/resend";
import { sendVerificationRequest } from "./lib/authSendReq";

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: DrizzleAdapter(db, {
		usersTable: users,
		accountsTable: accounts,
		sessionsTable: sessions,
		verificationTokensTable: verificationTokens,
	}),
	providers: [
		Resend({
			apiKey: process.env.RESEND_API_KEY!,
			server: "",
			from: "hello@hack404.dev",
			sendVerificationRequest: sendVerificationRequest,
		}),
	],
});
