import NextAuth from "next-auth"
import { NextResponse } from "next/server"
import authConfig from "./auth.config"

const { auth } = NextAuth(authConfig)
export default auth(async function middleware(req) {
	const { nextUrl } = req
	const { pathname } = nextUrl
	const isLoggedIn = !!req.auth
	const user = req.auth?.user
	
	if (!user){
		new URL("/login", nextUrl)
	}
	
	return
})
// Supports both a single string value or an array of matchers
// @ref https://clerk.com/docs/references/nextjs/auth-middleware#usage
export const config = {
	matcher: [
		"/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"
	]
}
