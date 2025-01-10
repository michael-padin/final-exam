"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

const TodoSchema = z.object({
	title: z.string().min(1, "Title is required"),
	description: z.string(),
	completed: z.boolean().default(false),
	userId: z.string(),
});

type TodoSchemaType = z.infer<typeof TodoSchema>;

export async function createTodo(data: TodoSchemaType) {

	const validatedFields = TodoSchema.safeParse(data);

	if (!validatedFields.success) {
		return { error: validatedFields.error.flatten().fieldErrors };
	}

	try {
		const newTodo = await db.todoItem.create({
			data: {
				description: validatedFields.data.description,
				title: validatedFields.data.title,
				completed: validatedFields.data.completed,
				userId: validatedFields.data.userId,
			},
		});
		revalidatePath("/");
		return { success: true, id: newTodo.id };
	} catch (error) {
		console.log('error :>> ', error);
		return { error: "Failed to create todo" };
	}
}
