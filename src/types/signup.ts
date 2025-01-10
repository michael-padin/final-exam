import { z } from "zod"

export const SignupSchema = z.object({
	name: z.string().min(2),
	email: z.string().email(),
	password: z.string().min(6)
})

export type SignupSchemaType = z.infer<typeof SignupSchema>