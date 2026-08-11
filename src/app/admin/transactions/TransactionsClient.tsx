"use client"

import { useState, useTransition } from "react"
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
import { issueBook, returnBook } from "../../actions/loanActions"

export default function TransactionsClient({ initialLoans }: { initialLoans: any[] }) {
  const [activeTab, setActiveTab] = useState<"issue" | "return">("issue")
  const [memberId, setMemberId] = useState("")
  const [bookId, setBookId] = useState("")
  const [loanId, setLoanId] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState({ text: "", type: "" })

  const filteredLoans = initialLoans.filter(tx => 
    (tx.book?.title || "").toLowerCase().includes(searchQuery.toLowerCase()) || 
    (tx.user?.email || "").toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleTransaction = (e: React.FormEvent) => {
    e.preventDefault()
    setMessage({ text: "", type: "" })
    
    startTransition(async () => {
      if (activeTab === "issue") {
        const dueDate = new Date()
        dueDate.setDate(dueDate.getDate() + 14) // 14 days from now
        
        const res = await issueBook({ userId: memberId, bookId, dueDate })
        if (res.success) {
          setMessage({ text: "Book issued successfully!", type: "success" })
          setMemberId("")
          setBookId("")
        } else {
          setMessage({ text: res.error || "Failed to issue book", type: "error" })
        }
      } else {
        const res = await returnBook(loanId)
        if (res.success) {
          setMessage({ text: "Book returned successfully!", type: "success" })
          setLoanId("")
        } else {
          setMessage({ text: res.error || "Failed to return book", type: "error" })
        }
      }
    })
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Issue / Return</h1>
        <p className="text-muted-foreground">Manage book checkouts and returns.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 bg-card/50 backdrop-blur-md border-border/50 shadow-sm h-fit sticky top-24">
          <CardHeader>
            <div className="flex w-full bg-muted/50 rounded-lg p-1 mb-4">
              <button 
                className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${activeTab === "issue" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                onClick={() => { setActiveTab("issue"); setMessage({ text: "", type: "" }) }}
              >
                Issue Book
              </button>
              <button 
                className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${activeTab === "return" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                onClick={() => { setActiveTab("return"); setMessage({ text: "", type: "" }) }}
              >
                Return Book
              </button>
            </div>
            <CardTitle>{activeTab === "issue" ? "Issue a Book" : "Process Return"}</CardTitle>
            <CardDescription>
              {activeTab === "issue" ? "Enter member and book IDs to check out." : "Enter Loan ID to mark as returned."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {message.text && (
              <div className={`p-3 rounded-lg mb-4 text-sm ${message.type === 'success' ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20' : 'bg-destructive/10 text-destructive border border-destructive/20'}`}>
                {message.text}
              </div>
            )}
            <form onSubmit={handleTransaction} className="space-y-4">
              {activeTab === "issue" ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="memberId">Member ID</Label>
                    <div className="flex gap-2">
                      <Input id="memberId" placeholder="User ID string" required value={memberId} onChange={e => setMemberId(e.target.value)} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bookId">Book ID</Label>
                    <div className="flex gap-2">
                      <Input id="bookId" placeholder="Book ID string" required value={bookId} onChange={e => setBookId(e.target.value)} />
                    </div>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-lg text-sm flex items-start gap-2 border border-border/50">
                    <AlertCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <p className="text-muted-foreground leading-tight">Due date will be automatically set to 14 days from today.</p>
                  </div>
                </>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="loanId">Loan ID</Label>
                  <div className="flex gap-2">
                    <Input id="loanId" placeholder="Loan ID string" required value={loanId} onChange={e => setLoanId(e.target.value)} />
                  </div>
                </div>
              )}

              <Button type="submit" className="w-full gap-2" disabled={isPending}>
                {activeTab === "issue" ? (
                  <><BookCopy className="w-4 h-4" /> {isPending ? 'Issuing...' : 'Complete Issue'}</>
                ) : (
                  <><RefreshCw className="w-4 h-4" /> {isPending ? 'Returning...' : 'Process Return'}</>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 bg-card/50 backdrop-blur-md border-border/50 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>A log of recent activity.</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by Book title or Member email..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-9 h-9 border-border/50 bg-muted/50" />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Loan ID</TableHead>
                  <TableHead>Book</TableHead>
                  <TableHead>Member</TableHead>
                  <TableHead>Issue Date</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLoans.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No transactions found.
                    </TableCell>
                  </TableRow>
                ) : filteredLoans.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell className="font-mono text-xs">{tx.id.substring(0, 8)}...</TableCell>
                    <TableCell className="font-medium">{tx.book?.title || "Unknown Book"}</TableCell>
                    <TableCell>{tx.user?.email || "Unknown Member"}</TableCell>
                    <TableCell className="text-muted-foreground">{new Date(tx.issueDate).toLocaleDateString()}</TableCell>
                    <TableCell className="text-muted-foreground">{new Date(tx.dueDate).toLocaleDateString()}</TableCell>
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
