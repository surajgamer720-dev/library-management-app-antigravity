"use client"

import { useState, useTransition } from "react"
import { Search, MoreHorizontal, ShieldCheck, User as UserIcon } from "lucide-react"
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
import { deleteMember } from "../../actions/memberActions"

export default function MembersClient({ initialMembers }: { initialMembers: any[] }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isPending, startTransition] = useTransition()

  const filteredMembers = initialMembers.filter(m => 
    (m.name || "").toLowerCase().includes(searchQuery.toLowerCase()) || 
    (m.email || "").toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to suspend this account?")) {
      startTransition(async () => {
        await deleteMember(id)
      })
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Member Management</h1>
          <p className="text-muted-foreground">Manage user accounts, roles, and track fines.</p>
        </div>
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
            {filteredMembers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No members found.
                </TableCell>
              </TableRow>
            ) : filteredMembers.map((member) => (
              <TableRow key={member.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={member.image || ""} />
                      <AvatarFallback className="bg-primary/10 text-primary">{(member.name || "?").charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div>{member.name || "Unknown"}</div>
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
                <TableCell className="text-muted-foreground">{new Date(member.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="text-center">
                  {member.totalFines > 0 ? (
                    <span className="text-destructive font-semibold">${member.totalFines.toFixed(2)}</span>
                  ) : (
                    <span className="text-emerald-500 font-semibold">$0.00</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0" disabled={isPending}>
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>View History</DropdownMenuItem>
                      <DropdownMenuItem>Clear Fines</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(member.id)}>Suspend Account</DropdownMenuItem>
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
