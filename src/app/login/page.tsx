import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { LoginForm } from "./_components/login-form";

export default function LoginPage() {
	return (
		<div className="max-w-screen-sm mx-auto mt-10">
			<h1 className="text-3xl font-bold text-primary text-center mb-5">
				YOUR TODO-LIST
			</h1>
			<Card>
				<CardHeader>
					<CardTitle>Login</CardTitle>
					<CardDescription>Login to your account</CardDescription>
				</CardHeader>
				<CardContent>
					<LoginForm />
				</CardContent>
			</Card>
		</div>
	);
}
