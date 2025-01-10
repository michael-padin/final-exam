import { compare } from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import { type Provider } from "next-auth/providers";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { LoginSchema } from "./types/login";
import { db } from "./lib/db";

const providers: Provider[] = [
	Credentials({
		async authorize(credentials) {
			const validateFields = LoginSchema.safeParse(credentials);
			if (!validateFields.success) return null;

			const { email, password } = validateFields.data;
			const user = await db.user.findFirst({
				where: {
					email,
				},
			});

			if (!user || !user.password) return null;

			// compare the actual password and the hash password
			const passwordMatch = await compare(password, user.password);

			if (passwordMatch) {
				const newUser = {
					id: user.id,
					name: user.name || "",
					email: user.email,
				};

				return newUser;
			}
			return null;
		},
	}),
	Google({
		clientId: process.env.AUTH_GOOGLE_ID,
		clientSecret: process.env.AUTH_GOOGLE_SECRET,
	}),
];

export default {
	providers,
	debug: process.env.NODE_ENV === "development",
	pages: {
		signIn: "/login",
	},

	callbacks: {
		async jwt({ token, user, trigger, session }) {
			if (user) {
				token.user = { ...user, id: user.id || "", name: user.name || "" };
			}
			if (trigger === "update" && session) {
				token = { ...token, user: session };
			}

			return token;
		},
		async session({ session, token }) {
			session = {
				...session,
				user: {
					...session.user,
					...token.user,
					id: token.user.id || "",
					email: token.user.email || "",
					image: token.user.image,
					name: token.user.name,
				},
			};

			return session;
		},
	},
	secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;
