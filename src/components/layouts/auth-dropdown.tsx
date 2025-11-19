import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DashboardIcon, ExitIcon, GearIcon } from "@radix-ui/react-icons"
import { Skeleton } from "@/components/ui/skeleton"
import { Button, } from "@/components/ui/button"
// import type { User } from "better-auth"
import { cn } from "@/lib/utils"
import * as React from "react"
import Link from "next/link"

interface AuthDropdownProps {
    className?: string
    // user: User | null
    user: any | null
}

const logout = async () => {
    // Add your logout logic here
    console.log("Logging out...")
}

export async function AuthDropdown({ user, className, ...props }: AuthDropdownProps) {
    if (!user) {
        return (
            <Button size="sm" className={cn(className)} {...props} asChild>
                <Link href="/signin">
                    Sign In
                    <span className="sr-only">Sign In</span>
                </Link>
            </Button>
        )
    }

    const initials = `${user.firstName?.charAt(0) ?? ""} ${user.lastName?.charAt(0) ?? ""}`

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="secondary"
                    className={cn("size-8 rounded-full", className)}
                    {...props}
                >
                    <Avatar className="size-8">
                        <AvatarImage src={user.imageUrl} alt={user.username ?? ""} />
                        <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                            {user.firstName} {user.lastName}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {user.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <React.Suspense
                    fallback={
                        <div className="flex flex-col space-y-1.5 p-1">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <Skeleton key={i} className="h-6 w-full rounded-sm" />
                            ))}
                        </div>
                    }
                >
                    <AuthDropdownGroup />
                </React.Suspense>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/signout">
                        <ExitIcon className="mr-2 size-4" aria-hidden="true" />
                        Log out
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}


async function AuthDropdownGroup() {

    return (
        <DropdownMenuGroup>
            <DropdownMenuItem asChild>
                <Link href={"/onboarding"}>
                    <DashboardIcon className="mr-2 size-4" aria-hidden="true" />
                    Dashboard
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
                <Link href="/dashboard/settings">
                    <GearIcon className="mr-2 size-4" aria-hidden="true" />
                    Settings
                </Link>
            </DropdownMenuItem>
        </DropdownMenuGroup >
    )
}