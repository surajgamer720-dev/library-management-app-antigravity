"use client"

import { Search, Bell } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-background/50 border-b border-border/50 h-16 flex items-center justify-between px-6 transition-all duration-300">
      
      {/* Search Bar */}
      <div className="flex-1 flex items-center">
        <div className="relative w-full max-w-md hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input 
            type="text"
            placeholder="Search books, members, transactions..."
            className="w-full h-10 pl-10 pr-4 rounded-full bg-muted/50 border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-muted/50">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive border-2 border-background"></span>
        </button>
        
        <ThemeToggle />

        <div className="h-6 w-px bg-border/50 mx-1"></div>

        <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Avatar className="w-8 h-8 border border-border">
            <AvatarImage src="" />
            <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">AD</AvatarFallback>
          </Avatar>
          <div className="hidden md:flex flex-col items-start">
            <span className="text-sm font-semibold leading-none">Admin User</span>
            <span className="text-xs text-muted-foreground mt-1">Librarian</span>
          </div>
        </button>
      </div>
    </header>
  )
}
