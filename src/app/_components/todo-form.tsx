"use client";

import {  useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createTodo } from "../actions/todo";
import { useToast } from "@/hooks/use-toast";

const TodoSchema = z.object({
	title: z.string().min(1, "Title is required"),
	description: z.string(),
	completed: z.boolean().default(false),
});

type TodoFormValues = z.infer<typeof TodoSchema>;

export default function TodoForm({ userId }: { userId: string }) {
	const [isPending, startTransition] = useTransition();
	const { toast } = useToast();

	const form = useForm<TodoFormValues>({
		resolver: zodResolver(TodoSchema),
		defaultValues: {
			title: "",
			description: "",
			completed: false,
		},
	});

	async function onSubmit(data: TodoFormValues) {
		startTransition(async () => {
			const result = await createTodo({
				...data,
				userId,
			});

			if (result.error) {
				toast({
					title: "Error",
					description: "Failed to create todo. Please try again.",
					variant: "destructive",
				});
			} else {
				toast({
					title: "Success",
					description: "Todo created successfully!",
				});
				form.reset();
			}
		});
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input placeholder="Enter todo title" {...field} />
							</FormControl>
							<FormDescription>The title of your todo item.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Textarea placeholder="Enter todo description" {...field} />
							</FormControl>
							<FormDescription>
								A detailed description of your todo item.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="completed"
					render={({ field }) => (
						<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
							<FormControl>
								<Checkbox
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
							<div className="space-y-1 leading-none">
								<FormLabel>Completed</FormLabel>
								<FormDescription>Mark this todo as completed.</FormDescription>
							</div>
						</FormItem>
					)}
				/>
				<Button type="submit" disabled={isPending} className="w-full" size={"lg"}>
					{isPending ? "Creating..." : "Create Todo"}
				</Button>
			</form>
		</Form>
	);
}
