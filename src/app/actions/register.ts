"use server"
import { signIn } from "@/auth"
import { db } from "@/lib/db"
import { SignupSchemaType } from "@/types/signup"
import { hash } from "bcryptjs"

export const register = async (data: SignupSchemaType) => {
	try {
		const hashedPassword = await hash(data.password, 10)

		const existingUser = await db.user.findFirst({
			where: {
				email: data.email
			}
		})
		if (existingUser) return { error: "User already exists", data: null }


		const newUser = await db.user.create({
			data: {
				name: data.name,
				email: data.email,
				password: hashedPassword,
				isEmailVerified: false
			}
		})

		console.log('newUser :>> ', newUser);
		


		await signIn("credentials", {
			email: data.email,
			password: data.password,
			redirect: false
		})

		return {
			error: null,
			data: null
		}
	} catch (error) {
		console.log(error)
	}
}
