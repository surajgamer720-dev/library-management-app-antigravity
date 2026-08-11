"use client"

import { useState } from "react"
import { Search, BookCopy, RefreshCw, AlertCircle, ScanBarcode } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

// Mock Data
const mockTransactions = [
  { id: "T1", book: "The Martian", member: "Alice Johnson", date: "2023-10-01", dueDate: "2023-10-15", status: "ISSUED" },
  { id: "T2", book: "Atomic Habits", member: "Bob Smith", date: "2023-09-20", dueDate: "2023-10-04", status: "OVERDUE" },
  { id: "T3", book: "1984", member: "Alice Johnson", date: "2023-09-10", dueDate: "2023-09-24", status: "RETURNED" },
]

export default function TransactionsPage() {
  const [activeTab, setActiveTab] = useState<"issue" | "return">("issue")

  const handleTransaction = (e: React.FormEvent) => {
    e.preventDefault()
    if (activeTab === "issue") {
      toast.success("Book issued successfully!")
    } else {
      toast.success("Book returned successfully!")
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Issue / Return</h1>
        <p className="text-muted-foreground">Manage book checkouts and returns.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Transaction Action Form */}
        <Card className="lg:col-span-1 bg-card/50 backdrop-blur-md border-border/50 shadow-sm h-fit sticky top-24">
          <CardHeader>
            <div className="flex w-full bg-muted/50 rounded-lg p-1 mb-4">
              <button 
                className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${activeTab === "issue" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                onClick={() => setActiveTab("issue")}
              >
                Issue Book
              </button>
              <button 
                className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${activeTab === "return" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                onClick={() => setActiveTab("return")}
              >
                Return Book
              </button>
            </div>
            <CardTitle>{activeTab === "issue" ? "Issue a Book" : "Process Return"}</CardTitle>
            <CardDescription>
              {activeTab === "issue" ? "Enter member and book details to check out." : "Enter book details to mark as returned."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleTransaction} className="space-y-4">
              {activeTab === "issue" && (
                <div className="space-y-2">
                  <Label htmlFor="memberId">Member ID or Email</Label>
                  <div className="flex gap-2">
                    <Input id="memberId" placeholder="e.g. alice@example.com" required />
                    <Button type="button" variant="outline" size="icon" className="shrink-0"><ScanBarcode className="w-4 h-4" /></Button>
                  </div>
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="bookId">Book ID or ISBN</Label>
                <div className="flex gap-2">
                  <Input id="bookId" placeholder="e.g. 978-0553418026" required />
                  <Button type="button" variant="outline" size="icon" className="shrink-0"><ScanBarcode className="w-4 h-4" /></Button>
                </div>
              </div>

              {activeTab === "issue" && (
                <div className="bg-muted/50 p-3 rounded-lg text-sm flex items-start gap-2 border border-border/50">
                  <AlertCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <p className="text-muted-foreground leading-tight">Due date will be automatically set to 14 days from today.</p>
                </div>
              )}

              <Button type="submit" className="w-full gap-2">
                {activeTab === "issue" ? (
                  <><BookCopy className="w-4 h-4" /> Complete Issue</>
                ) : (
                  <><RefreshCw className="w-4 h-4" /> Process Return</>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Recent Transactions List */}
        <Card className="lg:col-span-2 bg-card/50 backdrop-blur-md border-border/50 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>A log of recent activity.</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search..." className="pl-9 h-9 border-border/50 bg-muted/50" />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Book</TableHead>
                  <TableHead>Member</TableHead>
                  <TableHead>Issue Date</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockTransactions.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell className="font-medium">{tx.book}</TableCell>
                    <TableCell>{tx.member}</TableCell>
                    <TableCell className="text-muted-foreground">{tx.date}</TableCell>
                    <TableCell className="text-muted-foreground">{tx.dueDate}</TableCell>
                    <TableCell className="text-right">
                      {tx.status === "ISSUED" && (
                        <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">Issued</Badge>
                      )}
                      {tx.status === "OVERDUE" && (
                        <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">Overdue</Badge>
                      )}
                      {tx.status === "RETURNED" && (
                        <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">Returned</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
