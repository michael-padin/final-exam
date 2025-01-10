import { Metadata } from "next";
import TodoForm from "../_components/todo-form";
import TodoList from "../_components/todo-list";
import { auth } from "@/auth";

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
		<main className="container mx-auto p-4">
			<h1 className="text-3xl font-bold mb-8">Todo List</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				<div>
					<h2 className="text-2xl font-semibold mb-4">Create a New Todo</h2>
					<TodoForm userId={userId} />
				</div>
				<div>
					<h2 className="text-2xl font-semibold mb-4">Your Todos</h2>
					<TodoList userId={userId} />
				</div>
			</div>
		</main>
	);
}
