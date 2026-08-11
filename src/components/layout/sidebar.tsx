"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen, LayoutDashboard, Users, BookCopy, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

const adminRoutes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin",
  },
  {
    label: "Books",
    icon: BookOpen,
    href: "/admin/books",
  },
  {
    label: "Members",
    icon: Users,
    href: "/admin/members",
  },
  {
    label: "Issue / Return",
    icon: BookCopy,
    href: "/admin/transactions",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/admin/settings",
  }
]

const memberRoutes = [
  {
    label: "My Dashboard",
    icon: LayoutDashboard,
    href: "/member",
  },
  {
    label: "Book Catalog",
    icon: BookOpen,
    href: "/member/catalog",
  },
  {
    label: "Library Card",
    icon: Users,
    href: "/member/card",
  }
]

export function Sidebar() {
  const pathname = usePathname()
  
  const isAdmin = pathname.startsWith("/admin")
  const routes = isAdmin ? adminRoutes : memberRoutes

  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen fixed top-0 left-0 border-r border-border/50 bg-background/50 backdrop-blur-xl transition-all duration-300 z-50">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
          L
        </div>
        <span className="font-bold text-xl tracking-tight">LMS Pro</span>
      </div>

      <div className="flex-1 px-4 py-2 space-y-2 overflow-y-auto">
        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-2">
          {isAdmin ? "Admin Menu" : "Member Menu"}
        </div>
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
              pathname === route.href
                ? "bg-primary text-primary-foreground shadow-md"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <route.icon className="w-5 h-5" />
            {route.label}
          </Link>
        ))}
      </div>
    </aside>
  )
}
