import { Metadata } from "next";
import TodoForm from "../_components/todo-form";
import TodoList from "../_components/todo-list";
import { auth } from "@/auth";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { SignOutBtn } from "../_components/sign-out-button";

export const metadata: Metadata = {
	title: "",
	description: "Encrypt or decrypt your secret messages",
};

export default async function HomePage() {
	const session = await auth();

	if (!session) {
		return <h1>You are not logged in</h1>;
	}

	const userId = session.user.id;
	return (
		<main className="max-w-screen-md mx-auto p-4">
			<div className="flex items-center justify-center flex-grow"> 
				<div className="w-full">
					<h1>
						Hi, <span className="text-primary">{session.user.name}</span>👋
					</h1>
				</div>
				<div><SignOutBtn/></div>
			</div>
			<h2 className="text-2xl font-bold my-4">Todo List</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				<div>
					<Card>
						<CardHeader>
							<CardTitle>Create a New Todo</CardTitle>
							<CardDescription>Create a new todo item</CardDescription>
							<TodoForm userId={userId} />
						</CardHeader>
					</Card>
				</div>
				<div>
					<h2 className="text-2xl font-semibold mb-4">Your Todos</h2>
					<TodoList userId={userId} />
				</div>
			</div>
		</main>
	);
}
