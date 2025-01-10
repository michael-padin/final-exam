"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useRouter } from "next/navigation";
import { register } from "@/app/actions/register";
import { SignupSchema, SignupSchemaType } from "@/types/signup";

export const SignupForm = () => {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const form = useForm<SignupSchemaType>({
		resolver: zodResolver(SignupSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	const onSubmit = async (data: SignupSchemaType) => {
		startTransition(async () => {
			const hello = await register(data);

			// if (error) {
			// 	showErrorToast(error)
			// 	return
			// }
			router.push("/");
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
				<fieldset disabled={isPending} className="space-y-4 w-full">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input
										{...field}
										placeholder="John"
										autoComplete="off"
										className="w-full"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										placeholder="@email.com"
										{...field}
										autoComplete="off"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										placeholder="****"
										{...field}
										autoComplete="off"
										type="password"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					{/* <FormField
						control={form.control}
						name="confirmPassword"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Confirm Password</FormLabel>
								<FormControl>
									<FPPasswordInput {...field} autoComplete="new-password" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/> */}

					<Button type="submit" className="w-full" disabled={isPending}>
						{isPending ? <Loader2 className="animate-spin" /> : "Register"}
					</Button>
				</fieldset>
			</form>
		</Form>
	);
};
