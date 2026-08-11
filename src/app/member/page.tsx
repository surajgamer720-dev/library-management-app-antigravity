"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { BookOpen, Calendar, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const mockIssuedBooks = [
  { id: "1", title: "The Martian", author: "Andy Weir", issueDate: "2023-10-01", dueDate: "2023-10-15", status: "ISSUED" },
  { id: "2", title: "Atomic Habits", author: "James Clear", issueDate: "2023-09-20", dueDate: "2023-10-04", status: "OVERDUE" },
]

export default function MemberDashboard() {
  const stats = [
    { title: "Books Borrowed", value: "2", icon: BookOpen },
    { title: "Pending Fines", value: "$15.00", icon: AlertCircle, color: "text-destructive" },
  ]

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">My Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, Alice! Here is your current library status.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, i) => (
          <Card key={i} className="bg-card/50 backdrop-blur-md border-border/50 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color || 'text-primary'}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${stat.color || ''}`}>{stat.value}</div>
            </CardContent>
          </Card>
        ))}
        
        <Card className="bg-card/50 backdrop-blur-md border-border/50 shadow-sm flex items-center justify-center p-6">
           <Button className="w-full" variant="outline" asChild>
             <a href="/member/catalog">Browse Catalog</a>
           </Button>
        </Card>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Currently Borrowed</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {mockIssuedBooks.map(book => (
            <Card key={book.id} className={`bg-card/50 backdrop-blur-md border-border/50 shadow-sm relative overflow-hidden ${book.status === 'OVERDUE' ? 'border-destructive/30' : ''}`}>
              {book.status === "OVERDUE" && (
                <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none">
                   <div className="absolute transform rotate-45 bg-destructive text-destructive-foreground text-[10px] font-bold py-1 right-[-35px] top-[15px] w-[120px] text-center shadow-sm">
                      OVERDUE
                   </div>
                </div>
              )}
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{book.title}</CardTitle>
                <CardDescription>{book.author}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center text-sm mt-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" /> Due: {book.dueDate}
                  </div>
                  <Button variant="secondary" size="sm">Renew</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
