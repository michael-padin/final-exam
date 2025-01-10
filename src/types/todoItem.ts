import { z } from "zod"

export const TodoItemSchema = z.object({
	title: z.string().min(2),
	description: z.string().min(2),
	completed: z.boolean()
})