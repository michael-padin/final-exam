"use server";
import { signIn } from "@/auth";
import { db } from "@/lib/db";
import { LoginSchema, LoginSchemaType } from "@/types/login";
import { AuthError } from "next-auth";

export const login = async (data: LoginSchemaType) => {
	const validatedFields = LoginSchema.safeParse(data)

	if (!validatedFields.success) {
		return { error: "Invalid fields" }
	}

	const { email, password } = validatedFields.data

	try {
		await signIn("credentials", {
			email,
			password,
			redirect: false
		})

		const user = await db.user.findFirst({
			where: {
				email
			}
		})

		if (!user){
			return { error: "User not found" }
		}

		return { success: "Logged in", data: user }
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case "CredentialsSignin":
					return { error: "Invalid credentials" }
				default:
					return { error: "Something went wrong" }
			}
		}

		throw error
	}
};
