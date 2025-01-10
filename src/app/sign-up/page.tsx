import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { SignupForm } from "./_components/sign-up-form";

export default function SignUpPage() {
	return (
		<div className="max-w-screen-sm mx-auto mt-10">
            <h1 className="text-3xl font-bold text-primary text-center mb-5">YOUR TODO-LIST</h1>
			<Card>
				<CardHeader>
					<CardTitle>Sign up</CardTitle>
					<CardDescription>Sign up to get started</CardDescription>
				</CardHeader>
				<CardContent>
					<SignupForm />
				</CardContent>
			</Card>
		</div>
	);
}
