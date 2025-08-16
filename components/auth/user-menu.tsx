"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/components/auth/auth-context"
import { User, Settings, LogOut, Shield } from "lucide-react"
import Link from "next/link"

export function UserMenu() {
  const { user, logout } = useAuth()

  if (!user) {
    return (
      <div className="hidden md:flex items-center gap-4">
        <Link href="/login">
          <Button variant="ghost" size="sm">
            <User className="h-4 w-4 mr-2" />
            Sign In
          </Button>
        </Link>
        <Link href="/signup">
          <Button size="sm">Get Started</Button>
        </Link>
      </div>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-3 px-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
            <AvatarFallback>
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:block text-left">
            <div className="text-sm font-medium">{user.name}</div>
            <div className="text-xs text-muted-foreground capitalize">{user.role}</div>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem>
          <User className="h-4 w-4 mr-2" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </DropdownMenuItem>
        {user.role === "admin" && (
          <>
            <DropdownMenuSeparator />
            <Link href="/admin">
              <DropdownMenuItem>
                <Shield className="h-4 w-4 mr-2" />
                Admin Dashboard
              </DropdownMenuItem>
            </Link>
          </>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
