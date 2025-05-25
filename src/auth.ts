import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { db } from "./db/schema";
import Resend from "next-auth/providers/resend";
import { sendVerificationRequest } from "./lib/authSendReq";

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: DrizzleAdapter(db),
	providers: [
		GitHub({
			clientId: process.env.AUTH_GITHUB_ID!,
			clientSecret: process.env.AUTH_GITHUB_SECRET!,
		}),
		Google({
			clientId: process.env.AUTH_GOOGLE_ID!,
			clientSecret: process.env.AUTH_GOOGLE_SECRET!,
		}),
		Resend({
			apiKey: process.env.RESEND_API_KEY!,
			server: "",
			from: "hello@hack404.dev",
			sendVerificationRequest: sendVerificationRequest,
		}),
	],
});
