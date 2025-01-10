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
import { login } from "@/app/actions/login";
import { LoginSchema, LoginSchemaType } from "@/types/login";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

export const LoginForm = () => {
	const toast = useToast();
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const form = useForm<LoginSchemaType>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (data: LoginSchemaType) => {
		startTransition(async () => {
			const { error } = await login(data);

			if (error) {
				toast.toast({
					title: error,
					variant: "destructive",
				});
				return
			}
			router.push("/");
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
				<fieldset disabled={isPending} className="space-y-4 w-full">
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
						{isPending ? <Loader2 className="animate-spin" /> : "Login"}
					</Button>
					<Button
						type="submit"
						className="w-full"
						disabled={isPending}
						asChild
						variant={"secondary"}
					>
						<Link href="/sign-up">Sign up</Link>
					</Button>
				</fieldset>
			</form>
		</Form>
	);
};
