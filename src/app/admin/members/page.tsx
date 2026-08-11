"use client"

import { useState } from "react"
import { Plus, Search, MoreHorizontal, ShieldCheck, User as UserIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock Data
const mockMembers = [
  { id: "1", name: "Alice Johnson", email: "alice@example.com", role: "MEMBER", joinDate: "2023-01-15", fine: 0 },
  { id: "2", name: "Bob Smith", email: "bob@example.com", role: "MEMBER", joinDate: "2023-05-22", fine: 15 },
  { id: "3", name: "Charlie Admin", email: "admin@example.com", role: "ADMIN", joinDate: "2022-11-10", fine: 0 },
]

export default function MembersPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredMembers = mockMembers.filter(m => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    m.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Member Management</h1>
          <p className="text-muted-foreground">Manage user accounts, roles, and track fines.</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Add New Member
        </Button>
      </div>

      <div className="flex items-center space-x-2 bg-card/50 backdrop-blur-md p-4 rounded-xl border border-border/50 shadow-sm">
        <Search className="h-5 w-5 text-muted-foreground" />
        <Input 
          placeholder="Search by name or email..." 
          className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-2"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="bg-card/50 backdrop-blur-md rounded-xl border border-border/50 shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>Member</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead className="text-center">Pending Fines</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMembers.map((member) => (
              <TableRow key={member.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-primary/10 text-primary">{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div>{member.name}</div>
                      <div className="text-xs text-muted-foreground">{member.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {member.role === "ADMIN" ? (
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 gap-1">
                      <ShieldCheck className="h-3 w-3" /> Admin
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-muted text-muted-foreground border-border/50 gap-1">
                      <UserIcon className="h-3 w-3" /> Member
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-muted-foreground">{member.joinDate}</TableCell>
                <TableCell className="text-center">
                  {member.fine > 0 ? (
                    <span className="text-destructive font-semibold">${member.fine.toFixed(2)}</span>
                  ) : (
                    <span className="text-emerald-500 font-semibold">$0.00</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger render={
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    } />
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>View History</DropdownMenuItem>
                      <DropdownMenuItem>Clear Fines</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">Suspend Account</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
