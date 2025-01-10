import { cn } from "@/lib/utils"
import { LogOut } from "lucide-react"
import { ButtonHTMLAttributes } from "react"
import { signOutAction } from "../actions/logout"

interface SignOutBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string
}

export function SignOutBtn({ className, ...props }: SignOutBtnProps) {
	return (
		<form action={signOutAction}>
			<button
				className={cn(
					`flex w-full items-center gap-3 rounded-lg py-2 text-red-500`,
					className
				)}
				{...props}
			>
				<LogOut className="h-5 w-5" />
				<span>Logout</span>
			</button>
		</form>
	)
}
