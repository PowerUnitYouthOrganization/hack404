import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "./db/schema";
import Resend from "next-auth/providers/resend";
import { sendVerificationRequest } from "./lib/authSendReq";

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: DrizzleAdapter(db),
	providers: [
		Resend({
			apiKey: process.env.RESEND_API_KEY!,
			server: "",
			from: "hello@hack404.dev",
			sendVerificationRequest: sendVerificationRequest,
		}),
	],
});
