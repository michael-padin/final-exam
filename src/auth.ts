import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth, { DefaultSession, Session } from "next-auth"
import { Adapter } from "next-auth/adapters"

import { DefaultJWT } from "next-auth/jwt"
import authConfig from "./auth.config"
import { db } from "./lib/db"

declare module "next-auth" {
	/**
	 * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		user: {
			id: string
			name: string
		} & DefaultSession["user"]


	}

}
declare module "next-auth/jwt" {
	interface JWT extends DefaultJWT {
		user: Session["user"]
	}
}

export const { auth, handlers, signIn, signOut, unstable_update } = NextAuth({
	adapter: PrismaAdapter(db) as Adapter,
	session: { strategy: "jwt" },
	...authConfig
})
