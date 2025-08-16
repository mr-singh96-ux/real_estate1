"use client"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Building, Users, MessageSquare, BarChart3, Settings } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Properties", href: "/admin/properties", icon: Building },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Messages", href: "/admin/messages", icon: MessageSquare },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "Settings", href: "/admin/settings", icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-white border-r border-border min-h-screen">
      <nav className="p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.name} href={item.href}>
              <Button
                variant={isActive ? "default" : "ghost"}
                className={cn("w-full justify-start", isActive && "bg-primary text-primary-foreground")}
              >
                <item.icon className="h-4 w-4 mr-3" />
                {item.name}
              </Button>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
